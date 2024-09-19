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
import Pagination from "@/components/pagination";

const Wrap = styled.div`
  .title_wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    .btn_wrap {
      display: flex;
      gap: 1rem;

      .review_list {
        background: #fff;
        color: #000;
        border-color: #000;
      }
    }
  }

  .pagenation {
    margin-top: 2.4rem;
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
    max-width: calc(100% - 30rem);

    strong {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .info span {
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

    .contents {
      font-size: 1.4rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
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
  const [pageList, setPageList] = useState<IReviewType[]>([]); // 페이지 리스트당 캠핑장후기 데이터
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 번호

  useEffect(() => {
    let isMounted = true;

    const fetchItem = async () => {
      try {
        const items = await getReview();
        if (isMounted && contentId) {
          // 캠핑장 id와 동일한 후기만 가져오기
          const filteredReview = items.filter(
            (item) => item.contentId === contentId,
          ); // 필터링
          setReview(filteredReview); // 컴포넌트가 마운트된 상태에서만 업데이트

          // 페이지네이션
          const paginatedItems = filteredReview.slice(
            (currentPage - 1) * PER_PAGE,
            currentPage * PER_PAGE,
          );
          setPageList(paginatedItems);
        }
      } catch (error) {
        console.log(error);
      }
    };

    void fetchItem(); // 데이터 가져오기 함수 호출

    // cleanup 함수
    return () => {
      isMounted = false; // 컴포넌트가 언마운트될 때 상태 변경
    };
  }, [currentPage, contentId]);

  // 글쓰기 버튼 모달 닫기
  const closeRegisterModal = () => {
    router.back();
    setTimeout(() => {
      void router.push("/login");
    }, 100);
  };

  // 페이지네이션
  const totalCount = review.length;
  const PER_PAGE = 5;
  const pageCount = Math.ceil(totalCount / PER_PAGE);

  const onClickPage = (selected: number) => {
    setCurrentPage(selected);
  };

  return (
    <Wrap>
      <div className="title_wrap">
        <h2 className="title">캠핑장 후기</h2>
        <div className="btn_wrap">
          <Link href="/campingReview" passHref>
            <a>
              <Button className="review_list">목록</Button>
            </a>
          </Link>
          {user ? (
            <Link href="/reviewRegister" passHref>
              <a>
                <Button>글쓰기</Button>
              </a>
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
      </div>
      {pageList.length > 0 ? (
        <>
          <ReviewUl>
            {pageList.map(
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
          {pageCount > 0 && (
            <Pagination
              className="pagenation"
              totalItems={totalCount}
              onClick={onClickPage}
              currentPage={currentPage}
              pageCount={5}
              itemCountPerPage={PER_PAGE}
            />
          )}
        </>
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
