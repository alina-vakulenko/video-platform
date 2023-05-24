// import { createSlice } from "@reduxjs/toolkit";

// import { fetchCourseById } from "./fetchCourseById";
// import STATUS from "../../api/fetchStatus";

// const initialState = {
//   courseData: {},
//   status: STATUS.IDLE,
// };

// const currentCourseSlice = createSlice({
//   name: "currentCourse",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCourseById.pending, (state) => {
//         state.status = STATUS.PENDING;
//         state.courseData = {};
//       })
//       .addCase(fetchCourseById.fulfilled, (state, action) => {
//         state.status = STATUS.FULFILLED;
//         state.courseData = action.payload;
//       })
//       .addCase(fetchCourseById.rejected, (state) => {
//         state.status = STATUS.REJECTED;
//         state.courseData = {};
//       });
//   },
// });

// export const selectCurrentCourse = (state) => state.currentCourse;

// export default currentCourseSlice.reducer;
