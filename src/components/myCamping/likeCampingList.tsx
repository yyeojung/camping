import { type ICampingList } from "@/commons/type/commonType";
import { useSelected } from "@/contexts/selectedContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CampingCard from "../campingList/campingCard";
import NoData from "../noData";
import { useAuth } from "@/contexts/authContext";
import Loading from "../Loading";
import { getLikeList } from "@/firebase/likeList";
import Pagination from "../pagination";

export default function LikeCampingList() {
  const [likeItem, setLikeItem] = useState<ICampingList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setSelectedCamping } = useSelected();
  const { user } = useAuth();
  const [pageList, setPageList] = useState<ICampingList[]>([]); // 페이지 리스트당 캠핑장 데이터
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 번호

  const fetchItem = async () => {
    if (!user) return;
    setLoading(true);

    const items = await getLikeList(user.uid);
    setLikeItem(items);
    const paginatedItems = items.slice(
      (currentPage - 1) * PER_PAGE,
      currentPage * PER_PAGE,
    );
    setPageList(paginatedItems.length > 0 ? paginatedItems : []);

    setLoading(false);
  };

  useEffect(() => {
    void fetchItem();
  }, [currentPage]);

  const onClickCard = (item: ICampingList) => {
    setSelectedCamping(item);
    const { contentId } = item;
    void router.push(`/campingDetail?contentId=${contentId}`);
  };

  //   페이지네이션
  const totalCount = likeItem.length;
  const PER_PAGE = 8;
  const pageCount = Math.ceil(totalCount / PER_PAGE); // 전체 페이지 수

  const onClickPage = (selected: number) => {
    setCurrentPage(selected);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : totalCount > 0 ? (
        <>
          <CampingCard className="card" list={pageList} onClick={onClickCard} />

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
          <p>관심 캠핑장이 없습니다.</p>
        </NoData>
      )}
    </>
  );
}
