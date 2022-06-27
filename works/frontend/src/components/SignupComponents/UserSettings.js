import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Axios from "axios";
import setAuthToken from "./util/setAuthToken";
import Switch from "react-switch";
import AutoComplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  InputGroup: {
    "& .MuiAutocomplete-inputRoot": {
      padding: "0 !important",
      marginBottom: "1.5rem",
      position: "relative",
    },

    "& .MuiInputBase-input": {
      margin: "0 !important",
    },
    "& .MuiFormLabel-root": {
      position: "absolute",
      top: "-.5rem",
      color: "#fff",
    },
    "& .MuiInputLabel-shrink": {
      top: "-.6rem !important",
      color: "#fff !important",
    },
  },

  InputCity: {
    "&:hover": {
      "& .MuiAutocomplete-endAdornment": {
        backgroundColor: "#fff !important",
        borderRadius: ".2rem !important",
        boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
      },
    },
  },
  InputState: {
    "&:hover": {
      "& .MuiAutocomplete-endAdornment": {
        backgroundColor: "#fff !important",
        borderRadius: ".2rem !important",
        boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
      },
    },
  },
  InputCountry: {
    "&:hover": {
      "& .MuiAutocomplete-endAdornment": {
        backgroundColor: "#fff !important",
        borderRadius: ".2rem !important",
        boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
      },
    },
  },

  MarginInput: {
    marginTop: ".5rem !important",
  },

  Checkbox: {
    "& .MuiSvgIcon-root": {
      fill: "red",
    },
  },
}));

const UserSettings = ({
  stepper,
  country,
  setCountry,
  state,
  setState,
  city,
  setCity,
  anonymous,
  setAnonymous,
  proContentProducer,
  setProContentProducer,
  partnerContentCreator,
  setPartnerContentCreator,
  contactViaEmail,
  setContactViaEmail,
  setShowStripeModal,
  completeSignup,
  page,
  agreedToLicense,
  setAgreedToLicense,
  setShowLicenseAgreementPage,
}) => {
  const classes = useStyles();
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchAllCountries();
  }, );

  const dataFunction = useRef()
  const newdataFunction = () =>{
    if (country) {
      const newArray = countries.filter(function (el) {
        return el.name === country;
      });

      if (newArray.length > 0) {
        setCountryCode(newArray[0].iso2);
      }
    }
  }
  dataFunction.current = newdataFunction
  useEffect(() => {
    dataFunction.current()
  }, );
  
const tempFunc = useRef()
const newdataFunc = () => {
  fetchAllStates();
}
tempFunc.current = newdataFunc
  useEffect(() => {
    tempFunc.current()
  }, [country, countryCode]);

  // new add
const tempFunction = useRef()
const newFunction = () =>{
  fetchAllCities();
}
tempFunction.current = newFunction
  useEffect(() => {
    temFunction.current()
  }, [state, stateCode]);


  const temFunction = useRef()
const newhookFunction = () =>{
  if (state) {
    const newArray = states.filter(function (el) {
      return el.name === state;
    });

    if (newArray.length > 0) {
      setStateCode(newArray[0].iso2);
    }
  }
}
temFunction.current = newhookFunction
  useEffect(() => {
    temFunction.current()
  }, [state]);


  const tempdataFunction = useRef()
