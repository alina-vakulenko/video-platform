// import { createAsyncThunk } from "@reduxjs/toolkit";

// import CoursesService from "../../services/coursesService";

// export const fetchCourseById = createAsyncThunk(
//   "currentCourse/fetchCourseById",
//   async (courseId, { rejectWithValue }) => {
//     const course = await CoursesService.getCourseById(courseId);

//     if (course) {
//       return course;
//     } else {
//       return rejectWithValue("An error occurred. Course was not found");
//     }
//   }
// );
