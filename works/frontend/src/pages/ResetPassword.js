import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import {
  Box,
  makeStyles,
  Container,
  Divider,
  TextField,
  Grid,
} from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import {
  changePasswordRequest,
  checkPWResetTokenExpiry,
  clearResetPasswordError,
} from "../actions";
import { toast } from "react-toastify";
import { ScrollToTop } from "../utils/index";
import Button from "../styles/Button";
import PasswordStrengthBar from "react-password-strength-bar";
import { motion } from "framer-motion";
import Logo from "../components/icons/iSUTRA_logo_clean_white.png";

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
  buttonStyles: {
    color: "white",
    backgroundColor: "red",
    padding: "0.4rem 1rem",
    "&:hover": {
      backgroundColor: "red",
    },
  },
}));

const ResetPassword = ({
  isLoading,
  isPasswordChanged,
  error,
  clearResetPasswordError,
  changePasswordRequest,
  checkPWResetTokenExpiry,
}) => {
  const classes = useStyles();
  const { token } = useParams();
  const history = useHistory();
  const [passwordStrengthScore, setPasswordStrengthScore] = useState(0);

  const [state, setstate] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    checkPWResetTokenExpiry(token);
  }, [checkPWResetTokenExpiry, token]);
  useEffect(() => {
    if (isPasswordChanged) {
      toast.success("Password reset successfully!");
    }
  }, [isPasswordChanged]);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    return () => {
      clearResetPasswordError();
    };
  }, [clearResetPasswordError]);

  const onChangeScore = (score) => {
    setPasswordStrengthScore(score);
  };

  const passwordRegEx = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );

  const validateResetPasswordForm = (email, password, confirmPassword) => {
    if (!email.trim() || !password.trim()) {
      return "Please fill in all fields.";
    }

    if (password.length <= 7) {
      return "Password must be at least 8 characters long, contain at least 1 Number, 1 Upper case letter & 1 Special character.";
    }
    if (passwordStrengthScore < 2 || !passwordRegEx.test(password)) {
      return "Password must be at least 8 characters long, contain at least 1 Number, 1 Upper case letter & 1 Special character.";
    }
    if (password !== confirmPassword) {
      return "Password does not match.";
    }
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email.trim()
      )
    ) {
      return "Please enter a valid email address";
    }
    return null;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = state;
    try {
      let error = validateResetPasswordForm(email, password, confirmPassword);
      if (!!error) {
        return toast.error(error);
      }

      changePasswordRequest(email, password, token);
    } catch (err) {}
  };

  const handleRedirect = () => {
    history.push("/login");
  };

  if (error) {
    return (
      <Box
        p={2}
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <motion.img
          initial={{ opacity: 0, y: "-50rem" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 2 }}
          className="logo"
          src={Logo}
          alt="Isutra Logo"
          style={{ height: "6rem" }}
        />
        {error + ". Click the link below to reset your password."}
        <Button onClick={() => history.push("/forgot_password")}>
          Reset Password
        </Button>
      </Box>
    );
  }

  return (
    <div>
      <ScrollToTop />
      <Container maxWidth="sm" className={classes.container}>
        <Typography
          variant="h5"
          color="initial"
          className={classes.typographySt}
        >
          Reset Password
        </Typography>
        <Divider variant="middle" />
        <Box marginTop={2}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label=""
                  variant="outlined"
                  fullWidth
                  type="email"
                  size="small"
                  placeholder="Enter your email..."
                  value={state.email}
                  onChange={(e) =>
                    setstate({
                      ...state,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                  InputProps={{
                    className: classes.inputStyles,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="password"
                  label=""
                  variant="outlined"
                  fullWidth
                  type="password"
                  name="password"
                  size="small"
                  placeholder="Enter new password..."
                  value={state.password}
                  onChange={(e) =>
                    setstate({
                      ...state,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                  InputProps={{
                    className: classes.inputStyles,
                  }}
                />
                <Box maxWidth="268px" mt={1}>
                  <PasswordStrengthBar
                    password={state.password}
                    onChangeScore={onChangeScore}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="confirmPassword"
                  label=""
                  variant="outlined"
                  fullWidth
                  type="password"
                  name="confirmPassword"
                  size="small"
                  placeholder="Confirm  new password..."
                  value={state.confirmPassword}
                  onChange={(e) =>
                    setstate({
                      ...state,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                  InputProps={{
                    className: classes.inputStyles,
                  }}
                />
              </Grid>
            </Grid>

            <Box mt={2} display="flex" justifyContent="space-between">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.buttonStyles}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </Box>
            <Box
              mt={2}
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
            >
              {isPasswordChanged && (
                <React.Fragment>
                  <Typography variant="p" color="initial">
                    You have successfully changed your password. Please login to
                    continue.
                  </Typography>
                  <Button onClick={() => handleRedirect()}>
                    Login to continue
                  </Button>
                </React.Fragment>
              )}
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.resetPW.isLoading,
    isPasswordChanged: state.resetPW.isPasswordChanged,
    error: state.resetPW.error,
  };
};

export default connect(mapStateToProps, {
  changePasswordRequest,
  clearResetPasswordError,
  checkPWResetTokenExpiry,
})(ResetPassword);
