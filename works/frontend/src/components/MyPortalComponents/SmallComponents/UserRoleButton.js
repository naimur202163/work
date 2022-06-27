import React from "react";
import styled, { css } from "styled-components";

const UserRoleButton = ({ children, type }) => {
  return (
    <UserRoleButtonStyled
      appear={
        type === 0
          ? "freeloader"
          : type === 1
          ? "coop"
          : type === 2
          ? "warrior"
          : null
      }
    >
      {children}
    </UserRoleButtonStyled>
  );
};

export default UserRoleButton;

const UserRoleButtonStyled = styled.button`
  font-family: ${(props) => props.theme.montserrat};
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 0.3rem 0.8rem;
  border-radius: 0.3rem;
  letter-spacing: 1px;
  cursor: pointer;
  border: none;
  outline: none;

  ${(props) =>
    props.appear === "freeloader" &&
    css`
      background-color: #f2f2f7;
      color: #1c1c1e;
    `}

  ${(props) =>
    props.appear === "coop" &&
    css`
      background-color: #f9903d;
      color: #f2f2f7;
    `}

    ${(props) =>
    props.appear === "warrior" &&
    css`
      color: #f2f2f7;
      background: transparent
        linear-gradient(
          130deg,
          var(--profile-icon-bg) 14%,
          #f88946 23%,
          #f8795f 37%,
          #f75e87 55%,
          #f75b8c 57%
        )
        0% 0% no-repeat padding-box;
      background: transparent
        linear-gradient(
          130deg,
          #f9903d 14%,
          #f88946 23%,
          #f8795f 37%,
          #f75e87 55%,
          #f75b8c 57%
        )
        0% 0% no-repeat padding-box;
    `}


    @media screen and (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.3rem 0.8rem;
    letter-spacing: 0.5px;
  }
`;
