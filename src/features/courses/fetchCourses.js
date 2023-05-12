import { createAsyncThunk } from "@reduxjs/toolkit";

import { httpClient, getToken } from "../../api/settings";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (params, { rejectWithValue }) => {
    const access_token = await getToken();
    const response = await httpClient.get("core/preview-courses", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        ...params,
      },
    });

    if (response.data.courses) {
      return response.data.courses;
    } else {
      return rejectWithValue("An error occurred. Courses were not found");
    }
  }
);
