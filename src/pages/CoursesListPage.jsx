import { useEffect, useState } from "react";

import CoursePreview from "../components/CoursePreview";
import CoursePreviewSkeleton from "../components/CoursePreviewSkeleton";
import Pagination from "../components/Pagination";
import ErrorPage from "./ErrorPage";
import Search from "../components/Search";

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

  const isTagActive = (tagName, selectedTags) => {
    const tag = tagName.toLowerCase();
    return selectedTags.includes(tag)
      ? "active"
      : tag === "all" && selectedTags.length === 0
      ? "active"
      : "";
  };

  if (error) return <ErrorPage message={error.message} />;
  if (isLoading)
    return (
      <div className="courses-cards">
        {[...Array(LIMIT)].map((_, index) => (
          <CoursePreviewSkeleton key={index} />
        ))}
      </div>
    );

  return (
    <div className="content">
      <section>
        <div className="row align-items-center mb-5">
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
            <ul className="tags-array">
              {tags?.map(([tag, count]) => (
                <li key={tag} className={isTagActive(tag, selectedTags)}>
                  <button onClick={handleTagsSelection}>
                    {tag.toUpperCase()[0].concat(tag.slice(1).toLowerCase())}
                    <span className="badge-circle">
                      <span className="badge-count">{count}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="courses-cards">
          {paginatedCourses?.map((item) => (
            <CoursePreview key={item.id} {...item} />
          ))}
        </div>
      </section>
      <Pagination {...paginationProps} />
    </div>
  );
}
