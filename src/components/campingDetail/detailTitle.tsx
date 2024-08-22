import { FaRegCopy } from "react-icons/fa6";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Modal } from "@/components/modal";
import styled from "@emotion/styled";
import { useSelected } from "@/contexts/selectedContext";
import { useModal } from "@/hooks/useModal";
import DetailTitleIcon from "./detailTitleIcon";
import { responsive } from "@/commons/styles/globalStyles";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { likeState } from "@/firebase/likeList";

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.4rem;

  ul li {
    display: flex;
    align-items: center;

    button {
      display: flex;
      align-items: center;
      color: #545151;
      span {
        font-size: 1.4rem;
      }
    }

    strong {
      font-size: 2.4rem;

      @media ${responsive.mobile} {
        font-size: 1.8rem;
      }
    }
  }
  li ~ li {
    margin-top: 0.6rem;
  }
`;

export default function DetailTitle() {
  const [likeList, setLikeList] = useState<string[]>([]);
  const { selectedCamping } = useSelected();
  const { currentModal, openModal, closeModal } = useModal();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const router = useRouter();

  const isMounted = useRef(true);

  if (!selectedCamping) {
    return null;
  }
  useEffect(() => {
    isMounted.current = true;
    if (user) {
      const unsubscribe = likeState(user.uid, (updatedLikes) => {
        setLikeList(updatedLikes);
      });

      // 컴포넌트 언마운트 시 구독 해제
      return () => {
        isMounted.current = false;
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, []);
  const onClickLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) {
      openModal("likeAlert");
    }
  };

  const closeLikeModal = () => {
    router.back();
    setTimeout(() => {
      void router.push("/login");
    }, 100);
  };

  const isLiked = likeList.includes(selectedCamping.contentId);
  return (
    <>
      <Title>
        <ul>
          <li>
            <strong>{selectedCamping?.facltNm}</strong>
          </li>
          <li>
            <CopyToClipboard
              text={selectedCamping?.addr1 ?? ""}
              onCopy={() => {
                openModal("copy");
              }}
            >
              <button className="address">
                <span>{selectedCamping?.addr1}</span>
                <FaRegCopy style={{ marginLeft: ".4rem" }} />
              </button>
            </CopyToClipboard>
          </li>
        </ul>
        {!isMobile ? (
          <DetailTitleIcon
            onClick={onClickLike}
            campingItem={selectedCamping}
            like={isLiked}
          />
        ) : null}
      </Title>

      {/* 주소가 복사되었습니다 alert */}
      {currentModal === "copy" && (
        <Modal
          currentModal={currentModal}
          hide={closeModal}
          message="주소가 복사되었습니다"
        />
      )}
      {/* 로그인 창으로 이동합니다. alert */}
      {currentModal === "likeAlert" && (
        <Modal
          currentModal={currentModal}
          hide={closeLikeModal}
          message="로그인 창으로 이동합니다."
        />
      )}
    </>
  );
}
