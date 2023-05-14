import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import CoursePreview from "../components/CoursePreview";
import CoursePreviewSkeleton from "../components/CoursePreviewSkeleton";
import Pagination from "../components/Pagination";
import ErrorPage from "./ErrorPage";
import Search from "../components/Search";

import { useGetCoursesQuery } from "../services/courses";
import { usePagination } from "../hooks/usePagination";

const LIMIT = 10;

export default function CoursesListPage() {
  const { data, isLoading, error } = useGetCoursesQuery();
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const searchParamsPage = +Object.fromEntries(searchParams.entries())?.page;

  useEffect(() => {
    setPage(searchParamsPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParamsPage]);

  const searchedCourses = useMemo(() => {
    const courses = data?.courses;
    if (searchValue && courses) {
      return data.courses.filter((course) =>
        course.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    return courses;
  }, [searchValue, data]);

  const pagination = usePagination({
    limit: LIMIT,
    totalItems: searchedCourses?.length,
  });

  const { firstIndex, lastIndex, setPage, ...paginationProps } = pagination;
  const paginatedCourses = useMemo(
    () => searchedCourses?.slice(firstIndex, lastIndex),
    [searchedCourses, firstIndex, lastIndex]
  );

  if (error) return <ErrorPage />;

  return (
    <div className="content">
      <section>
        <div className="row align-items-center mb-5">
          <h1 className="col-12 col-md-8">Find your next course</h1>
          <div className="col-12 col-md-4">
            <Search setSearchValue={setSearchValue} />
          </div>
        </div>
        <div className="courses-cards">
          {isLoading
            ? [...Array(10)].map((_, index) => (
                <CoursePreviewSkeleton key={index} />
              ))
            : paginatedCourses.map((item) => (
                <CoursePreview key={item.id} {...item} />
              ))}
        </div>
      </section>
      <Pagination {...paginationProps} />
    </div>
  );
}
