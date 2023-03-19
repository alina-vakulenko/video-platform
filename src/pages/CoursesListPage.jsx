import React, { useMemo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import CoursePreview from "../components/CoursePreview";
import CoursePreviewSkeleton from "../components/CoursePreviewSkeleton";
import Pagination from "../components/Pagination";
import ErrorPage from "./ErrorPage";
import Search from "../components/Search";

import { fetchCourses } from "../features/courses/fetchCourses";
import { selectCourses } from "../features/courses/coursesSlice";
import { usePagination } from "../hooks/usePagination";
import { STATUS } from "../utils/fetchStatus";

export default function CoursesListPage() {
  const dispatch = useDispatch();
  const { items, status } = useSelector(selectCourses);

  const [searchValue, setSearchValue] = useState(""); //updated with a lag

  const searchedItems = useMemo(() => {
    if (searchValue) {
      return items.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    return items;
  }, [searchValue, items]);

  const pagination = usePagination({
    itemsPerPage: 10,
    totalItems: searchedItems.length,
  });

  const { firstContentIndex, lastContentIndex } = pagination;
  const courses = searchedItems.slice(firstContentIndex, lastContentIndex);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (status === STATUS.REJECTED) return <ErrorPage />;

  return (
    <div className="content">
      <section>
        <Search setSearchValue={setSearchValue} />
        <h1 className="mb-3">Find your next course</h1>
        <div className="courses-cards">
          {status === STATUS.PENDING
            ? [...Array(10)].map((_, index) => (
                <CoursePreviewSkeleton key={index} />
              ))
            : courses.map((item) => <CoursePreview key={item.id} {...item} />)}
        </div>
      </section>
      <Pagination {...pagination} />
    </div>
  );
}
