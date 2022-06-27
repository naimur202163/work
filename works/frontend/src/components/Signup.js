import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import Axios from "axios";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import Package from "./SignupComponents/Package";
import FacebookLogin from "react-facebook-login";
import Badge from "./SignupComponents/Badge";
import UserSettings from "./SignupComponents/UserSettings";
import Storage from "./SignupComponents/Storage";
import Logo from "./icons/iSUTRA_logo_clean_white.png";
import BadgeLogo from "./icons/badge-signin.png";
import { motion } from "framer-motion";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import PasswordStrengthBar from "react-password-strength-bar";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import GoogleLogin from 'react-google-login';

// redux part
import { connect, useDispatch, useSelector } from "react-redux";
import {
  getAllStorage,
  signupUser,
  isEmailExist,
  isUserNameExist,
  isReferralCodeExist,
} from "../actions/index";
import { useHistory, useLocation } from "react-router-dom";
import Checkout from "./SignupComponents/Checkout";
import Agreement from "./SignupComponents/Agreement";
import SignupMarketingBanner from "./SignupComponents/SignupMarketingBanner";
import { darkTheme } from "../styles/theme";
import config from "../config/config";

export const StyledAuth = styled.div`
  width: 385px;
  padding: 1.5rem;
  background: ${(props) => props.theme.grey};
  border-radius: 4px;
  margin: 1rem auto;

  h2 {
    margin-bottom: 1.3rem;
  }

  .input-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: baseline;
  }

  .input-group input:last-child {
    margin-left: 0.7rem;
  }

  input {
    overflow: hidden;
    border-radius: 3px;
    width: 100%;
    padding: 0.6rem 1.2rem;
    background: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.black};
    margin-bottom: 1.5rem;
    color: ${(props) => props.theme.primaryColor};
  }

  .action {
    margin-top: 1rem;
  }

  .google-login button{
    position: relative;
    display: flex;
    width: 100%;
    margin-top: 8px;
    background: black !important;
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 1.1px;
    border: 1px solid ${(props) => props.theme.orange} !important;
  }

  .facebook-login button{
    position: relative;
    display: flex;
    width: 100%;
    margin-top: 8px;
    background: ${(props) => props.theme.grey};
    border: 1px solid ${(props) => props.theme.gradient};
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 1.1px;
  }


  button {
    padding: 0.4rem 1rem;
    background: ${(props) => props.theme.gradient};
    color: ${(props) => props.theme.white};
    border: 1px solid ${(props) => props.theme.orange};
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 1.1px;
  }

  span {
    letter-spacing: 0.8px;
    color: ${(props) => props.theme.secondaryColor};
  }
  .margin {
    margin-right: 12px;
  }
  .password-container {
    display: flex;
    flex-direction: column;
    position: relative;
    .icon {
      position: absolute;
      top: 13%;
      right: 3%;
      color: #757575;
    }
  }

  .note-text {
    font-size: 12px;
  }

  /* checkbox of license agreement */
  .agreementInputContainer {
    padding: 1.5rem 0;

    p {
      font-size: 0.85rem;
      color: ${(props) => props.theme.red};
      color: #13a1ff;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media screen and (max-width: 430px) {
    margin: 7% auto;
    width: 90%;
  }
`;

const useStyles = makeStyles((theme) => ({
  Checkbox: {
    "& .MuiSvgIcon-root": {
      fill: "red",
    },
  },
}));

