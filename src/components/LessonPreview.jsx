import { formatVideoDuration } from "../utils/handleVideoDuration";

export default function LessonPreview({ lesson, active, setActive }) {
  return (
    <li
      onClick={() => setActive(lesson.id)}
      className={active ? "lesson-preview active" : "lesson-preview"}
    >
      <div className="media">
        <img
          src={`${lesson.previewImageLink}/lesson-${lesson.order}.webp`}
          alt={lesson.title}
        />
      </div>
      <h4>
        {lesson.order}. {lesson.title}
      </h4>
      <p className="lesson-duration">{formatVideoDuration(lesson.duration)}</p>
      {lesson.status === "locked" ? <span>🔐</span> : null}
    </li>
  );
}
