import React, { useContext } from "react";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import GlobalStyle from "./styles/GlobalStyle";
import { darkTheme } from "./styles/theme";
import Router from "./Router";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { GlobalContext } from "./context/GlobalContext";

const App = ({ user }) => {
  const sidebar = useSelector((state) => state.sidebar);
  const { showTipPopups } = useContext(GlobalContext);

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <ToastContainer
        autoClose={6300}
        position="top-right"
        closeButton={false}
        style={{ left: sidebar && showTipPopups && "14rem" }}
      />
      <Router />
    </ThemeProvider>
  );
};

export default App;
