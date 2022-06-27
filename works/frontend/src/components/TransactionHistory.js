import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TransactionHistoryTable from "./TransactionHistoryTable";
import KarmaSentTable from "./KarmaSentTable";
import { toast } from "react-toastify";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#3A3A3A",
  },
  indicator: {
    backgroundColor: "#FE697C",
  },
  btnStyles: {
    color: "#FE697C",
  },
  selectedTabStyle: {
    color: "#FE697C",
  },
}));

export default function TransactionHistory({ userId, userrole }) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  // new add
  const tempFun = useRef()
  const imgesFun = () => {
    if (userrole === 2) {
      setValue(0);
    } else {
      setValue(1);
    }
  }
  tempFun.current = imgesFun
  useEffect(() => {
    tempFun.current()
  }, 
  []
  );
  const handleChange = (event, newValue) => {
    if (userrole === 2) {
      setValue(newValue);
    } else {
      toast.error(
        "Have some video content you'd like to start receiving Karma tips for? Upgrade your account to a Warrior above to begin!",
        {
          autoClose: 10000,
        }
      );
    }
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#202021e6" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          classes={{
            indicator: classes.indicator,
            scrollButtons: classes.btnStyles,
          }}
        >
          <Tab
            disableRipple
            label="Karma Received"
            textColor="primary"
            classes={{
              textColorPrimary: classes.btnStyles,
              selected: classes.selectedTabStyle,
            }}
            {...a11yProps(0)}
          />
          <Tab
            disableRipple
            label="Karma Sent"
            textColor="primary"
            classes={{
              textColorPrimary: classes.btnStyles,
              selected: classes.selectedTabStyle,
            }}
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {userrole === 2 && (
          <TabPanel value={value} index={0} dir={theme.direction}>
            <TransactionHistoryTable userId={userId} />
          </TabPanel>
        )}

        <TabPanel value={value} index={1} dir={theme.direction}>
          <KarmaSentTable userId={userId} userrole={userrole} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
