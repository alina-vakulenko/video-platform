import { useParams, useNavigate } from "react-router-dom";

import CourseDetails from "../components/course-details";
import Preloader from "../components/preloader/Preloader";
import ErrorPage from "./ErrorPage";

import { useGetCourseByIdQuery } from "../services/courses";

export default function CourseItemPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const {
    data: courseData,
    isLoading,
    error,
  } = useGetCourseByIdQuery(courseId);

  if (error) return <ErrorPage />;
  if (isLoading) return <Preloader />;

  return (
    <div>
      <button
        type="button"
        className="btn btn-back mt-4"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
      <CourseDetails courseData={courseData} />
    </div>
  );
}
