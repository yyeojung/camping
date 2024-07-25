import Button from "@/components/button";
import CampingCardList from "@/components/campingCardList";
import DropDown from "@/components/dropdown";
import { useSearch } from "@/hooks/useSearch";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const Title = styled.div`
  margin-top: 6.4rem;
  display: flex;
  justify-content: space-between;
  h2 {
    font-size: 2.4rem;

    span {
      font-size: 2.4rem;
      color: #00a66c;
    }
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
  const { query } = useRouter();
  const { onChangeSearch, onClickSearch } = useSearch(); // 코드 중복으로 useSearch 커스텀 훅으로 수정

  return (
    <>
      <Title>
        <h2>
          요즘{" "}
          {query.region === "전체" ? (
            <span>전국</span>
          ) : (
            <span>{query.region}</span>
          )}
          에 뜨는 캠핑장
        </h2>
        <SearchWrap>
          <DropDown isMain={false} onChangeSearch={onChangeSearch} />
          <Button onClick={onClickSearch} className="search_btn">
            검색
          </Button>
        </SearchWrap>
      </Title>
      <CardWrap>
        <CampingCardList className="card" />
      </CardWrap>
    </>
  );
}
