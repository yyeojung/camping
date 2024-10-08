import SubContents from "@/commons/layout/subContents";
import SubTitle from "@/commons/layout/subTitle";
import { type IReviewType } from "@/commons/type/commonType";
import Button from "@/components/button";
import Loading from "@/components/Loading";
import { Modal } from "@/components/modal";
import NoData from "@/components/noData";
import Pagination from "@/components/pagination";
import { useAuth } from "@/contexts/authContext";
import { getReview } from "@/firebase/review";
import { useModal } from "@/hooks/useModal";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Wrap = styled.div``;

const ReviewWrap = styled.div`
  padding-top: 4rem;

  .btn_wrap {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
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
    cursor: pointer;
    &:hover {
      background: rgba(218, 227, 202, 0.2);
    }

    td {
      line-height: 1.3;
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

      .title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 72rem;
      }

      &:not(:nth-of-type(2)) {
        text-align: center;
      }
    }
  }
`;
export default function CampingReview() {
  const [loading, setLoading] = useState<boolean>(false);
  const [reviewList, setReviewList] = useState<IReviewType[]>([]);
  const { currentModal, openModal } = useModal();
  const { user } = useAuth();
  const router = useRouter();
  const [pageList, setPageList] = useState<IReviewType[]>([]); // 페이지 리스트당 캠핑장후기 데이터
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 번호

  const fetchItem = async () => {
    setLoading(true);

    const items = await getReview();
    setReviewList(items);
    if (items) {
      // 페이지네이션
      const paginatedItems = items.slice(
        (currentPage - 1) * PER_PAGE,
        currentPage * PER_PAGE,
      );
      setPageList(paginatedItems);
    }

    setLoading(false);
  };

  useEffect(() => {
    void fetchItem();
  }, [currentPage]);

  // 글쓰기 버튼 모달 닫기
  const closeRegisterModal = () => {
    router.back();
    setTimeout(() => {
      void router.push("/login");
    }, 100);
  };

  // 캠핑 후기 보기 링크
  const onClickReview = (docId: string) => {
    void router.push(`/reviewBoard/${docId}`);
  };

  // 페이지네이션
  const totalCount = reviewList.length;
  const PER_PAGE = 10;
  const pageCount = Math.ceil(totalCount / PER_PAGE);

  const onClickPage = (selected: number) => {
    setCurrentPage(selected);
  };

  return (
    <Wrap>
      <SubTitle>
        <h2>요즘 캠핑 후기</h2>
      </SubTitle>
      {loading ? (
        <SubContents>
          <Loading />
        </SubContents>
      ) : pageList && pageList.length > 0 ? (
        <>
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
                {pageList.map((item, index) => (
                  <tr
                    key={item.docId}
                    onClick={() => {
                      onClickReview(item.docId ?? item.contentId);
                    }}
                  >
                    <td>
                      <strong>{item.facltNm}</strong>
                    </td>
                    <td>
                      <p className="title">{item.title}</p>
                    </td>
                    <td>
                      <p className="writer">{item.writer}</p>
                    </td>
                    <td>{item.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="btn_wrap">
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
          </ReviewWrap>

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
        <SubContents>
          <NoData>
            <p>작성된 후기가 없습니다.</p>
          </NoData>
        </SubContents>
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
