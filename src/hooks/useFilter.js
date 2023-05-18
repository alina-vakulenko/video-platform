import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";

import { usePagination } from "./usePagination";
import {
  trimSearchParams,
  updateSearchParams,
} from "../utils/handleSearchParams";

export const useFilter = (array, { limit, searchBy }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearchValue = searchParams.get("q") || "";
  const initialTags = searchParams.getAll("tags") || [];

  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [selectedTags, setSelectedTags] = useState(initialTags);

  const [searchedCourses, setSearchedCourses] = useState([]);
  const [searchedFilteredCourses, setSearchedFilteredCourses] = useState([]);

  const {
    setPage,
    paginatedItems: paginatedCourses,
    paginationProps,
  } = usePagination(searchedFilteredCourses, limit);

  const notFirstLoad = useRef(false);

  useEffect(() => {
    // change search params every time search value changes, clear "q" key if search value is empty
    if (notFirstLoad.current) {
      if (searchValue) {
        setSearchParams(
          updateSearchParams(
            "q",
            searchValue,
            trimSearchParams("page", searchParams)
          )
        );
      } else {
        setSearchParams(trimSearchParams("q", searchParams));
      }
    }
    notFirstLoad.current = true;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  useEffect(() => {
    // change search params every time tags array changes, remove "tags" key if tags are not selected (selected "all")
    if (notFirstLoad.current) {
      if (selectedTags.length) {
        const params = new URLSearchParams(searchParams);
        params?.delete("tags");
        params?.delete("page");
        selectedTags.forEach((tag) => params?.append("tags", tag));
        setSearchParams(params);
      } else {
        setSearchParams(trimSearchParams("tags", searchParams));
      }
    }
    notFirstLoad.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags]);

  useEffect(() => {
    if (array?.length) {
      searchValue
        ? setSearchedCourses(
            array?.filter((course) => {
              return course[searchBy]
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            })
          )
        : setSearchedCourses(array);
    }
  }, [searchValue, searchBy, array]);

  useEffect(() => {
    if (searchedCourses.length) {
      selectedTags.length
        ? setSearchedFilteredCourses(
            searchedCourses.filter((course) => {
              return course.tags.some((tag) => selectedTags.includes(tag));
            })
          )
        : setSearchedFilteredCourses(searchedCourses);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedCourses, selectedTags]);

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
    if (tagName === "all") {
      setSelectedTags([]);
    } else if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagName));
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
    setPage(1);
  };

  return {
    searchedCourses,
    paginatedCourses,
    paginationProps,
    searchWithDebounce,
    handleTagsSelection,
    selectedTags,
  };
};
