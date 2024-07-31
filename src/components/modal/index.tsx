import styled from "@emotion/styled";
import ReactDOM from "react-dom";
import Button from "../button";
import { IoAlertCircleOutline } from "react-icons/io5";
import { responsive } from "@/commons/styles/globalStyles";
import { useEffect, type ReactNode } from "react";
import ModalClose from "../button/modalClose";

const Wrap = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
`;
const ModalInner = styled.div<{
  customStyle?: React.CSSProperties;
  mobileStyle?: React.CSSProperties;
}>`
  position: relative;
  padding: 3rem 4rem 2rem;
  min-width: 40rem;
  min-height: 20rem;
  margin: auto;
  background-color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 2rem;
  text-align: center;
  box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.2);
  ${({ customStyle }) => customStyle && { ...customStyle }}

  @media ${responsive.mobile} {
    width: calc(100% - 3.2rem);
    ${({ mobileStyle }) => mobileStyle && { ...mobileStyle }}
  }

  p {
    margin-top: 1rem;
  }
`;

const AlertIcon = styled(IoAlertCircleOutline)`
  width: 4.4rem;
  height: 4.4rem;
  stroke: #67794a;
  fill: #67794a;
`;

interface IPropsModal {
  isShowing: boolean;
  hide: () => void;
  message?: string;
  children?: ReactNode;
  customStyle?: React.CSSProperties;
  mobileStyle?: React.CSSProperties;
}

export function Modal({
  isShowing,
  hide,
  message,
  children,
  customStyle,
  mobileStyle,
}: IPropsModal) {
  useEffect(() => {
    // const closeModal = (event: KeyboardEvent | PopStateEvent) => { esc 눌러도 모달창 닫기, 굳이 필요없을것 같아서 삭제
    //   if ('key' in event && event.key === "Escape") {
    //     hide();
    //   } else if (event instanceof PopStateEvent) {
    //     hide();
    //   }
    // };
    const closeModal = (event: PopStateEvent) => {
      hide();
    };

    if (isShowing) {
      document.body.style.overflow = "hidden";
      history.pushState(null, document.title);
      //   document.addEventListener("keyup", closeModal);
      window.addEventListener("popstate", closeModal);
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("popstate", closeModal);
    }
  }, []);
  return isShowing
    ? ReactDOM.createPortal(
        <Wrap onClick={hide}>
          <ModalInner
            customStyle={customStyle}
            mobileStyle={mobileStyle}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
            }}
          >
            {message ? (
              <>
                <div>
                  <AlertIcon />
                  <p>{message}</p>
                </div>
                <Button onClick={hide}>닫기</Button>
              </>
            ) : (
              <>
                <ModalClose onClick={hide} />
                {children}
              </>
            )}
          </ModalInner>
        </Wrap>,
        document.body,
      )
    : null;
}
