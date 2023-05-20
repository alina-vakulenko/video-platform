import { useState, useEffect } from "react";

import CourseCards from "../components/course-preview-list";
import PlaceholderCards from "../components/course-preview-list/PlaceholderCards";
import ErrorPage from "./ErrorPage";

import { useGetCoursesQuery } from "../services/courses";
import { useSavedCoursesContext } from "../context/SavedCoursesContext";

const LIMIT = 10;

const MyCoursesPage = () => {
  const { savedCoursesSlugs } = useSavedCoursesContext();

  const [myCourses, setMyCourses] = useState([]);
  const { data, isLoading, error } = useGetCoursesQuery();

  useEffect(() => {
    if (data?.courses?.length && savedCoursesSlugs.length) {
      setMyCourses(
        data.courses.filter((course) =>
          savedCoursesSlugs.includes(course.meta.slug)
        )
      );
    }
  }, [data, savedCoursesSlugs]);

  if (error) return <ErrorPage message={error.message} />;
  if (isLoading) return <PlaceholderCards quantity={LIMIT} />;

  return (
    <section className="content">
      <h1 className="text-center mb-5">
        {myCourses?.length
          ? "Your courses"
          : "You haven't started any course yet"}
      </h1>
      <CourseCards cards={myCourses} />
    </section>
  );
};

export default MyCoursesPage;
