import { useState, useEffect } from "react";
import CoursePreview from "../components/CoursePreview";
import CoursePreviewSkeleton from "../components/CoursePreviewSkeleton";
import ErrorPage from "./ErrorPage";

import { useGetCoursesQuery } from "../services/courses";

const courseLocalStoragePrefix = "lastViewd:";
const LIMIT = 10;

const MyCoursesPage = () => {
  const [savedCourseIds, setSavedCourseIds] = useState([]);
  const [myCourses, setMyCourses] = useState([]);

  const { data, isLoading, error } = useGetCoursesQuery();

  useEffect(() => {
    const getMyCoursesIds = () => {
      const lsKeys = Object.keys(localStorage);
      return lsKeys
        .filter((item) => item.startsWith("lastViewed"))
        .map((filteredItem) =>
          filteredItem.slice(courseLocalStoragePrefix.length + 1)
        );
    };

    setSavedCourseIds(getMyCoursesIds());
  }, []);

  useEffect(() => {
    if (data?.courses?.length) {
      setMyCourses(
        data.courses.filter((course) => savedCourseIds.includes(course.id))
      );
    }
  }, [data, savedCourseIds]);

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
          <h1 className="col">
            {myCourses?.length
              ? "Your courses"
              : "You haven't started any course yet"}
          </h1>
        </div>
        <div className="courses-cards">
          {myCourses?.map((item) => (
            <CoursePreview key={item.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MyCoursesPage;
