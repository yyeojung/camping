import { useIsMobile } from "@/commons/responsive/useMediaQuery";
import { FaRegCopy } from "react-icons/fa6";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Modal } from "@/components/modal";
import styled from "@emotion/styled";
import { useSelected } from "@/contexts/selectedContext";
import { useModal } from "@/hooks/useModal";
import DetailTitleIcon from "./detailTitleIcon";
import { responsive } from "@/commons/styles/globalStyles";

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.4rem;

  ul li {
    display: flex;
    align-items: center;

    button {
      display: flex;
      align-items: center;
      color: #545151;
      span {
        font-size: 1.4rem;
      }
    }

    strong {
      font-size: 2.4rem;

      @media ${responsive.mobile} {
        font-size: 1.8rem;
      }
    }
  }
  li ~ li {
    margin-top: 0.6rem;
  }
`;

export default function DetailTitle() {
  const { selectedCamping } = useSelected();
  const { isShowing, modalToggle } = useModal();
  const isMobile = useIsMobile();

  return (
    <Title>
      <ul>
        <li>
          <strong>{selectedCamping?.facltNm}</strong>
        </li>
        <li>
          <CopyToClipboard
            text={selectedCamping?.addr1 ?? ""}
            onCopy={modalToggle}
          >
            <button className="address">
              <span>{selectedCamping?.addr1}</span>
              <FaRegCopy style={{ marginLeft: ".4rem" }} />
            </button>
          </CopyToClipboard>
        </li>
        {/* 주소가 복사되었습니다 alert */}
        <Modal
          isShowing={isShowing}
          hide={modalToggle}
          message="주소가 복사되었습니다"
        />
      </ul>
      {!isMobile ? <DetailTitleIcon /> : null}
    </Title>
  );
}
