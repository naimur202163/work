import React from "react";

import { connect } from "react-redux";
import {
  Table,
  Switch,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
} from "@material-ui/core";
import styled from "styled-components";
import { updateNotificationStatus } from "../actions";
const Wrapper = styled.div`
  margin-top: 20px;
  .text-color {
    color: ${(props) => props.theme.white};
  }
  .MuiSwitch-track {
    background-color: ${(props) => props.theme.white};
  }

  .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track {
    background-image: ${(props) => props.theme.gradient};
  }

  .MuiSwitch-colorSecondary.Mui-checked {
    background-color: ${(props) => props.theme.gradient};
  }

`;
const NotificationSwitchButton = ({
  notifications,
  profile,
  updateNotificationStatus,
}) => {
  const setNotificationValue = (notificationId) => {
    let status = true;
    profile.userNotificationStatus.forEach((element) => {
      if (element.categoryId === notificationId) {
        status = element.status;
      }
    });
    return status;
  };
  const handleEditNotificationStatus = async (
    notificationId,
    notificationStatus
  ) => {
    localStorage.setItem("notif_settings", "myaccount");
    const updatedProfileState = await updateNotificationState(
      notificationId,
      notificationStatus
    );
    const data = { status: notificationStatus };
    updateNotificationStatus({
      categoryId: notificationId,
      data: data,
      profileState: updatedProfileState,
    });
  };

  const updateNotificationState = (categoryId, notificationStatus) => {
    let profileData = profile;
    profileData.userNotificationStatus.forEach((element) => {
      if (element.categoryId === categoryId)
        element.status = notificationStatus;
    });
    return profileData;
  };

  return (
    <Wrapper>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell className="text-color">#</TableCell>
              <TableCell className="text-color">Notification</TableCell>
              <TableCell className="text-color">on/off</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications?.map((notification, index) => (
              <TableRow key={index}>
                <TableCell className="text-color">{index + 1}</TableCell>
                <TableCell className="text-color">
                  {notification.name}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={setNotificationValue(notification.id)}
                    onChange={(event) => {
                      handleEditNotificationStatus(
                        notification.id,
                        event.target.checked
                      );
                    }}
                    color="secondary"
                    name={`checked${index}`}
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Wrapper>
  );
};

const mapStateToProps =
  (state) =>
    ({ notificationCategory, profile }) => ({
      notifications: notificationCategory.notificationData,
      profile,
    });

export default connect(mapStateToProps, { updateNotificationStatus })(
  NotificationSwitchButton
);
