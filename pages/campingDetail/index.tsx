import ImageDetailModal from "@/components/modal/campingDetail/imageDetailModal";
import { useSelected } from "@/contexts/selectedContext";
import { useModal } from "@/hooks/useModal";
import styled from "@emotion/styled";
import DetailTitle from "@/components/campingDetail/detailTitle";
import ImageDetail from "@/components/campingDetail/imageDetail";
import DetailInfo from "@/components/campingDetail/detailInfo";
import { useIsMobile } from "@/commons/responsive/useMediaQuery";
import DetailTitleIcon from "@/components/campingDetail/detailTitleIcon";
import { responsive } from "@/commons/styles/globalStyles";

const Section = styled.section`
  padding-bottom: 4rem;
  border-bottom: 0.1rem solid #cacaca;

  &:not(.first) {
    padding: 4rem 0;
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
      line-height: 1.4;
    }
  }
`;
export default function CampingDetail() {
  const { selectedCamping } = useSelected(); // 검색화면에서 선택한 캠핑장 데이터
  const isMobile = useIsMobile();

  const { isShowing, modalToggle } = useModal();
  const onClickImage = () => {
    modalToggle();
  };

  return (
    <>
      <Section className="first">
        <DetailTitle />
        <ImageDetail onClick={onClickImage} />
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
      </Section>
      <Section>
        <strong>오시는 길</strong>
        <p>지도 준비중</p>
        <p>{selectedCamping?.direction ? selectedCamping?.direction : null}</p>
      </Section>
      {/* 이미지 전체 모달 */}
      <ImageDetailModal isShowing={isShowing} hide={modalToggle} />
    </>
  );
}
