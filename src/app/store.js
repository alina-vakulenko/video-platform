import { configureStore } from "@reduxjs/toolkit";

import coursesReducer from "../features/courses/coursesSlice";
import currentCourseReducer from "../features/currentCourse/currentCourseSlice";

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    currentCourse: currentCourseReducer,
  },
});

export default store;
