import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PageWrap = styled.ul`
  display: flex;
  justify-content: center;
  text-align: center;

  li {
    line-height: 2.8rem;
    min-width: 2.8rem;
    height: 2.8rem;
    cursor: pointer;

    &.disabled svg {
      stroke: #ccc;
    }
    &.select {
      background: #67794a;
      color: #fff;
      border-radius: 50%;
    }
  }
`;
interface IPropsPage {
  totalItems: number;
  itemCountPerPage: number;
  pageCount: number;
  currentPage: number;
  onClick: (selected: number) => void;
}

export default function Pagination({
  totalItems,
  itemCountPerPage,
  pageCount,
  onClick,
  currentPage,
}: IPropsPage) {
  const totalPages = Math.ceil(totalItems / itemCountPerPage); // 총 페이지 개수
  const [start, setStart] = useState<number>(1); // 시작 페이지
  const noPrev = start === 1; // 이전 페이지가 없는 경우
  const noNext = start + pageCount - 1 >= totalPages; // 다음 페이지가 없는 경우

  useEffect(() => {
    if (currentPage >= start + pageCount) {
      // 페이지 카운트 다음 페이지로 갈떄
      setStart((prev) =>
        Math.min(prev + pageCount, totalPages - pageCount + 1),
      );
    } else if (currentPage < start) {
      // 페이지 카운트 이전 페이지로 갈 떄
      setStart((prev) => Math.max(prev - pageCount, 1));
    }
  }, [currentPage, pageCount, totalPages, start]);

  const handlePrevClick = () => {
    if (!noPrev) {
      onClick(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (!noNext) {
      onClick(currentPage + 1);
    }
  };
  return (
    <PageWrap>
      <li
        onClick={handlePrevClick}
        className={`prev ${noPrev ? "disabled" : ""}`}
      >
        <FiChevronLeft style={{ verticalAlign: "text-top" }} />
      </li>
      {[...Array(pageCount)].map((_, i) => {
        const pageNumber = start + i;
        return (
          pageNumber <= totalPages && (
            <li
              className={`${currentPage === pageNumber ? "select" : ""}`}
              onClick={() => {
                onClick(pageNumber);
              }}
              key={pageNumber}
            >
              {pageNumber}
            </li>
          )
        );
      })}
      <li
        onClick={handleNextClick}
        className={`next ${noNext ? "disabled" : ""}`}
      >
        <FiChevronRight style={{ verticalAlign: "text-top" }} />
      </li>
    </PageWrap>
  );
}
