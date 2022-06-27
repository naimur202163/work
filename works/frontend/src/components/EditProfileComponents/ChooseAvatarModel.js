import React from "react";
import styled from "styled-components";

const ChooseAvatarModel = () => {
  return (
    <Wrapper>
      <div className="container">hello world</div>
    </Wrapper>
  );
};

export default ChooseAvatarModel;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 900;
  background: rgba(0, 0, 0, 0.7);

  .container {
    width: 580px;
    border-radius: 4px;
    background: ${(props) => props.theme.grey};
    margin: 2rem auto;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.4), 0px 0px 4px rgba(0, 0, 0, 0.25);
    position: relative;
  }
`;
