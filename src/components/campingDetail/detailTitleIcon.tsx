import styled from "@emotion/styled";
import LinkCopy from "@/components/button/linkCopy";
import LikeBtn from "@/components/likeBtn";

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
  return (
    <IconWrap className={className}>
      <LinkCopy />
      <LikeBtn className="like" />
    </IconWrap>
  );
}
