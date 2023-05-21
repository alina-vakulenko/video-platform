import { Link } from "react-router-dom";

import CoursePreviewMedia from "./CoursePreviewMedia";
import CoursePreviewDescription from "./CoursePreviewDescription";
import Progress from "../Progress";
import { useSavedCoursesContext } from "../../context/SavedCoursesContext";
import { useCourseProgress } from "../../hooks/useCourseProgress";

export default function CoursePreview({
  id,
  previewImageLink,
  title,
  meta,
  duration,
  tags,
  ...otherCourseAttribs
}) {
  const { savedCoursesSlugs, setSavedCoursesSlugs } = useSavedCoursesContext();
  const courseProgress = useCourseProgress(`[${meta.slug}]`, duration);

  const saveNewCourse = () => {
    if (!savedCoursesSlugs.includes(meta.slug)) {
      setSavedCoursesSlugs([...savedCoursesSlugs, meta.slug]);
    }
  };

  const courseDescriptionProps = {
    skills: meta.skills || [],
    duration,
    ...otherCourseAttribs,
  };

  return (
    <article className="card w-100">
      <CoursePreviewMedia
        title={title}
        previewImageLink={previewImageLink}
        meta={meta}
        tag={tags[0]}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-3">{title}</h5>
        <CoursePreviewDescription {...courseDescriptionProps} />
        <div className="row mt-auto d-flex align-items-center">
          <div className="col text-start">
            {courseProgress > 0 && <Progress progress={courseProgress} />}
          </div>
          <div className="col text-end">
            <Link
              to={`/courses/${id}`}
              className="btn course-card-btn"
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
      </div>
    </article>
  );
}
