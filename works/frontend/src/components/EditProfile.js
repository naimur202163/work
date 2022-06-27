import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import EditProfileModal from "./EditProfileModal";
import Button from "../styles/Button";
import { SignoutIcon } from "./Icons";
import { clearProfile, logoutUser, clearMarketingBanner } from "../actions";
import { disconnectSocket } from "../socket";
import StripeAccountEditModal from "./StripeAccountEditModal";
import { GlobalContext } from "../context/GlobalContext";
import config from "../config/config";

const Wrapper = styled.div`
  .toolTipLogout {
    font-family: ${(props) => props.theme.font}, sans-serif;
    //  background-color: ${(props) => props.theme.red};
    height: 20px;
    text-align: center;
    margin-bottom: 10px;
    padding-top: 2px !important;
    padding-bottom: 23px !important;
    padding-left: 5px !important;
    padding-right: 5px !important;
  }

  svg {
    width: 30px;
    height: 30px;
    margin-left: 0.5rem;
    fill: ${(props) => props.theme.darkGrey};
  }
  .button {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  div {
    display: flex;
    align-items: center;
  }

  .logout--button {
    cursor: pointer;
    display: flex !important;
    align-items: center !important;
    flex-direction: row !important;

    p {
      padding: 0 0.2rem;
      color: #777;
      font-size: 1rem;
      font-weight: 400;
    }
  }

  @media screen and (max-width: 600px) {
    div {
      flex-direction: column;
    }

    .button {
      font-size: 0.7rem !important;
      margin-bottom: 0.5rem;
    }

    .logout--button {
      svg {
        width: 20px;
        height: 20px;
      }

      p {
        font-size: 0.8rem;
      }
    }
  }
`;

const EditProfile = () => {
  const { showEditProfileModel, setShowEditProfileModel } =
    useContext(GlobalContext);
  const dispatch = useDispatch();
  const [showStripeAccountEditModal, setShowStripeAccountEditModal] =
    useState(false);
  const closeModal = () => setShowEditProfileModel(false);
  const { user, profile } = useSelector((state) => state);

  const history = useHistory();

  const redirectToLogin = () => {
    history.push("/login");
  };

  const stripeConnect = () => {
    debugger
    const url = `${config.REACT_APP_STRIPE_ONBOARDING}`;
    window.open(url, "_self");
  };
  return (
    <React.Fragment >
      <Wrapper>
        <div>
          {user.userrole === 2 && [
            !profile.stripe_account_id ? (
              <Button className="button" onClick={() => stripeConnect()}>
                Connect Wallet
              </Button>
            ) : (
              <Button
                className="button"
                grey
                onClick={() => setShowStripeAccountEditModal(true)}
              >
                Edit Wallet
              </Button>
            ),
          ]}
          <Button
            className="button"
            grey
            onClick={() => setShowEditProfileModel(true)}
          >
            Edit Profile
          </Button> 
          <div
            onClick={async () => {
              disconnectSocket();
              dispatch(clearProfile());
              await dispatch(clearMarketingBanner())
              dispatch(logoutUser());
              redirectToLogin();
            }}
            className="logout--button"
          >
            <SignoutIcon />
            <p>Logout</p>
          </div>
        </div>
      </Wrapper>
      {showEditProfileModel && <EditProfileModal closeModal={closeModal} />}
      {showStripeAccountEditModal && (
        <StripeAccountEditModal
          stripeConnect={stripeConnect}
          closeModal={setShowStripeAccountEditModal}
        />
      )}
    </React.Fragment>
  );
};
export default EditProfile;
