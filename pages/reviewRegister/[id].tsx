import SubTitle from "@/commons/layout/subTitle";
import { Row, Wrap } from "@/commons/styles/reviewForm/reviewForm";
import { type IReviewType } from "@/commons/type/commonType";
import Button from "@/components/button";
import Loading from "@/components/Loading";
import { Modal } from "@/components/modal";
import CampingSelect from "@/components/page/reviewRegister/campingSelect";
import UploadImage from "@/components/page/reviewRegister/uploadImage";
import ReviewForm from "@/components/reviewForm/reviewForm";
import { db, storage } from "@/firebase/firebase";
import { getReview } from "@/firebase/review";
import { useModal } from "@/hooks/useModal";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
import React, { type ChangeEvent, useEffect, useState } from "react";

export default function editRegister() {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectReview, setSelectReview] = useState<IReviewType[]>([]);
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");
  const [dbContentId, setDbContentId] = useState<string>("");
  const [dbFacltNm, setDbFacltNm] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedSubRegion, setSelectedSubRegion] = useState<string>("");
  const [editImages, setEditImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<File[]>([]); // 스토리지에 저장될 이미지
  const router = useRouter();
  const docId = router.query.id as string;
  const { currentModal, openModal, closeModal } = useModal();

  const fetchItem = async () => {
    setLoading(true);
    if (!docId) {
      setLoading(false);
      return;
    }

    const items = await getReview();
    const filterItem = items.filter((item) => item.docId === docId);
    setSelectReview(filterItem);

    setLoading(false);
  };

  useEffect(() => {
    void fetchItem();
  }, [docId]);

  //   수정 데이터 넣기
  useEffect(() => {
    if (selectReview.length > 0) {
      setTitle(selectReview[0].title);
      setContents(selectReview[0].contents);
      setDbContentId(selectReview[0].contentId);
      setDbFacltNm(selectReview[0].facltNm);
      setEditImages(selectReview[0].images ?? []);
    }
  }, [selectReview]);

  // 수정 submit
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!docId) return;
    if (!dbFacltNm) {
      openModal("alertCampinName");
      return;
    }

    const imageUpload = async () => {
      if (!selectedImage || selectedImage.length === 0) return [];

      const uploadedUrls: string[] = [];

      for (const image of selectedImage) {
        const imageName = `${image.name}${Date.now()}`; // 타임스탬프를 이용한 고유 이름
        const imageRef = ref(storage, `review/${imageName}`);
        const snapshot = await uploadBytes(imageRef, image);
        const url = await getDownloadURL(snapshot.ref);
        uploadedUrls.push(url);
      }

      return uploadedUrls;
    };

    try {
      setLoading(true);

      // 새로 추가된 이미지 업로드
      const newUploadedUrls = await imageUpload();

      // 기존 이미지 + 새 이미지
      const finalImages = [...(editImages || []), ...newUploadedUrls];

      const reviewRef = doc(db, "review", docId); // 수정할 문서의 참조 (reviewDocId는 수정할 리뷰의 ID)

      // Firestore에서 해당 문서 업데이트
      await updateDoc(reviewRef, {
        title,
        contents,
        contentId: dbContentId,
        region: selectedRegion,
        subRegion: selectedSubRegion,
        facltNm: dbFacltNm,
        images: finalImages,
        updatedAt: new Date(),
      });

      setLoading(false);
      void router.push(`/reviewBoard/${docId}`); // 수정 후 리뷰 목록 페이지로 이동
    } catch (error) {
      console.log(error);
    }
  };

  // 스토리지에 저장될 이미지
  //   const onStorageImage = (files: File[]) => {
  //     setSelectedImage((prev) => [...prev, ...files]);
  //   };

  // 선택 캠핑장 이름, contentId
  const selectCamping = (selectCamping: {
    contentId: string;
    facltNm: string;
  }) => {
    setDbFacltNm(selectCamping.facltNm);
    setDbContentId(selectCamping.contentId);
  };

  // 제목 onChange 이벤트 (auto textarea, 100자 이내)
  const onChangeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    const remHeight = (e.target.scrollHeight / 10).toFixed(1);
    e.target.style.height = `${remHeight}rem`;
    if (e.target.value.length > 100) {
      alert("100자 이내로 입력해주세요.");
    }
  };
  //   캠핑장 지역 이름 받기
  const onSelectRegion = (region: string) => {
    setSelectedRegion(region);
  };
  const onSelectSubRegion = (subRegion: string) => {
    setSelectedSubRegion(subRegion);
  };

  return (
    <Wrap>
      <SubTitle>
        <h2>캠핑 후기 수정</h2>
      </SubTitle>

      {loading ? (
        <Loading />
      ) : (
        <ReviewForm>
          <form onSubmit={onSubmit}>
            <Row>
              <p className="form_title">
                제목<span className="required">*</span>
              </p>
              <textarea
                required
                value={title}
                className="title"
                placeholder="제목을 입력해주세요."
                onChange={onChangeTitle}
              />
            </Row>
            <Row>
              <p className="form_title">
                캠핑장<span className="required">*</span>
              </p>
              {selectReview.length > 0 && (
                <CampingSelect
                  onSelectCamping={selectCamping}
                  onSelectRegion={onSelectRegion}
                  onSelectSubRegion={onSelectSubRegion}
                  editRegion={selectReview[0].region}
                  editSubRegion={selectReview[0].subRegion}
                  editCampingName={selectReview[0].facltNm}
                />
              )}
            </Row>
            <Row>
              <p className="form_title">
                내용<span className="required">*</span>
              </p>
              <textarea
                spellCheck="false"
                required
                value={contents}
                onChange={(e) => {
                  setContents(e.target.value);
                }}
              />
            </Row>
            <Row>
              <p className="form_title">사진 첨부</p>
              <UploadImage
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                editImages={editImages}
                onDeleteImage={(updatedImages) => {
                  setEditImages(updatedImages);
                }}
              />
            </Row>
            <Row>
              <Button
                className="cancel_btn"
                type="button"
                onClick={() => {
                  router.back();
                }}
              >
                취소하기
              </Button>
              <Button type="submit">수정하기</Button>
            </Row>
          </form>
        </ReviewForm>
      )}

      {/* 캠핑장 미선택시 alert */}
      {currentModal === "alertCampinName" && (
        <Modal
          currentModal={currentModal}
          hide={closeModal}
          message="캠핑장은 필수 선택입니다."
        />
      )}
    </Wrap>
  );
}
