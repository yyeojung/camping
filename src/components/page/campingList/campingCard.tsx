import styled from "@emotion/styled";
import { LocationIcon } from "./locationIcon";
import { BsImage } from "react-icons/bs";
import { type ICampingList } from "@/commons/type/commonType";
import LikeBtn from "../../likeBtn/index";
import { Modal } from "../../modal";
import { useModal } from "@/hooks/useModal";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { likeState } from "@/firebase/likeList";

const CardWrap = styled.div`
  cursor: pointer;
  background: #f8f8f8;
  border-radius: 1.5rem;
  box-shadow: 0 1rem 2rem 0 rgba(0, 0, 0, 0.1);

  &:hover {
    transition: 0.3s all;
    transform: translate(-0.6rem, -0.6rem);
    box-shadow: 0 1rem 2rem 0 rgba(0, 0, 0, 0.2);
  }
`;
const CardInner = styled.div`
  background: #fff;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 0.4rem 2rem 0 rgba(0, 0, 0, 0.1);
`;
const ImgBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ccc;
  height: 18rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .like {
    position: absolute;
    right: 1.6rem;
    bottom: -1rem;
  }
`;
const CardInfo = styled.div`
  padding: 1.4rem 1.2rem 2.4rem 1.2rem;
  min-height: 14.8rem;

  li {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    min-height: 1.6rem;
    font-size: 1.4rem;
    strong {
      font-size: 1.8rem;
    }
  }
  li.address {
    margin-top: 2rem;
    color: #4a7b33;
  }
  li ~ li {
    margin-top: 1rem;
  }
`;

const IConWrap = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.2rem;

  li {
    flex: 1;
    display: flex;
    min-height: 3.2rem;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  li ~ li {
    border-left: 0.1rem solid #a9a9a9;
  }
`;

interface IPropsCampingList {
  list: ICampingList[];
  className?: string;
  onClick: (item: ICampingList) => void;
}

export default function CampingCard({
  list,
  className,
  onClick,
}: IPropsCampingList) {
  const [likeList, setLikeList] = useState<
    Array<{ contentId: string; docId: string }>
  >([]);
  const { currentModal, openModal } = useModal();
  const router = useRouter();
  const { user } = useAuth();

  const isMounted = useRef(true);

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

  return (
    <>
      {list.map((item: ICampingList) => {
        // 입지 구분 아이콘 리스트
        const icons = item.lctCl ? item.lctCl.split(",") : [];
        const iconList = icons
          .slice(0, 3)
          .concat(
            Array(3 - icons.length > 0 ? 3 - icons.length : 0).fill("없음"),
          );

        // 좋아요 리스트에서 contentId가 캠핑장 contentId하고 같으면 문서의 id를 반환
        const key =
          likeList.find((like) => like.contentId === item.contentId)?.docId ??
          item.contentId;
        // 좋아요 리스트의 contetnId와 캠핑장 contetnId가 같으면 true 반환
        const isLiked = likeList.some(
          (like) => like.contentId === item.contentId,
        );
        return (
          <CardWrap
            key={item.contentId}
            className={className}
            onClick={() => {
              onClick(item);
            }}
          >
            <CardInner>
              <ImgBox>
                <LikeBtn
                  className="like"
                  onClick={onClickLike}
                  campingItem={item}
                  like={isLiked}
                  docId={key}
                />
                {item.firstImageUrl ? (
                  <img src={item.firstImageUrl} alt={item.facltNm} />
                ) : (
                  <BsImage size="48" color="#6e6e6e" />
                )}
              </ImgBox>
              <CardInfo>
                <li>
                  <strong>{item.facltNm}</strong>
                </li>
                <li>
                  {item.lineIntro
                    ? item.lineIntro
                    : item.themaEnvrnCl
                      ? item.themaEnvrnCl
                      : "-"}
                </li>
                <li className="address">{item.addr1}</li>
                <li>{item.tel ? item.tel : "-"}</li>
              </CardInfo>
            </CardInner>
            <IConWrap>
              {iconList.map((icon, index) => (
                <li key={index}>
                  <LocationIcon type={icon} />
                </li>
              ))}
            </IConWrap>
          </CardWrap>
        );
      })}

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
