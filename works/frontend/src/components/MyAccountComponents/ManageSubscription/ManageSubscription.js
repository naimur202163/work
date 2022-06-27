import React from "react";
import styled from "styled-components";
import BackIcon from "../../../assets/Icons/back.svg";
import ArrowIcon from "../../../assets/Icons/arrow.svg";

const ManageSubscription = ({ close }) => {
  return (
    <ManageSubscriptionStyled>
      <div className="wrapper">
        <div className="wrapper__header">
          <div onClick={close} className="backIcon">
            <img src={BackIcon} alt="" />
          </div>
          <div className="name">Manage Subscription</div>
        </div>

        <p className="infoText">Your Isutra Subscription</p>

        <div className="wrapper__subscriptionBox">
          <div className="wrapper__subscriptionBox--currentSubscription">
            <div className="role">Warrior</div>
            <div className="userType">Creator</div>
            <div className="infoText">
              Create content, receive community support. Build a national
              following. Generate income.
            </div>
            <div className="plan">
              <span>starting at</span>
              <p>$10/Year</p>
            </div>
          </div>

          <div className="wrapper__subscriptionBox--options">
            <div className="wrapper__subscriptionBox--optionCard renewal">
              <div className="title">Renewal date</div>
              <div className="date">20 December 2022</div>
              <div className="actionText">Update payment method</div>

              <div className="arrow">
                <img src={ArrowIcon} alt="" />
              </div>
            </div>

            <div className="wrapper__subscriptionBox--optionCard manage">
              <div className="title">Renewal date</div>
              <div className="date">20 December 2022</div>
              <div className="actionText">Update payment method</div>

              <div className="arrow">
                <img src={ArrowIcon} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ManageSubscriptionStyled>
  );
};

export default ManageSubscription;

const ManageSubscriptionStyled = styled.div`
  .wrapper {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    font-family: ${(props) => props.theme.montserrat};
    background-color: #1c1c1e;
    overflow-y: scroll;
    z-index: 150;

    /* width */
    ::-webkit-scrollbar {
      width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #3a3a3c;
      border-radius: 7px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: rgb(246, 92, 139);
    }

    &__header {
      display: flex;
      align-items: center;
      padding: 1rem 5rem;
      border-bottom: 1px solid rgba(112, 112, 112, 0.4);

      .backIcon {
        margin-right: 1rem;
        cursor: pointer;

        img {
          height: 1rem;
          width: auto;
        }
      }

      .name {
        font-size: 1.2rem;
        font-weight: 400;
        text-transform: capitalize;
      }
    }

    .infoText {
      font-size: 0.85rem;
      font-weight: 300;
      color: #f2f2f7;
      text-align: center;
      padding: 1rem 0;
    }

    &__subscriptionBox {
      width: 45%;
      min-width: 480px;
      margin: 0 auto 8rem auto;
      background-color: #2c2c2e;
      padding: 1.5rem 2rem;
      border-radius: 0.5rem;

      &--currentSubscription {
        width: 100%;
        border-radius: 0.5rem;
        background: linear-gradient(to right bottom, #f9903d, #f75b8c);
        padding: 1.5rem 3rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-bottom: 2rem;

        .role {
          font-family: brother-1816, sans-serif;
          font-size: 1.5rem;
          text-transform: uppercase;
          color: #fff;
          font-weight: 500;
          line-height: 1;
        }

        .userType {
          line-height: 1.3;
          font-size: 0.8rem;
          font-weight: 300;
        }

        .infoText {
          color: #fde5b8;
          font-size: 0.9rem;
          font-weight: 500;
          line-height: 1.2;
        }

        .plan {
          background-color: #fff;
          padding: 0.7rem 1.5rem;
          border-radius: 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;

          span {
            color: #d1d1d6;
            font-weight: 400;
            font-size: 0.65rem;
          }

          p {
            color: #f46a6a;
            font-size: 1.2rem;
            font-weight: 700;
            line-height: 1;
          }
        }
      }

      &--options {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      &--optionCard {
        background-color: #3a3a3c;
        width: 48%;
        border-radius: 0.25rem;
        padding: 1.5rem;
        position: relative;
        cursor: pointer;

        .title {
          color: #fff;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .date {
          font-size: 0.9rem;
          font-weight: 300;
        }

        .actionText {
          color: #f9903d;
          font-weight: 500;
          font-size: 0.7rem;
        }

        .arrow {
          position: absolute;
          bottom: 0;
          right: 1rem;

          img {
            height: 0.8rem;
            width: auto;
          }
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    .wrapper {
      &__header {
        padding: 0.8rem 2rem;
      }

      &__subscriptionBox {
        width: 90%;
        padding: 1rem;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .wrapper {
      &__header {
        padding: 0.5rem 1.5rem;

        .name {
          font-size: 1rem;
        }
      }

      &__subscriptionBox {
        width: 100%;
      }
    }
  }
`;
