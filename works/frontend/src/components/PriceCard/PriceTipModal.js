import React from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";
import { CloseIcon } from "../Icons";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PriceCheckoutForm from "./PriceCheckoutForm";
import config from "../../config/config";

const stripePromise = loadStripe(`${config.REACT_APP_STRIPE_PUBLIC_KEY}`); 

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
  .modal-content {
    width: 600px;
    margin: 4rem auto;
    background: ${(props) => props.theme.grey};
    border-radius: 3px;
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
    color: ${(props) => props.theme.primaryColor};
  }

  form {
    padding: 1rem;
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

const PriceTipModal = ({
  closeModalNew,
  price,
  customTip,
  toggle,
  video,
  action,
}) => {

  return ReactDOM.createPortal(
    <Wrapper>
      <div className="modal-content">
        <div className="container"></div>
        <div className="modal-header">
          <h3>
            <CloseIcon
              onClick={($event) => {
                closeModalNew();
              }}
            />
            <span>Enter Payment Details</span>
          </h3>
        </div>
        <Elements stripe={stripePromise}>
          <PriceCheckoutForm
            closeModalNew={closeModalNew}
            price={price}
            customTip={customTip}
            toggle={toggle}
            video={video}
            action={action}
          />
        </Elements>
      </div>
    </Wrapper>,
    document.body
  );
};

const mapStateToProps = (state) => ({ profile: state.profile });

export default connect(mapStateToProps, {})(PriceTipModal);
