import styled from "@emotion/styled";
import LinkCopy from "@/components/button/linkCopy";
import LikeBtn from "../likeBtn/index";
import { type ICampingList } from "@/commons/type/commonType";

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
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  campingItem: ICampingList;
  like: boolean;
}
export default function DetailTitleIcon({
  className,
  onClick,
  campingItem,
  like,
}: IPropsDetailIcon) {
  return (
    <IconWrap className={className}>
      <LinkCopy />
      <LikeBtn
        className="like"
        onClick={onClick}
        campingItem={campingItem}
        like={like}
      />
    </IconWrap>
  );
}
