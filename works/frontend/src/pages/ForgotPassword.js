import React, { useState, useEffect,useRef } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import {
  Box,
  makeStyles,
  Container,
  Divider,
  TextField,
} from "@material-ui/core";
import styled from "styled-components";
import {
  clearResetPasswordError,
  resetPasswordRequest,
  setEmailExistsFalse,
} from "../actions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ScrollToTop } from "../utils/index";

export const StyledAuth = styled.div`
  button {
    padding: 0.4rem 1rem;
    background: ${(props) => props.theme.gradient};
    color: ${(props) => props.theme.white};
    border: 1px solid ${(props) => props.theme.orange};
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 1.1px;
  }
`;

const useStyles = makeStyles(() => ({
  container: {
    minHeight: "16rem",
    margin: "8% auto",
    background: "#202020",
    padding: "3rem 1.5rem",
    borderRadius: "4px",
  },
  inputStyles: {
    color: "white",
    backgroundColor: "#121212",
  },
}));

const ForgotPassword = ({
  isLoading,
  error,
  emailExists,
  resetPasswordRequest,
  setEmailExistsFalse,
}) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Sending password reset email....");
    resetPasswordRequest(email);
  };
  const tempFunction = useRef()
  const imgFunction = () =>{
    if (emailExists) {
      toast.success("Password Reset Link sent");
      setEmailExistsFalse();
    }
  }
  tempFunction.current = imgFunction
  useEffect(() => {
    tempFunction.current()

  }, [emailExists]);

  return (
    <div>
      <ScrollToTop />
      <StyledAuth>
        <Container maxWidth="sm" className={classes.container}>
          <h2>Forgot Password</h2>

          <Divider variant="middle" />
          <Typography variant="body" color="initial" gutterBottom>
            Please enter your email to receive a 1-time use password reset link.
          </Typography>
          <Box marginTop={2}>
            <form onSubmit={handleSubmit}>
              <TextField
                id="email"
                label=""
                variant="outlined"
                fullWidth
                type="email"
                size="small"
                error={error !== ""}
                helperText={error}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputProps={{
                  className: classes.inputStyles,
                }}
              />
              <Box mt={2}>
                <button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.buttonStyles}
                >
                  {isLoading ? "submitting..." : "submit"}
                </button>
              </Box>
              <Box>
                {emailExists && (
                  <Typography variant="p" color="initial">
                    A password reset link has been sent to your email. Please
                    note that it will expire in 24 Hours.
                  </Typography>
                )}
              </Box>
              <Box marginTop={2}>
                <span className="pointer">
                  <Link to="/login" style={{ color: "#AAAAAA" }}>
                    Return to Login
                  </Link>
                </span>
              </Box>
            </form>
          </Box>
        </Container>
      </StyledAuth>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoading: state.resetPW.isLoading,
    error: state.resetPW.error,
    emailExists: state.resetPW.emailExists,
  };
};

export default connect(mapStateToProps, {
  resetPasswordRequest,
  setEmailExistsFalse,
  clearResetPasswordError,
})(ForgotPassword);
