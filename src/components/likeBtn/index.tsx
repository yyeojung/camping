import { type ICampingList } from "@/commons/type/commonType";
import { useAuth } from "@/contexts/authContext";
import { addLike, removeLike } from "@/firebase/likeList";
import styled from "@emotion/styled";

interface BtnWrapProps {
  like: boolean;
}
const BtnWrap = styled.button<BtnWrapProps>`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0.2rem 0.2rem 0.8rem 0.2rem rgba(0, 0, 0, 0.15);

  i {
    width: 2.4rem;
    height: 2.4rem;
    display: block;
    background: ${(props) =>
      props.like
        ? `url(/image/icon/icon_like.svg)`
        : `url(/image/icon/icon_like_gray.svg)`};
  }
`;

interface LikeBtnProps {
  className?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  campingItem: ICampingList;
  like: boolean;
}

export default function LikeBtn({
  className,
  onClick,
  campingItem,
  like,
}: LikeBtnProps) {
  const { user } = useAuth();

  const onClickLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!user) {
      onClick(e);
    } else {
      if (!like) {
        void addLike(campingItem, user.uid);
      } else {
        void removeLike(user.uid, campingItem.contentId);
      }
    }
  };

  return (
    <>
      <BtnWrap onClick={onClickLike} className={className} like={like}>
        <i>
          {like ? (
            <span className="sr_only">선호캠핑장</span>
          ) : (
            <span className="sr_only">비선호캠핑장</span>
          )}
        </i>
      </BtnWrap>
    </>
  );
}
