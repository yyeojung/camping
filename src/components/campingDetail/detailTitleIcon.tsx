import styled from "@emotion/styled";
import LinkCopy from "@/components/button/linkCopy";
import LikeBtn from "@/components/likeBtn";

const IconWrap = styled.div`
  display: flex;
  gap: 0.8rem;

  button {
    border: 0.1rem solid #cacaca;
    &:hover {
      box-shadow: 0.2rem 0.2rem 0.8rem 0.2rem rgba(0, 0, 0, 0.1);
    }
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
