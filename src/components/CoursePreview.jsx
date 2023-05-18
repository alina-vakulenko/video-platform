import { Link } from "react-router-dom";

import VideoPlayer from "./VideoPlayer";
import { useSavedCoursesContext } from "../context/SavedCoursesContext";
import { formatVideoDuration } from "../utils/handleVideoDuration";
import { FaCheckSquare, FaStar, FaClipboardList } from "react-icons/fa";

export default function CoursePreview({
  id,
  previewImageLink,
  title,
  rating,
  meta,
  lessonsCount,
  duration,
  tags,
}) {
  const metaContains = (keyToSearch) => {
    return Object.keys(meta).find((key) => key === keyToSearch);
  };

  const saveNewCourse = () => {
    if (!savedCourseIds.includes(id)) {
      setSavedCourseIds([...savedCourseIds, id]);
    }
  };
  const { savedCourseIds, setSavedCourseIds } = useSavedCoursesContext();
  return (
    <article className="card w-100">
      <div className="card-img-wrapper">
        {metaContains("courseVideoPreview") ? (
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
        <span className="tag">{tags[0]}</span>
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-3">{title}</h5>
        <span className="card-text">
          {<FaStar />}Rating: {rating}
        </span>
        <span className="card-text">
          <FaClipboardList />
          Program: {lessonsCount} lessons, duration{" "}
          {formatVideoDuration(duration)}
        </span>
        {metaContains("skills") && (
          <div className="card-text mt-3 mb-3">
            <strong>Skills you will work on:</strong>
            <ul className="mt-1">
              {meta.skills.map((skill) => (
                <li key={skill} className="text-capitalize">
                  <FaCheckSquare /> {skill}
                </li>
              ))}{" "}
            </ul>
          </div>
        )}
        <div className="card-link d-block mt-auto ms-auto">
          <Link
            to={`/courses/${id}`}
            className="btn btn-primary"
            onClick={saveNewCourse}
          >
            {savedCourseIds?.includes(id) ? "Continue course" : "Start course"}
          </Link>
        </div>
      </div>
    </article>
  );
}
