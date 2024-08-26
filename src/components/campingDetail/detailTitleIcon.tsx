import styled from "@emotion/styled";
import LinkCopy from "@/components/button/linkCopy";
import LikeBtn from "../likeBtn/index";
import { useEffect, useRef, useState } from "react";
import { useSelected } from "@/contexts/selectedContext";
import { useModal } from "@/hooks/useModal";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/router";
import { Modal } from "../modal";
import { likeState } from "@/firebase/likeList";

const IconWrap = styled.div`
  display: flex;
  gap: 0.8rem;

  button {
    border: 0.1rem solid #cacaca;
  }
  .like {
    box-shadow: none;
  }
`;
interface IPropsDetailIcon {
  className?: string;
}
export default function DetailTitleIcon({ className }: IPropsDetailIcon) {
  const [likeList, setLikeList] = useState<
    Array<{ contentId: string; docId: string }>
  >([]);
  const { selectedCamping } = useSelected();
  const { currentModal, openModal } = useModal();
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

  const closeModal = () => {
    router.back();
    setTimeout(() => {
      void router.push("/login");
    }, 100);
  };

  const key =
    likeList.find((like) => like.contentId === selectedCamping.contentId)
      ?.docId ?? selectedCamping.contentId;
  const isLiked = likeList.some(
    (like) => like.contentId === selectedCamping.contentId,
  );
  return (
    <>
      <IconWrap className={className}>
        <LinkCopy />
        <LikeBtn
          className="like"
          onClick={onClickLike}
          campingItem={selectedCamping}
          like={isLiked}
          docId={key}
        />
      </IconWrap>

      {/* 로그인 창으로 이동합니다. alert */}
      {currentModal === "likeAlert" && (
        <Modal
          currentModal={currentModal}
          hide={closeModal}
          message="로그인 창으로 이동합니다."
        />
      )}
    </>
  );
}
