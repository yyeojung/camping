import Button from "@/components/button";
import CampingCardList from "@/components/campingCardList";
import DropDown from "@/components/dropdown";
import styled from "@emotion/styled";

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
  padding-bottom: 6rem;
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
        <CampingCardList className="card" />
      </CardWrap>
    </>
  );
}
