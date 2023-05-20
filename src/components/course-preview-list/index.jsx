import CoursePreview from "../course-preview-card";

const CourseCards = ({ cards }) => {
  return (
    <div className="courses-cards">
      {cards?.map((item) => (
        <CoursePreview key={item.id} {...item} />
      ))}
    </div>
  );
};

export default CourseCards;
