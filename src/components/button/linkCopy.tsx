import styled from "@emotion/styled";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaLink } from "react-icons/fa6";
import { Modal } from "../modal";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/router";

const LinkCopyBtn = styled.button`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;

  svg {
    fill: #545151;
    width: 2rem;
    height: 2.4rem;
  }
`;
export default function LinkCopy() {
  const router = useRouter();
  const { isShowing, modalToggle } = useModal();

  // 현재 링크 주소
  const currentUrl = `${window.location.origin}${router.asPath}`;

  return (
    <>
      <CopyToClipboard text={currentUrl} onCopy={modalToggle}>
        <LinkCopyBtn>
          <FaLink />
        </LinkCopyBtn>
      </CopyToClipboard>
      {/* 링크가 복사되었습니다 alert */}
      <Modal
        isShowing={isShowing}
        hide={modalToggle}
        message="링크가 복사되었습니다"
      />
    </>
  );
}
