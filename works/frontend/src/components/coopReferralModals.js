import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { CloseIcon } from "./Icons";
import Buttons from "./ReferralBtn";
import ShareButton from "./ShareBtn";

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
  padding-left: 10px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 900;
  background: rgba(0, 0, 0, 0.7);
  animation: ${openModal} 0.5s ease-in-out;

  .edit-profile {
    padding: 2em;
    width: 580px;
    border-radius: 4px;
    background: ${(props) => props.theme.grey};
    margin: 4rem auto;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.4), 0px 0px 4px rgba(0, 0, 0, 0.25);
    padding-left: 31px;
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

    .heading-items {
      display: flex;
      align-items: center;
      margin-left: -47px;
    }
  }

  .heading {
    font-size: 15px;
    font-weight: 700;
    line-height: 15px;
    color: #f2f2f7;
    margin-left: -13px;
  }

  svg {
    fill: ${(props) => props.theme.red};
    height: 22px;
    width: 22px;
    margin-right: 1rem;
    position: relative;
    top: -1px;
    margin-left: 1.5rem;
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

const CoopReferralModals = ({ closeModal }) => {
  return (
    <Wrapper>
      <div className="container">
        <div className="edit-profile">
          <div className="modal-header">
            <h3 className="heading-items">
              <CloseIcon onClick={() => closeModal()} />
              <span className="heading">Coop-Referral Program</span>
            </h3>
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
        </div>
      </div>
    </Wrapper>
  );
};

export default CoopReferralModals;
