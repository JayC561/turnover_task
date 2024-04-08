import React from "react";
import ReactPaginate from "react-paginate";
import "../css/pagination.css";

const Pagination: React.FC<{
  pages: number;
  handlePageClick: (page: number) => void;
}> = ({ pages, handlePageClick }) => {
  return (
    <ReactPaginate
      containerClassName="pagination"
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => handlePageClick(event.selected)}
      pageRangeDisplayed={7}
      pageCount={pages}
      previousLabel="<"
      renderOnZeroPageCount={null}
      pageClassName="page"
      activeClassName="active"
      nextLinkClassName="next-page"
      previousLinkClassName="previous-page"
      disabledLinkClassName="disabled"
    />
  );
};

export default Pagination;
