import styled from "@emotion/styled";
import LinkCopy from "@/components/button/linkCopy";
import LikeBtn from "../../likeBtn/index";
import { useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/router";
import { Modal } from "../../modal";
import { likeState } from "@/firebase/likeList";
import { useCampingData } from "@/hooks/useCampingData";

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
  //   const { selectedCamping } = useSelected();
  const { selectedData } = useCampingData(); // 검색화면에서 넘겨주는게 아닌 쿼리에 맞는 데이터 가져오기

  const { currentModal, openModal } = useModal();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!selectedData || !user) return; // 조건 체크

    let isMounted = true;
    if (user) {
      const unsubscribe = likeState(user.uid, (updatedLikes) => {
        if (isMounted) {
          setLikeList(updatedLikes); // 마운트된 상태에서만 업데이트
        }
      });

      // 컴포넌트 언마운트 시 구독 해제
      return () => {
        isMounted = false;
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [user, selectedData]);

  if (!selectedData) {
    return null;
  }

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
    likeList.find((like) => like.contentId === selectedData.contentId)?.docId ??
    selectedData.contentId;
  const isLiked = likeList.some(
    (like) => like.contentId === selectedData.contentId,
  );
  return (
    <>
      <IconWrap className={className}>
        <LinkCopy />
        <LikeBtn
          className="like"
          onClick={onClickLike}
          campingItem={selectedData}
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
