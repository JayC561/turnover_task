import React from "react";
import ReactPaginate from "react-paginate";

const Pagination: React.FC<{ pages: number }> = ({ pages }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={() => {}}
      pageRangeDisplayed={7}
      pageCount={pages}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
