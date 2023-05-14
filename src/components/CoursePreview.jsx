import { Link } from "react-router-dom";

import VideoPlayer from "./VideoPlayer";

export default function CoursePreview({
  id,
  previewImageLink,
  title,
  rating,
  meta,
  lessonsCount,
}) {
  const metaContains = (keyToSearch) => {
    return Object.keys(meta).find((key) => key === keyToSearch);
  };

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
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-3">{title}</h5>
        <div className="d-flex justify-content-between mb-2">
          <span className="card-text">📝{lessonsCount} lessons</span>
          <span className="card-text">⭐Rating: {rating}</span>
        </div>

        {metaContains("skills") && (
          <div className="card-text mt-3 mb-3">
            <strong>Skills you will work on:</strong>
            <ul className="mt-1">
              {meta.skills.map((skill) => (
                <li key={skill} className="text-capitalize">
                  ☑{skill}
                </li>
              ))}{" "}
            </ul>
          </div>
        )}
        <div className="card-link d-block mt-auto ms-auto">
          <Link to={`courses/${id}`} className="btn btn-primary">
            Go to the course
          </Link>
        </div>
      </div>
    </article>
  );
}
