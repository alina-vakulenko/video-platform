// import { createSlice } from "@reduxjs/toolkit";

// import { fetchCourses } from "./fetchCourses";
// import STATUS from "../../api/fetchStatus";

// const initialState = {
//   items: [],
//   status: STATUS.IDLE,
// };

// const coursesSlice = createSlice({
//   name: "courses",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCourses.pending, (state) => {
//         state.status = STATUS.PENDING;
//         state.items = [];
//       })
//       .addCase(fetchCourses.fulfilled, (state, action) => {
//         state.status = STATUS.FULFILLED;
//         state.items = action.payload;
//       })
//       .addCase(fetchCourses.rejected, (state) => {
//         state.status = STATUS.REJECTED;
//         state.items = [];
//       });
//   },
// });

// export const selectCourses = (state) => state.courses;

// export default coursesSlice.reducer;
