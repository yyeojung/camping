import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// https://stackoverflow.com/questions/69130390/how-to-set-callback-function-as-prop-for-react-paginate-and-typescript

interface IPropsPage {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  currentPage: number;
}

export default function Pagination({ pageCount, onPageChange }: IPropsPage) {
  return (
    <ReactPaginate
      previousLabel={<FiChevronLeft />}
      nextLabel={<FiChevronRight />}
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName={"pagination"}
      pageLinkClassName={"pagination__link"}
      activeLinkClassName={"pagination__link__active"}
    />
  );
}
