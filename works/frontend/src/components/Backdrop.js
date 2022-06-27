import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Backdrop = ({ close }) => {
  return ReactDOM.createPortal(
    <BackdropComponent onClick={close} />,
    document.getElementById("backdrop")
  );
};

export default Backdrop;

const BackdropComponent = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: transparent;
  top: 0;
  z-index: 999;
  left: 0;
`;
