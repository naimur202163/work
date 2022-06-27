import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import useInput from "../hooks/useInput";
import {
  acceptPay,
  saveTATVUnlockInfo,
  transfers,
  unlockTATVideo,
} from "../actions";
import styled from "styled-components";
import { getRoleIdByPackageName } from "../utils/common";
import SavedPaymentMethodList from "./SavedPaymentMethodList";
import { Box } from "@material-ui/core";
import Switch from "react-switch";
import { darkTheme } from "./../styles/theme";

const CheckoutForm = ({
  user,
  closeModal,
  toggle,
  completeSignup,
  setBadgesBasic,
  video,
  choosePackage,
  page = "",
  storagePrice,
  action = "",
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useInput("");
  const [isLoading, setIsLoading] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [savePM, setSavePM] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const cardStyle = {
    style: {
      base: {
        color: darkTheme.white,
        fontFamily: "ingra, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: darkTheme.white,
        },
      },
      invalid: {
        color: darkTheme.red,
        iconColor: darkTheme.red,
      },
    },
  };

  const validateForm = () => {
    let isValid = true;
    if (!amount.value.trim()) {
      toast.error("Please fill in amount");
      isValid = false;
    }
    if (+amount.value.trim() <= 1.49) {
      isValid = false;
      toast.error(
        "Minimum Karma is $1.50. This is to ensure processing fees are covered and Warrior's can receive $1"
      );
    }
    return isValid;
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      if (completeSignup) {
        const roleId = getRoleIdByPackageName(choosePackage);
        if (roleId === 1 || roleId === 2) {
          const result = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement),
          });
          if (result.error) {
            toast.error('Payment details incorrect. Please enter a valid payment method.');
            setIsLoading(false);

            return

          }

          if (result.paymentMethod.id) {
            await completeSignup(result.paymentMethod.id);
          }
        }
        setIsLoading(false);
      } else {
        if (!validateForm()) {
          setIsLoading(false);
          return;
        }
        let res;
        if (selectedPaymentMethod === null) {
          res = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement),
          });
        }

        let payload = {
          amount: amount.value,
          currency: "usd",
          metadata: { integration_check: "accept_a_payment" },
          savePaymentMethod: savePM,
        };
        if (selectedPaymentMethod !== null) {
          payload.customer = user.stripe_customer_id;
        }
        if (selectedPaymentMethod === null && res.paymentMethod.id) {
          payload.paymentMethodId = res.paymentMethod.id;
          payload.customer = user.stripe_customer_id;
        }
        const result = await dispatch(acceptPay(payload));
        if (
          result &&
          result.data &&
          result.data.data &&
          result.data.data.client_secret
        ) {
          await stripeAcceptPayment(result.data.data.client_secret);
        }
        setIsLoading(false);
      }
    } catch (e) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const saveTATVUnlockDetail = () => {
    dispatch(
      saveTATVUnlockInfo({
        videoId: video.id,
        userId: user.id,
      })
    );
    dispatch(unlockTATVideo(video.id));
  };

  const stripeAcceptPayment = async (clientId) => {
    try {
      if (!stripe || !elements) {
        return;
      }
      let newPaymentMethod = {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: user.firstName,
          email: user.email,
        },
      };

      const result = await stripe.confirmCardPayment(clientId, {
        payment_method:
          selectedPaymentMethod !== null
            ? selectedPaymentMethod.id
            : newPaymentMethod,
      });
      if (result.error) {
        setError(result.error);
        setIsLoading(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          if (
            action === "tip" &&
            video.keyVideoAccess === 3 &&
            video.isTATVideoLocked
          ) {
            saveTATVUnlockDetail();
          }
          if (video.User.stripe_account_id) {
            const finalPrice = (result.paymentIntent.amount * 6) / 10000 + 0.3;
            const creatorAmount = amount.value - finalPrice;
            await dispatch(
              transfers({
                amount: creatorAmount,
                currency: "usd",
                destination: video.User.stripe_account_id,
                toUserId: video.User.id,
                videoId: video.id,
              })
            );
            toast.error("Your Payment was successful!", {
              autoClose: false,
            });
          }
          closeModal();
          toggle();
          setIsLoading(false);
          if (action === "tip" && video.keyVideoAccess === 3) {
            toast.success("Video unlocked successfully", {
              autoClose: 6300,
            });
            localStorage.setItem("isTATVideoUnlocked", true);
          }
        }
      }
    } catch (e) {
      toast.error("Something went wrong. Please try again later.");
    }
  };
  return (
    <Container id="payment-form">
      <form id="payment-form" onSubmit={handleSubmit}>
        <div>
          {!completeSignup && (
            <input
              type="number"
              placeholder="Enter Amount (Minimum $1.50)"
              value={amount.value}
              onChange={amount.onChange}
            />
          )}

          <CardNumberElement options={cardStyle} className="card-element" />
          <div className="card-element-row">
            <CardExpiryElement options={cardStyle} className="card-one" />
            <CardCvcElement options={cardStyle} className="card-two" />
          </div>
        </div>
        {page === "signup" ? (
          <p>This card will be saved for future payments</p>
        ) : (
          <div>
            <label className="toggleBox">
              <Switch
                onColor="#28df99"
                offColor="#cc0000"
                onChange={() => setSavePM(!savePM)}
                checked={savePM}
              />
              <span>Save this card for future payments</span>
            </label>
          </div>
        )}

        {error && (
          <ErrorComponent>
            <i className="fas fa-exclamation-circle" />
            {error.message}
          </ErrorComponent>
        )}
        {user && user.paymentMethods && user.paymentMethods.data.length > 0 && (
          <div>
            <Box my={3}>
              <SavedPaymentMethodList
                user={user}
                setSelectedPaymentMethod={setSelectedPaymentMethod}
              />
            </Box>
          </div>
        )}
        <div type="submit" style={{ marginTop: "10px" }}>
          <button className="stripe-submit" disabled={isLoading}>
            {isLoading
              ? "Processing..."
              : `PAY ${setBadgesBasic
                ? "$5 USD"
                : amount.value
                  ? `$${amount.value} USD`
                  : !completeSignup
                    ? ""
                    : `$${storagePrice} USD`
              }`}
          </button>
        </div>
      </form>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  stripePayment: state.stripePayment,
  user: state.user,
});

