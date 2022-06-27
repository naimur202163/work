import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { styled } from "@material-ui/core/styles";
import HomeTab from "../HomeTab";
import VideosTab from "../VideosTab/VideosTab";
import ChannelsTab from "../ChannelsTab/ChannelsTab";
import PlaylistsTab from "../PlaylistsTab/PlaylistsTab";
import SeriesTab from "../SeriesTab/SeriesTab";
import ScheduleTab from "../ScheduleTab/ScheduleTab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "#1C1C1E",
    color: "white",
    position: "relative",
    bottom: "4rem",
    [theme.breakpoints.up("xs")]: {
      bottom: "3rem",
    },
  },
  tab: {
    textDecoration: "none",
    textTransform: "none",
    [theme.breakpoints.between(0, 500)]: {
      padding: "6px 5px",
      fontSize: "10px",
      minWidth: "15%",
      fontFamily: "Montserrat",
      color: "#F2F2F7",
      lineHeight: "13px",
    },
    [theme.breakpoints.between(500, "sm")]: {
      padding: "6px 5px",
      fontSize: "10px",
      minWidth: "10%",
      fontFamily: "Montserrat",
      color: "#F2F2F7",
      lineHeight: "13px",
    },
    [theme.breakpoints.up("sm")]: {
      padding: "6px 5px",
      minWidth: "10%",
      fontFamily: "Montserrat",
      color: "#F2F2F7",
      lineHeight: "13px",
    },
  },

  tabPanel: {
    backgroundColor: "red !important",
  },
}));

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 37,
    width: "100%",
    backgroundColor: "white",
  },
  "& .MuiTabs-fixed": {
    height: 37,
  },
});

function PortalTabs({ profile }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Paper className={classes.root}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          centered
        >
          <Tab label="Home" {...a11yProps(0)} classes={{ root: classes.tab }} />
          <Tab
            label="Videos"
            {...a11yProps(1)}
            classes={{ root: classes.tab }}
          />
          <Tab
            label="Channels"
            {...a11yProps(2)}
            classes={{ root: classes.tab }}
          />
          <Tab
            label="Playlists"
            {...a11yProps(3)}
            classes={{ root: classes.tab }}
          />
          <Tab
            label="Series"
            {...a11yProps(4)}
            classes={{ root: classes.tab }}
          />
          <Tab
            label="Shedule"
            {...a11yProps(5)}
            classes={{ root: classes.tab }}
          />
        </StyledTabs>
        <TabPanel value={value} index={0}>
          <HomeTab profile={profile} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <VideosTab
            loading={profile.isFetching}
            videos={profile.videos}
            profile={profile}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ChannelsTab
            loading={profile.isFetching}
            channels={profile.channels}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <PlaylistsTab loading={profile.isFetching} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <SeriesTab loading={profile.isFetching} />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <ScheduleTab />
        </TabPanel>
      </Paper>
    </>
  );
}

export default PortalTabs;
