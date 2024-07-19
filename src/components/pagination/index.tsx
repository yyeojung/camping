import styled from "@emotion/styled";
import { useState, useEffect } from "react";

const PageWrap = styled.ul`
  display: flex;

  li {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;
interface IPropsPage {
  totalItems: number;
  itemCountPerPage: number;
  pageCount: number;
  currentPage: number;
  onClick: (event: React.MouseEvent<HTMLLIElement>, selected: number) => void;
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
      setStart((prev) =>
        Math.min(prev + pageCount, totalPages - pageCount + 1),
      );
    } else if (currentPage < start) {
      setStart((prev) => Math.max(prev - pageCount, 1));
    }
  }, [currentPage, pageCount, totalPages, start]);

  return (
    <PageWrap>
      <li className={`prev ${noPrev}&& 'invisible`}>이전</li>
      {[...Array(pageCount)].map((_, i) => {
        const pageNumber = start + i;
        return (
          pageNumber <= totalPages && (
            <li
              onClick={(event) => {
                onClick(event, pageNumber);
              }}
              key={pageNumber}
            >
              {pageNumber}
            </li>
          )
        );
      })}
      <li className={`next ${noNext}&& 'invisible`}>다음</li>
    </PageWrap>
  );
}