export default connect(mapStateToProps, { transfers })(CheckoutForm);

const Container = styled.div`
  .card-element {
    border-radius: 3px;
    padding: 10px 20px;
    width: 100%;
    background: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.black};
    border-radius: 10rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
  .card-element-row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .card-one,
    .card-two {
      width: 48%;
      border-radius: 3px;
      padding: 10px 20px;
      background: ${(props) => props.theme.black};
      border: 1px solid ${(props) => props.theme.black};
      color: #bbc5cd;
      border-radius: 10rem;
      margin-bottom: 1rem;
    }
  }

  .stripe-submit {
    width: 100%;
    margin: 0 0 1rem 0;
    border-radius: 10rem;
    padding: 0.7rem 0;
    font-size: 1.1rem;
    color: #fff;
    background-color: ${(props) => props.theme.orange};
    border: none;
    outline: none;
  }
  /* toggle */
  .react-switch-bg {
    svg {
      height: 30px;
      width: 30px;
    }

    span {
      color: #fff !important;
    }
    .yes {
      margin-left: 0.3rem !important;
    }
    .no {
      margin-left: 0.3rem !important;
    }
  }

  .toggleBox {
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;

    span {
      margin-left: 0.7rem;
      font-size: 0.9rem;
      line-height: 1.2;
      color: #999;
    }
  }
`;

const ErrorComponent = styled.h2`
  font-size: 0.8rem;
  color: #fff;
  padding: 0.4rem 1rem;
  border-radius: 0.3rem;
  margin-bottom: 1rem;

  i {
    font-size: 1rem;
    margin-right: 0.5rem;
  }
`;
