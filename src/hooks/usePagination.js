import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import { updateSearchParams } from "../utils/handleSearchParams";

export const usePagination = (items, limit) => {
  const [paginatedItems, setPaginatedItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initialPage);
  const firstLoad = useRef(true);

  useEffect(() => {
    // change search params every time page changes
    if (!firstLoad.current) {
      setSearchParams(updateSearchParams("page", page, searchParams));
    }
    firstLoad.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    const lastIndex = page * limit;
    const firstIndex = lastIndex - limit;
    setPaginatedItems(items?.slice(firstIndex, lastIndex));
  }, [items, page, limit]);

  const paginationProps = {
    page,
    totalPages: Math.ceil(items?.length / limit),
    onClickNext() {
      if (page < items.length / limit) {
        setPage((prev) => prev + 1);
      }
    },
    onClickPrev() {
      if (page > 1) {
        setPage((prev) => prev - 1);
      }
    },
    onClickPage(p) {
      setPage(p);
    },
  };

  return {
    paginatedItems,
    setPage,
    paginationProps,
  };
};
