// import { createAsyncThunk } from "@reduxjs/toolkit";

// import CoursesService from "../../services/coursesService";

// export const fetchCourses = createAsyncThunk(
//   "courses/fetchCourses",
//   async (params, { rejectWithValue }) => {
//     const coursesList = await CoursesService.getCoursesList();

//     if (coursesList?.length) {
//       return coursesList;
//     } else {
//       return rejectWithValue("An error occurred. Courses were not found");
//     }
//   }
// );
