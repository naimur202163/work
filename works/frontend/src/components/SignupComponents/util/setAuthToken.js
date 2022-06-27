import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["X-CSCAPI-KEY"] = token;
  } else {
    delete axios.defaults.headers.common["X-CSCAPI-KEY"];
  }
};

export default setAuthToken;
