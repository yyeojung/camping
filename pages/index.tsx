import styled from "@emotion/styled";
import Head from "next/head";
import Button from "../src/components/button";
import DropDown from "@/components/dropdown";
import { responsive } from "./../src/commons/styles/globalStyles";
import { useSearch } from "@/hooks/useSearch";
import { Modal } from "../src/components/modal/index";
import { useModal } from "@/hooks/useModal";
import Link from "next/link";
import { commonBtnStyle } from "@/commons/styles/common";

const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(/image/camping.jpg) center/cover no-repeat;
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }
`;

const MainWrap = styled.div`
  position: relative;
  width: calc(100% - 36rem);
  max-width: 108rem;
  padding: 6rem 2rem;
  background: rgba(255, 255, 255, 0.15);
  border: 0.1rem solid #d3d3d3;
  border-radius: 2rem;
  backdrop-filter: blur(0.7rem);
  box-shadow: 0 0.4rem 0.4rem 0 rgba(0, 0, 0, 0.25);

  .review {
    ${commonBtnStyle}
    position: absolute;
    right: 0;
    top: -56px;
  }

  @media ${responsive.tablet} {
    width: calc(100% - 2.4rem);
  }
`;

const SearchBox = styled.div`
  h2 {
    font-family: "Times New Roman";
    color: #fff;
    font-size: 5rem;
    text-align: center;
  }
  .search {
    display: flex;
    gap: 2rem;
    margin: 8rem auto 0;
    max-width: 67.2rem;
    justify-content: center;

    @media ${responsive.mobile} {
      flex-direction: column;
      gap: 1rem;
      margin-top: 4rem;
    }
  }
  .search_btn {
    background-image: url(/image/icon/ico_search.svg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 2.4rem;
    width: 8rem;
    .mobile {
      width: 100%;
      display: none;
      text-align: center;
    }

    @media ${responsive.mobile} {
      width: 100%;
      background-image: none;
      .mobile {
        display: block;
      }
    }
  }
`;

export default function Home() {
  const { onCloseSearchAlret, onChangeSearch, onClickSearch } = useSearch(); // 코드 중복으로 useSearch 커스텀 훅으로 수정
  const { currentModal } = useModal();

  return (
    <>
      <Head>
        <title>Dayliy Camping</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrap>
        <MainWrap>
          <Link href="/campingReview" passHref>
            <a className="review">요즘 캠핑 후기 보기</a>
          </Link>
          <SearchBox>
            <h2>Dayily Camping</h2>
            <div className="search">
              <DropDown isMain={true} onChangeSearch={onChangeSearch} />
              <Button onClick={onClickSearch} className="search_btn">
                <span className="mobile">검색하기</span>
                <span className="sr_only">검색</span>
              </Button>
            </div>
          </SearchBox>
          {/* 지역 미선택시 alert */}

          {currentModal === "searchAlert" && (
            <Modal
              currentModal={currentModal}
              hide={onCloseSearchAlret}
              message="지역을 선택해주세요!"
            />
          )}
        </MainWrap>
      </Wrap>
    </>
  );
}
