import React from "react";

import { getPagesArray } from "../utils/getPagesArray";

const Pagination = (params) => {
  const { page, totalPages, onClickPage, onClickNext, onClickPrev } = params;

  const pagesArray = getPagesArray(totalPages);

  return (
    <nav aria-label="page navigation">
      <ul className="pagination justify-content-center">
        <li
          className={page === 1 ? "page-item disabled" : "page-item"}
          onClick={() => onClickPrev()}
        >
          <button
            className="page-link"
            href="#"
            tabIndex={page === 1 ? -1 : 0}
            aria-label="Previous"
            aria-disabled={page === 1}
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {pagesArray.map((pageNumber) => (
          <li
            key={pageNumber}
            className={pageNumber === page ? "page-item active" : "page-item"}
            onClick={() => onClickPage(pageNumber)}
          >
            <button className="page-link" href="#">
              {pageNumber}
            </button>
          </li>
        ))}
        <li
          className={page === totalPages ? "page-item disabled" : "page-item"}
          onClick={() => onClickNext()}
        >
          <button
            className="page-link"
            href="#"
            tabIndex={page === totalPages ? -1 : 0}
            aria-label="Next"
            aria-disabled={page === totalPages}
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
