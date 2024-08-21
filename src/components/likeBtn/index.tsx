import styled from "@emotion/styled";
import { useState } from "react";

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

export default function LikeBtn({ className }: { className?: string }) {
  const [like, setLike] = useState<boolean>(false);

  const onClickLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setLike((prev) => !prev);
  };
  return (
    <BtnWrap onClick={onClickLike} className={className} like={like}>
      <i>
        {like ? (
          <span className="sr_only">선호캠핑장</span>
        ) : (
          <span className="sr_only">비선호캠핑장</span>
        )}
      </i>
    </BtnWrap>
  );
}
