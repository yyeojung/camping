import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { type FirebaseData } from "@/commons/type/commonType";

const likeListItem = collection(db, "likeList");

// 좋아요 추가
export const addLike = async (campingItem: FirebaseData, userId: string) => {
  try {
    await addDoc(likeListItem, {
      ...campingItem,
      userId,
    });
  } catch (error) {
    console.log(error);
  }
};

// 좋아요 삭제
export const removeLike = async (contentId: number, userId: string) => {
  try {
    const q = query(
      likeListItem,
      where("contentId", "==", contentId),
      where("userId", "==", userId),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docSnapshot) => {
      const docRef = doc(db, "likeList", docSnapshot.id);
      void deleteDoc(docRef);
    });
  } catch (error) {
    console.log(error);
  }
};

// 좋아요 리스트
export const getLikeList = async (userId: string) => {
  try {
    const q = query(likeListItem, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as FirebaseData);
  } catch (error) {
    console.log(error);
    return [];
  }
};
