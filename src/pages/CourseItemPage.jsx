import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchCourseById } from "../features/currentCourse/fetchCourseById";
import { selectCurrentCourse } from "../features/currentCourse/currentCourseSlice";

import CourseDetails from "../components/CourseDetails";
import ErrorPage from "./ErrorPage";

import { STATUS } from "../utils/fetchStatus";

export default function CourseItemPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseData, status } = useSelector(selectCurrentCourse);

  useEffect(() => {
    dispatch(fetchCourseById(courseId));
  }, [courseId, dispatch]);

  if (status === STATUS.REJECTED) return <ErrorPage />;

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary mt-4"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
      {status === STATUS.FULFILLED && <CourseDetails courseData={courseData} />}
    </div>
  );
}
