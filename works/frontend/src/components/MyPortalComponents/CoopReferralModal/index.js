import React from "react";
import styled, { keyframes } from "styled-components";
import CaretDownIcon from "../../../assets/Icons/caret-down.svg";
import ShareButton from "../../ShareBtn";
import Buttons from "../../ReferralBtn";

const CoopReferralModal = ({ doNotClose, close }) => {

    return (
        <CoopReferralModelStyled ref={doNotClose}>
            <div onClick={close} className="header">
                <img src={CaretDownIcon} alt="" className="closeIcon" />
                <div className="title">Coop-Referral Program</div>
            </div>
            <div class="body">
                <p class="heading-body">
                    Tap to promote your unique
                    <span className="heading-body-span">
                        {" "}
                        Warrior Home Page.
                    </span>{" "}
                    where your bio. Profile imagery and featured videos are seen!
                </p>
                <p className="heading-body-sub">
                    Plus added <span className="heading-body-bold"> bonus</span> any
                    users who signup via the links on your warrior Home page also get
                    you a<span className="heading-body-bold"> $2.50 referral!</span>
                </p>
                <Buttons className="coop-btn"> COOP-REFERRAL</Buttons>

                <h5 className="share">Share Your Profile on social media</h5>
                <p className="share-subtitle">
                    Tab below to share on your social channels, recive $2.50 for each
                    fan,friend, or person who signs up!
                </p>
                <ShareButton className="share-btn">Share</ShareButton>
            </div>
        </CoopReferralModelStyled>
    );
};

export default CoopReferralModal;

const openAnimation = keyframes`
  from {
    transform: translateY(5rem);
    opacity: 0;
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CoopReferralModelStyled = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  height: calc(100% - 5.5rem);
  background-color: #3a3a3c;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  padding: 1rem 2rem;
  animation: ${openAnimation} 0.35s ease-out;
  overflow-y: auto;
  overflow-x: hidden;
  border-top: 1px solid rgba(112, 112, 112, 0.25);

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

  .header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(112, 112, 112, 0.5);
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    cursor: pointer;

    .closeIcon {
      height: 0.5rem;
      width: auto;
      margin-right: 1rem;
    }

    .title {
      font-size: 0.9rem;
      font-weight: 400;
      text-transform: capitalize;
      color: #f2f2f7;
    }
  }

  .options {
    &__slider {
      padding: 0.5rem 0;
      border-bottom: 2px solid rgba(99, 99, 102, 0.5);
      margin-bottom: 1rem;

      &--title {
        font-weight: 600;
        color: #c7c7cc;
        font-size: 0.9rem;
        text-transform: capitalize;
        margin-bottom: 0.5rem;
      }

      &--list {
        display: flex;
        align-items: center;

        .active .optionBtn {
          color: #1c1c1e !important;
          background-color: #f2f2f7 !important;
          font-weight: 600 !important;
        }

        .item {
          margin-right: 1rem;

          .optionBtn {
            width: 100%;
            padding: 0.5rem 1.5rem;
            border-radius: 0.5rem;
            background-color: #636366;
            color: #f2f2f7;
            font-size: 0.85rem;
            font-weight: 300;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0.5rem;
            border: none;
            outline: none;
            font-family: ${(props) => props.theme.montserrat};
          }
        }
      }
    }
  }

  div.body {
    padding: 1rem;
    .heading-body {
      font-size: 13px;
      line-height: 17px;
      color: #e5e5ea;
      padding-bottom: 22px;
      font-family: Montserrat, Regular;
    }
    .heading-body-span {
      font-size: 13px;
      font-weight: 600;
      color: #e5e5ea;
      font-family: Montserrat, SemiBold;
    }
    .heading-body-sub {
      font-size: 13px;
      line-height: 17px;
      color: #e5e5ea;
      padding-bottom: 28px;
      font-family: Montserrat, Regular;
    }
    .heading-body-bold {
      font-size: 13px;
      font-weight: 600;
      line-height: 10px;
      color: #e5e5ea;
      padding-bottom: 31px;
      font-family: Montserrat, SemiBold;
    }
    .share {
      font-size: 15px;
      font-weight: 700;
      color: #f2f2f7;
    }
    .share-subtitle {
      font-size: 13px;
      line-height: 17px;
      color: #e5e5ea;
      padding-bottom: 28px;
      font-family: Montserrat, SemiBold;
    }
    .coop-btn {
      color: #ffffff;
      font-size: 15px;
      font-family: Montserrat, Bold;
      letter-spacing: 1.97px;
    }
    .share-btn {
      color: #f9903d;
      font-size: 15px;
      font-family: Montserrat, Bold;
      letter-spacing: 1.97px;
    }
  }

  @media screen and (max-width: 375px) {
    .header {
      .title {
        font-size: 0.8rem;
      }
    }
  }
`;