const Signup = ({
  isEmailExist,
  isUserNameExist,
  isReferralCodeExist,
}) => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [formStep, setFormStep] = useState(1);
  const [choosePackage, setChoosePackage] = useState(null); // "FREE", "BASIC", "PREMIUM"
  const [badges, setBadges] = useState([]);
  const [badgeSelected, setBadgeSelected] = useState(null);
  const [badgeLoading, setBadgeLoading] = useState(null);
  const [loading, setLoading] = useState(null);
  const [googleProfileId, setGoogleProfileId] = useState(null);
  const [facebookProfileId, setFacebookProfileId] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // marketing banners
  const banners = useSelector((state) => state.marketingBanner);
  let filteredMarketingBanner;
  if (banners.length > 0) {
    filteredMarketingBanner = banners.filter(
      (banner) => banner.bannerLocation === 5
    );
  }

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
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [setBadgesBasic] = useState("basic");
  const [showLicenseAgreementPage, setShowLicenseAgreementPage] =
    useState(false);
  const [agreedToLicense, setAgreedToLicense] = useState(false);
  const [passwordStrengthScore, setPasswordStrengthScore] = useState(0);
  const [disableInput, setDisabledInput] = useState(false);
  const firstname = useInput("");
  const lastname = useInput("");
  const username = useInput("");
  const email = useInput("");
  const referralCode = useInput("");
  const password1 = useInput("");
  const password2 = useInput("");

  const googleLoginSuccess = async (response) => {
    const { profileObj, googleId } = response

    const profile = await Axios.get(
      `${config.REACT_APP_BACKEND_URL}auth/google/${googleId}`
    );

    if (!profile.data.data?.googleId) {
      email.setValue(profileObj.email)
      firstname.setValue(profileObj.givenName)
      lastname.setValue(profileObj.familyName)
      setGoogleProfileId(googleId)
      toast.info('Enter a username to complete the signup process')
      setDisabledInput(true)
    } else {
      toast.error('this google account has been registered')
    }
  }

  const responseFacebook = async (response) => {
    try {
      const { userID } = response
      const profile = await Axios.get(
        `${config.REACT_APP_BACKEND_URL}auth/facebook/${userID}`
      );
      if (!profile.data.data?.facebookId) {
        setFacebookProfileId(userID)
        toast.info('Enter your details to complete the signup process')
      } else {
        toast.error('this facebook account has been registered')
      }
    } catch (e) {
      toast.error("Something went wrong!");
    }
  }

  const googleLoginFailure = () => {
    toast.error("Something went wrong!")
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [formStep]);

  // new add
  const tempFunction = useRef()
  const imgFunction = () =>{
    if (query.get("code")) {
      referralCode.setValue(query.get("code"));
    }
  }
  tempFunction.current = imgFunction
  useEffect(() => {
    tempFunction.current()
  }, [query.get("code")]);

  useEffect(() => {
    if (choosePackage) {
      if (choosePackage === "FREE") {
        fetchBadgesHandler("free");
      } else if (choosePackage === "BASIC") {
        fetchBadgesHandler("basic");
      } else if (choosePackage === "PREMIUM") {
        fetchBadgesHandler("premium");
      }
    }

    if (choosePackage) {
      if (choosePackage === "PREMIUM") {
        dispatch(getAllStorage());
      }
    }
  }, [formStep, choosePackage, dispatch]);

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

  const handleBadgeSubmit = (value) => {
    setBadgeSelected(value);
  };

  const userSignupHandlerForNotPremium = async (paymentMethodId) => {
    setLoading(true);
    var validationResponse = await checkValidationForSignupForm();
    if (validationResponse) {
      setLoading(false);
      return toast.error(validationResponse);
    }

    const payload = {
      firstname: firstname.value,
      lastname: lastname.value,
      username: username.value,
      email: email.value,
      password: password1.value,
      userrole:
        choosePackage === "FREE"
          ? 0
          : choosePackage === "BASIC"
            ? 1
            : choosePackage === "PREMIUM"
              ? 2
              : 0,
      paymentMethodId,
      code: query.get("code") || referralCode.value,
      agreedToLicense,
      googleId: googleProfileId,
      facebookId: facebookProfileId
    };

    const clearForm = () => {
      username.setValue("");
      firstname.setValue("");
      lastname.setValue("");
      email.setValue("");
      password1.setValue("");
      password2.setValue("");
      setChoosePackage(null);
      setBadgeSelected(null);
    };

    const userSettingPayload = {
      outOfThisWorld: null,
      country: null,
      city: null,
      state: null,
      proContentProducer: false,
      partnerContentCreator: false,
      contactViaEmail: false,
      visitorBadgeId: badgeSelected,
    };
    await dispatch(signupUser(payload, userSettingPayload, clearForm, history));
    setLoading(false);
  };

  const userSignupHandlerForPremium = async (paymentMethodId) => {
    const payload = {
      firstname: firstname.value,
      lastname: lastname.value,
      username: username.value,
      email: email.value,
      password: password1.value,
      storagePackageId: storageSelected,
      userrole:
        choosePackage === "FREE"
          ? 0
          : choosePackage === "BASIC"
            ? 1
            : choosePackage === "PREMIUM"
              ? 2
              : 0,
      code: query.get("code") || referralCode.value,
      paymentMethodId,
      agreedToLicense,
    };

    const clearForm = () => {
      username.setValue("");
      firstname.setValue("");
      lastname.setValue("");
      email.setValue("");
      password1.setValue("");
      password2.setValue("");
      setChoosePackage(null);

      setBadgeSelected(null);
      setCountry("");
      setCity("");
      setState("");
      setAnonymous(false);
      setProContentProducer(false);
      setPartnerContentCreator(false);
      setContactViaEmail(false);
    };

    const userSettingPayload = {
      outOfThisWorld: anonymous,
      country,
      city,
      state,
      proContentProducer: proContentProducer,
      partnerContentCreator: partnerContentCreator,
      contactViaEmail: contactViaEmail,
      visitorBadgeId: badgeSelected,
    };
    setLoading(true);
    dispatch(signupUser(payload, userSettingPayload, clearForm, history));
    setLoading(false);
  };

  const goToStepFourHandler = async () => {
    const validationResponse = await checkValidationForSignupForm();
    if (validationResponse) {
      return toast.error(validationResponse);
    }
    setFormStep(4);
  };

  const checkValidationForTribeUser = async () => {
    const validationResponse = await checkValidationForSignupForm();
    if (validationResponse) {
      return toast.error(validationResponse);
    }
    setShowStripeModal(true);
  };

  const passwordRegEx = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );
  const allLetter = (inputTxt) => {
    const response = inputTxt.match(/^[A-Za-z]+$/) ? true : false;
    return response;
  };

  const checkValidationForSignupForm = async () => {
    if (
      !firstname.value.trim() ||
      !lastname.value.trim() ||
      !username.value.trim() ||
      !email.value.trim() ||
      !googleProfileId && !facebookProfileId && !password1.value.trim() ||
      !googleProfileId && !facebookProfileId && !password2.value.trim()
    ) {
      return "Please fill in all fields.";
    }
    if (username.value.length < 3) {
      return "Username must be at least 3 characters.";
    }
    if (username.value.length > 30) {
      return "Username cannot be more than 30 characters.";
    }
    if (!googleProfileId && !facebookProfileId) {
      if (password1.value.length <= 7) {
        return "Password must be at least 8 characters long, contain at least 1 Number, 1 Upper case letter & 1 Special character.";
      }
      if (passwordStrengthScore < 2 || !passwordRegEx.test(password1.value)) {
        return "Password must be at least 8 characters long, contain at least 1 Number, 1 Upper case letter & 1 Special character.";
      }
      if (password1.value !== password2.value) {
        return "Password does not match.";
      }
    }
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email.value.trim()
      )
    ) {
      return "Please enter a valid email address";
    }

    const re = /^[a-z0-9]([._-](?![._-])|[a-z0-9]){1,20}[a-z0-9]$/i;
    if (!re.exec(username.value)) {
      return "Usernames can be made up of only letters & numbers (underscores or periods between words is fine!)";
    }

    if (
      (choosePackage === "FREE" || choosePackage === "BASIC") &&
      !agreedToLicense
    ) {
      return "You must check the Accept Terms box for the iSutra Bill of Rights";
    }

    let responseUsername = await checkUsernameAlreadyExist(username.value);
    if (responseUsername) {
      return responseUsername;
    }

    let responseEmail = await checkEmailAlreadyExist(email.value);
    if (responseEmail) {
      return responseEmail;
    }

    let responseReferralCode = await checkReferralCodeAlreadyExist(
      referralCode.value
    );
    if (responseReferralCode) {
      return responseReferralCode;
    }
    return null;
  };

  const onUsernameChange = async (e) => {
    const enteredUserName = e.target.value;
    username.setValue(enteredUserName.trim().toLowerCase());
    let response = await checkUsernameAlreadyExist(enteredUserName);
    if (response) {
      toast.error(response);
    }
  };

  const onReferralCodeChange = async (e) => {
    const referralCode = e.target.value;
    let response = await checkReferralCodeAlreadyExist(referralCode);
    if (response) {
      toast.error(response);
    }
  };

  const checkReferralCodeAlreadyExist = async (referralCode) => {
    if (!referralCode) {
      return;
    }
    const referralCodeAlreadyExistResponse = await isReferralCodeExist(
      referralCode
    );
    if (
      referralCodeAlreadyExistResponse &&
      referralCodeAlreadyExistResponse.data &&
      referralCodeAlreadyExistResponse.data.data &&
      referralCodeAlreadyExistResponse.data.data.username
    ) {
      return null;
    } else {
      return `Referral code ${referralCode} is invalid or doesn't exist`;
    }
  };

  const checkUsernameAlreadyExist = async (enteredUserName) => {
    if (enteredUserName.length >= 3) {
      const usernameAlreadyExistResponse = await isUserNameExist(
        enteredUserName
      );
      if (
        usernameAlreadyExistResponse &&
        usernameAlreadyExistResponse.data &&
        usernameAlreadyExistResponse.data.data &&
        usernameAlreadyExistResponse.data.data.username
          .toString()
          .toLowerCase() === enteredUserName.toString().toLowerCase()
      ) {
        return `${enteredUserName} is already taken, please choose another username.`;
      }
    } else return null;
  };

  const onEmailChange = async (e) => {
    const enteredEmail = e.target.value;
    email.setValue(enteredEmail.trim().toLowerCase());
    let response = await checkEmailAlreadyExist(enteredEmail);
    if (response) {
      toast.error(response);
    }
  };

  const onFirstNameChange = async (e) => {
    const fname = e.target.value;
    if (!allLetter(fname.trim())) {
      toast.error("Name should contain only letters");
      firstname.setValue("");
    } else {
      firstname.setValue(fname.trim());
    }
  };

  const onLastNameChange = async (e) => {
    const lname = e.target.value;
    if (!allLetter(lname.trim())) {
      toast.error("Name should contain only letters");
      lastname.setValue("");
    } else {
      lastname.setValue(lname.trim());
    }
  };

  const onChangeScore = (score) => {
    setPasswordStrengthScore(score);
  };

  const checkEmailAlreadyExist = async (enteredEmail) => {
    /* eslint-disable no-useless-escape */
    const regexForEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    if (regexForEmail.exec(enteredEmail)) {
      const emailAlreadyExistResponse = await isEmailExist(enteredEmail);
      if (
        emailAlreadyExistResponse &&
        emailAlreadyExistResponse.data &&
        emailAlreadyExistResponse.data.data &&
        emailAlreadyExistResponse.data.data.email.toString().toLowerCase() ===
        enteredEmail.toString().toLowerCase()
      ) {
        return `An account with ${enteredEmail} already exists. You can reset the password for this account or use another email.`;
      } else return null;
    } else return null;
  };

  if (showLicenseAgreementPage) {
    return (
      <SignupMarketingBanner banner={filteredMarketingBanner}>
        <Agreement setShowLicenseAgreementPage={setShowLicenseAgreementPage} />
      </SignupMarketingBanner>
    );
  }

  if (choosePackage === "BASIC" && showStripeModal) {
    return (
      <SignupMarketingBanner banner={filteredMarketingBanner}>
        <Checkout
          completeSignup={userSignupHandlerForNotPremium}
          setBadgesBasic={setBadgesBasic}
          stepper={setFormStep}
          setShowStripeModal={setShowStripeModal}
          choosePackage={choosePackage}
          referralCode={query.get("code") || referralCode.value}
        />
      </SignupMarketingBanner>
    );
  }

  if (choosePackage === "PREMIUM" && showStripeModal) {
    return (
      <SignupMarketingBanner banner={filteredMarketingBanner}>
        <Checkout
          completeSignup={userSignupHandlerForPremium}
          stepper={setFormStep}
          setShowStripeModal={setShowStripeModal}
          storageSelected={storageSelected}
          choosePackage={choosePackage}
          referralCode={query.get("code") || referralCode.value}
        />
      </SignupMarketingBanner>
    );
  }

  if (formStep === 1) {
    return (
      <SignupMarketingBanner banner={filteredMarketingBanner}>
        <Package
          stepper={setFormStep}
          choosePackage={choosePackage}
          setChoosePackage={setChoosePackage}
        />
      </SignupMarketingBanner>
    );
  } else if (formStep === 2) {
    return (
      <SignupMarketingBanner banner={filteredMarketingBanner}>
        <Badge
          stepper={setFormStep}
          badges={badges}
          badgeLoading={badgeLoading}
          badgeSelected={badgeSelected}
          setBadgeSelected={setBadgeSelected}
          handleBadgeSubmit={handleBadgeSubmit}
        />
      </SignupMarketingBanner>
    );
  } else if (formStep === 3) {
    return (
      <SignupMarketingBanner banner={filteredMarketingBanner}>
        <Container>
          <motion.img
            initial={{ opacity: 0, y: "-50rem" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 2 }}
            className="logo"
            src={Logo}
            alt="Isutra Logo"
          />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 2 }}
          >
            <StyledAuth>
              <h2>Enter your details</h2>
              <>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstname.value}
                    onChange={firstname.onChange}
                    onBlur={onFirstNameChange}
                    disabled={disableInput}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastname.value}
                    onChange={lastname.onChange}
                    onBlur={onLastNameChange}
                    disabled={disableInput}
                  />
                </div>
                <input
                  type="text"
                  placeholder="User Name"
                  value={username.value}
                  onChange={username.onChange}
                  onBlur={onUsernameChange}
                />
                <input
                  type="email"
                  placeholder="email"
                  value={email.value}
                  onChange={email.onChange}
                  onBlur={onEmailChange}
                  disabled={disableInput}
                />
                {!googleProfileId && !facebookProfileId &&
                  <div className="input-group">
                    <div className="password-container margin">
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Password"
                        value={password1.value}
                        onChange={password1.onChange}
                        style={{ marginBottom: "0.5rem" }}
                      />
                      <span className="icon">
                        {!isPasswordVisible && (
                          <VisibilityIcon
                            onClick={() => setIsPasswordVisible(true)}
                          ></VisibilityIcon>
                        )}
                        {isPasswordVisible && (
                          <VisibilityOffIcon
                            onClick={() => setIsPasswordVisible(false)}
                          ></VisibilityOffIcon>
                        )}
                      </span>

                      <PasswordStrengthBar
                        password={password1.value}
                        onChangeScore={onChangeScore}
                      />
                    </div>

                    <div className="password-container">
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={password2.value}
                        onChange={password2.onChange}
                      />
                      <span className="icon">
                        {!isPasswordVisible && (
                          <VisibilityIcon
                            onClick={() => setIsPasswordVisible(true)}
                          ></VisibilityIcon>
                        )}
                        {isPasswordVisible && (
                          <VisibilityOffIcon
                            onClick={() => setIsPasswordVisible(false)}
                          ></VisibilityOffIcon>
                        )}
                      </span>
                    </div>
                  </div>
                }
                {choosePackage === "BASIC" || choosePackage === "PREMIUM" ? (
                  <div>
                    <input
                      type="Referral Code"
                      placeholder="Referral Code (optional)"
                      value={referralCode.value}
                      onChange={referralCode.onChange}
                      onBlur={onReferralCodeChange}
                    />
                    <p className="note-text secondary">
                      NOTE: Know a Content Creator you want to support? Enter
                      their username here and we’ll send them $2.50 (half) of
                      your Co-Op membership!
                    </p>
                  </div>
                ) : null}
                {choosePackage === "FREE" || choosePackage === "BASIC" ? (
                  <div className="agreementInputContainer">
                    <FormControlLabel
                      className={classes.Checkbox}
                      control={
                        <Checkbox
                          checked={agreedToLicense}
                          onChange={() => setAgreedToLicense(!agreedToLicense)}
                          name="agreedToLicense"
                        />
                      }
                      label="Accept Terms"
                    />

                    <p onClick={() => setShowLicenseAgreementPage(true)}>
                      Please agree to the iSutra Bill of Rights
                    </p>
                  </div>
                ) : null}

                <div className="action input-group">
                  <span className="pointer" onClick={() => setFormStep(2)}>
                    Go Back!
                  </span>
                  {/* eslint-disable jsx-a11y/anchor-is-valid*/}
                  <a
                    onClick={() => {
                      setShowStripeModal(false);
                    }}
                  >
                    <button
                      disabled={loading}
                      onClick={() => {
                        if (choosePackage === "PREMIUM") {
                          goToStepFourHandler();
                        } else if (choosePackage === "FREE") {
                          userSignupHandlerForNotPremium();
                        } else {
                          checkValidationForTribeUser();
                        }
                      }}
                    >
                      {loading
                        ? "Please wait..."
                        : choosePackage === "PREMIUM"
                          ? "NEXT"
                          : choosePackage === "BASIC"
                            ? "NEXT"
                            : "Create Account"}
                    </button>
                  </a>
                </div>
              </>
              {!googleProfileId && !facebookProfileId &&
                <>
                  <div className="google-login">
                    <GoogleLogin
                      clientId={config.REACT_APP_GOOGLE_CLIENT_ID}
                      buttonText="Sign Up With Google"
                      onSuccess={googleLoginSuccess}
                      onFailure={googleLoginFailure}
                      cookiePolicy={'single_host_origin'}
                    />
                  </div>
                  <div className="facebook-login">
                    <FacebookLogin
                      appId={config.REACT_APP_FACEBOOK_ID}
                      autoLoad={false}
                      textButton="Sign up With Facebook"
                      fields="name, email"
                      callback={responseFacebook}
                      theme={darkTheme}
                    />
                  </div>
                </>
              }
            </StyledAuth>
          </motion.div>

          <motion.img
            initial={{ opacity: 0, y: "50rem" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 2 }}
            className="logo-badge"
            src={BadgeLogo}
            alt="Badge Logo"
          />
        </Container>
      </SignupMarketingBanner>
    );
  } else if (formStep === 4) {
    return (
      <SignupMarketingBanner banner={filteredMarketingBanner}>
        <Storage
          storageSelected={storageSelected}
          setStorageSelected={setStorageSelected}
          stepper={setFormStep}
          page="signup"
        />
      </SignupMarketingBanner>
    );
  } else if (formStep === 5) {
    return (
      <SignupMarketingBanner banner={filteredMarketingBanner}>
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
          setShowStripeModal={setShowStripeModal}
          agreedToLicense={agreedToLicense}
          setAgreedToLicense={setAgreedToLicense}
          setShowLicenseAgreementPage={setShowLicenseAgreementPage}
        />
      </SignupMarketingBanner>
    );
  } else {
    return null;
  }
};

export default connect(null, {
  isEmailExist,
  isUserNameExist,
  isReferralCodeExist,
})(Signup);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 0;
  min-height: 100vh;
  max-height: auto;

  @keyframes rotating {
    from {
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .logo {
    height: 4rem;
    width: auto;
    cursor: pointer;
  }
  .logo-badge {
    height: 6rem;
    width: auto;
    cursor: pointer;

    &:hover {
      -webkit-animation: rotating 10s linear infinite;
      -moz-animation: rotating 10s linear infinite;
      -ms-animation: rotating 10s linear infinite;
      -o-animation: rotating 10s linear infinite;
      animation: rotating 10s linear infinite;
    }
  }

  @media (max-width: 768px) {
    .logo-badge {
      height: 7rem;
    }
  }
`;
