import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styled from "@emotion/styled";

// https://stackoverflow.com/questions/69130390/how-to-set-callback-function-as-prop-for-react-paginate-and-typescript

const PageWrap = styled.div`
  .pagination {
    margin-top: 2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 1rem;

    > * {
      cursor: pointer;
    }
  }

  .pagination__link {
    transition: all 0.25s;
    padding: 0.2rem 0.6rem;
    border-radius: 0.3rem;
  }

  .pagination__link__active {
    background-color: #bbb;
    color: #fefefe;
  }
`;
interface IPropsPage {
  pageCount: number;
  onPageChange: (selected: { selected: number }) => void;
  currentPage: number;
}

export default function Pagination({
  pageCount,
  onPageChange,
  currentPage,
}: IPropsPage) {
  return (
    <PageWrap>
      <ReactPaginate
        previousLabel={<FiChevronLeft />}
        nextLabel={<FiChevronRight />}
        pageCount={pageCount}
        onPageChange={onPageChange}
        containerClassName={"pagination"}
        pageLinkClassName={"pagination__link"}
        activeLinkClassName={"pagination__link__active"}
        forcePage={currentPage}
      />
    </PageWrap>
  );
}
