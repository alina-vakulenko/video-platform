import { formatDuration } from "../../utils/handleDuration";

export default function LessonPreview({
  courseSlug,
  lesson,
  active,
  setActive,
}) {
  const getProgressRate = () => {
    const progress = localStorage.getItem(`[${courseSlug}]${lesson.id}`);
    if (progress && progress > 0 && lesson.duration > 0) {
      return (parseFloat(progress) / lesson.duration) * 100;
    }
    return 0;
  };

  const progressRate = getProgressRate();

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
      <p className="lesson-progress">
        {progressRate > 0 && `${progressRate.toFixed(0)}%`}
      </p>
      <p className="lesson-duration">{formatDuration(lesson.duration)}</p>
      {lesson.status === "locked" ? <span>🔐</span> : null}
    </li>
  );
}
