import { isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const errorHandler = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    toast.error(action.payload.data.message);
  }

  return next(action);
};
