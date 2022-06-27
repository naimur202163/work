import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";

import { GongIconOriental } from "../../Icons";
import {
  getNotificationData,
  getNotificationCommentId,
  readNotification,
  markAllReadNotification,
} from "../../../actions";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import config from "../../../config/config";

const useStyles = makeStyles({
  fallbackOne: {
    marginRight: "0px !important",
  },
});

const Wrapper = styled.div`
  .notificationNum {
    position: absolute;
    top: -0.5rem;
    left: -0.5rem;
    font-size: 0.7rem;
    font-weight: 300;
    line-height: 1;
    height: 1.3rem;
    width: 1.3rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent
      linear-gradient(
        130deg,
        var(--profile-icon-bg) 14%,
        #f88946 23%,
        #f8795f 37%,
        #f75e87 55%,
        #f75b8c 57%
      )
      0% 0% no-repeat padding-box;
    background: transparent
      linear-gradient(
        130deg,
        #f9903d 14%,
        #f88946 23%,
        #f8795f 37%,
        #f75e87 55%,
        #f75b8c 57%
      )
      0% 0% no-repeat padding-box;

    span {
      padding-top: 2px;
    }
  }

  .icon {
    height: 1.8rem;
    width: 1.8rem;
  }

  .position-relative {
    position: relative;
    display: flex;
  }
  .dropdown-toggle::after {
    display: none;
  }
  .dropdown-toggle {
    .popper {
      z-index: 999 !important;
      top: 20px !important;
      position: absolute !important;
      right: 0 !important;
      left: unset !important;
    }
  }
  .dropdown-menu {
    margin: 1.125rem 0 0 !important;
    width: 480px;
    max-height: 450px;
    overflow: auto;
    background-image: linear-gradient(
      29deg,
      rgb(249, 154, 45),
      rgb(255 10 89 / 71%)
    );

    .notification-list {
      display: flex;
      flex-direction: column;
      .avatar {
        height: 65px;
        width: 65px;
        margin-right: 14px;
        img {
          top: 0;
        }
      }
    }
  }

  .dropdown-item {
    cursor: pointer;
    padding: 0.25rem 1rem;
  }

  .dropdown_header {
    border-bottom: 1px solid #e5e5e5;
    min-height: 48px;
    display: flex;
    flex-direction: row;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    margin-bottom: 10px;
  }
  .dropdown_header .title {
    margin-left: 16px;
    flex: 1;
    font-size: 17px;
  }
  .media img {
    width: 48px;
    height: 48px;
    object-fit: fill;
    border-radius: 50%;
  }
  .media-body {
    white-space: initial;
  }

  .media-body p {
    font-size: 15px;
  }

  .mark-read {
    display: none;
    margin-left: 16px;
    color: ${(props) => props.theme.blue};
    cursor: pointer;
  }

  #overlay {
    display: none;
    .MuiCircularProgress-indeterminate {
      animation: none !important;
    }
  }

  ${(props) =>
    props.showCount &&
    css`
      .mark-read {
        display: inherit;
      }
    `}

  ${(props) =>
    props.loader &&
    css`
      #overlay {
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
        .MuiCircularProgress-indeterminate {
          animation: none !important;
        }
      }
    `}


    @media screen and (max-width: 600px) {
    .popper {
      transform: translateX(20%);
      width: 90vw;

      .dropdown-menu {
        width: 100% !important;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .dropdown-toggle {
      .popper {
        top: 25px !important;
        right: 20px !important;
      }
    }

    .notificationNum {
      font-size: 0.65rem;
      height: 1.2rem;
      width: 1.2rem;
    }

    .icon {
      height: 1.5rem;
      width: 1.5rem;
    }
  }

  @media screen and (max-width: 375px) {
    .dropdown-item {
      padding: 0.25rem;
    }

    .dropdown-toggle {
      .popper {
        right: 10px !important;
      }
    }
  }

  @media screen and (max-width: 320px) {
    .dropdown-toggle {
      .popper {
        right: -17px !important;
      }
    }
  }
`;

