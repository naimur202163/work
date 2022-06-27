import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Row, Col } from "react-grid-system";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm";
import { useSelector, useDispatch } from "react-redux";
import { getSingleStorage } from "../../actions/index";
import config from "../../config/config";

const stripePromise = loadStripe(`${config.REACT_APP_STRIPE_PUBLIC_KEY}`); 

const Checkout = ({
  closeModal,
  priceList,
  customTip,
  toggle,
  completeSignup,
  setBadgesBasic,
  video,
  stepper,
  setShowStripeModal,
  storageSelected,
  choosePackage,
  referralCode,
}) => {
  const dispatch = useDispatch();
  const singleStorage = useSelector((state) => state.singleStorage);
  const tempFunction = useRef()
  const newFunction = () => {
    dispatch(getSingleStorage(storageSelected));
  }
  tempFunction.current = newFunction
  useEffect(() => {
    tempFunction.current()
  }, []);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(1);
  };

  const convertSize = (mb) => {
    if (!mb) {
      return alert("Please provide size");
    }

    let size;
    if (mb >= 1000000) {
      size = mb / 1000000;
    } else {
      size = mb / 1000;
    }

    return size;
  };

  const calculateStoragePrice = () => {
    if (singleStorage.length) {
      const storagePrice = singleStorage[0].cost;
      return storagePrice;
    } else {
      return 0;
    }
  };
  return (
    <CheckoutContainer>
      <h1
        onClick={() => {
          setShowStripeModal(false);
          stepper(setBadgesBasic ? 3 : 5);
        }}
      >
        <i className="fas fa-arrow-left" /> Payment
      </h1>

      <Row className="row">
        <Col md={12} sm={12}>
          <ul className="summary">
            <h3 className="title">Order Summary:</h3>

            <li className="summary__item">
              Package selected:{" "}
              <span>{setBadgesBasic ? "Tribe" : "Warrior"}</span>
            </li>
            {choosePackage !== "PREMIUM" && (
              <li className="summary__item">
                Paid amount:{" "}
                <span>
                  {setBadgesBasic ? "$5 USD / Year" : "$10 USD / Year"}
                </span>
              </li>
            )}

            {choosePackage && choosePackage === "PREMIUM" && (
              <>
                {singleStorage && singleStorage[0] && (
                  <>
                    <li className="summary__item">
                      Selected storage:
                      <span>
                        {addDecimals(convertSize(singleStorage[0].size))}
                        {singleStorage[0].size >= 1000000 ? "TB" : "GB"}
                      </span>
                    </li>

                    <li className="summary__item">
                      Storage price:{" "}
                      <span>
                        ${singleStorage[0].cost}USD / {singleStorage[0].period}
                      </span>
                    </li>
                  </>
                )}
              </>
            )}

            {choosePackage && choosePackage === "PREMIUM" && referralCode && (
              <>
                <li className="summary__item">
                  Referral ({referralCode}): <span>$2.50 USD </span>
                </li>
              </>
            )}

            {choosePackage && choosePackage === "BASIC" && referralCode && (
              <>
                <li className="summary__item">
                  Referral ({referralCode}): <span>$2.50 USD </span>
                </li>
              </>
            )}
          </ul>
        </Col>

        <Col md={12} sm={12}>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              closeModal={closeModal}
              priceList={priceList}
              toggle={toggle}
              completeSignup={completeSignup}
              setBadgesBasic={setBadgesBasic}
              video={video}
              choosePackage={choosePackage}
              page="signup"
              storagePrice={calculateStoragePrice()}
            />
          </Elements>
        </Col>
      </Row>
    </CheckoutContainer>
  );
};

export default Checkout;

const CheckoutContainer = styled.div`
  padding: 2rem;
  background: ${(props) => props.theme.grey};
  border-radius: 4px;
  margin: 5rem auto;
  width: 650px;

  h1 {
    font-size: 1.8rem;
    padding: 1rem 0;
    color: #fff;
    font-weight: 500;
    text-transform: capitalize;

    i {
      font-size: 1.8rem;
      margin-right: 1rem;
      color: #fff;
      cursor: pointer;
    }
  }

  .row {
    width: 100%;
  }

  .summary {
    list-style: none;
    background-image: linear-gradient(
      29deg,
      rgb(249, 154, 45),
      rgb(246, 92, 139) 71%
    );
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    margin-top: 1.5rem;
    margin-bottom: 2rem;

    .title {
      font-size: 1.7rem;
      color: #fff;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    li {
      font-size: 1.2rem;
      color: #fff;
      font-weight: 400;

      span {
        font-weight: 500;
        padding-left: 0.3rem;
        font-size: 1.3rem;
      }
    }
  }
`;
