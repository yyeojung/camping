import { useModal } from "@/hooks/useModal";
import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { Modal } from "../../modal";
import { IoIosClose } from "react-icons/io";
import { deleteImageStorage } from "@/firebase/review";

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
    background: #f2f2f2;
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
        object-fit: cover;
      }
    }
  }
`;

interface IPropsImageUpload {
  selectedImage: File[]; // 부모 컴포넌트에 넘겨주는 이미지 파일  리스트
  setSelectedImage: React.Dispatch<React.SetStateAction<File[]>>;
  editImages?: string[];
  onDeleteImage?: (updatedImages: string[]) => void;
}
export default function UploadImage({
  selectedImage,
  setSelectedImage,
  editImages,
  onDeleteImage,
}: IPropsImageUpload) {
  const [postImg, setPostImg] = useState<string[]>(editImages ?? []); // 이미지 미리보기 상태
  const fileEl = useRef<HTMLInputElement>(null); // 파일 input에 접근하는 useRef
  const { currentModal, openModal, closeModal } = useModal();

  // 파일들을 Base64로 변환하는 함수
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
    const filterImage = convertFiles.filter(
      (file) => !postImg.includes(file as string),
    ); // 중복이미지 제외시키기 위해 추가
    setPostImg([...postImg, ...filterImage] as string[]);
  };

  // input 파일 onChange 이벤트
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files); // 선택 파일들을 배열로 변환

      if (postImg.length + selectedFiles.length > 2) {
        // 이미지가 2개 초과이면 경고창
        openModal("registerImage");
        return;
      }

      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("file", file);
      });

      void encodeFileToBase(selectedFiles); // 선택된 파일들을 Base64로 변환하여 미리보기에 저장
      setSelectedImage((prev) => [...prev, ...selectedFiles]); // 선택된 이미지 업데이트

      // input 초기화
      if (fileEl.current) {
        fileEl.current.value = "";
      }
    }
  };

  // 이미지 삭제 이벤트
  const onClickDeleteImage = (index: number) => {
    const deleteImage = [...postImg];
    const deleteItem = deleteImage.splice(index, 1)[0]; // 삭제 이미지
    const updateSelectedImg = selectedImage.filter((_, idx) => idx !== index);

    // 수정화면 시 스토리지에서 삭제
    if (editImages?.includes(deleteItem)) {
      void deleteImageStorage(deleteItem);
    }
    // 부모 컴포넌트에 업데이트된 postImg 전달
    if (onDeleteImage) {
      onDeleteImage(deleteImage);
    }
    setPostImg(deleteImage);

    setSelectedImage(updateSelectedImg);
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
          onClick={() => fileEl.current?.click()} // input file 참조
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
      <p className="guide">최대 2개의 이미지만 선택 가능합니다.</p>

      {/* 내캠핑장 로그인 alert */}
      {currentModal === "registerImage" && (
        <Modal
          currentModal={currentModal}
          hide={closeModal}
          message="최대 2개의 이미지만 선택 가능합니다."
        />
      )}
    </Wrap>
  );
}
