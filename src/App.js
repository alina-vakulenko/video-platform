import { Routes, Route } from "react-router";

import Layout from "./components/Layout";
import CoursesListPage from "./pages/CoursesListPage";
import CourseItemPage from "./pages/CourseItemPage";
import NotFoundPage from "./pages/NotFoundPage";

import "./scss/app.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CoursesListPage />} />
        <Route path="courses/:courseId" element={<CourseItemPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;