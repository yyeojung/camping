import SubContents from "@/commons/layout/subContents";
import SubTitle from "@/commons/layout/subTitle";
import { type FirebaseData } from "@/commons/type/commonType";
import CampingCard from "@/components/campingList/campingCard";
import NoData from "@/components/noData";
import { db } from "@/firebase/firebase";
import styled from "@emotion/styled";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";

const Wrap = styled.div``;

export default function MyCamping() {
  //   const [likeItem, setLikeItem] = useState<FirebaseData[]>([]);

  //   const fetchItem = async () => {
  //     const likeQuery = query(
  //       collection(db, "likeList"),
  //       // orderBy("createdAt", "desc")
  //     );
  //     const snapshot = await getDocs(likeQuery);
  //     const items = snapshot.docs.map();
  //   };

  //   useEffect(() => {
  //     void fetchItem();
  //   }, []);

  //   const onClickCard = () => {
  //     console.log(fetchItem);
  //   };
  return (
    <Wrap>
      <SubTitle>
        <h2>관심 캠핑장</h2>
      </SubTitle>
      <SubContents>
        {/* <CampingCard className="card" list={likeItem} onClick={onClickCard} /> */}
        <NoData>
          <p>준비 중입니다.</p>
        </NoData>
      </SubContents>
    </Wrap>
  );
}
