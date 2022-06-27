import styled, { css } from "styled-components";

const Buttons = styled.button`
  margin-left: 0.01rem;
  padding: 0.4rem 1rem;
  background: #f9903d;
  color: ${(props) => props.theme.white};
  border: 1px solid ${(props) => props.theme.orange};
  border-radius: 23px;
  letter-spacing: 1.1px;
  height: 3em;
  width: 100%;
  margin-bottom: 2em;

  ${(props) =>
    props.grey &&
    css`
      background: ${(props) => props.theme.darkGrey};
      border: 1px solid ${(props) => props.theme.darkGrey};
      color: ${(props) => props.theme.secondaryColor};
    `}
  @media screen and (max-width: 414px) {
    padding: 0.2rem 0.8rem;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
  }

  @media screen and (max-width: 414px) {
    font-size: 0.8rem;
  }
`;

export default Buttons;
