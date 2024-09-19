import SubContents from "@/commons/layout/subContents";
import SubTitle from "@/commons/layout/subTitle";
import { responsive } from "@/commons/styles/globalStyles";
import Button from "@/components/button";
import Loading from "@/components/Loading";
import { Modal } from "@/components/modal";
import NoData from "@/components/noData";
import CampingSelect from "@/components/page/reviewRegister/campingSelect";
import UploadImage from "@/components/page/reviewRegister/uploadImage";
import ReviewForm from "@/components/reviewForm/ReviewForm";
import { useAuth } from "@/contexts/authContext";
import { storage } from "@/firebase/firebase";
import { addReview } from "@/firebase/review";
import { useModal } from "@/hooks/useModal";
import styled from "@emotion/styled";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
import { useState } from "react";

const Wrap = styled.div`
  h2 {
    text-align: center;
  }

  .loading_wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 10;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 2.4rem;

  &:not(:first-of-type) {
    margin-top: 1.6rem;
  }

  &:last-of-type {
    justify-content: flex-end;
    gap: 1rem;

    .cancel_btn {
      background: #f2f2f2;
      color: #8d8d8d;
      border-color: #8d8d8d;
    }
  }

  .form_title {
    min-width: 12rem;
    line-height: 4rem;
    text-align: center;
  }

  input,
  textarea {
    width: calc(100% - 18.4rem);
    background: #f2f2f2;
    border: 0.1rem solid #ccc;
    border-radius: 1rem;

    &:focus {
      border: 0.1rem solid #67794a;
    }
  }

  textarea {
    height: 30rem;
  }

  @media ${responsive.mobile} {
    flex-direction: column;
    min-width: 10rem;
    gap: 0;

    .form_title {
      text-align: left;
    }

    input,
    textarea {
      width: 100%;
    }
  }
`;

export default function ReviewResigter() {
  const { user } = useAuth();
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File[]>([]); // 스토리지에 저장될 이미지
  const [dbContentId, setDbContentId] = useState<string>("");
  const [dbFacltNm, setDbFacltNm] = useState<string>("");
  const router = useRouter();
  const { currentModal, openModal, closeModal } = useModal();
  const [loading, setLoading] = useState(false);

  // 스토리지에 저장될 이미지
  const onStorageImage = (files: File[]) => {
    setSelectedImage((prev) => [...prev, ...files]);
  };

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
        const imageRef = ref(storage, `review/${image.name}`);
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
                <input
                  required
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </Row>
              <Row>
                <p className="form_title">
                  캠핑장<span className="required">*</span>
                </p>
                <CampingSelect onSelectCamping={selectCamping} />
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
                <UploadImage onImageSelected={onStorageImage} />
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
