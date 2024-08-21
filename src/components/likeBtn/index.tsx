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

interface LikeBtnProps {
  className?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function LikeBtn({ className, onClick }: LikeBtnProps) {
  const [isLike, setIsLike] = useState<boolean>(false);
  const onClickLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setIsLike((prev) => !prev);

    onClick(e);
    // if (!user) {
    //   // 로그인 안한 상태면 로그인화면으로(모달창을 먼저 띄우려 했으나 user 호출이 여러번 되는 이슈로 뒤로 미룸.)
    //   void router.push("/login");
    // } else if (campingItem) {
    //     try {
    //         await addDoc(collection(db, "likeList"), {
    //           userId: user?.uid,
    //           like: true,
    //           campingItem: {
    //             facltNm: campingItem.facltNm,
    //             lineIntro: campingItem.lineIntro,
    //             intro: campingItem.intro,
    //             addr1: campingItem.addr1,
    //             firstImageUrl: campingItem.firstImageUrl,
    //             themaEnvrnCl: campingItem.themaEnvrnCl,
    //             tel: campingItem.tel,
    //             contentId: campingItem.contentId,
    //             lctCl: campingItem.lctCl,
    //             induty: campingItem.induty,
    //             doNm: campingItem.doNm,
    //             sigunguNm: campingItem.sigunguNm,
    //             direction: campingItem.direction,
    //             brazierCl: campingItem.brazierCl,
    //             sbrsCl: campingItem.sbrsCl,
    //             sbrsEtc: campingItem.sbrsEtc,
    //             homepage: campingItem.homepage,
    //             animalCmgCl: campingItem.animalCmgCl,
    //             tooltip: campingItem.tooltip,
    //             mapX: campingItem.mapX,
    //             mapY: campingItem.mapY,
    //           },
    //         });
    //         setIsLike(true);
    //     }catch (error) {
    //         console.log(error)
    //     }
    // }
  };

  return (
    <>
      <BtnWrap onClick={onClickLike} className={className} like={isLike}>
        <i>
          {isLike ? (
            <span className="sr_only">선호캠핑장</span>
          ) : (
            <span className="sr_only">비선호캠핑장</span>
          )}
        </i>
      </BtnWrap>
    </>
  );
}
