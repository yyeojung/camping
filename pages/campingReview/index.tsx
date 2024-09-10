import SubContents from "@/commons/layout/subContents";
import SubTitle from "@/commons/layout/subTitle";
import { type IReviewType } from "@/commons/type/commonType";
import Loading from "@/components/Loading";
import NoData from "@/components/noData";
import { getReview } from "@/firebase/review";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const Wrap = styled.div``;

const ReviewWrap = styled.div`
  padding-top: 4rem;
`;
const Table = styled.table`
  width: 100%;

  thead tr td {
    background: #efefef;
    height: 4rem;
    border-top: 0.1rem solid #999;
    text-align: center;
  }

  tbody tr {
    &:hover {
      background: rgba(218, 227, 202, 0.2);
    }

    td {
      height: 5.4rem;
      padding: 1.2rem;
      word-break: keep-all;
      border-bottom: 0.1rem solid #999999;

      .writer {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 10rem;
      }

      &:not(:nth-child(2)) {
        text-align: center;
      }
    }
  }

  .review_contents {
    display: flex;

    img {
      height: 12rem;
      width: 19rem;
      object-fit: cover;
      border: 0.1rem solid #eee;
      margin-left: 1rem;
    }

    .text {
      margin-left: 1rem;
      line-height: 1.2;

      p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
    }
  }
`;
export default function CampingReview() {
  const [loading, setLoading] = useState<boolean>(false);
  const [reviewList, setReviewList] = useState<IReviewType[]>([]);

  const fetchItem = async () => {
    setLoading(true);

    const items = await getReview();
    setReviewList(items);

    setLoading(false);
  };

  useEffect(() => {
    void fetchItem();
  }, []);

  return (
    <Wrap>
      <SubTitle>
        <h2>요즘 캠핑 후기</h2>
      </SubTitle>
      {loading ? (
        <SubContents>
          <Loading />
        </SubContents>
      ) : reviewList && reviewList.length > 0 ? (
        <ReviewWrap>
          <Table>
            <colgroup>
              <col width={"15%"} />
              <col width={"65%"} />
              <col width={"10%"} />
              <col width={"10%"} />
            </colgroup>
            <thead>
              <tr>
                <td>Name</td>
                <td>Review</td>
                <td>Writer</td>
                <td>Date</td>
              </tr>
            </thead>
            <tbody>
              {reviewList.map((item) => (
                <tr key={item.contentId}>
                  <td>
                    <strong>{item.facltNm}</strong>
                  </td>
                  <td>
                    <div className="review_contents">
                      <div className="text">
                        <p>{item.title}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="writer">{item.writer}</p>
                  </td>
                  <td>{item.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ReviewWrap>
      ) : (
        <SubContents>
          <NoData>
            <p>작성된 후기가 없습니다.</p>
          </NoData>
        </SubContents>
      )}
    </Wrap>
  );
}
