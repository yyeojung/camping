import ImageDetailModal from "@/components/modal/campingDetail/imageDetailModal";
import { useModal } from "@/hooks/useModal";
import styled from "@emotion/styled";
import DetailTitle from "@/components/page/campingDetail/detailTitle";
import ImageDetail from "@/components/page/campingDetail/imageDetail";
import DetailInfo from "@/components/page/campingDetail/detailInfo";
import DetailTitleIcon from "@/components/page/campingDetail/detailTitleIcon";
import { responsive } from "@/commons/styles/globalStyles";
import { BsPatchCheck } from "react-icons/bs";
import DetailMap from "@/components/page/campingDetail/detailMap";
import { useIsMobile } from "@/hooks/useMediaQuery";
import DetailReview from "@/components/page/campingDetail/detailReview";
import { useCampingData } from "@/hooks/useCampingData";
import Loading from "@/components/Loading";
import SubContents from "@/commons/layout/subContents";

const Section = styled.section`
  padding-bottom: 4rem;

  .title {
    font-size: 2.4rem;
  }
  &:not(.first) {
    padding: 6rem 0;
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
  //   const { selectedCamping } = useSelected(); // 검색화면에서 선택한 캠핑장 데이터
  const isMobile = useIsMobile();
  const { currentModal, openModal, closeModal } = useModal();
  const { selectedData, loading } = useCampingData(); // 검색화면에서 넘겨주는게 아닌 쿼리에 맞는 데이터 가져오기

  return (
    <>
      {loading ? (
        <SubContents>
          <Loading />
        </SubContents>
      ) : (
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
            {selectedData?.lineIntro ?? selectedData?.intro ? (
              <div className="intro">
                <p>
                  {selectedData?.lineIntro ? selectedData?.lineIntro : null}
                </p>
                <p>{selectedData?.intro ? selectedData?.intro : null}</p>
              </div>
            ) : null}
            {selectedData?.tooltip ? (
              <Tooltip>
                <div className="icon">
                  <BsPatchCheck />
                  <span>Tip!</span>
                </div>
                <p>{selectedData?.tooltip}</p>
              </Tooltip>
            ) : null}
          </Section>
          <Section>
            <h2 className="title">오시는 길</h2>
            <DetailMap />
            <p>{selectedData?.direction ? selectedData?.direction : null}</p>
          </Section>
          <Section>
            <DetailReview contentId={selectedData?.contentId} />
          </Section>
        </>
      )}
      {/* 이미지 전체 모달 */}
      {currentModal === "imageModal" && (
        <ImageDetailModal currentModal={currentModal} hide={closeModal} />
      )}
    </>
  );
}
