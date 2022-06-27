import React from "react";
import styled, { keyframes } from "styled-components";
import Button from "../styles/Button";
import { CloseIcon } from "./Icons";
const openModal = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 900;
  background: rgba(0, 0, 0, 0.7);
  animation: ${openModal} 0.5s ease-in-out;

  .edit-profile {
    width: 580px;
    border-radius: 4px;
    background: ${(props) => props.theme.grey};
    margin: 4rem auto;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.4), 0px 0px 4px rgba(0, 0, 0, 0.25);
  }

  .edit-profile img {
    object-fit: cover;
  }

  .avatar {
    margin-top: -40px;
    margin-left: 20px;
  }

  div.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.darkGrey};
  }

  h3 {
    display: flex;
    align-items: center;
  }

  form {
    padding: 1rem;
  }
  div.modal-content {
      padding:16px;
  }
  div.modal-footer {
    display: flex;
    height: 70px;
    padding: 1rem;
    justify-content: space-between;
  }
  input,
  textarea {
    width: 100%;
    background: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.black};
    margin-bottom: 1rem;
    padding: 0.6rem 1rem;
    border-radius: 3px;
    color: ${(props) => props.theme.primaryColor};
  }

  textarea {
    height: 75px;
  }

  svg {
    fill: ${(props) => props.theme.red};
    height: 22px;
    width: 22px;
    margin-right: 1rem;
    position: relative;
    top: -1px;
  }

  @media screen and (max-width: 600px) {
    .edit-profile {
      width: 90%;
      margin: 4rem auto;
    }
  }

  @media screen and (max-width: 400px) {
    background: rgba(0, 0, 0, 0.9);
  }
`;

const StripeAccountEditModal = ({ closeModal, stripeConnect }) => {
    return (
        <Wrapper>
            <div className="container"></div>
            <div className="edit-profile">
                <div className="modal-header">
                    <h3>
                        <CloseIcon onClick={() => closeModal(false)} />
                        <span>Edit Connected Account</span>
                    </h3>
                </div>
                <div className="modal-content">
                    <p>Changing your connected payout account will clear all of your transaction
                    history associated with that bank account or debit card.
                    The new account will require verification again. All pending payouts will still
                    be sent to your currently connected account but any future payments received
                            will go to your new account. Are you sure you want to change your connect payouts account?</p>
                </div>
                <div className="modal-footer">
                    <Button onClick={() => stripeConnect()}>Yes, Continue</Button>
                    <Button onClick={() => closeModal(false)}>Cancel</Button>
                </div>

            </div>
        </Wrapper>
    );
};

export default StripeAccountEditModal;
