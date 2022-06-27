import React, { useContext, useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import styled from "styled-components";
import { styled as MUIStyled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { GlobalContext } from "../../../context/GlobalContext";
import UserRoleButton from "../../MyPortalComponents/SmallComponents/UserRoleButton";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllConnectionRequests,
  approveConnectionRequest,
  declineConnectionRequest,
  getAllFriends,
  removeConnection,
} from "../../../actions";
import { toast } from "react-toastify";
import FriendOptions from "./FriendOptions";
import ConfirmationModel from "../../ConfirmationModel";

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
        <Box sx={{ p: 3 }}>
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

const FRIENDOPTIONS = [
  { icon: <i class="far fa-comment"></i>, text: "Message" },
  { icon: <i class="fas fa-user-times"></i>, text: "Disconnect" },
];

const CustomisedTab = MUIStyled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    color: "#fff",

    "&.Mui-selected": {
      color: "#f00",
      fontWeight: 500,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

const ChatList = () => {
  const dispatch = useDispatch();
  const { approveMessage, approveError, declineMessage, declineError } =
    useSelector((state) => state.connection);
  const {
    loading,
    requests,
    getError,
    friends,
    friendsLoading,
    removeMessage,
    removeError,
  } = useSelector((state) => state.connection);

  const user = useSelector((state) => state.user);
  const [value, setValue] = React.useState(0);
  const [showDisconnectConfirmation, setShowDisconnectConfirmation] =
    useState(false);
  const [selectedWarriorId, setSelectedWarriorId] = useState(null);
  const [selectedCollaboratorId, setSelectedCollaboratorId] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value === 1 || approveMessage || declineMessage) {
      dispatch(getAllConnectionRequests());
    }

    if (value === 0 || removeMessage || removeError) {
      dispatch(getAllFriends());
    }
  }, [value, approveMessage, declineMessage, removeMessage, removeError]);

  useEffect(() => {
    if (approveMessage) {
      toast.success(approveMessage);
    }

    if (approveError) {
      toast.error(approveError);
    }

    if (declineMessage) {
      toast.success(declineMessage);
    }

    if (declineError) {
      toast.error(declineError);
    }
  }, [approveMessage, approveError, declineMessage, declineError]);

  const approveConnectRequestHandler = (id) => {
    dispatch(
      approveConnectionRequest({
        collaboratorId: id,
      })
    );
  };

  const declineConnectionRequestHandler = (id) => {
    dispatch(
      declineConnectionRequest({
        collaboratorId: id,
      })
    );
  };

  const removeConnectionHandler = (warriorId, collaboratorId) => {
    dispatch(
      removeConnection({
        warriorId,
        collaboratorId,
      })
    );

    toast.error("Connection removed successfully!");
    setSelectedWarriorId(null);
  };

  const getUserRole = (userrole) => {
    switch (userrole) {
      case 0:
        return "Freeloader";
      case 1:
        return "Tribe";
      case 2:
        return "Warrior";
      default:
        return "Freeloader";
    }
  };

  const isBadgeOrAvatar = (user) => {
    const image = !user.avatar
      ? user.userSettings.VisitorBadge.imgPath
      : user.avatar;

    if (image && (image.includes(".png") || image.includes(".svg"))) {
      return (
        <div className="imageBadge">
          <img className="badge" src={image} alt="" />
        </div>
      );
    } else {
      return <img className="imageAvatar" src={image} alt="" />;
    }
  };

  return (
    <>
      <ChatMessangerStyled>
        <div className="tab-size">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <div className="tabs">
                <div
                  onClick={() => {
                    setValue(0);
                  }}
                  className={`tabs__item ${value === 0 && "activeTab"}`}
                >
                  Connections
                </div>
                <div
                  onClick={() => {
                    setValue(1);
                  }}
                  className={`tabs__item ${value === 1 && "activeTab"}`}
                >
                  Requests
                </div>
              </div>
            </Box>
            <TabPanel value={value} index={0}>
              <FriendsList>
                {friendsLoading && (
                  <div className="loading">
                    Fetching all friends, Please wait...
                  </div>
                )}

                {!friendsLoading && getError && (
                  <div className="error">No friends founds!</div>
                )}

                {!friendsLoading &&
                  friends &&
                  friends.length > 0 &&
                  friends.map((item, i) => (
                    <>
                      <div className="item">
                        <div className="left">
                          <div className="avatarV2">
                            {user.id === item.warrior.id && (
                              <>{isBadgeOrAvatar(item.collaborator)}</>
                            )}

                            {user.id === item.collaborator.id && (
                              <>{isBadgeOrAvatar(item.warrior)}</>
                            )}
                          </div>

                          <div className="userMeta">
                            <p>
                              {user.id === item.warrior.id && (
                                <>{item.collaborator.username}</>
                              )}

                              {user.id === item.collaborator.id && (
                                <>{item.warrior.username}</>
                              )}
                            </p>
                            <span>active</span>
                          </div>
                        </div>

                        <div className="right">
                          <div className="lastMessage">
                            <div className="time">15:60</div>
                            <div className="num">6</div>
                          </div>

                          <UserRoleButton
                            type={
                              user.id === item.warrior.id
                                ? item.collaborator.userrole
                                : user.id === item.collaborator.id
                                ? item.warrior.userrole
                                : null
                            }
                          >
                            {user.id === item.warrior.id && (
                              <>{getUserRole(item.collaborator.userrole)}</>
                            )}

                            {user.id === item.collaborator.id && (
                              <>{getUserRole(item.warrior.userrole)}</>
                            )}
                          </UserRoleButton>

                          <FriendOptions
                            className="options"
                            options={FRIENDOPTIONS}
                            setShowDisconnectConfirmation={
                              setShowDisconnectConfirmation
                            }
                            setSelectedWarriorId={setSelectedWarriorId}
                            setSelectedCollaboratorId={
                              setSelectedCollaboratorId
                            }
                            warriorId={item.warrior.id}
                            collaboratorId={item.collaborator.id}
                          />
                        </div>
                      </div>
                    </>
                  ))}
              </FriendsList>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <FriendsList>
                {loading && (
                  <div className="loading">
                    Getting all requests, Please wait...
                  </div>
                )}

                {!loading && getError && (
                  <div className="error">No connection requests found!</div>
                )}

                {!loading &&
                  requests &&
                  requests.length > 0 &&
                  requests.map((item, i) => (
                    <div className="item">
                      <div className="left">
                        <div className="icons">
                          <div
                            onClick={() =>
                              declineConnectionRequestHandler(
                                item.collaborator.id
                              )
                            }
                            className="removeIcon"
                          >
                            <i class="fas fa-minus"></i>
                          </div>

                          <div
                            onClick={() =>
                              approveConnectRequestHandler(item.collaborator.id)
                            }
                            className="addIcon"
                          >
                            <i class="fas fa-plus"></i>
                          </div>
                        </div>

                        <div className="avatar">
                          {isBadgeOrAvatar(item.collaborator)}
                        </div>

                        <div className="username">
                          {item.collaborator.username}
                        </div>
                      </div>

                      <div className="right">
                        <UserRoleButton type={item.collaborator.userrole}>
                          {getUserRole(item.collaborator.userrole)}
                        </UserRoleButton>
                      </div>
                    </div>
                  ))}
              </FriendsList>
            </TabPanel>
          </Box>
        </div>
      </ChatMessangerStyled>

      {showDisconnectConfirmation && selectedWarriorId && selectedCollaboratorId && (
        <ConfirmationModel
          open={showDisconnectConfirmation}
          closeHandler={() => setShowDisconnectConfirmation(false)}
          deleteHandler={() => removeConnectionHandler(selectedWarriorId, selectedCollaboratorId)}
          title={`Are you sure you want to disconnect with user. This cannot be undone and a new connection request will need to be sent and approved before you can reconnect again.`}
        />
      )}
    </>
  );
};

