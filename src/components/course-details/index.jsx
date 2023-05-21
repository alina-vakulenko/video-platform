import { useState } from "react";

import { FcCalendar } from "react-icons/fc";

import LessonPreview from "./LessonPreview";
import CurrentLesson from "./current-lesson";
import Progress from "../Progress";

import { useCourseProgress } from "../../hooks/useCourseProgress";
import { formatIsoDate } from "../../utils/handleDate";

export default function CourseDetails({ courseData }) {
  const lastViewedLessonId =
    localStorage.getItem(`lastViewed:${courseData.meta.slug}`) ||
    courseData.lessons[0].id;

  const [activeLessonId, setActiveLessonId] = useState(lastViewedLessonId);

  const activeLesson = courseData.lessons.find(
    (lesson) => lesson.id === activeLessonId
  );

  const courseProgress = useCourseProgress(
    `[${courseData.meta.slug}]`,
    courseData.duration
  );

  return (
    <section className="content course-content">
      <h1 className="mb-3">{courseData.title}</h1>
      <Progress progress={courseProgress} />
      <div className="about mt-4">
        <p className="h4">{courseData.description}</p>
        <p className="d-flex align-items-center">
          <FcCalendar /> {courseData.status}{" "}
          {formatIsoDate(courseData.launchDate)}
        </p>
        <ul className="list-unstyled text-muted mt-3">
          {courseData.tags.map((tag) => (
            <li key={tag}>{`#${tag}`}</li>
          ))}
        </ul>
      </div>
      <h3>
        Lesson {activeLesson.order}. {activeLesson.title}
      </h3>
      <div className="row">
        <article className="col-lg-8 course-content__current-lesson">
          <div className="media">
            <CurrentLesson
              lesson={activeLesson}
              courseSlug={courseData.meta.slug}
            />
          </div>
        </article>
        <ul className="col-lg-4 course-content__lessons-list">
          {courseData.lessons.map((lesson) => (
            <LessonPreview
              key={lesson.id}
              lesson={lesson}
              courseSlug={courseData.meta.slug}
              active={lesson.id === activeLessonId}
              setActive={setActiveLessonId}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
