import SubContents from "@/commons/layout/subContents";
import SubTitle from "@/commons/layout/subTitle";
import { Row, Wrap } from "@/commons/styles/reviewForm/reviewForm";
import Button from "@/components/button";
import Loading from "@/components/Loading";
import { Modal } from "@/components/modal";
import NoData from "@/components/noData";
import CampingSelect from "@/components/page/reviewRegister/campingSelect";
import UploadImage from "@/components/page/reviewRegister/uploadImage";
import ReviewForm from "@/components/reviewForm/reviewForm";
import { useAuth } from "@/contexts/authContext";
import { storage } from "@/firebase/firebase";
import { addReview } from "@/firebase/review";
import { useModal } from "@/hooks/useModal";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
import { type ChangeEvent, useState } from "react";

export default function ReviewRegister() {
  const { user } = useAuth();
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File[]>([]); // 스토리지에 저장될 이미지
  const [dbContentId, setDbContentId] = useState<string>("");
  const [dbFacltNm, setDbFacltNm] = useState<string>("");
  const router = useRouter();
  const { currentModal, openModal, closeModal } = useModal();
  const [loading, setLoading] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedSubRegion, setSelectedSubRegion] = useState<string>("");

  // 스토리지에 저장될 이미지
  //   const onStorageImage = (files: File[]) => {
  //     setSelectedImage((prev) => [...prev, ...files]);
  //   };

  // 리뷰 등록 submit
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    if (!dbFacltNm) {
      openModal("alertCampinName");
      return;
    }

    const imageUpload = async () => {
      if (selectedImage === null) return;

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

    // 유저 이메일
    const userEmail = user?.email ? user.email.split("@") : [""];

    try {
      setLoading(true);
      const uploadedUrls = await imageUpload(); // 이미지 업로드 후 URL 받아오기
      const reviewItem = {
        title,
        contents,
        region: selectedRegion,
        subRegion: selectedSubRegion,
        contentId: dbContentId,
        facltNm: dbFacltNm,
        userId: user.uid,
        createdAt: new Date(),
        writer: userEmail[0],
        images: uploadedUrls ?? null,
      };
      await addReview(reviewItem, user.uid);
      setLoading(false);
      void router.push("/campingReview");
    } catch (error) {
      console.log(error);
    }
  };

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
        <h2>요즘 캠핑 후기 등록</h2>
      </SubTitle>

      {user ? (
        <>
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
                <CampingSelect
                  onSelectCamping={selectCamping}
                  onSelectRegion={onSelectRegion}
                  onSelectSubRegion={onSelectSubRegion}
                />
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
                <Button type="submit">등록하기</Button>
              </Row>
            </form>
          </ReviewForm>
          {loading ? (
            <div className="loading_wrap">
              <Loading />
            </div>
          ) : null}
        </>
      ) : (
        <SubContents>
          <NoData>
            <p>로그인 후 이용이 가능합니다.</p>
          </NoData>
        </SubContents>
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
