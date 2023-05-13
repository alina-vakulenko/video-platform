import { configureStore } from "@reduxjs/toolkit";

import { coursesApi } from "../services/courses";
import { errorHandler } from "./middleware";

const store = configureStore({
  reducer: {
    [coursesApi.reducerPath]: coursesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coursesApi.middleware, errorHandler),
});

export default store;
