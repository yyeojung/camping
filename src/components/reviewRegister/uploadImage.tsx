import { useModal } from "@/hooks/useModal";
import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { Modal } from "../modal";
import { IoIosClose } from "react-icons/io";

const Wrap = styled.div`
  input {
    display: none;
  }

  .guide {
    font-size: 1.4rem;
    margin-top: 1rem;
    color: #dc5353;
  }
`;

const ImageWrap = styled.div`
  display: flex;
  gap: 0.8rem;

  .upload_btn {
    width: 5.4rem;
    height: 5.4rem;
    background: #f6f6f6;
    border: 0.1rem solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      stroke: #8d8c8c;
      width: 2rem;
      height: 2rem;
    }
  }

  .image_list {
    display: flex;
    gap: 0.4rem;

    li {
      width: 5.4rem;
      height: 5.4rem;
      border-radius: 0.8rem;
      border: 0.1rem solid #ccc;
      overflow: hidden;
      position: relative;

      .delete_image {
        width: 1.6rem;
        height: 1.6rem;
        background: #fff;
        border: 0.1rem solid #ccc;
        border-radius: 50%;
        top: 0.2rem;
        right: 0.2rem;
        display: flex;
        align-items: center;
        position: absolute;

        &:hover {
          background: #dae3ca;
        }

        svg {
          fill: #767676;
        }
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

interface IPropsImageUpload {
  onImageSelected: (files: File[]) => void; // 이미지 파일 상태
}
export default function UploadImage({ onImageSelected }: IPropsImageUpload) {
  const [postImg, setPostImg] = useState<string[]>([]); // 이미지 미리보기 상태
  const fileEl = useRef<HTMLInputElement>(null);
  const { currentModal, openModal, closeModal } = useModal();

  const encodeFileToBase = async (fileList: File[]) => {
    const encodingFiles = fileList.map(async (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return await new Promise((resolve) => {
        reader.onload = () => {
          resolve(reader.result);
        };
      });
    });

    const convertFiles = await Promise.all(encodingFiles);
    setPostImg([...postImg, ...convertFiles] as string[]);
  };

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      if (postImg.length + selectedFiles.length > 6) {
        openModal("registerImage");
        return;
      }

      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("file", file);
      });

      void encodeFileToBase(selectedFiles);

      onImageSelected(selectedFiles);
    }
  };

  const onClickDeleteImage = (index: number) => {
    const deleteImage = [...postImg];
    deleteImage.splice(index, 1);
    setPostImg(deleteImage);
  };
  return (
    <Wrap>
      <input
        type="file"
        accept="image/*"
        ref={fileEl}
        name="reviewImage"
        id="reviewImage"
        multiple
        onChange={onChangeImage}
      />
      <ImageWrap>
        <button
          className="upload_btn"
          type="button"
          onClick={() => fileEl.current?.click()}
        >
          <span className="sr_only">파일 업로드</span>
          <LuPlus />
        </button>
        <ul className="image_list">
          {postImg.map((imgSrc, i) => (
            <li key={i}>
              <button
                type="button"
                className="delete_image"
                onClick={() => {
                  onClickDeleteImage(i);
                }}
              >
                <IoIosClose />
                <span className="sr_only">이미지 제거</span>
              </button>
              <img src={imgSrc} alt={`imagePreview${i}`} />
            </li>
          ))}
        </ul>
      </ImageWrap>
      <p className="guide">최대 6개의 이미지만 선택 가능합니다.</p>

      {/* 내캠핑장 로그인 alert */}
      {currentModal === "registerImage" && (
        <Modal
          currentModal={currentModal}
          hide={closeModal}
          message="최대 6개의 이미지만 선택 가능합니다."
        />
      )}
    </Wrap>
  );
}
