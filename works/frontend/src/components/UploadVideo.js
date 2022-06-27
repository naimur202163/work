import React, { useEffect, useCallback, useRef } from "react";
import { UploadVideoIcon } from "./Icons";
import { connect } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  .toolTipNav {
    height: 20px;
    text-align: center;
    margin-bottom: 10px;
    padding-top: 2px !important;
    padding-bottom: 23px !important;
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
`;


const UploadVideo = ({ user, setShowModal }) => {
  const handleEsc = useCallback((event) => {
    if (event.keyCode === 27) {
      setShowModal(false);
    }
  }, [setShowModal]);

  const tempFunc = useRef()
  const newFunc = () => {
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }
  tempFunc.current = newFunc
  useEffect(() => {
    tempFunc.current()
  }, []);

  return (
    <div>
      <Wrapper>
        <UploadVideoIcon onClick={() => setShowModal(true)} />
      </Wrapper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  subscription: state.subscription,
});

export default connect(mapStateToProps)(UploadVideo);
