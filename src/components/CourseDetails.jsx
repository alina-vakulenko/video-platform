import { useState } from "react";

import LessonPreview from "./LessonPreview";
import CurrentLesson from "./CurrentLesson";

import { formatIsoDate } from "../utils/handleDate";

export default function CourseDetails({ courseData }) {
  const savedLessonId =
    localStorage.getItem(`lastViewed:${courseData.id}`) ||
    courseData.lessons[0].id;

  const [activeLessonId, setActiveLessonId] = useState(savedLessonId);
  const activeLesson = courseData.lessons.find(
    (lesson) => lesson.id === activeLessonId
  );

  return (
    <section className="content course-content">
      <h1 className="mb-3">{courseData.title}</h1>
      <span>📅Launch date: {formatIsoDate(courseData.launchDate)}</span>
      <div className="about mt-4">
        <h6>{courseData.description}</h6>

        <ul className="list-unstyled text-muted mt-3">
          {courseData.tags?.map((tag) => (
            <li key={tag}>#{tag}</li>
          ))}
        </ul>
      </div>
      <h3>
        Lesson {activeLesson.order}. {activeLesson.title}
      </h3>
      <div className="row">
        <article className="col-lg-8 course-content__current-lesson">
          <div className="media">
            <CurrentLesson lesson={activeLesson} courseId={courseData.id} />
          </div>
        </article>
        <ul className="col-lg-4 course-content__lessons-list">
          {courseData.lessons.map((lesson) => (
            <LessonPreview
              key={lesson.id}
              lesson={lesson}
              active={lesson.id === activeLessonId}
              setActive={setActiveLessonId}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
