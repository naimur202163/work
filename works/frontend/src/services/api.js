import axios from "axios";
import config from "../config/config";
export const axiosRequest = axios.CancelToken.source()
const api = axios.create({
  baseURL: config.REACT_APP_BACKEND_URL,
  cancelToken: axiosRequest.token,
});

export const setAuthHeader = async () => {
  let token;
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    token = user.token || null;
  }
  api.defaults.headers.Authorization = `Bearer ${token}`;
};
setAuthHeader();

export default api;