const newfindFunction = () =>{
  if (anonymous) {
    setCountry("");
    setState("");
    setCity("");
  }
}
tempdataFunction.current = newfindFunction
  useEffect(() => {
    tempdataFunction.current()
  }, [anonymous]);

  const fetchAllCountries = async () => {
    try {
      setAuthToken("Y2dTYVhpVVE3NXBhaW1nMG5WM2Z6REFHT0ZWSjZZVThxbEIxUFFqaA==");
      const { data } = await Axios.get(
        "https://api.countrystatecity.in/v1/countries"
      );
      setCountries(data);
    } catch (e) {}
  };

  const fetchAllStates = async () => {
    try {
      setAuthToken("Y2dTYVhpVVE3NXBhaW1nMG5WM2Z6REFHT0ZWSjZZVThxbEIxUFFqaA==");
      const { data } = await Axios.get(
        `https://api.countrystatecity.in/v1/countries/${countryCode}/states`
      );
      const sortedData = data.sort(function (a, b) {
        let name1 = a.name.toUpperCase();
        let name2 = b.name.toUpperCase();

        return name1 === name2 ? 0 : name1 > name2 ? 1 : -1;
      });

      setStates(sortedData);
    } catch (e) {}
  };

  const fetchAllCities = async () => {
    try {
      setAuthToken("Y2dTYVhpVVE3NXBhaW1nMG5WM2Z6REFHT0ZWSjZZVThxbEIxUFFqaA==");
      const { data } = await Axios.get(
        `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`
      );

      const sortedData = data.sort(function (a, b) {
        let name1 = a.name.toUpperCase();
        let name2 = b.name.toUpperCase();

        return name1 === name2 ? 0 : name1 > name2 ? 1 : -1;
      });

      setCities(sortedData);
    } catch (e) {}
  };

  const CHECKED = <div className="yes">Yes</div>;
  const UNCHECKED = <div className="no">No</div>;

  return (
    <UserSettingsContainer>
      <h1>Set Your Public Display Settings</h1>
      <h3 className="spanText">
        Note: these options can be changed anytime from your profile settings
        page.
      </h3>

      <div
        className={`${classes.InputGroup} ${
          country !== "" && classes.InputCountry
        }`}
      >
        {/* material ui */}
        <AutoComplete
          freeSolo
          id="country-autocomplete"
          disabled={anonymous ? true : false}
          onChange={(e, newValue) => {
            setCountry(newValue);
            setState("");
            setCity("");
          }}
          options={countries.map((item) => item.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose your country"
              variant="outlined"
              name="country"
              value={country}
              disabled={anonymous ? true : false}
              onChange={(e) => {
                setCountry(e.target.value);
                setState("");
                setCity("");
              }}
            />
          )}
        />
      </div>

      <div className="input-group">
        <div className="group-2">
          <div
            className={`${classes.InputGroup} ${classes.MarginInput} ${
              state !== "" && classes.InputState
            }`}
          >
            {/* material ui */}
            <AutoComplete
              freeSolo
              id="state-autocomplete"
              disabled={anonymous ? true : false}
              onChange={(e, newValue) => setState(newValue)}
              options={states.map((item) => item.name)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose your state"
                  variant="outlined"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              )}
            />
          </div>
        </div>
        <div className="group-1">
          <div
            className={`${classes.InputGroup} ${classes.MarginInput} ${
              city !== "" && classes.InputCity
            }`}
          >
            <AutoComplete
              freeSolo
              id="city-autocomplete"
              disabled={anonymous ? true : false}
              onChange={(e, newValue) => setCity(newValue)}
              options={cities.map((item) => item.name)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose your city"
                  variant="outlined"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              )}
            />
          </div>
        </div>
      </div>

      <label className="toggleBox">
        <Switch
          onColor="#28df99"
          offColor="#cc0000"
          className={anonymous ? "ToggeSelected" : null}
          onChange={() => setAnonymous(!anonymous)}
          checked={anonymous}
        />
        <span>Out of this world (to remain anonymous)</span>
      </label>

      <label className="toggleBox">
        <Switch
          checkedIcon={CHECKED}
          uncheckedIcon={UNCHECKED}
          onColor="#28df99"
          offColor="#cc0000"
          onChange={() => setProContentProducer(!proContentProducer)}
          checked={proContentProducer}
        />
        <span>Are you a professional video or audio content producer ?</span>
      </label>

      <label className="toggleBox">
        <Switch
          checkedIcon={CHECKED}
          uncheckedIcon={UNCHECKED}
          onColor="#28df99"
          offColor="#cc0000"
          onChange={() => setPartnerContentCreator(!partnerContentCreator)}
          checked={partnerContentCreator}
        />
        <span>
          Do you wish to be listed as a resource for other content creators to
          partner with you for creating content ?
        </span>
      </label>

      <label className="toggleBox">
        <Switch
          checkedIcon={CHECKED}
          uncheckedIcon={UNCHECKED}
          onColor="#28df99"
          offColor="#cc0000"
          onChange={() => setContactViaEmail(!contactViaEmail)}
          checked={contactViaEmail}
        />
        <span>
          Do you want Co-Op members to be able to contact with you via your
          registered email address ?
        </span>
      </label>

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

      <div className="footer">
        <div className="action">
          {page !== "updateSubscription" && (
            <span className="pointer" onClick={() => stepper(4)}>
              Go Back!
            </span>
          )}
          {page === "updateSubscription" && (
            <span className="pointer" onClick={() => stepper(2)}>
              Go Back!
            </span>
          )}
          {page !== "updateSubscription" && (
            <button
              onClick={() => {
                if (!anonymous && !country) {
                  return toast.error(
                    'Please set your location. Or, if you wish to stay anonymous, check the "Out of this World" option.'
                  );
                }

                if (!agreedToLicense) {
                  return toast.error(
                    "You must agreed to our terms and condition before creating an account"
                  );
                }

                setShowStripeModal(true);
              }}
            >
              NEXT
            </button>
          )}
          {page === "updateSubscription" && (
            <button
              onClick={() => {
                completeSignup();
              }}
            >
              NEXT
            </button>
          )}
        </div>
      </div>
    </UserSettingsContainer>
  );
};

export default UserSettings;

const UserSettingsContainer = styled.div`
  width: 600px;
  padding: 3rem 1.5rem;
  background: ${(props) => props.theme.grey};
  border-radius: 4px;
  margin: 5% auto;

  h1 {
    font-size: 1.6rem;
  }

  .spanText {
    color: ${(props) => props.theme.red};
    line-height: 1.2;
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }

  .input-group {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .group-1,
    .group-2 {
      width: 45%;
    }

    input {
      width: 100%;
    }
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

    &:disabled {
      color: ${(props) => props.theme.red};
      cursor: not-allowed;

      &::placeholder {
        color: ${(props) => props.theme.red};
      }
    }
  }

  .toggleBox {
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;

    span {
      margin-left: 0.7rem;
      font-size: 0.9rem;
      line-height: 1.2;
      color: #999;
    }
  }

  .footer {
    width: 100%;
    margin-top: 2rem;

    .action {
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        padding: 0.4rem 1rem;
        background: ${(props) => props.theme.gradient};
        color: ${(props) => props.theme.white};
        border: 1px solid ${(props) => props.theme.orange};
        border-radius: 3px;
        text-transform: uppercase;
        letter-spacing: 1.1px;
        margin: 0 1rem;
      }

      span {
        letter-spacing: 0.8px;
        color: ${(props) => props.theme.secondaryColor};
        margin: 0 1rem;
      }
    }
  }

  /* responsive part */
  @media screen and (max-width: 768px) {
    width: 85%;
    margin: 8% auto;

    .input-group {
      display: flex;
      flex-direction: column;

      .group-1,
      .group-2 {
        width: 100%;
      }
    }
  }

  /* toggle */
  .react-switch-bg {
    /* background-color: #cc0000 !important; */

    span {
      color: #fff !important;
    }
    .yes {
      margin-left: 0.3rem !important;
    }
    .no {
      margin-left: 0.3rem !important;
    }
  }

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
`;
