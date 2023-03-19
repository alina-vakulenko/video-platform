import { useState } from "react";

export const usePagination = ({ itemsPerPage, totalItems }) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const lastContentIndex = page * itemsPerPage;
  const firstContentIndex = lastContentIndex - itemsPerPage;

  const onClickNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const onClickPrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const onClickPage = (p) => {
    if (p > 0 && p <= totalPages) {
      setPage(p);
    }
  };

  return {
    page,
    totalPages,
    firstContentIndex,
    lastContentIndex,
    onClickNext,
    onClickPrev,
    onClickPage,
  };
};
