import SubContents from "@/commons/layout/subContents";
import SubTitle from "@/commons/layout/subTitle";
import { responsive } from "@/commons/styles/globalStyles";
import Button from "@/components/button";
import CampingCardList from "@/components/page/campingList/campingCardList";
import DropDown from "@/components/dropdown";
import { Modal } from "@/components/modal";
import { useModal } from "@/hooks/useModal";
import { useSearch } from "@/hooks/useSearch";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const Wrap = styled.div`
  .title {
    display: flex;
    justify-content: space-between;

    @media ${responsive.tablet} {
      flex-direction: column;
      gap: 1rem;
    }
    h2 {
      span {
        font-size: 2.4rem;
        color: #75c36b;
      }
    }
  }
`;
const SearchWrap = styled.div`
  display: flex;
  gap: 2rem;

  @media ${responsive.mobile} {
    flex-direction: column;
    gap: 1rem;
  }

  .search_select {
    gap: 1rem;

    @media ${responsive.mobile} {
      gap: 0.6rem;
    }

    .select__control {
      width: 20rem;
      border-color: #a9a9a9;
      color: #000;

      &.select__control--is-disabled {
        border-color: #d9d9d9;
      }
    }

    .select__single-value {
      color: #000;
    }

    .select__indicator {
      color: #a9a9a9;
    }
  }
`;

export default function CampingList() {
  const router = useRouter();
  const { query, asPath } = router;
  const { currentModal } = useModal();
  const { onCloseSearchAlret, onChangeSearch, onClickSearch } = useSearch(); // 코드 중복으로 useSearch 커스텀 훅으로 수정

  const linkList = asPath === "/campingList";
  return (
    <Wrap>
      <SubTitle className="title">
        {linkList ? (
          <h2>캠핑장을 검색해주세요.</h2>
        ) : (
          <h2>
            요즘{" "}
            {query.region === "전체" ? (
              <span>전국</span>
            ) : (
              <span>{query.region}</span>
            )}
            에 뜨는 캠핑장
          </h2>
        )}
        <SearchWrap>
          <DropDown className="search_select" onChangeSearch={onChangeSearch} />
          <Button onClick={onClickSearch} className="search_btn">
            검색
          </Button>
          {/* 지역 미선택시 alert */}
          {currentModal === "searchAlert" && (
            <Modal
              currentModal={currentModal}
              hide={onCloseSearchAlret}
              message="지역을 선택해주세요!"
            />
          )}
        </SearchWrap>
      </SubTitle>
      <SubContents>
        <CampingCardList />
      </SubContents>
    </Wrap>
  );
}
