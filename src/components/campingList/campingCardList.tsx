import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { responsive } from "@/commons/styles/globalStyles";
import CampingCard from "./campingCard";
import { useRouter } from "next/router";
import Pagination from "../pagination/index";
import Loading from "../Loading/index";
import NoData from "../noData/index";
import { useSelected } from "@/contexts/selectedContext";
import { type ICampingList } from "@/commons/type/commonType";
import { useCampingData } from "@/hooks/useCampingData";

const Wrap = styled.div`
  width: 100%;
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

interface IPropsList {
  className?: string;
}

export default function CampingCardList({ className }: IPropsList) {
  const [list, setList] = useState<ICampingList[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 번호
  const [totalCount, setTotalCount] = useState<number>(0); // 전체 캠핑 아이템 수
  const router = useRouter();
  const { query } = router;
  const { setSelectedCamping } = useSelected();
  const [campingData, loading] = useCampingData();
  // 데이터 불러오기
  useEffect(() => {
    if (!query.region || !campingData) return; // 지역 값이 유효할 때만

    // 로컬 api 삭제
    // 지역 필터
    const filteredItems = campingData.filter((item) => {
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
        return item.doNm === query.region && item.sigunguNm === query.subRegion;
      }
      return false;
    });
    setTotalCount(filteredItems.length);
    const paginatedItems = filteredItems.slice(
      (currentPage - 1) * PER_PAGE,
      currentPage * PER_PAGE,
    );

    console.log(filteredItems);
    // 데이터 없을 때
    setList(paginatedItems.length > 0 ? paginatedItems : []);
  }, [query.region, currentPage, campingData, query.subRegion]);

  const PER_PAGE = 8; // 한 페이지에 보여줄 아이템 수
  const pageCount = Math.ceil(totalCount / PER_PAGE); // 전체 페이지 수 계산
  const onClickPage = (selected: number) => {
    setCurrentPage(selected);
  };

  const onClickCard = (item: ICampingList) => {
    setSelectedCamping(item);
    const { contentId } = item;
    void router.push(`/campingDetail?contentId=${contentId}`);
  };

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
          <NoData>
            <p>해당하는 지역에 캠핑장이 없습니다. </p>
          </NoData>
        )}
      </Wrap>
    </>
  );
}
