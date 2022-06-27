import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import Axios from "axios";
import Badge from "../components/SignupComponents/Badge";
import { connect } from "react-redux";
import { getUserById, getAllStorage } from "../actions";
import Storage from "../components/SignupComponents/Storage";
import UserSettings from "../components/SignupComponents/UserSettings";
import config from "../config/config";

const UpdateSubscription = ({ userRole, getUserById, getAllStorage }) => { 
  const history = useHistory();
  const { userId } = useParams();
  // Form Stepper State
  const [formStep, setFormStep] = useState(1);
  // badge state
  const [badges, setBadges] = useState([]);
  const [badgeSelected, setBadgeSelected] = useState(null);
  const [badgeLoading, setBadgeLoading] = useState(null);

  // storage state
  const [storageSelected, setStorageSelected] = useState(null);

  // user settings state
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [proContentProducer, setProContentProducer] = useState(false);
  const [partnerContentCreator, setPartnerContentCreator] = useState(false);
  const [contactViaEmail, setContactViaEmail] = useState(false);

  const isUserRoleChanged = useCallback(() => {
    if (userRole >= 0) {
      const lastUserRole = JSON.parse(localStorage.getItem("lastUserRole"));
      if (lastUserRole !== userRole) {
        return true;
      } else {
        return false;
      }
    }
  },[userRole]);

  useEffect(() => {
    if (userRole >= 0) {
      if (!isUserRoleChanged()) {
        window.location.replace(`/channel/${userId}`);
      } else {
        if (userRole >= 0) {
          if (userRole === 0) {
            fetchBadgesHandler("free");
          } else if (userRole === 1) {
            fetchBadgesHandler("basic");
          } else if (userRole === 2) {
            fetchBadgesHandler("premium");
          }
        }
        if (userRole) {
          if (userRole === 2) {
            getAllStorage();
          }
        }
      }
    }
  }, [getAllStorage, isUserRoleChanged, userId, userRole]);

  const fetchBadgesHandler = async (badgeParam) => {
    try {
      setBadgeLoading(true);
      const { data } = await Axios.get(
        `${config.REACT_APP_BACKEND_URL}badge/${badgeParam}`
      );
      setBadges(data.badges);

      setBadgeLoading(false);
    } catch (e) {
      setBadgeLoading(false);
    }
  };

  useEffect(() => {
    getUserById(userId);
  }, [getUserById, history.location.pathname, userId]);

  const userSignupHandlerForNotPremium = async () => {
    const { data } = await Axios.post(
      `${config.REACT_APP_BACKEND_URL}userSettings/updateVisitorBadge/`,
      {
        userId,
        visitorBadgeId: badgeSelected,
      }
    );
    if (data.status === "success") {
      window.location.replace(`/channel/${userId}?tab=myaccount`);
    }
  };
  const userSignupHandlerForPremium = async () => {
    const userSettingPayload = {
      outOfThisWorld: anonymous,
      country,
      city,
      state,
      proContentProducer: proContentProducer,
      partnerContentCreator: partnerContentCreator,
      contactViaEmail: contactViaEmail,
      visitorBadgeId: badgeSelected,
      userId,
    };
    const { data } = await Axios.post(
      `${config.REACT_APP_BACKEND_URL}userSettings/updateSettings/`,
      userSettingPayload
    );
    if (data.status === "success") {
      window.location.replace(`/channel/${userId}?tab=myaccount`);
    }
  };

  const handleBadgeSubmit = (value) => {
    setBadgeSelected(value);
  };

  window.scrollTo(0, 0);

  if (formStep === 1 && isUserRoleChanged()) {
    //show badges screen
    return (
      <Badge
        stepper={setFormStep}
        badges={badges}
        choosePackage={
          userRole !== 0 ? (userRole !== 1 ? "PREMIUM" : "BASIC") : "FREE"
        }
        badgeLoading={badgeLoading}
        badgeSelected={badgeSelected}
        page="updateSubscription"
        handleBadgeSubmit={handleBadgeSubmit}
        completeSignup={userSignupHandlerForNotPremium}
      />
    );
  } else if (formStep === 2) {
    return (
      <Storage
        storageSelected={storageSelected}
        setStorageSelected={setStorageSelected}
        stepper={setFormStep}
        page="updateSubscription"
      />
    );
  } else if (formStep === 3) {
    return (
      <UserSettings
        stepper={setFormStep}
        country={country}
        setCountry={setCountry}
        state={state}
        setState={setState}
        city={city}
        setCity={setCity}
        anonymous={anonymous}
        setAnonymous={setAnonymous}
        proContentProducer={proContentProducer}
        setProContentProducer={setProContentProducer}
        partnerContentCreator={partnerContentCreator}
        setPartnerContentCreator={setPartnerContentCreator}
        contactViaEmail={contactViaEmail}
        setContactViaEmail={setContactViaEmail}
        completeSignup={userSignupHandlerForPremium}
        page="updateSubscription"
      />
    );
  } else {
    return null;
  }
};

const mapStateToProps = ({ userById }) => ({
  userRole: userById.userrole,
});

export default connect(mapStateToProps, {
  getUserById,
  getAllStorage,
})(UpdateSubscription);
