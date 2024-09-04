import SubTitle from "@/commons/layout/subTitle";
import { responsive } from "@/commons/styles/globalStyles";
import Button from "@/components/button";
import UploadImage from "@/components/reviewRegister/uploadImage";
import { useAuth } from "@/contexts/authContext";
import { storage } from "@/firebase/firebase";
import { addReview } from "@/firebase/review";
import styled from "@emotion/styled";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

const Wrap = styled.div`
  h2 {
    text-align: center;
  }
`;
const RegisterForm = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 3rem;
  border: 0.1rem solid #ccc;
  padding: 4rem 8rem;
  margin-top: 4rem;

  .required {
    color: #eb3737;
    font-weight: 800;
    padding-left: 0.6rem;
  }

  @media ${responsive.mobile} {
    padding: 4rem 1.6rem;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 2.4rem;

  &:not(:first-of-type) {
    margin-top: 1.6rem;
  }

  .form_title {
    min-width: 12rem;
    line-height: 4rem;
    text-align: center;
  }

  input,
  textarea {
    width: calc(100% - 18.4rem);
    background: #f6f6f6;
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

  const onStorageImage = (files: File[]) => {
    setSelectedImage(files);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

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

    try {
      const uploadedUrls = await imageUpload(); // 이미지 업로드 후 URL 받아오기
      const reviewItem = {
        title,
        contents,
        userId: user.uid,
        images: uploadedUrls,
      };
      await addReview(reviewItem, user.uid);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrap>
      <SubTitle>
        <h2>요즘 캠핑 후기 등록</h2>
      </SubTitle>
      <RegisterForm>
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
          </Row>
          <Row>
            <p className="form_title">
              내용<span className="required">*</span>
            </p>
            <textarea
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
          <Button type="submit">등록하기</Button>
        </form>
      </RegisterForm>
    </Wrap>
  );
}
