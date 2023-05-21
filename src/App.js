import { Routes, Route } from "react-router";

import Layout from "./components/Layout";
import CoursesListPage from "./pages/CoursesListPage";
import MyCoursesPage from "./pages/MyCoursesPage";
import CourseItemPage from "./pages/CourseItemPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CoursesListPage />} />
        <Route path="courses/:courseId" element={<CourseItemPage />} />
        <Route path="my-courses" element={<MyCoursesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
