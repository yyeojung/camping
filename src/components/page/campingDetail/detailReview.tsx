import { type IReviewType } from "@/commons/type/commonType";
import { useAuth } from "@/contexts/authContext";
import { getReview } from "@/firebase/review";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";
import Button from "@/components/button";
import NoData from "@/components/noData";
import Link from "next/link";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/router";
import { Modal } from "@/components/modal";

const Wrap = styled.div`
  .title_wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .nodata {
    min-height: 20rem;
    display: flex;
    align-items: center;
  }
`;

const ReviewUl = styled.ul`
  li {
    display: flex;
    position: relative;
    border-bottom: 0.1rem solid #ccc;
    min-height: 15rem;
    padding: 1rem;

    &:first-of-type {
      border-top: 0.1rem solid #ccc;
    }
  }

  .contents_wrap {
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    .info {
      color: #898989;
      font-size: 1.4rem;

      span:not(:first-of-type)::before {
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

    .contents {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      max-width: 78rem;
    }
  }

  .image_box {
    width: 24rem;
    height: 13rem;
    margin-right: 1.6rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .user_btn {
    position: absolute;
    right: 2rem;
    top: 1rem;
    display: flex;
    gap: 1rem;

    button {
      width: 2rem;
      height: 2rem;

      svg {
        width: 1.8rem;
        height: 1.8rem;
      }
    }
  }
`;

export default function DetailReview({
  contentId,
}: {
  contentId: string | undefined;
}) {
  const [review, setReview] = useState<IReviewType[]>([]);
  const { user } = useAuth();
  const { currentModal, openModal } = useModal();
  const router = useRouter();

  const fetchItem = async () => {
    let isMounted = true;

    try {
      const items = await getReview();
      if (isMounted) {
        setReview(items); // 컴포넌트가 마운트된 상태에서만 업데이트
      }
    } catch (error) {
      console.log(error);
    }

    return () => {
      isMounted = false; // 비동기 작업 후 언마운트 상태로 변경
    };
  };

  useEffect(() => {
    const fetchReviews = async () => {
      await fetchItem(); // useEffect 내부에서 fetchItem 호출
    };

    void fetchReviews();

    return () => {
      void fetchItem(); // 언마운트 시 호출
    };
  }, []);

  // 글쓰기 버튼 모달 닫기
  const closeRegisterModal = () => {
    router.back();
    setTimeout(() => {
      void router.push("/login");
    }, 100);
  };

  const reviewId = review.map((item) => item.contentId);
  const filteredReview = reviewId.filter((item) => item === contentId);

  return (
    <Wrap>
      <div className="title_wrap">
        <h2 className="title">캠핑장 후기</h2>
        {user ? (
          <Link href="/reviewRegister" passHref>
            <Button>글쓰기</Button>
          </Link>
        ) : (
          <a
            onClick={() => {
              openModal("registerLogin");
            }}
          >
            <Button>글쓰기</Button>
          </a>
        )}
      </div>
      {filteredReview.length > 0 ? (
        <ReviewUl>
          {review.map(
            (item, index) =>
              contentId === item.contentId && (
                <li key={index}>
                  {item.images && item.images.length > 0 && (
                    <div className="image_box">
                      <img src={item.images[0]} alt={item.facltNm} />
                    </div>
                  )}
                  <div className="contents_wrap">
                    <strong>{item.title}</strong>
                    <p className="info">
                      <span>{item.writer}</span>
                      <span>{item.createdAt}</span>
                    </p>
                    <p className="contents" key={index}>
                      {item.contents.split("\n").map(
                        (
                          item,
                          index, // 줄바꿈 유지
                        ) => (
                          <React.Fragment key={index}>
                            {item}
                            <br />
                          </React.Fragment>
                        ),
                      )}
                    </p>
                  </div>
                  {user?.uid === item.userId && (
                    <div className="user_btn">
                      <button>
                        <MdOutlineModeEditOutline />
                        <span className="sr_only">수정</span>
                      </button>
                      <button>
                        <FaRegTrashAlt />
                        <span className="sr_only">삭제</span>
                      </button>
                    </div>
                  )}
                </li>
              ),
          )}
        </ReviewUl>
      ) : (
        <div className="nodata">
          <NoData>후기가 없습니다.</NoData>
        </div>
      )}

      {/* 글쓰기 로그인 alert */}
      {currentModal === "registerLogin" && (
        <Modal
          currentModal={currentModal}
          hide={closeRegisterModal}
          message="로그인 후 이용 가능합니다!"
        />
      )}
    </Wrap>
  );
}
