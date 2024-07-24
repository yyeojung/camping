import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../pagination";
import { responsive } from "@/commons/styles/globalStyles";
import CampingCard from "../campingCard";

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 4rem 0;
  gap: 4rem 0rem;
  justify-content: space-between;

  .card {
    width: calc((100% - 12rem) / 4);
    @media ${responsive.tablet} {
      width: calc((100% - 4rem) / 2);
    }
    @media ${responsive.mobile} {
      width: 100%;
    }
  }
`;

const Loading = styled.div`
  font-size: 4rem;
`;

interface ICampingList {
  facltNm: string;
  lineIntro?: string;
  addr1: string;
  firstImageUrl?: string;
  themaEnvrnCl?: string;
  tel: string;
  contentId: number;
  lctCl?: string;
}

interface IApiResponse {
  response: {
    body: {
      items: {
        item: ICampingList[];
      };
      totalCount: number;
    };
  };
}

interface IPropsList {
  className?: string;
}

const PER_PAGE = 8; // 한 페이지에 보여줄 아이템 수

export default function CampingCardList({ className }: IPropsList) {
  const [list, setList] = useState<ICampingList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 번호
  const [totalCount, setTotalCount] = useState<number>(0); // 전체 캠핑 아이템 수

  const SERVICE_KEY = process.env.NEXT_PUBLIC_SERVICE_KEY;

  // 데이터 불러오기
  useEffect(() => {
    async function fetchData(): Promise<void> {
      setLoading(true);
      try {
        const response = await axios.get<IApiResponse>(
          `http://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=${SERVICE_KEY}&numOfRows=${PER_PAGE}&pageNo=${currentPage}&MobileOS=AND&MobileApp=appName&_type=json`,
        );
        setList(response.data.response.body.items.item);
        setTotalCount(response.data.response.body.totalCount);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    void fetchData();
  }, [SERVICE_KEY, currentPage]);

  if (loading) {
    return <Loading>대기 중..</Loading>;
  }

  if (!list) {
    return null;
  }

  const pageCount = Math.ceil(totalCount / PER_PAGE); // 전체 페이지 수 계산
  const onClickPage = (selected: number) => {
    setCurrentPage(selected);
  };
  return (
    <>
      <Wrap>
        <CampingCard className="card" list={list} />
      </Wrap>
      {/* 페이지네이션 */}
      {pageCount > 0 && (
        <Pagination
          totalItems={totalCount}
          onClick={onClickPage}
          currentPage={currentPage}
          pageCount={5}
          itemCountPerPage={PER_PAGE}
        />
      )}
    </>
  );
}
