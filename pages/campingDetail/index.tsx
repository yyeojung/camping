import ImageDetailModal from "@/components/modal/campingDetail/imageDetailModal";
import { useSelected } from "@/contexts/selectedContext";
import { useModal } from "@/hooks/useModal";
import styled from "@emotion/styled";
import DetailTitle from "@/components/campingDetail/detailTitle";
import ImageDetail from "@/components/campingDetail/imageDetail";
import DetailInfo from "@/components/campingDetail/detailInfo";
import DetailTitleIcon from "@/components/campingDetail/detailTitleIcon";
import { responsive } from "@/commons/styles/globalStyles";
import { BsPatchCheck } from "react-icons/bs";
import DetailMap from "@/components/campingDetail/detailMap";
import { useIsMobile } from "@/hooks/useMediaQuery";

const Section = styled.section`
  padding-bottom: 4rem;

  .title {
    font-size: 2.4rem;
  }
  &:not(.first) {
    padding: 4rem 0;
  }
  &:not(:last-of-type) {
    border-bottom: 0.1rem solid #cacaca;
  }

  &.first {
    @media ${responsive.mobile} {
      padding-bottom: 2rem;
    }
    .mobile_icon {
      margin-top: 1rem;
    }
  }

  .intro {
    margin-top: 4rem;

    p {
      line-height: 1.5;
    }
  }
`;

const Tooltip = styled.div`
  background: #dae3ca;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  border-radius: 1rem;
  padding: 2rem 1.8rem;
  gap: 1rem;

  .icon,
  p {
    display: flex;
    align-items: center;
  }
  .icon {
    gap: 0.6rem;
    min-width: 8rem;
    width: 12%;

    svg {
      fill: #366446;
      width: 4rem;
      height: 4rem;
    }
    span {
      font-size: 2rem;
      font-weight: 700;
      color: #1a4d19;
    }
  }
  p {
    width: 88%;
    min-height: 6rem;
    background: #fff;
    border-radius: 1rem;
    padding: 1.2rem;
  }

  @media ${responsive.tablet} {
    flex-direction: column;
    p {
      width: 100%;
    }
  }
`;
export default function CampingDetail() {
  const { selectedCamping } = useSelected(); // 검색화면에서 선택한 캠핑장 데이터
  const isMobile = useIsMobile();

  const { currentModal, openModal, closeModal } = useModal();
  return (
    <>
      <Section className="first">
        <DetailTitle />
        <ImageDetail
          onClick={() => {
            openModal("imageModal");
          }}
        />
        {isMobile ? <DetailTitleIcon className="mobile_icon" /> : null}
      </Section>
      <Section>
        <DetailInfo />
        {selectedCamping?.lineIntro ?? selectedCamping?.intro ? (
          <div className="intro">
            <p>
              {selectedCamping?.lineIntro ? selectedCamping?.lineIntro : null}
            </p>
            <p>{selectedCamping?.intro ? selectedCamping?.intro : null}</p>
          </div>
        ) : null}
        {selectedCamping?.tooltip ? (
          <Tooltip>
            <div className="icon">
              <BsPatchCheck />
              <span>Tip!</span>
            </div>
            <p>{selectedCamping?.tooltip}</p>
          </Tooltip>
        ) : null}
      </Section>
      <Section>
        <h2 className="title">오시는 길</h2>
        <DetailMap />
        <p>{selectedCamping?.direction ? selectedCamping?.direction : null}</p>
      </Section>
      <Section>
        {/* <DetailReview contentId={selectedCamping?.contentId} /> */}
      </Section>
      {/* 이미지 전체 모달 */}
      {currentModal === "imageModal" && (
        <ImageDetailModal currentModal={currentModal} hide={closeModal} />
      )}
    </>
  );
}
