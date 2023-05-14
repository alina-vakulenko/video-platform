import CoursePreview from "../components/CoursePreview";
import CoursePreviewSkeleton from "../components/CoursePreviewSkeleton";
import Pagination from "../components/Pagination";
import ErrorPage from "./ErrorPage";
import Search from "../components/Search";

import { useGetCoursesQuery } from "../services/courses";
import { useFilter } from "../hooks/useFilter";

const LIMIT = 10;

export default function CoursesListPage() {
  const { data, isLoading, error } = useGetCoursesQuery();
  const [courses, setSearchValue, paginationProps] = useFilter(data?.courses, {
    limit: LIMIT,
    searchBy: "title",
  });

  if (error) return <ErrorPage message={error.message} />;

  return (
    <div className="content">
      <section>
        <div className="row align-items-center mb-5">
          <h1 className="col-12 col-md-8">Find your next course</h1>
          <div className="col-12 col-md-4">
            <Search setSearchValue={setSearchValue} />
          </div>
        </div>
        <div className="courses-cards">
          {isLoading
            ? [...Array(10)].map((_, index) => (
                <CoursePreviewSkeleton key={index} />
              ))
            : courses.map((item) => <CoursePreview key={item.id} {...item} />)}
        </div>
      </section>
      <Pagination {...paginationProps} />
    </div>
  );
}
