import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const usePagination = ({ limit, totalItems }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const urlPage = +params.page;
  const [page, setPage] = useState(urlPage || 1);

  useEffect(() => {
    setSearchParams({ ...params, page: page });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const totalPages = Math.ceil(totalItems / limit);

  const lastIndex = page * limit;
  const firstIndex = lastIndex - limit;

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
    setPage,
    totalPages,
    firstIndex,
    lastIndex,
    onClickNext,
    onClickPrev,
    onClickPage,
  };
};
