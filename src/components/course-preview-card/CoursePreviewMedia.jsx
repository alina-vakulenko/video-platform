import VideoPlayer from "../VideoPlayer";

const CoursePreviewMedia = ({ title, previewImageLink, meta, tag }) => {
  return (
    <div className="card-img-wrapper">
      {meta.courseVideoPreview?.duration > 0 ? (
        <VideoPlayer
          videoUrl={meta.courseVideoPreview?.link}
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
      <span className="tag">{tag}</span>
    </div>
  );
};

export default CoursePreviewMedia;
