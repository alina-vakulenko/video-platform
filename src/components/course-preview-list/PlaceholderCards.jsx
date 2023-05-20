import CoursePreviewSkeleton from "../course-preview-card/CoursePreviewSkeleton";

const PlaceholderCards = ({ quantity }) => {
  return (
    <section className="content">
      <div className="courses-cards">
        {[...Array(quantity)].map((_, index) => (
          <CoursePreviewSkeleton key={index} />
        ))}
      </div>
    </section>
  );
};

export default PlaceholderCards;
