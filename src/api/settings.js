import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
});

export const getToken = async () => {
  try {
    const res = await httpClient.get("auth/anonymous", {
      params: { platform: "subscriptions" },
    });
    return res.data.token;
  } catch (error) {
    return error.message;
  }
};
