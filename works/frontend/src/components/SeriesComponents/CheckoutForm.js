import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import styled from "styled-components";
import {
  acceptPay,
  savePPVUnlockInformation,
  createSeriesProgress,
  seriesTransfers,
} from "../../actions";
import Button from "../../styles/Button";
import SavedPaymentMethodList from "../SavedPaymentMethodList";
import { Box } from "@material-ui/core";
import { darkTheme } from "./../../styles/theme";
import Switch from "react-switch";
import { useHistory } from "react-router-dom";

const ElementsWrapper = styled.div`
  @media screen and (max-width: 600px) {
    .cardElementStyle {
      width: 320px;
    }
  }
`;
const Wrapper = styled.div`
  margin-top: 32px;
  label.headerCard {
    color: ${(props) => props.theme.primaryColor};
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

const CheckoutForm = ({ seriesId, price, closeModel, videos, creatorId }) => {
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const priceToPay = price;
  const [submitButtonText, setSubmitButtonText] = useState(
    `Pay $${priceToPay}`
  );
  const [isDisableSubmitButton, setIsDisableSubmitButton] = useState(false);
  const dispatch = useDispatch();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [savePM, setSavePM] = useState(true);
  const user = useSelector((state) => state.user);

  const CARD_ELEMENT_OPTIONS = {
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

  const enableSubmitButton = () => {
    setIsDisableSubmitButton(false);
    setSubmitButtonText(`Pay $${priceToPay}`);
  };

  const disableSubmitButton = () => {
    setIsDisableSubmitButton(true);
    setSubmitButtonText("Processing...");
  };

  const calculateAmountForCreator = (amount) => {
    const finalPrice = (amount * 5) / 10000;
    return parseFloat(priceToPay) - finalPrice;
  };

  const handleSubmit = async (event) => {
    disableSubmitButton();
    try {
      event.preventDefault();

      let res;
      if (selectedPaymentMethod === null) {
        res = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        });
        if (res.error) {
          if (res.error.code === "incomplete_number") {
            toast.error(
              "Please enter a complete card number or select a saved payment method"
            );
            enableSubmitButton();
            return;
          } else if (res.error.code === "invalid_number") {
            toast.error("Please enter a valid card number");
            enableSubmitButton();
            return;
          }
        }
      }

      let paymentIntentPayload = {
        amount: parseFloat(priceToPay),
        currency: "usd",
        metadata: { integration_check: "accept_a_payment" },
        savePaymentMethod: savePM,
      };

      if (selectedPaymentMethod !== null) {
        paymentIntentPayload.customer = user.stripe_customer_id;
      }

      if (selectedPaymentMethod === null && res.paymentMethod.id) {
        paymentIntentPayload.paymentMethodId = res.paymentMethod.id;
        paymentIntentPayload.customer = user.stripe_customer_id;
      }

      const result = await dispatch(acceptPay(paymentIntentPayload));
      if (
        result &&
        result.data &&
        result.data.data &&
        result.data.data.client_secret
      ) {
        await stripeAcceptPayment(result.data.data.client_secret);
      }
    } catch (e) {
      enableSubmitButton();
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const stripeAcceptPayment = async (clientId) => {
    if (!stripe || !elements) {
      return;
    }

    try {
      let newPaymentMethod = {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.firstname,
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
        enableSubmitButton();
        toast.error("Something went wrong. Please try again later.");
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // save series to ppv unlocks table
          toast.success("Series purchased successfully. Thank You");
          savePPVUnlockDetail();
          dispatch(createSeriesProgress(seriesId));

          // transfer amount to the creator
          let amount = result.paymentIntent.amount;
          let creatorAmount = calculateAmountForCreator(amount);
          await dispatch(
            seriesTransfers({
              amount: creatorAmount,
              currency: "usd",
              destination: videos[0].singleDetailedVideo.User.stripe_account_id,
              toUserId: creatorId,
            })
          );
          toast.success(
            `Thank you, Your payment of ($${priceToPay}) was Successful.`,
            {
              autoClose: 6300,
            }
          );
          toast.success(
            `$${creatorAmount.toFixed(2)} was transferred to ${
              videos[0].singleDetailedVideo.User.username
            } successfully! Thank you purchasing series and suporting the creator!`,
            {
              autoClose: 7300,
            }
          );

          closeModel();
          history.push(
            `/series/watch/${seriesId}/${videos[0].singleDetailedVideo.id}`
          );
        }
      }
    } catch (e) {
      enableSubmitButton();
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const savePPVUnlockDetail = () => {
    dispatch(
      savePPVUnlockInformation({
        seriesId,
        userId: user.id,
      })
    );
  };

  return (
    <div id="payment-form">
      <form id="payment-form">
        <div>
          <ElementsWrapper>
            <CardElement
              options={CARD_ELEMENT_OPTIONS}
              className="cardElementStyle"
            />
          </ElementsWrapper>
        </div>
        <Wrapper>
          <label className="toggleBox">
            <Switch
              onColor="#28df99"
              offColor="#cc0000"
              onChange={() => setSavePM(!savePM)}
              checked={savePM}
            />
            <span>Save this card for future payments</span>
          </label>
        </Wrapper>
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
          <Button
            className="btn-submit"
            disabled={isDisableSubmitButton}
            onClick={(e) => handleSubmit(e)}
          >
            {submitButtonText}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
