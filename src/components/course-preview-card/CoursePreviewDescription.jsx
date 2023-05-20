import { FaCheckSquare, FaStar, FaClipboardList } from "react-icons/fa";
import { BsFileEarmarkLock2Fill } from "react-icons/bs";

import { formatDuration } from "../../utils/handleDuration";

const CoursePreviewDescription = ({
  rating,
  lessonsCount,
  containsLockedLessons,
  duration,
  skills,
}) => {
  return (
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
      {skills.length > 0 && (
        <li className="mt-3 mb-3">
          <strong>Skills you will work on:</strong>
          <ul className="mt-1">
            {skills.map((skill) => (
              <li
                key={skill}
                className="text-capitalize d-flex align-items-center"
              >
                <FaCheckSquare /> {skill}
              </li>
            ))}
          </ul>
        </li>
      )}
    </ul>
  );
};

export default CoursePreviewDescription;
