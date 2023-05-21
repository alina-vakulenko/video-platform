import { useEffect, useState } from "react";

import CourseCards from "../components/course-preview-list";
import PlaceholderCards from "../components/course-preview-list/PlaceholderCards";
import Tags from "../components/Tags";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import ErrorPage from "./ErrorPage";

import { useGetCoursesQuery } from "../services/courses";
import { useFilter } from "../hooks/useFilter";

const LIMIT = 10;

export default function CoursesListPage() {
  const { data, isLoading, error } = useGetCoursesQuery();
  const [tags, setTags] = useState([]);
  const {
    searchedCourses,
    paginatedCourses,
    paginationProps,
    searchWithDebounce,
    handleTagsSelection,
    selectedTags,
  } = useFilter(data?.courses, {
    limit: LIMIT,
    searchBy: "title",
  });

  useEffect(() => {
    const getUniqueAttribValuesWithCount = (objects, key) => {
      const counts = new Map();

      objects.forEach((object) => {
        if (object.hasOwnProperty(key)) {
          if (Array.isArray(object[key])) {
            object[key].forEach((tag) => {
              const count = counts.get(tag) || 0;
              counts.set(tag, count + 1);
            });
          } else if (typeof object[key] === "string") {
            const count = counts.get(object[key]) || 0;
            counts.set(object[key], count + 1);
          }
        }
      });
      if (counts.size > 1) {
        counts.set("all", objects.length);
      }
      return Array.from(counts);
    };

    if (searchedCourses?.length) {
      const uniqueTagsWithCount = getUniqueAttribValuesWithCount(
        searchedCourses,
        "tags"
      );

      setTags(uniqueTagsWithCount);
    }
  }, [searchedCourses]);

  if (error) return <ErrorPage message={error.message} />;
  if (isLoading) return <PlaceholderCards quantity={LIMIT} />;

  return (
    <section className="content">
      <div className="row align-items-center mb-3 md-md-5">
        <h1 className="col-12 col-md-8">
          {paginatedCourses?.length
            ? "Find your next course"
            : "No courses found"}
        </h1>
        <div className="col-12 col-md-4">
          <Search searchWithDebounce={searchWithDebounce} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Tags
            tags={tags}
            selectedTags={selectedTags}
            handleTagsSelection={handleTagsSelection}
          />
        </div>
      </div>
      <CourseCards cards={paginatedCourses} />
      <Pagination {...paginationProps} />
    </section>
  );
}
