import { Button } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const Wrapper = styled.div`
  margin-top: 20px;
  .reference-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .video-form {
    border-top: 1px solid ${(props) => props.theme.darkGrey};
    border-bottom: 1px solid ${(props) => props.theme.darkGrey};
    padding: 0.5rem 1rem;
  }

  input {
    width: 100%;
    background: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.darkGrey};
    color: ${(props) => props.theme.primaryColor};
    padding: 0.5rem 1rem;
    border-radius: 3px;
  }
  button {
    margin-left: 20px;
    width: 15%;
  }
`;

const Referral = () => {
  const textRef = useRef(null);
  const [textValue, setTextValue] = useState();
  const { username } = useSelector((state) => state.user);
  
  const tempFunction = useRef()
  const imgFunction = () => {
    setTextValue(`${window.location.origin}/signup?code=${username}`);
  }
  tempFunction.current = imgFunction
  useEffect(() => {
    tempFunction.current()
  }, []);

  const copyToClipboard = (e) => {
    textRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    toast.success("Copied!");
  };

  return (
    <Wrapper>
      <div className="reference-container">
        <input type="text" ref={textRef} value={textValue} readOnly />
        <Button
          variant="contained"
          color="primary"
          className="button"
          onClick={copyToClipboard}
        >
          Copy
        </Button>
      </div>
    </Wrapper>
  );
};

export default Referral;
