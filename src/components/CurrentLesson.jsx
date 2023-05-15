import { useEffect } from "react";

import LockedLesson from "./LockedLesson";
import FloatingVideo from "./FloatingVideo";

export default function CurrentLesson({ lesson, courseId }) {
  const { id, status, title, type, order, previewImageLink, link } = lesson;

  // Save current lesson to localStorage as last viewed video from the course
  useEffect(() => {
    localStorage.setItem(`lastViewed:${courseId}`, id);
  }, [id, courseId]);

  if (status === "locked") {
    return <LockedLesson />;
  }

  return (
    <>
      {type === "video" ? (
        <FloatingVideo videoUrl={link} />
      ) : (
        <img src={`${previewImageLink}/lesson-${order}.webp`} alt={title} />
      )}
    </>
  );
}
