import styled from "@emotion/styled";
import { Modal } from "./";

const Wrap = styled.div`
  background: red;
  width: 100%;
  height: 100%;
`;
interface IPropsModal {
  isShowing: boolean;
  hide: () => void;
}
export default function ImageDetailModal({ isShowing, hide }: IPropsModal) {
  return (
    <Modal isShowing={isShowing} hide={hide}>
      <Wrap>이미지 모달이다 모달이야 모달아어요</Wrap>;
    </Modal>
  );
}
