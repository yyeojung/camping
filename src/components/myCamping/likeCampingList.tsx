import { type ICampingList } from "@/commons/type/commonType";
import { useSelected } from "@/contexts/selectedContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CampingCard from "../campingList/campingCard";
import NoData from "../noData";
import { useAuth } from "@/contexts/authContext";
import Loading from "../Loading";
import { getLikeList } from "@/firebase/likeList";

export default function LikeCampingList() {
  const [likeItem, setLikeItem] = useState<ICampingList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setSelectedCamping } = useSelected();
  const { user } = useAuth();

  const fetchItem = async () => {
    if (!user) return;
    setLoading(true);

    const items = await getLikeList(user.uid);
    setLikeItem(items);

    setLoading(false);
  };

  useEffect(() => {
    void fetchItem();
  }, []);

  const onClickCard = (item: ICampingList) => {
    setSelectedCamping(item);
    const { contentId } = item;
    void router.push(`/campingDetail?contentId=${contentId}`);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : likeItem.length > 0 ? (
        <CampingCard className="card" list={likeItem} onClick={onClickCard} />
      ) : (
        <NoData>
          <p>관심 캠핑장이 없습니다.</p>
        </NoData>
      )}
    </>
  );
}