const NotificationBell = ({
  notification,
  getNotificationData,
  getNotificationCommentId,
  readNotification,
  markAllReadNotification,
  openUploadVideoModal,
}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const listInnerRef = useRef();
  const classes = useStyles();
  const [limit, setLimit] = useState();
  const { resetNotificationLimit } = useSelector((state) => state.notification);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const getAvatar = (notification) => {
    if (!notification.Actor) {
      return "";
    }
    const badge = !notification?.Actor.avatar
      ? notification?.Actor.badge
      : notification?.Actor.avatar;
    return badge;
  };
  const tempFunction = useRef();
  const newdataFunction = () => {
    if (limit) {
      getNotificationData(limit);
    }
  };
  tempFunction.current = newdataFunction;
  useEffect(() => {
    tempFunction.current();
  }, [limit]);

  const tempFunc = useRef();
  const newFunction = () => {
    try {
      if (open) {
        if (!notification.isFetching) {
          if (!limit) {
            setLimit(
              notification?.notifications?.rows.length !== 0
                ? +notification.notifications.rows.length + 5
                : 5
            );
            return;
          }
        }
      }
    } catch (err) {}
  };
  tempFunc.current = newFunction;
  useEffect(() => {
    tempFunc.current();
  }, [open, notification.isFetching, notification.notifications.rows]);

  useEffect(() => {
    if (resetNotificationLimit) {
      setLimit(5);
    }
  }, [resetNotificationLimit]);

  const handleSingleRead = (index, notification) => {
    setOpen(false);
    if (!notification.readstatus) {
      const data = { readstatus: true };
      readNotification({
        index: index,
        notificationId: notification.id,
        data: data,
      });
    } else {
      getNotificationCommentId(index);
    }
    if (notification.NotificationType.name === "stripe_connected") {
      openUploadVideoModal(true);
    } else if (notification.NotificationType.name === "stripe_onboarding") {
      stripeConnect();
    }
  };

  const markAllRead = () => {
    markAllReadNotification(notification);
  };

  const onScroll = async () => {
    if (!notification.isFetching) {
      if (listInnerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
        if (scrollTop + clientHeight === scrollHeight) {
          const newLimit = limit + 5;
          if (limit < notification.notifications.count) {
            setLimit(newLimit);
          }
        }
      }
    }
  };
  // const prevOpen = React.useRef(open);

  const stripeConnect = () => {
    var url = `${config.REACT_APP_STRIPE_ONBOARDING}`;
    window.open(url, "_self");
  };

  const renderNotificationLink = (notification) => {
    switch (notification.NotificationType.name) {
      case "new_comment":
        if (notification.videoId) {
          return `/watch/${notification.videoId}`;
        }
        return "#";
      case "stripe_connected":
        return "#";
      case "stripe_onboarding":
        return "#";
      default:
        return `/channel/${notification.actorid}`;
    }
  };

  return (
    <Wrapper
      showCount={notification && notification.counter > 0}
      loader={notification.isFetching}
    >
      <div className="dropdown">
        <span className="dropdown-toggle position-relative">
          <GongIconOriental
            className="icon"
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          />
          {notification?.counter > 0 && (
            <div className="notificationNum">
              <span>
                {notification?.counter > 9 ? "9+" : notification.counter}
              </span>
            </div>
          )}

          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
            className="popper"
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <div
                      className="dropdown-menu"
                      onScroll={() => onScroll()}
                      ref={listInnerRef}
                    >
                      <div className="dropdown_header">
                        <h2 className="title">Notifications</h2>
                      </div>
                      {!notification.notifications?.rows &&
                        !notification.isFetching && (
                          <span className="dropdown-item text-center">
                            No Notification Found
                          </span>
                        )}

                      <span className="mark-read" onClick={markAllRead}>
                        Mark all as read
                      </span>

                      <List component="nav" className="notification-list">
                        {notification.notifications?.rows?.map(
                          (notification, index) => (
                            <Link
                              key={notification.id}
                              className="dropdown-item"
                              to={renderNotificationLink(notification)}
                              onClick={() =>
                                handleSingleRead(index, notification)
                              }
                            >
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar
                                    className="avatar"
                                    classes={{ fallback: classes.fallbackOne }}
                                    alt="avatar"
                                    src={
                                      !!notification
                                        ? getAvatar(notification)
                                        : ""
                                    }
                                  ></Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                  primary={notification.message}
                                  secondary={
                                    <Moment fromNow>
                                      {notification.createdAt}
                                    </Moment>
                                  }
                                />
                              </ListItem>
                            </Link>
                          )
                        )}
                      </List>
                      <div id="overlay">
                        <CircularProgress size={50} color="secondary" />
                      </div>
                    </div>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </span>
      </div>
    </Wrapper>
  );
};
const mapStateToProps =
  (state) =>
  ({ notification }) => ({
    notification: notification,
  });

export default connect(mapStateToProps, {
  getNotificationData,
  readNotification,
  markAllReadNotification,
  getNotificationCommentId,
})(NotificationBell);
