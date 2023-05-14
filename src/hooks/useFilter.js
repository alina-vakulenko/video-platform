import { useState, useEffect, useRef, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useFilter = (array, { limit, searchBy }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const initialSearchValue = params.q || "";
  const initialPage = +params.page || 1;
  const [page, setPage] = useState(initialPage);
  const [searchValue, setSearchValue] = useState(initialSearchValue);

  const firstLoad = useRef(false);

  useEffect(() => {
    const removeSearchKey = (key) => {
      const param = searchParams.get(key);
      if (param) {
        searchParams.delete(key);
        setSearchParams(searchParams);
      }
    };

    if (firstLoad.current) {
      if (searchValue) {
        setSearchParams({ q: searchValue });
        setPage(1);
      } else {
        removeSearchKey("q");
      }
    }
    firstLoad.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  useEffect(() => {
    if (firstLoad.current) {
      setSearchParams({ ...params, page: page });
    }
    firstLoad.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const filteredArray = useMemo(() => {
    if (searchValue && array?.length) {
      return array.filter((course) => {
        return course[searchBy]
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
    }
    return array;
  }, [array, searchValue, searchBy]);

  const lastIndex = page * limit;
  const firstIndex = lastIndex - limit;

  const paginatedCourses = useMemo(
    () => filteredArray?.slice(firstIndex, lastIndex),
    [filteredArray, firstIndex, lastIndex]
  );

  const paginationProps = {
    totalPages: Math.ceil(filteredArray?.length / limit),
    page,
    onClickNext() {
      setPage((prev) => prev + 1);
    },
    onClickPrev() {
      setPage((prev) => prev - 1);
    },
    onClickPage(p) {
      setPage(p);
    },
  };

  return [paginatedCourses, setSearchValue, paginationProps];
};
