import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { getConnectionStatus } from "../../../actions";
import { GlobalContext } from "../../../context/GlobalContext";
import Button from "../../../styles/Button";
import EditBtn from "../../../styles/EditBtn";
import CoopReferralModal from "../CoopReferralModal";
import ConnectWithWarrior from "../Models/ConnectWithWarriorModel";
import PortalTabs from "../PortalTabs";
import {
  AvtarContainer, BannerContainer, ConnectBtn, CoopBtn, MainContainer, ShareBtn
} from "./styles";

function MyPortal({ profile }) {
  const { portalUsername, setShowMyPortal,setShowEditProfile } = useContext(GlobalContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [showConnectModel, setShowConnectModel] = useState(false);
  const {
    loading: connectionStatusLoading,
    error: connectionStatusError,
    text: connectionStatusText,
  } = useSelector((state) => state.connectionStatus);

  useEffect(() => {
    if (profile?.id) {
      dispatch(
        getConnectionStatus({
          warriorId: profile.id,
        })
      );
    }
  }, [profile, portalUsername, showConnectModel]);

  const handleCoopRefer = () => {
    setOpen(true);
  };

  const { username, avatar } = profile;
  const getUserRole = () => {
    switch (profile.userrole) {
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
  const closeModal = () => {
    setOpen(false);
  };

  const isBadgeOrAvatar = () => {
    const image = !profile.avatar ? profile.badge : profile.avatar;

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
      <MainContainer>
        <BannerContainer>
          {!profile?.isFetching && (
            <>
              {profile?.isMe && (
                <div className="editBtn">
                  <EditBtn onClick={()=>setShowEditProfile(true)}>Edit</EditBtn>
                </div>
              )}
            </>
          )}

          {!profile?.isFetching && (
            <>
              {profile?.isMe ? (
                <>
                  <ShareBtn onClick={handleCoopRefer}>
                    <p>Share</p>
                  </ShareBtn>

                  <CoopBtn onClick={handleCoopRefer}>
                    <p>COOP-REFER</p>
                  </CoopBtn>
                </>
              ) : (
                <>
                  {!connectionStatusLoading && !connectionStatusError && (
                    <ConnectBtn
                      onClick={() => {
                        if (connectionStatusText === "pending") {
                          return toast.error(
                            `Your connection request is pending. We will send notification to the ${profile?.username} about your request. `
                          );
                        }

                        if (connectionStatusText === "message") {
                          setShowMyPortal(false)
                          return history.push("/home/chatlist");
                        }

                        setShowConnectModel(!showConnectModel);
                      }}
                    >
                      <p>{connectionStatusText}</p>
                    </ConnectBtn>
                  )}
                </>
              )}
            </>
          )}
        </BannerContainer>

        <AvtarContainer>
          {profile?.id && (
            <>
              <div className="avatar">{isBadgeOrAvatar()}</div>
              <p>{username}</p>
              <Button className="userrole">{getUserRole()}</Button>
            </>
          )}
        </AvtarContainer>

        <PortalTabs profile={profile} />
      </MainContainer>
      {open && (
        <div className="modal-container">
          <CoopReferralModal close={closeModal} />
        </div>
      )}

      {showConnectModel && (
        <div className="modal-container">
          <ConnectWithWarrior
            close={() => setShowConnectModel(false)}
            username={profile?.username}
            id={profile?.id}
          />
        </div>
      )}
    </>
  );
}

export default MyPortal;
