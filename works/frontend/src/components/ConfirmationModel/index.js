import React from "react";
import styled, { keyframes } from "styled-components";
import BackdropV2 from "../BackdropV2";

const ConfirmationModel = ({
  open,
  closeHandler,
  deleteHandler,
  title = "Do you want to delete this ?",
}) => {
  return (
    <>
      <ConfirmationModelWrapper>
        <div className="confirmationHeader">
          <h1 className="confirmationHeader__title">{title}</h1>
        </div>
        <div className="actionBtn">
          <button
            onClick={closeHandler}
            className="actionBtn__btn actionBtn__cancel"
          >
            Cancel
          </button>
          <button
            onClick={deleteHandler}
            className="actionBtn__btn actionBtn__delete"
          >
            Delete
          </button>
        </div>
      </ConfirmationModelWrapper>
    </>
  );
};

export default ConfirmationModel;

const openModal = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ConfirmationModelWrapper = styled.div`
  position: fixed;
  overflow-y: auto;
  width: 450px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: #202020;
  border-radius: 0.3rem;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.4), 0px 0px 4px rgba(0, 0, 0, 0.25);
  animation: ${openModal} 0.5s ease-in-out;
  font-family: ${(props) => props.theme.montserrat};

  .confirmationHeader {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-height: 4rem;
    height: auto;
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    &__title {
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.4;
      text-transform: capitalize;
    }
  }

  .actionBtn {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__btn {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      background-color: transparent;
      padding: 0.7rem 0;
      border: none;
      outline: none;
      color: rgba(255, 255, 255, 0.4);
      font-weight: 200;
      transition: all 0.2s ease;
    }

    &__cancel {
      border-right: 1px solid rgba(255, 255, 255, 0.08);

      &:hover {
        background-color: ${(props) => props.theme.red};
        color: #fff;
      }
    }
    &__delete {
      border-left: 1px solid rgba(255, 255, 255, 0.08);

      &:hover {
        background: ${(props) => props.theme.gradient};
        color: #fff;
      }
    }
  }
`;
