import { useParams, useNavigate } from "react-router-dom";

import CourseDetails from "../components/CourseDetails";
import ErrorPage from "./ErrorPage";

import { useGetCourseByIdQuery } from "../services/courses";

export default function CourseItemPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const {
    data: courseData,
    isSuccess,
    error,
  } = useGetCourseByIdQuery(courseId);

  if (error) return <ErrorPage />;

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary mt-4"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
      {isSuccess && <CourseDetails courseData={courseData} />}
    </div>
  );
}
