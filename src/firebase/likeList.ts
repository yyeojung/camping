import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { type ICampingList } from "@/commons/type/commonType";

const likeListItem = collection(db, "likeList");

// 좋아요 추가
export const addLike = async (campingItem: ICampingList, userId: string) => {
  try {
    await addDoc(likeListItem, {
      userId,
      like: true,
      campingItem: {
        facltNm: campingItem.facltNm,
        lineIntro: campingItem.lineIntro,
        intro: campingItem.intro,
        addr1: campingItem.addr1,
        firstImageUrl: campingItem.firstImageUrl,
        themaEnvrnCl: campingItem.themaEnvrnCl,
        tel: campingItem.tel,
        contentId: campingItem.contentId,
        lctCl: campingItem.lctCl,
        induty: campingItem.induty,
        doNm: campingItem.doNm,
        sigunguNm: campingItem.sigunguNm,
        direction: campingItem.direction,
        brazierCl: campingItem.brazierCl,
        sbrsCl: campingItem.sbrsCl,
        sbrsEtc: campingItem.sbrsEtc,
        homepage: campingItem.homepage,
        animalCmgCl: campingItem.animalCmgCl,
        tooltip: campingItem.tooltip,
        mapX: campingItem.mapX,
        mapY: campingItem.mapY,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// 좋아요 삭제
export const removeLike = async (userId: string, contentId: string) => {
  try {
    const q = query(
      likeListItem,
      where("userId", "==", userId),
      where("campingItem.contentId", "==", contentId),
    );

    const snapshot = await getDocs(q);

    const deletePromises = snapshot.docs.map(async (docSnapshot) => {
      await deleteDoc(doc(db, "likeList", docSnapshot.id));
    });

    await Promise.all(deletePromises);
  } catch (error) {
    console.log(error);
  }
};

// 좋아요 리스트
export const getLikeList = async (userId: string) => {
  try {
    const q = query(likeListItem, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data().campingItem);
  } catch (error) {
    console.log(error);
    return [];
  }
};

// 좋아요 상태
export const likeState = (
  userId: string,
  likeUpdate: (likeId: string[]) => void,
): (() => void) | undefined => {
  if (!userId) return;
  try {
    const q = query(likeListItem, where("userId", "==", userId));
    // 실시간 조회로 바꿈
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedLike =
        snapshot.docs.map(
          (doc) => doc.data().campingItem.contentId as string,
        ) || [];
      likeUpdate(updatedLike);
    });
    return unsubscribe;
  } catch (error) {
    console.log(error);
  }
};
