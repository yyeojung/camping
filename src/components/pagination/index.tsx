import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

const PageWrap = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;

  li {
    line-height: 2.8rem;
    min-width: 2.8rem;
    padding: 0 0.6rem;
    height: 2.8rem;
    cursor: pointer;

    svg {
      vertical-align: text-top;
    }
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
  const noPrev = currentPage === 1; // 이전 페이지가 없는 경우
  const noNext = currentPage === totalPages; // 다음 페이지가 없는 경우

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

  // 페이지 이동 버튼
  const onCickMovePage = (type: "first" | "prev" | "next" | "last"): void => {
    if (type === "first" && !noPrev) {
      onClick(1);
    } else if (type === "prev" && !noPrev) {
      onClick(currentPage - 1);
    } else if (type === "next" && !noNext) {
      onClick(currentPage + 1);
    } else if (type === "last" && !noNext) {
      onClick(totalPages);
    }
  };
  //   const onClickPrev = () => {
  //     if (!noPrev) {
  //       onClick(currentPage - 1);
  //     }
  //   };

  //   const onClickNext = () => {
  //     if (!noNext) {
  //       onClick(currentPage + 1);
  //     }
  //   };
  return (
    <PageWrap>
      <li
        onClick={() => {
          onCickMovePage("first");
        }}
        className={`first ${noPrev ? "disabled" : ""}`}
      >
        <FiChevronsLeft />
      </li>
      <li
        onClick={() => {
          onCickMovePage("prev");
        }}
        className={`prev ${noPrev ? "disabled" : ""}`}
      >
        <FiChevronLeft />
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
        onClick={() => {
          onCickMovePage("next");
        }}
        className={`next ${noNext ? "disabled" : ""}`}
      >
        <FiChevronRight />
      </li>
      <li
        onClick={() => {
          onCickMovePage("last");
        }}
        className={`last ${noNext ? "disabled" : ""}`}
      >
        <FiChevronsRight />
      </li>
    </PageWrap>
  );
}
