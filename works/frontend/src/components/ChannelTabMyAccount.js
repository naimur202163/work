import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import SubscriptionCard from "./SubscriptionCard";
import DeleteAccountModal from "./DeleteAccountModal";
import Progressbar from "./Progressbar";
import NotificationSwitchButton from "./NotificationSwitchButton";
import { Button } from "@material-ui/core";
import Referral from "./Referral";
import { useSelector, useDispatch } from "react-redux";
import { visitStripeCustomerPortal, deleteUser } from "../actions";
import { useLocation} from "react-router";
import { toast } from "react-toastify";
import ContactUsModal from "./contactUsModal";
import { disconnectSocket } from "../socket";
import TransactionHistory from "./TransactionHistory";
import ReferralWarriorPortal from "./ReferralWarriorPortal";

const Header = styled.h4`
  padding: 3em 0 0 0;
  font-size: 1.3rem;
`;

const HeaderReferral = styled.div`
p { 
  font-size: 1.3rem;
  font-weight: 700;
  display: block;
  text-transform: uppercase;
  background: -webkit-linear-gradient(#ff4883, #fdb769); 
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.02rem;
  text-shadow: 2px 2px 10px rgba(255, 255, 255, 0.3);
  margin-top: 3rem;
}
`;

const Header2 = styled.h3`
  .small-text {
    width: 90%;
    font-size: 0.8rem;
    color: #a6a6a6;
    padding-top: 1rem;
  }
`;

const Header3 = styled.h3`
  .small-text {
    width: 90%;
    font-size: 0.8rem;
    color: #a6a6a6;
    padding-bottom: 1rem;
  }
`;

const ChannelTabMyAccount = () => {
  const [showContactModal, setShowContactModal] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  let currentTab = query.get("tab");
  const closeModal = () => setShowModal(false);
  const closeContactModal = () => setShowContactModal(false);
  const { id, userrole, stripe_customer_id } = useSelector(
    (state) => state.userById
  );

  const currentLoggedInUser = useSelector((state) => state.user);

  const { isLoading: portalLoading, portal_url } = useSelector(
    (state) => state.customer_portal
  );
  const manageSubscription = () => {
    localStorage.setItem("lastUserRole", userrole);
    dispatch(visitStripeCustomerPortal(id, stripe_customer_id));
  };

  useEffect(() => {
    if (portal_url !== "") {
      window.location.replace(portal_url);
    }
  }, [portal_url]);
  useEffect(() => {
    if (portalLoading) {
      toast.success("Navigating to the customer portal");
    }
  }, [portalLoading]);
  // new add

  const tempFunction = useRef()
  const imgFunction = () => {
    let useRoleLoc = localStorage.getItem("lastUserRole");
    if (
      useRoleLoc &&
      currentTab === "myaccount" &&
      useRoleLoc !== "null" &&
      useRoleLoc !== userrole
    ) {
      toast.success("Subscription updated successfully");
      localStorage.setItem("lastUserRole", null);
    }
  }
  tempFunction.current = imgFunction
  useEffect(() => {
    tempFunction.current()
    
  }, []);

  const handleDeleteUser = (deleteWordConfirmation) => {
    if (deleteWordConfirmation.toLowerCase() === "delete") {
      disconnectSocket();
      dispatch(deleteUser(currentLoggedInUser));
    }
  };
  return (
    <div>
      {userrole === 2 ? (
        <div>
          <HeaderReferral>
            <p>CO-OP REFERRAL PROGRAM</p>
          </HeaderReferral>
          <Header2>
            <div className="small-text">
              Copy the link below to share on your social channels, receive
              $2.50 for each fan, friend, or person who signs up!
            </div>
          </Header2>
          <Referral />
          <Header2>
            <div className="small-text">
              Use this link to promot your unique Warrior Home Page. Where your
              bio, profile imagry and featured videos are seen! + Added bonus!
              Any users who signup via the links on your Warrior Home page also
              get you a $2.50 referral!
            </div>
          </Header2>
          <ReferralWarriorPortal />
        </div>
      ) : null}

      <div>
        <Header>CURRENT SUBSCRIPTION</Header>
        <Button
          variant="contained"
          color="primary"
          className="button"
          style={{ marginRight: "10px" }}
          onClick={manageSubscription}
        >
          Manage Subscriptions & Payment Methods
        </Button>
        <SubscriptionCard
          userrole={userrole}
          manageSubscription={manageSubscription}
        />
      </div>
      {userrole === 2 && (
        <div>
          <Progressbar />
        </div>
      )}

      <div>
        <Header>TRANSACTION HISTORY</Header>
        <TransactionHistory
          userId={currentLoggedInUser.id}
          userrole={currentLoggedInUser.userrole}
        />
      </div>

      <div>
        <Header>NOTIFICATIONS</Header>
        <Header3>
          <div className="small-text">
            Control the items you would like to receive notifications by adjusting the swtiches on/off.
          </div>
        </Header3>
        <NotificationSwitchButton />
      </div>

      <div style={{ paddingBottom: "7rem" }}>
        <Header>REMOVE ACCOUNT</Header>
        <Header3>
          <div className="small-text">
            The delete button will permanently delete your account on iSUTRA. This
            is irreversable! Please let us know if there is anything we can do to
            make your experience better, we are here for your service.
          </div>
        </Header3>

        <Button
          variant="contained"
          color="primary"
          className="button"
          style={{ marginRight: "10px" }}
          onClick={() => setShowContactModal(true)}
        >
          Contact Us
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowModal(true)}
        >
          Delete
        </Button>
        {showModal && (
          <DeleteAccountModal
            handleDeleteUser={handleDeleteUser}
            closeModal={closeModal}
          />
        )}
        {showContactModal && <ContactUsModal closeModal={closeContactModal} />}
      </div>
    </div>
  );
};

export default ChannelTabMyAccount;
