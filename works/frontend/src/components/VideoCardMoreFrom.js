import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import OptionMenu from "../pages/OptionMenu";
import { VideoAvatar } from "../styles/Avatar";
import VideoCardOverlay from "./VideoCardOverlay/VideoCardOverlay";
import { GlobalContext } from "../context/GlobalContext";

const Wrapper = styled.div`
  text-align: center;

  .card-margin {
    margin: 0 0.8rem;
  }

  .parent {
    position: relative;
    top: 0;
    left: 0;
    z-index: 1 !important;
  }

  .video-info-container {
    display: flex;
    flex-direction: column;
    margin-top: 0.3rem;
  }

  .channel-avatar img {
    position: relative;
    top: 5px;
  }

  .user {
    background: -webkit-linear-gradient(#ff4883, #ffcd55);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 500;
    letter-spacing: 0.02rem;
    text-shadow: 2px 2px 10px rgba(255, 255, 255, 0.3);
    cursor: pointer;
  }

  .video-info span {
    font-size: 0.9rem;
    padding-right: 0.1rem;
  }
  .video-title {
    margin: initial;
  }
  .video-titleLeft {
    text-align: start !important;
    width: 72% !important;
  }
  .options-menu-right {
    float: right;
    padding: 10px;
    color: white;
    background-color: unset;
    box-shadow: none;
  }
`;

const VideoCardMoreFrom = ({
  nousername,
  hideavatar,
  video,
  titleLeft,
  customClass,
}) => {
  const history = useHistory();
  let location = "";
  const displaySettings = video.userSettings;
  const visitorBadge = video.userSettings?.VisitorBadge;

  const { setShowMyPortal, setPortalUsername } = useContext(GlobalContext);

  if (displaySettings) {
    location = displaySettings.outOfThisWorld
      ? "out of this world"
      : displaySettings.city + " " + displaySettings.state;
  }

  const redirectToProfile = (userName) => {
    history.push(`/channel/${userName}`);
  };

  console.log("Channel avatar visitorBadge", video);

  return (
    <Wrapper>
      <div className={`parent pointer ${customClass ? customClass : ""}`}>
        <VideoCardOverlay
          componentName={"VideoCard"}
          video={video}
        ></VideoCardOverlay>
      </div>
      <div className="video-info-container">
        <div className="video-info">
          <OptionMenu />
          <h4 className={`${titleLeft ? "video-titleLeft" : "video-title"}`}>
            <Link to={`/watch/${video.id}`}>
              {video.title.length > 50
                ? video.title.substring(0, 50) + "..."
                : video.title}
            </Link>
          </h4>
          {!nousername && (
            <span className="secondary">
              <span
                onClick={() => {
                  setPortalUsername(video.userId);
                  setShowMyPortal(true);
                }}
                className="user"
              >
                {video.User.username}
              </span>

              {location ? `, ${location}` : ""}
            </span>
          )}
        </div>
        <div>
          {!hideavatar && (
            <div className="channel-avatar">
              <VideoAvatar
                className="pointer"
                src={visitorBadge?.imgPath || video.User.avatar}
                alt="channel avatar"
                onClick={() => redirectToProfile(video.User.username)}
              />
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default VideoCardMoreFrom;
