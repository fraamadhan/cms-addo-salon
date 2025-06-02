import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const timeout = 10000;
const timeoutErrorMessage = "Took a long time for response";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: timeout,
  timeoutErrorMessage,
  maxRedirects: 5,
});
