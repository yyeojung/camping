import { type IReviewType } from "@/commons/type/commonType";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

const review = collection(db, "review");

// 캠핑장 후기 등록
export const addReview = async (reviewItem: IReviewType, userId: string) => {
  try {
    await addDoc(review, {
      userId,
      createdAt: Date.now(),
      title: reviewItem.title,
      writer: reviewItem.title,
      contents: reviewItem.title,
      image: reviewItem.title,
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

// 캠핑장 목록
