import { responsive } from "@/commons/styles/globalStyles";
import { type IReviewType } from "@/commons/type/commonType";
import Button from "@/components/button";
import ReviewForm from "@/components/reviewForm/reviewForm";
import { useAuth } from "@/contexts/authContext";
import { getReview } from "@/firebase/review";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Wrap = styled.div`
  margin-top: 8rem;

  .top_btn {
    display: flex;
    justify-content: space-between;

    .gray {
      color: #8d8c8c;
      border-color: #8d8c8c;
      background: #fff;
    }

    .user_btn {
      display: flex;
      gap: 1rem;
    }
  }
  .form {
    margin-top: 1rem;
  }
`;
const TitleWrap = styled.div`
  position: relative;

  .title {
    max-width: calc(100% - 20rem);

    @media ${responsive.mobile} {
      max-width: none;
      padding-top: 1.6rem;
    }
  }

  .info {
    margin-top: 0.8rem;

    span {
      color: #898989;
      font-size: 1.4rem;

      &:not(:first-of-type)::before {
        display: inline-block;
        clear: both;
        content: "";
        width: 0.1rem;
        height: 1.2rem;
        background: #ccc;
        margin: 0 0.6rem;
        vertical-align: middle;
      }
    }
  }

  .campsite {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 0.8rem;
    padding: 0.8rem 1rem;
    background: #dae3ca;
    max-width: 20rem;

    @media ${responsive.mobile} {
      top: -2rem;
      max-width: none;
    }
  }
`;
const Contents = styled.div`
  margin-top: 3rem;
  min-height: 40rem;

  ul {
    li img {
      width: 100%;
    }
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.5;
  }
`;
export default function index() {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectReview, setSelectReview] = useState<IReviewType[]>([]);
  const router = useRouter();
  const docId = router.query.id;
  const { user } = useAuth();

  const fetchItem = async () => {
    setLoading(true);
    if (!docId) {
      setLoading(false);
      return;
    }

    const items = await getReview();
    const filterItem = items.filter((item) => item.docId === docId);
    setSelectReview(filterItem);

    setLoading(false);
  };

  useEffect(() => {
    void fetchItem();
  }, [docId]);

  return (
    <>
      {loading ? (
        <p>헷 롣딩중</p>
      ) : (
        <>
          {selectReview.map((item, index) => (
            <Wrap key={index}>
              <div className="top_btn">
                <Link href="/campingReview" passHref>
                  <a>
                    <Button className="gray">목록</Button>
                  </a>
                </Link>
                {user?.uid === item.userId && ( // 글 작성 유저만 수정, 삭제 버튼
                  <div className="user_btn">
                    <Button className="gray">삭제</Button>
                    <Link href="/campingReview" passHref>
                      <a>
                        <Button className="edit">수정</Button>
                      </a>
                    </Link>
                  </div>
                )}
              </div>
              <ReviewForm className="form">
                <TitleWrap>
                  <div className="title">
                    <strong>{item.title}</strong>
                    <p className="info">
                      <span>{item.writer}</span>
                      <span>{item.createdAt}</span>
                    </p>
                  </div>
                  <p className="campsite">{item.facltNm}</p>
                </TitleWrap>
                <Contents>
                  {item.images && (
                    <ul>
                      {item.images?.map((img, index) => (
                        <li key={index}>
                          <img src={img} alt="" />
                        </li>
                      ))}
                    </ul>
                  )}
                  <p>{item.contents}</p>
                </Contents>
              </ReviewForm>
            </Wrap>
          ))}
        </>
      )}
    </>
  );
}
