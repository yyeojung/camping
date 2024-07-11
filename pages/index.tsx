import styled from "@emotion/styled";
import Head from "next/head";
import Button from "../src/components/button";
import DropDown from "@/components/dropdown";

// const inter = Inter({ subsets: ['latin'] });
const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(/image/camping.jpg) center/cover no-repeat;
`;

const MainWrap = styled.div`
  position: relative;
  width: calc(100% - 36rem);
  padding: 6rem 2rem;
  background: rgba(255, 255, 255, 0.15);
  border: 0.1rem solid #d3d3d3;
  border-radius: 2rem;
  backdrop-filter: blur(0.7rem);
  box-shadow: 0 0.4rem 0.4rem 0 rgba(0, 0, 0, 0.25);

  .review {
    position: absolute;
    right: 0;
    top: -56px;
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
  }
  .search_btn {
    background-image: url(/image/icon/ico_search.svg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 2.4rem;
    width: 8rem;
  }
`;

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Go Camping</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrap>
        <MainWrap>
          <Button className="review">요즘 캠핑 후기 보기</Button>
          <SearchBox>
            <h2>Dayily camping</h2>
            <div className="search">
              <DropDown isMain={true} />
              <Button className="search_btn">
                <span className="sr_only">검색</span>
              </Button>
            </div>
          </SearchBox>
        </MainWrap>
      </Wrap>
    </>
  );
}
