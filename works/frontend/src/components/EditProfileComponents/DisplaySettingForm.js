import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Axios from "axios";
import setAuthToken from "../SignupComponents/util/setAuthToken";
import Switch from "react-switch";
import AutoComplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

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
    "& .MuiAutocomplete-endAdornment": {
      borderRadius: ".2rem !important",
      boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
    },

    "& .MuiIconButton-label svg": {
      margin: "0 !important",
    },

    "&:hover": {
      "& .MuiAutocomplete-endAdornment": {
        borderRadius: ".2rem !important",
        boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
      },

      "& .MuiIconButton-label svg": {
        margin: "0 !important",
      },
    },
  },
  InputState: {
    "& .MuiAutocomplete-endAdornment": {
      borderRadius: ".2rem !important",
      boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
    },

    "& .MuiIconButton-label svg": {
      margin: "0 !important",
    },

    "&:hover": {
      "& .MuiAutocomplete-endAdornment": {
        borderRadius: ".2rem !important",
        boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
      },

      "& .MuiIconButton-label svg": {
        margin: "0 !important",
      },
    },
  },
  InputCountry: {
    "& .MuiAutocomplete-endAdornment": {
      borderRadius: ".2rem !important",
      boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
    },

    "& .MuiIconButton-label svg": {
      margin: "0 !important",
    },

    "&:hover": {
      "& .MuiAutocomplete-endAdornment": {
        borderRadius: ".2rem !important",
        boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
      },

      "& .MuiIconButton-label svg": {
        margin: "0 !important",
      },
    },
  },

  MarginInput: {
    marginTop: ".5rem !important",
  },
}));

const DisplaySettingForm = ({
  country,
  setCountry,
  state,
  setState,
  city,
  setCity,
  outOfThisWorld,
  setOutOfThisWorld,
}) => {
  const classes = useStyles();
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchAllCountries();
  }, []);

   const tempFunction = useRef()
   const imgFunction = () =>{
    fetchAllStates();
   }
   tempFunction.current = imgFunction
  useEffect(() => {
    tempFunction.current()
  }, [country, countryCode]);

const tempFun = useRef()
const imgFun = () =>{
  fetchAllCities();
}
tempFun.current = imgFun
  useEffect(() => {
    tempFun.current()
  }, [state, stateCode]);

  useEffect(() => {
    if (country) {
      const newArray = countries.filter(function (el) {
        return el.name === country;
      });

      if (newArray.length > 0) {
        setCountryCode(newArray[0].iso2);
      }
    }
  }, [countries, country]);

  useEffect(() => {
    if (state) {
      const newArray = states.filter(function (el) {
        return el.name === state;
      });

      if (newArray.length > 0) {
        setStateCode(newArray[0].iso2);
      }
    }
  }, [state, states]);

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

  return (
    <DisplaySettingFormComponent>
      <div
        className={`${classes.InputGroup} ${
          country !== "" && classes.InputCountry
        }`}
      >
        {/* material ui */}
        <AutoComplete
          freeSolo
          id="country-autocomplete"
          defaultValue={country}
          disabled={outOfThisWorld ? true : false}
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
              disabled={outOfThisWorld ? true : false}
              defaultValue={state}
              id="state-autocomplete"
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
              disabled={outOfThisWorld ? true : false}
              defaultValue={city}
              id="city-autocomplete"
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
          onChange={() => setOutOfThisWorld(!outOfThisWorld)}
          checked={outOfThisWorld}
        />
        <span>Out of this world</span>
      </label>
    </DisplaySettingFormComponent>
  );
};

export default DisplaySettingForm;

const DisplaySettingFormComponent = styled.div`
  padding: 1rem;
  margin: 0.5rem 0;
  background: ${(props) => props.theme.grey};
  border-radius: 4px;

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
      width: 48%;
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
    margin-bottom: 1rem;
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
    display: flex;
    align-items: center;

    span {
      margin-left: 0.7rem;
      font-size: 0.9rem;
      line-height: 1.2;
      color: #999;
    }
  }

  /* responsive part */
  @media screen and (max-width: 768px) {
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
    svg {
      height: 30px;
      width: 30px;
    }

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
`;
