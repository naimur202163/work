import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import avatar_placeholder from "../../../assets/avtar_placeholder.png";
import VideoCardOverlay from "../../VideoCardOverlay/VideoCardOverlay";
import OptionMenu from "../../../pages/OptionMenu";
import Moment from "react-moment";
import { GlobalContext } from "../../../context/GlobalContext";

const Wrapper = styled.div`
  .parent {
    position: relative;
    top: 0;
    left: 0;
  }

  font-size: 13px;

  .options-menu-right {
    position: absolute;
    right: -5px;
    padding: 10px;
    color: white;
    background-color: unset;
    box-shadow: none;
  }

  .no-avatar {
    display: none;
  }

  .video-info {
    position: relative;
    order: 2;
    padding-right: 16px;
  }

  .video-info-container {
    display: flex;
    position: relative;
    margin: 8px 0 0 9px;
  }

  .channel-avatar {
    margin-right: 7px;
    padding: 3px;
    .avatar-image {
      height: 32px;
      width: 32px;
    }
    order: 1;
    .png-img {
      width: 32px;
      height: 32px;
    }

    .custom-image {
      height: 32px;
      width: 32px;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      object-fit: cover;
    }
  }

  .user {
    background: -webkit-linear-gradient(#ff4883, #fdb769);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 500;
    letter-spacing: 0.02rem;
    cursor: pointer;
    text-shadow: 2px 2px 10px rgba(255, 255, 255, 0.3);
  }

  .center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .center .channel-avatar {
    order: 1;
    margin-top: -35px;
    border-radius: 50%;
    background-color: #181818;
  }

  .center .secondary {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .center .video-info {
    text-align: center;
  }

  .center .separator {
    display: none;
  }

  .slick-slider {
    margin: 0 -17px;
  }

  @media screen and (max-width: 580px) {
    .video-info-container {
      position: relative;
      align-items: center;
    }
    .center {
      flex-direction: column;
    }

    .video-info h4 {
      font-size: 10px;
      letter-spacing: 0px;
      color: #f2f2f7;
    }

    .secondary {
      display: flex;
      line-height: 1.3;
      color: #d1d1d6;
    }
    .secondary .user {
      font-size: 10px;
      color: #aeaeb2;
    }

    .center h4 {
      margin-top: 2px;
    }

    .center .video-info {
      order: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .separator {
      margin: 0 3px;
    }
    .channel-avatar {
      margin-right: 7px;
    }
    .video-info span {
      font-size: 10px;
    }
  }
`;

const VideoClipCard = ({
  nousername,
  video,
  noAvatar,
  showLocation = true,
  showDate = true,
  center,
}) => {
  const history = useHistory();
  const avatarClassName = noAvatar ? "no-avatar" : "channel-avatar pointer";
  const containerClassName = center
    ? "video-info-container center"
    : "video-info-container";
  const displaySettings = video.userSettings;
  const badge = video.userSettings?.VisitorBadge.imgPath;

  let location = "";
  if (displaySettings) {
    location = displaySettings.outOfThisWorld
      ? "out of this world"
      : displaySettings.city + " " + displaySettings.state;
  }

  const { setShowMyPortal, setPortalUsername } = useContext(GlobalContext);

  const isPngOrJpg = () => {
    const image = video.User.avatar === null ? badge : video.User.avatar;

    if (image && (image.includes(".png") || image.includes(".svg"))) {
      return (
        <img
          className={`${image.includes(".png") ? "png-img" : "avatar-image"}`}
          src={image}
          alt="badge"
        />
      );
    } else {
      return (
        <img
          className="custom-image"
          src={!!image ? image : avatar_placeholder}
          alt="badge"
        />
      );
    }
  };

  return (
    <Wrapper>
      <div className="parent pointer">
        <VideoCardOverlay
          componentName={"VideoCardClip"}
          video={video}
        ></VideoCardOverlay>
      </div>
      <div className={containerClassName}>
        <OptionMenu />
        <div className="video-info">
          <Link to={`/watch/${video.id}`}>
            <h4>
              {video.title.length > 50
                ? video.title.substring(0, 50) + "..."
                : video.title}
            </h4>
          </Link>
          {!nousername && (
            <span className="secondary">
              <span
                onClick={() => {
                  setPortalUsername(video.User.username);
                  setShowMyPortal(true);
                }}
                className="user"
              >
                {video.User.username}
              </span>
              <span className="separator">{" - "}</span>
              <span>
                {showLocation ? <>{location} - </> : <>{video.category} - </>}
                {showDate && <Moment fromNow>{video.createdAt}</Moment>}
              </span>
            </span>
          )}
        </div>
        <div
          onClick={() => {
            setPortalUsername(video.User.username);
            setShowMyPortal(true);
          }}
          className={avatarClassName}
        >
          {isPngOrJpg()}
        </div>
      </div>
    </Wrapper>
  );
};

export default VideoClipCard;
