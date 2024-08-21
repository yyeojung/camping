import styled from "@emotion/styled";
import LinkCopy from "@/components/button/linkCopy";
import LikeBtn from "../likeBtn/index";

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

export default function DetailTitleIcon({ className }: { className?: string }) {
  const temporary = () => {
    console.log("임시");
  };
  return (
    <IconWrap className={className}>
      <LinkCopy />
      <LikeBtn className="like" onClick={temporary} />
    </IconWrap>
  );
}