export default ChatList;

const ChatMessangerStyled = styled.div`
  .tabs {
    display: flex;
    align-items: center;
    padding: 1.5rem 0;
    border-bottom: 1px solid rgba(242, 242, 247, 0.2);

    &__item {
      padding: 0.5rem 2rem;
      text-transform: capitalize;
      font-size: 1rem;
      position: relative;
      cursor: pointer;

      &:before {
        position: absolute;
        content: "";
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 50%;
        height: 3px;
        background: #fff;
      }
    }

    .activeTab {
      background: -webkit-linear-gradient(#ff4883, #fdb769);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      &:before {
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
          0% 0% no-repeat padding-box !important;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .tab-bar-section {
      margin: 0 1%;
    }
    .tab-size {
      padding: 5px 2%;
    }
  }
`;

const FriendsList = styled.div`
  margin: 2rem 0;
  font-family: ${(props) => props.theme.montserrat};

  .loading,
  .error {
    font-family: brother-1816, sans-serif;
    font-size: 0.8rem;
    font-weight: 400;
    text-transform: uppercase;
    margin: 2rem 0;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    .left {
      display: flex;
      align-items: center;

      .icons {
        display: flex;
        align-items: center;

        .addIcon,
        .removeIcon {
          height: 2rem;
          width: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 2px solid #fff;
          margin-right: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;

          &:hover {
            background-color: #fff;

            i {
              color: #000;
            }
          }

          i {
            font-size: 0.8rem;
          }
        }
      }

      .userMeta {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        span {
          font-size: 0.85rem;
          font-weight: 300;
          color: #999;
        }
      }

      .avatarV2 {
        border: 2px solid #2fdd92;
      }

      .avatar,
      .avatarV2 {
        cursor: pointer;
        height: 60px;
        width: 60px;
        border-radius: 50%;
        margin-right: 1.5rem;
        position: relative;

        .imageAvatar {
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 50%;
          background-size: cover;
          background-position: center;
          object-fit: cover;
          height: 100%;
          width: 100%;
        }

        .imageBadge {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

          .badge {
            height: 60px;
            width: auto;
          }
        }
      }
    }

    .right {
      display: flex;
      align-items: center;

      .options {
        margin-left: 0.5rem;
        cursor: pointer;
      }

      .lastMessage {
        margin-right: 2rem;
        display: flex;
        align-items: center;

        .time {
          font-size: 0.95rem;
          font-weight: 300;
          color: #cfcfcf;
          margin-right: 0.5rem;
        }

        .num {
          height: 1.4rem;
          width: 1.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          border-radius: 50%;
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
          font-size: 0.9rem;
          font-weight: 600;
        }
      }
    }
  }

  @media screen and (max-width: 480px) {
    .item {
      .left {
        .icons {
          .addIcon,
          .removeIcon {
            height: 1.5rem;
            width: 1.5rem;

            i {
              font-size: 0.7rem;
            }
          }
        }

        .userMeta {
          span {
            font-size: 0.75rem;
          }
          p {
            font-size: 0.9rem;
          }
        }

        .avatar,
        .avatarV2 {
          height: 50px;
          width: 50px;
          margin-right: 0.5rem;

          .imageBadge {
            .badge {
              height: 50px;
            }
          }
        }
      }

      .right {
        .lastMessage {
          margin-right: 1rem;

          .time {
            font-size: 0.8rem;
            margin-right: 0.25rem;
          }

          .num {
            height: 1.2rem;
            width: 1.2rem;
            font-size: 0.8rem;
          }
        }
      }
    }
  }
`;
