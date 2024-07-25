import styled from "@emotion/styled";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Wrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const LoadingIcon = styled(AiOutlineLoading3Quarters)`
  width: 10rem;
  height: 10rem;
  fill: #b3e2b5;
  animation: loading 1s linear infinite;

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default function Loading() {
  return (
    <Wrap>
      <LoadingIcon />
    </Wrap>
  );
}
