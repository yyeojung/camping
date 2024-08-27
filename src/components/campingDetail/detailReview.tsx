import { type IReviewType } from "@/commons/type/commonType";
import { useAuth } from "@/contexts/authContext";
import { getReview } from "@/firebase/review";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const Wrap = styled.div``;

export default function DetailReview({
  contentId,
}: {
  contentId: string | undefined;
}) {
  const [review, SetReview] = useState<IReviewType[]>([]);
  const { user } = useAuth();

  const fetchItem = async () => {
    try {
      const items = await getReview();
      SetReview(items);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user);

  useEffect(() => {
    void fetchItem();
  }, []);
  return (
    <Wrap>
      {review.map(
        (item) =>
          contentId === item.contentId && (
            <div key={item.contentId}>
              <p>{item.contentId}</p>
              <button>글쓰기</button>
              <p>{item.image}</p>
              <p>{item.title}</p>
              <p>{item.createdAt}</p>
              <p>{item.contents}</p>
              <p>{item.writer}</p>
              {user?.uid === item.userId && (
                <div style={{ background: "red", width: "fit-content" }}>
                  <button>삭제</button>
                  <button>수정</button>
                </div>
              )}
            </div>
          ),
      )}
    </Wrap>
  );
}
