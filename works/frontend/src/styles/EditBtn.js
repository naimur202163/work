import styled, { css } from "styled-components";

const EditBtn = styled.button`
  padding: 0.4rem 1rem;
  background: #2c2c2e;
  color: ${(props) => props.theme.white};
  border-radius: 20px;
  letter-spacing: 1.1px;
  border: 1px solid rgb(169, 169, 178);

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

export default EditBtn;
