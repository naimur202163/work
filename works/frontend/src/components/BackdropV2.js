import React from "react";
import ReactDOM from "react-dom";
import styled, {keyframes} from "styled-components";

const BackdropV2 = ({ close }) => {
  return ReactDOM.createPortal(
    <BackdropV2Component onClick={close} />,
    document.getElementById("BackdropV2")
  );
};

export default BackdropV2;

const openBackdrop = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const BackdropV2Component = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  z-index: 999;
  left: 0;
  transition: all 0.2s ease;
  animation: ${openBackdrop} 0.5s ease;
`;
