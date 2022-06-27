import styled, { css } from "styled-components";

const Button = styled.button`
  padding: 0.4rem 1rem;
  background: ${(props) => props.theme.gradient};
  color: ${(props) => props.theme.white};
  border: 1px solid ${(props) => props.theme.orange};
  border-radius: 3px;
  letter-spacing: 1.1px;

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

export default Button;
