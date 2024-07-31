import styled from "@emotion/styled";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { responsive } from "@/commons/styles/globalStyles";

const ModalCloseBtn = styled.button`
  background: transparent;
  width: 3.2rem;
  height: 3.2rem;
  position: absolute;
  top: 2rem;
  right: 2rem;

  .pc {
    display: block;
  }
  .mobile {
    display: none;
  }
  @media ${responsive.mobile} {
    left: 2rem;
    .pc {
      display: none;
    }
    .mobile {
      display: block;
    }
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;
export default function ModalClose({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <ModalCloseBtn className={className} onClick={onClick}>
      <IoCloseOutline className="pc" />
      <IoIosArrowBack className="mobile" />
      <span className="sr_only">닫기</span>
    </ModalCloseBtn>
  );
}
