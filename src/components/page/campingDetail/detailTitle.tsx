import { FaRegCopy } from "react-icons/fa6";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Modal } from "@/components/modal";
import styled from "@emotion/styled";
import { useModal } from "@/hooks/useModal";
import DetailTitleIcon from "./detailTitleIcon";
import { responsive } from "@/commons/styles/globalStyles";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useCampingData } from "@/hooks/useCampingData";

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4rem;

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
  //   const { selectedCamping } = useSelected();
  const { selectedData } = useCampingData(); // 검색화면에서 넘겨주는게 아닌 쿼리에 맞는 데이터 가져오기

  const { currentModal, openModal, closeModal } = useModal();
  const isMobile = useIsMobile();

  return (
    <>
      <Title>
        <ul>
          <li>
            <strong>{selectedData?.facltNm}</strong>
          </li>
          <li>
            <CopyToClipboard
              text={selectedData?.addr1 ?? ""}
              onCopy={() => {
                openModal("copy");
              }}
            >
              <button className="address">
                <span>{selectedData?.addr1}</span>
                <FaRegCopy style={{ marginLeft: ".4rem" }} />
              </button>
            </CopyToClipboard>
          </li>
        </ul>

        {!isMobile ? <DetailTitleIcon /> : null}
      </Title>

      {/* 주소가 복사되었습니다 alert */}
      {currentModal === "copy" && (
        <Modal
          currentModal={currentModal}
          hide={closeModal}
          message="주소가 복사되었습니다"
        />
      )}
    </>
  );
}
