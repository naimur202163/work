import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

// slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { logoutUser } from "./actions";
import api from "./services/api";


// react video model
import "../node_modules/react-modal-video/css/modal-video.min.css";

// react circular progress
import "react-circular-progressbar/dist/styles.css";

//Material UI Theme global override
const theme = createTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ["ingra", "sans-serif"],
  },
});

/** Intercept any unauthorized request.
 * dispatch logout action accordingly **/
const UNAUTHORIZED = 401;
const { dispatch } = store; // direct access to redux store.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    if (status === UNAUTHORIZED) {
      dispatch(logoutUser());
    }
    return Promise.reject(error);
  }
);

render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalProvider>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </GlobalProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
