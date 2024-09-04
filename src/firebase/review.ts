import { type IReviewType } from "@/commons/type/commonType";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

const reviewDb = collection(db, "review");

// 캠핑장 후기 등록
export const addReview = async (reviewItem: IReviewType, userId: string) => {
  try {
    await addDoc(reviewDb, {
      ...reviewItem,
      userId,
      createdAt: new Date(),
    });
  } catch (error) {
    console.log(error);
  }
};

// 캠핑장 후기 삭제
export const removeReview = async (docId: string) => {
  try {
    await deleteDoc(doc(db, "review", docId));
  } catch (error) {
    console.log(error);
  }
};

// 캠핑장 후기 목록
export const getReview = async () => {
  try {
    const q = query(reviewDb, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      // timestamp 날짜로 변경
      const date = data.createdAt;
      const day = date.toDate();
      const year = day.getFullYear();
      const month = ("0" + (day.getMonth() + 1)).slice(-2);
      const days = ("0" + day.getDate()).slice(-2);
      return {
        contentId: data.contentId,
        facltNm: data.facltNm,
        contents: data.contents,
        createdAt: `${year}.${month}.${days}`, // 날짜 포맷팅
        image: data.image,
        title: data.title,
        writer: data.writer,
        userId: data.userId,
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};
