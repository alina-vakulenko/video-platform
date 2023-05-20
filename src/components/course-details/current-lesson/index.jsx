import { useEffect } from "react";

import LockedLesson from "./LockedLesson";
import VideoLesson from "./VideoLesson";

export default function CurrentLesson({ lesson, courseSlug }) {
  const {
    id,
    status,
    title,
    type,
    order,
    previewImageLink,
    link,
    duration,
    meta,
  } = lesson;

  useEffect(() => {
    // Save current lesson to localStorage as last viewed within the course
    localStorage.setItem(`lastViewed:${courseSlug}`, id);
    // Save current lesson to localStorage as started
    // if type of lesson is not video, consider lesson as completed
    // if type of lesson is video, <VideoLesson/> component will handle local storage logic
    if (type !== "video") {
      localStorage.setItem(
        `[${courseSlug}]${id}`,
        status === "locked" ? 0 : duration
      );
    }
  }, [id, duration, type, status, courseSlug]);

  if (status === "locked") {
    return <LockedLesson />;
  }

  if (type !== "video") {
    return (
      <>
        {meta && meta.difficulty && <span>{meta.difficulty}</span>}
        <img src={`${previewImageLink}/lesson-${order}.webp`} alt={title} />
      </>
    );
  }

  return <VideoLesson courseSlug={courseSlug} lessonId={id} link={link} />;
}
