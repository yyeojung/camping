import Button from "@/components/button";
import DropDown from "@/components/dropdown";
import styled from "@emotion/styled";
import CampingCard from "./../../src/components/campingCard/index";
import { responsive } from "@/commons/styles/globalStyles";

const Title = styled.div`
  margin-top: 6.4rem;
  display: flex;
  justify-content: space-between;
  h2 {
    font-size: 2.4rem;
  }
`;

const SearchWrap = styled.div`
  display: flex;
  gap: 2rem;
`;

const CardWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 4rem;
  gap: 4rem 0rem;
  justify-content: space-between;

  .card {
    width: calc((100% - 12rem) / 4);
    @media ${responsive.tablet} {
      width: calc((100% - 4rem) / 3);
    }
    @media ${responsive.mobile} {
      width: 100%;
    }
  }
`;

export default function CampingList() {
  return (
    <>
      <Title>
        <h2>요즘 뜨는 캠핑장</h2>
        <SearchWrap>
          <DropDown isMain={false} />
          <Button className="search_btn">검색</Button>
        </SearchWrap>
      </Title>
      <CardWrap>
        <CampingCard className="card" />
      </CardWrap>
    </>
  );
}
