import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";

const trimSearchParams = (key, searchParams) => {
  const params = new URLSearchParams(searchParams);
  params.delete(key);
  return params;
};

export const useFilter = (array, { limit, searchBy }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearchValue = searchParams.get("q") || "";
  const initialTags = searchParams.getAll("tags") || [];
  const initialPage = parseInt(searchParams.get("page")) || 1;

  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [selectedTags, setSelectedTags] = useState(initialTags);
  const [page, setPage] = useState(initialPage);

  const notFirstLoad = useRef(false);

  // change search params every time search value changes
  useEffect(() => {
    if (notFirstLoad.current) {
      if (searchValue) {
        setSearchParams({ ...searchParams, q: searchValue });
      } else {
        setSearchParams(trimSearchParams("q", searchParams));
      }
    }
    notFirstLoad.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  // change search params every time page changes
  useEffect(() => {
    if (notFirstLoad.current) {
      setSearchParams({ ...searchParams, page: page });
    }
    notFirstLoad.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // change search params every time tags array changes
  useEffect(() => {
    if (notFirstLoad.current) {
      if (selectedTags.length) {
        const params = new URLSearchParams(searchParams);
        params.delete("tags");
        selectedTags.forEach((tag) => params.append("tags", tag));
        setSearchParams(params);
      } else {
        setSearchParams(trimSearchParams("tags", searchParams));
      }
    }
    notFirstLoad.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags]);

  const searchedCourses = useMemo(() => {
    if (searchValue && array?.length) {
      return array.filter((course) => {
        return course[searchBy]
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
    }
    return array;
  }, [array, searchValue, searchBy]);

  const filteredSearchedCourses = useMemo(() => {
    if (selectedTags.length && searchedCourses?.length) {
      return searchedCourses.filter((course) => {
        return course.tags.some((tag) => selectedTags.includes(tag));
      });
    }
    return searchedCourses;
  }, [selectedTags, searchedCourses]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchWithDebounce = useCallback(
    debounce((value) => {
      setSearchValue(value);
      setPage(1);
    }, 1000),
    []
  );

  const handleTagsSelection = (e) => {
    const target = e.target.childNodes[0];
    const tagName = target.textContent.toLowerCase();
    console.log(tagName);
    if (tagName === "all") {
      setSelectedTags([]);
    } else if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagName));
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
    setPage(1);
  };

  const lastIndex = page * limit;
  const firstIndex = lastIndex - limit;

  const paginatedFilteredCourses = useMemo(
    () => filteredSearchedCourses?.slice(firstIndex, lastIndex),
    [filteredSearchedCourses, firstIndex, lastIndex]
  );

  const paginationProps = {
    totalPages: Math.ceil(filteredSearchedCourses?.length / limit),
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

  return [
    paginatedFilteredCourses,
    paginationProps,
    searchWithDebounce,
    handleTagsSelection,
    selectedTags,
  ];
};
