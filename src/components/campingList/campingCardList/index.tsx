import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { responsive } from "@/commons/styles/globalStyles";
import CampingCard from "../campingCard";
import { useRouter } from "next/router";
import { type ICampingList } from "@/contexts/campingContext";
import Pagination from "./../../pagination/index";
import Loading from "./../../Loading/index";
import NoData from "./../../noData/index";

const Wrap = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 60rem;
  padding-top: 4rem;
  gap: 4rem;

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

// interface ICampingList {
//   facltNm: string;
//   lineIntro?: string;
//   addr1: string;
//   firstImageUrl?: string;
//   themaEnvrnCl?: string;
//   tel: string;
//   contentId: number;
//   lctCl?: string;
//   doNm: string;
//   sigunguNm: string;
// }

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

export default function CampingCardList({ className }: IPropsList) {
  const [list, setList] = useState<ICampingList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 번호
  const [totalCount, setTotalCount] = useState<number>(0); // 전체 캠핑 아이템 수
  const router = useRouter();
  const { query } = router;
  //   const { setCampingData } = useCamping();

  const SERVICE_KEY = process.env.NEXT_PUBLIC_SERVICE_KEY;

  // 데이터 불러오기
  useEffect(() => {
    async function fetchData(): Promise<void> {
      if (!query.region) return; // 쿼리 값이 유효할 때만

      setLoading(true);
      try {
        const response = await axios.get<IApiResponse>(
          `https://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=${SERVICE_KEY}&numOfRows=4000&pageNo=1&MobileOS=AND&MobileApp=dayCamping&_type=json`,
        );

        const items = response.data.response?.body?.items.item || []; // 데이터 없을 경우 추가 수정
        // 지역 필터
        const filteredItems = items.filter((item) => {
          // 전체 지역일 경우
          if (query.region === "전체") {
            return true;
          }
          // 도는 선택 시는 전체
          if (query.region !== "전체" && query.subRegion === "전체") {
            return item.doNm === query.region;
          }
          // 도 선택 && 시 선택
          if (query.region !== "전체" && query.subRegion !== "전체") {
            return (
              item.doNm === query.region && item.sigunguNm === query.subRegion
            );
          }
          return false;
        });
        setTotalCount(filteredItems.length);
        const paginatedItems = filteredItems.slice(
          (currentPage - 1) * PER_PAGE,
          currentPage * PER_PAGE,
        );

        // 데이터 없을 때
        if (paginatedItems.length === 0) {
          setList([]);
        } else {
          setList(paginatedItems);
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    void fetchData();
  }, [query, SERVICE_KEY, currentPage]);

  const PER_PAGE = 8; // 한 페이지에 보여줄 아이템 수
  const pageCount = Math.ceil(totalCount / PER_PAGE); // 전체 페이지 수 계산
  const onClickPage = (selected: number) => {
    setCurrentPage(selected);
  };

  const onClickCard = (item: ICampingList) => {
    // setCampingData(item);
    const { contentId } = item;
    void router.push(`/campingDetail?contentId=${contentId}`);
  };
  //   const onClickCard = async (contentId: number) => {
  //     await router
  //       .push({
  //         pathname: "/campingDetail",
  //         query: { contentId },
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  return (
    <>
      <Wrap>
        {loading ? (
          <Loading />
        ) : list.length > 0 ? (
          <>
            <CampingCard className="card" list={list} onClick={onClickCard} />
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
        ) : (
          <NoData />
        )}
      </Wrap>
    </>
  );
}
