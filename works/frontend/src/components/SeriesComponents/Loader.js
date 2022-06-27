import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <LoaderWrapper>
      <h1 className="text">Please wait...</h1>
    </LoaderWrapper>
  );
};

export default Loader;

const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .text {
    font-family: brother-1816, sans-serif;
    font-size: 1.4rem;
    padding: 0 5px 8px 0;
    font-weight: bold;
    text-transform: uppercase;
    animation: c3 2s steps(6) infinite;
    background: -webkit-linear-gradient(#ff4883, #fdb769);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  @keyframes c3 {
    to {
      background-position: 80% 100%;
    }
  }
`;
