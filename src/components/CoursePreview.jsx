import { Link } from "react-router-dom";

import VideoPlayer from "./VideoPlayer";
import { useSavedCoursesContext } from "../context/SavedCoursesContext";
import { useCourseProgress } from "../hooks/useCourseProgress";
import { formatDuration } from "../utils/handleDuration";
import { FaCheckSquare, FaStar, FaClipboardList } from "react-icons/fa";
import { BsFileEarmarkLock2Fill } from "react-icons/bs";

export default function CoursePreview({
  id,
  previewImageLink,
  title,
  rating,
  meta,
  lessonsCount,
  duration,
  tags,
  containsLockedLessons,
}) {
  const { savedCoursesSlugs, setSavedCoursesSlugs } = useSavedCoursesContext();
  const courseProgress = useCourseProgress(`[${meta.slug}]`, duration);

  const saveNewCourse = () => {
    if (!savedCoursesSlugs.includes(meta.slug)) {
      setSavedCoursesSlugs([...savedCoursesSlugs, meta.slug]);
    }
  };

  return (
    <article className="card w-100">
      <div className="card-img-wrapper">
        {meta.courseVideoPreview?.duration ? (
          <VideoPlayer
            videoUrl={meta.courseVideoPreview.link}
            poster={`${previewImageLink}/cover.webp`}
            muted
            className="card-img"
          />
        ) : (
          <img
            src={`${previewImageLink}/cover.webp`}
            alt={title}
            className="card-img"
          />
        )}
        {tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-3">{title}</h5>
        <ul>
          <li className="card-text">
            {<FaStar />}Rating: {rating}
          </li>
          <li className="card-text">
            <FaClipboardList />
            Program: {lessonsCount} lessons, duration {formatDuration(duration)}
          </li>
          {containsLockedLessons && (
            <li className="card-text">
              <BsFileEarmarkLock2Fill />
              Contains locked lessons
            </li>
          )}
          {meta.skills?.length && (
            <li className="mt-3 mb-3">
              <strong>Skills you will work on:</strong>
              <ul className="mt-1">
                {meta.skills.map((skill) => (
                  <li key={skill} className="text-capitalize">
                    <FaCheckSquare /> {skill}
                  </li>
                ))}{" "}
              </ul>
            </li>
          )}
        </ul>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          {courseProgress > 0 && (
            <div className="progress w-50">
              <div
                className="progress-bar course-card-progress"
                role="progressbar"
                style={{ width: `${courseProgress.toFixed(0)}%` }}
                aria-valuenow={courseProgress.toFixed(0)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                {`${courseProgress.toFixed(0)}%`}
              </div>
            </div>
          )}
          <Link
            to={`/courses/${id}`}
            className="btn course-card-btn ms-auto"
            onClick={saveNewCourse}
          >
            {!savedCoursesSlugs?.includes(meta.slug)
              ? "Start course"
              : courseProgress > 99.9
              ? "Course completed"
              : "Continue course"}
          </Link>
        </div>
      </div>
    </article>
  );
}
