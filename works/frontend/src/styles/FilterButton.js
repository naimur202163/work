import styled, { css } from "styled-components";

const FilterButton = styled.button`
  padding: 0.4rem 1rem;
  background: ${(props) => props.theme.gradient};
  color: ${(props) => props.theme.white};
  border: 1px solid ${(props) => props.theme.orange};
  border-radius: 10px;
  letter-spacing: 1.1px;
  margin: 4px;
  ${(props) =>
    props.grey &&
    css`
      background: ${(props) => props.theme.darkGrey};
      border: 1px solid ${(props) => props.theme.darkGrey};
      color: ${(props) => props.theme.white};
    `}
  ${(props) =>
    props.isActive &&
    css`
      background: ${(props) => props.theme.white};
      border: 1px solid ${(props) => props.theme.darkGrey};
      color: ${(props) => props.theme.black};
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

export default FilterButton;
