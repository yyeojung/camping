import { responsive } from "@/commons/styles/globalStyles";
import styled from "@emotion/styled";
import ReviewForm from "./reviewForm";
import { type ChangeEvent, useState } from "react";
import CampingSelect from "../page/reviewRegister/campingSelect";
import UploadImage from "../page/reviewRegister/uploadImage";
import Button from "../button";

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

  textarea {
    width: calc(100% - 18.4rem);
    background: #f2f2f2;
    border: 0.1rem solid #ccc;
    border-radius: 1rem;
    height: 30rem;

    &:focus {
      border: 0.1rem solid #67794a;
    }
  }

  textarea.title {
    height: 4rem;
    overflow: hidden;
    min-height: 4rem;
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
interface IPropsFormData {
  onSubmit: React.FormEvent<HTMLFormElement>;
}
export default function FormRegisterEdit({ onSubmit }: IPropsFormData) {
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File[]>([]); // 스토리지에 저장될 이미지
  const router = useRoute();

  // 스토리지에 저장될 이미지
  const onStorageImage = (files: File[]) => {
    setSelectedImage((prev) => [...prev, ...files]);
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

  return (
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
          {/* <CampingSelect onSelectCamping={selectCamping} /> */}
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
  );
}
