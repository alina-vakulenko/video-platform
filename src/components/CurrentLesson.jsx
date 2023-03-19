import React, { useEffect } from "react";

import LockedLesson from "./LockedLesson";
import FloatingVideo from "./FloatingVideo";

export default function CurrentLesson({ lesson, courseId }) {
  const { status, title, type, order, previewImageLink, link, duration } =
    lesson;

  const savedLessonPosition =
    JSON.parse(localStorage.getItem(lesson.id))?.currentPosition || -1;

  useEffect(() => {
    localStorage.setItem(
      courseId,
      JSON.stringify({ lessonId: lesson.id, title: lesson.title })
    );
  }, [lesson, courseId]);

  if (status === "locked") {
    return <LockedLesson />;
  }

  return (
    <>
      {type === "video" ? (
        <FloatingVideo
          videoUrl={link}
          duration={duration}
          startPosition={savedLessonPosition}
          lessonId={lesson.id}
        />
      ) : (
        <img src={`${previewImageLink}/lesson-${order}.webp`} alt={title} />
      )}
    </>
  );
}
