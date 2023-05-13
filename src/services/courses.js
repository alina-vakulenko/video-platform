import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AuthService from "./auth";

const BASE_URL = "https://cors-proxy.fringe.zone/http://api.wisey.app/api/v1/";

export const coursesApi = createApi({
  reducerPath: "coursesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers) => {
      const data = await AuthService.getToken();

      if (data.token) {
        headers.set("Authorization", `Bearer ${data.token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => ({
        url: "/core/preview-courses",
      }),
    }),
    getCourseById: builder.query({
      query: (id) => ({
        url: `/core/preview-courses/${id}`,
      }),
    }),
  }),
});

export const { useGetCoursesQuery, useGetCourseByIdQuery } = coursesApi;
