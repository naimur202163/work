import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { loginUser, loginUserErrorMsgRefresh } from "../actions";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Logo from "./icons/iSUTRA_logo_clean_white.png";
import BadgeLogo from "./icons/badge-signin.png";
import { motion } from "framer-motion";
import { } from "../styles/theme";
import FacebookLogin from "react-facebook-login";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import GoogleLogin from 'react-google-login';
import { darkTheme } from '../styles/theme'
import { loginWithGoogle, loginWithFacebook } from "../actions/index";
import config from "../config/config";
const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.user);
  const emailOrUsername = useInput("");
  const password = useInput("");
  const [isEmail, setIsEmail] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(false);

  const gotoSignUpPage = () => {
    setLoginButtonDisabled(false);
    history.replace("/signup");
  };
  const gotoForgetPasswordPage = () => {
    history.push("/forgot_password");
  };

  useEffect(() => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        emailOrUsername.value.trim()
      )
    ) {
      setIsEmail(true);
    } else {
      setIsEmail(false);
    }
  }, [emailOrUsername.value]);

  const clearForm = (isErrorMsg) => {
    emailOrUsername.setValue("");
    password.setValue("");
    if (isErrorMsg) {
      setLoginButtonDisabled(false);
    }
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      if (!emailOrUsername.value.trim() || !password.value.trim()) {
        setLoginButtonDisabled(false);
        return toast.error("Please fill in all the fields");
      }
      let loginResponse;
      setLoginButtonDisabled(true);
      if (isEmail) {
        loginResponse = await dispatch(
          loginUser({
            email: emailOrUsername.value.trim(),
            password: password.value.trim(),
          })
        );
      } else {
        loginResponse = await dispatch(
          loginUser({
            username: emailOrUsername.value.trim(),
            password: password.value.trim(),
          })
        );
      }
      if (loginResponse && loginResponse.token) {
        setLoginButtonDisabled(false);
        history.push("/home");
      }
    } catch (e) {
      setLoginButtonDisabled(false);
    }
  };

  const googleLoginSuccess = async (response) => {
    setLoginButtonDisabled(true);
    try {
      const { googleId } = response;
      let loginResponse;
      if (googleId) {
        loginResponse = await dispatch(
          loginWithGoogle({ googleId })
        );
      }

      if (loginResponse && loginResponse.token) {
        setLoginButtonDisabled(false);
        history.push("/home");
      } else {
        setLoginButtonDisabled(false);
        toast.error("This google account is not signed up")
      }

    } catch (error) {
      toast.error("Something went wrong!")
      setLoginButtonDisabled(false);
    }
  }

  const googleLoginFailure = () => {
    // toast.error("Something went wrong!")
  }

  const responseFacebook = async (response) => {
    try {
      setLoginButtonDisabled(true);
      const { id } = response;
      let loginResponse;
      if (id) {
        loginResponse = await dispatch(
          loginWithFacebook({ id })
        );
      }

      if (loginResponse && loginResponse.token) {
        setLoginButtonDisabled(false);
        history.push("/home");
      } else {
        toast.error("This facebook account is not signed up");
      }

    } catch (error) {
      toast.error("Something went wrong!");
      setLoginButtonDisabled(false);
    }
  }


  useEffect(() => {
    if (isLogin === false) {
      clearForm(true);
    }
    dispatch(loginUserErrorMsgRefresh());
  }, [dispatch, isLogin]);

  return (
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
        <LoginStyle>
          <h2>Login to your account</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="email or username"
              value={emailOrUsername.value}
              onChange={(e) => {
                let value = e.target.value.toLowerCase();
                e.target.value = value;
                emailOrUsername.onChange(e);
              }}
            />
            <div className="password-div">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="password"
                value={password.value}
                onChange={password.onChange}
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
            <div className="action input-group">
              <span className="pointer" onClick={() => gotoSignUpPage()}>
                Signup Instead
              </span>
              <button disabled={loginButtonDisabled}>
                {loginButtonDisabled ? "Please Wait..." : "Login"}
              </button>
            </div>
            <span className="pointer" onClick={() => gotoForgetPasswordPage()}>
              Forgot Password?
            </span>
          </form>
          <div className="google-login">
            <GoogleLogin
              clientId={config.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login With Google"
              onSuccess={googleLoginSuccess}
              onFailure={googleLoginFailure}
              cookiePolicy={'single_host_origin'}
              theme={darkTheme}
            />
          </div>
          <div className="facebook-login">
            <FacebookLogin
              appId={config.REACT_APP_FACEBOOK_ID}
              autoLoad={false}
              textButton="Log In With Facebook"
              fields="name, email"
              theme={darkTheme}
              callback={responseFacebook}
            />
          </div>
        </LoginStyle>
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
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem 0;
  max-height: auto;

  .password-div {
    position: relative;
    display: flex;
    .icon {
      position: absolute;
      top: 15%;
      right: 3%;
      color: #757575;
    }
  }

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
    height: 6rem;
    width: auto;
    cursor: pointer;
  }
  .logo-badge {
    height: 8rem;
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
`;

const LoginStyle = styled.div`
  width: 385px;
  padding: 3rem 1.5rem;
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

  button {
    padding: 0.4rem 1rem;
    background: ${(props) => props.theme.gradient};
    color: ${(props) => props.theme.white};
    border: 1px solid ${(props) => props.theme.orange};
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 1.1px;
  }

  .google-login button{
    position: relative;
    display: flex;
    width: 100%;
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

  span {
    letter-spacing: 0.8px;
    color: ${(props) => props.theme.secondaryColor};
  }

  

  @media screen and (max-width: 430px) {
    margin: 7% auto;
    width: 90%;
  }
`;
