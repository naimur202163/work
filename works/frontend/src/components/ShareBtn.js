import styled, { css } from "styled-components";

const ShareButton = styled.button`
  margin-left: 0.01rem;
  padding: 0.4rem 1rem;
  background: ##f2f2f7;
  color: #f9903d;
  border-radius: 23px;
  letter-spacing: 1.1px;
  height: 3em;
  width: 100%;

  @media screen and (max-width: 414px) {
    padding: 0.2rem 0.8rem;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
  }

  @media screen and (max-width: 414px) {
    font-size: 0.8rem;
  }
`;

export default ShareButton;
