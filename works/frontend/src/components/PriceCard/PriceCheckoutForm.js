import React, {  useState } from "react";
import { connect,  useDispatch } from "react-redux";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import useInput from "../../hooks/useInput";
import styled from "styled-components";
import {
  acceptPay,
  transfers,
  savePPVUnlockInformation,
  unlockWatchVideo,
  unlockFeaturedVideo,
  unlockTrendingVideo,
  unlockLatestVideo,
  unlockStaffPickVideo,
  unlockCategoryFeaturedVideo,
  unlockCategoryVideo,
  unlockCategoryStaffPickVideo,
  unlockMoreVideo,
  unlockLikeVideo,
  unlockSearchVideo,
  unlockProfileVideo,
  saveTATVUnlockInfo,
  unlockTATVideo,
} from "../../actions";
import Button from "../../styles/Button";
import SavedPaymentMethodList from "../SavedPaymentMethodList";
import { Box } from "@material-ui/core";
import { darkTheme } from "./../../styles/theme";
import Switch from "react-switch";

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

const PriceCheckoutForm = ({
  closeModalNew,
  price,
  toggle,
  user,
  customTip,
  video,
  action,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useInput("");
  const priceToPay = customTip ? amount.value : price;
  const [submitButtonText, setSubmitButtonText] = useState(
    `Pay $${priceToPay}`
  );
  const [isDisableSubmitButton, setIsDisableSubmitButton] = useState(false);
  const dispatch = useDispatch();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [savePM, setSavePM] = useState(true);

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

  const validateForm = () => {
    let isValid = true;
    if (!amount.value.trim()) {
      toast.error("Please fill in amount");
      isValid = false;
    } else if (+amount.value.trim() <= 1.49) {
      isValid = false;
      toast.error(
        "Minimum Karma is $1.50. This is to ensure processing fees are covered and Warrior's can receive $1"
      );
    }
    return isValid;
  };

  const handleSubmitNew = async (event) => {
    disableSubmitButton();
    try {
      event.preventDefault();
      if (customTip && !validateForm()) {
        enableSubmitButton();
        return;
      }
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
          if (video.keyVideoAccess !== 3) {
            toast.success(
              `Thank you, Your payment of ($${priceToPay}) was Successful.`,
              {
                autoClose: 6300,
              }
            );
          }

          if (action === "ppv_unlock") {
            savePPVUnlockDetail();
          }
          // unlock Tip-After-Two Video to the user who tips
          if (
            action === "tip" &&
            video.keyVideoAccess === 3 &&
            video.isTATVideoLocked
          ) {
            saveTATVUnlockDetail();
          }
          if (video.User.stripe_account_id) {
            let amount = result.paymentIntent.amount;
            let creatorAmount = calculateAmountForCreator(amount);
            if (action === "tip") {
              creatorAmount = calculateFixedTipAmountForCreator(amount);
            }
            await dispatch(
              transfers({
                amount: creatorAmount,
                currency: "usd",
                destination: video.User.stripe_account_id,
                toUserId: video.User.id,
                videoId: video.id,
              })
            );
            if (video.keyVideoAccess === 3) {
              toast.success(
                `Thank you, Your payment of ($${priceToPay}) was Successful.`,
                {
                  autoClose: 6300,
                }
              );
            }
            toast.success(
              `$${creatorAmount.toFixed(2)} was transferred to ${video.User.username
              } successfully! Thank you for giving Karma back to the Content Creator!`,
              {
                autoClose: 7300,
              }
            );
          }
          closeModalNew();
          if (toggle) {
            toggle();
          }
          if (action === "tip" && video.keyVideoAccess === 3) {
            toast.success("Video unlocked successfully",
              {
                autoClose: 8300,
              }
            );
            localStorage.setItem("isTATVideoUnlocked", true);
          }
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
        videoId: video.id,
        userId: user.id,
      })
    );
    dispatch(unlockFeaturedVideo(video.id));
    dispatch(unlockTrendingVideo(video.id));
    dispatch(unlockLatestVideo(video.id));
    dispatch(unlockStaffPickVideo(video.id));
    dispatch(unlockWatchVideo(video.id));
    dispatch(unlockCategoryFeaturedVideo(video.id));
    dispatch(unlockCategoryVideo(video.id));
    dispatch(unlockCategoryStaffPickVideo(video.id));
    dispatch(unlockMoreVideo(video.id));
    dispatch(unlockLikeVideo(video.id));
    dispatch(unlockSearchVideo(video.id));
    dispatch(unlockProfileVideo(video.id));
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

  const calculateAmountForCreator = (amount) => {
    const finalPrice = (amount * 5) / 10000;
    return parseFloat(priceToPay) - finalPrice;
  };

  const calculateFixedTipAmountForCreator = (amount) => {
    let creatorAmount = 0;
    if (amount === 150) {
      // 1.50$
      creatorAmount = 1;
    } else if (amount === 325) {
      // 3.25$
      creatorAmount = 2.65;
    } else if (amount === 500) {
      // 5$
      creatorAmount = 4.3;
    }
    return creatorAmount;
  };

  return (
    <div id="payment-form">
      <form id="payment-form">
        <div>
          {customTip && (
            <input
              type="number"
              placeholder="Enter Amount (Minimum $1.50)"
              value={amount.value}
              onChange={(e) => {
                amount.onChange(e);
                setSubmitButtonText(`Pay $${e.target && e.target.value && parseFloat(e.target.value).toFixed(2)}`);
              }}
            />
          )}
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
            onClick={($event) => {
              handleSubmitNew($event);
            }}
            disabled={isDisableSubmitButton}
          >
            {submitButtonText}
          </Button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(PriceCheckoutForm);
