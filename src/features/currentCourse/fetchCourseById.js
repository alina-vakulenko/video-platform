import { createAsyncThunk } from "@reduxjs/toolkit";

import { httpClient, getToken } from "../../api/settings";

export const fetchCourseById = createAsyncThunk(
  "currentCourse/fetchCourseById",
  async (courseId, { rejectWithValue }) => {
    const access_token = await getToken();
    const response = await httpClient.get(`core/preview-courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      referrerPolicy: "unsafe_url",
    });

    if (response.data) {
      return response.data;
    } else {
      return rejectWithValue("An error occurred. Courses were not found");
    }
  }
);
