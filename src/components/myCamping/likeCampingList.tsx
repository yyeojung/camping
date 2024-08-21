import { type ICampingList } from "@/commons/type/commonType";
import { useSelected } from "@/contexts/selectedContext";
import { db } from "@/firebase/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CampingCard from "../campingList/campingCard";
import NoData from "../noData";

export default function LikeCampingList() {
  const [likeItem, setLikeItem] = useState<ICampingList[]>([]);
  const router = useRouter();
  const { setSelectedCamping } = useSelected();

  const fetchItem = async () => {
    const likeQuery = query(collection(db, "likeList"));
    const snapshot = await getDocs(likeQuery);
    const items = snapshot.docs.map((doc) => doc.data().campingItem);
    setLikeItem(items);
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
      {likeItem ? (
        <CampingCard className="card" list={likeItem} onClick={onClickCard} />
      ) : (
        <NoData>
          <p>관심 캠핑장이 없습니다.</p>
        </NoData>
      )}
    </>
  );
}
