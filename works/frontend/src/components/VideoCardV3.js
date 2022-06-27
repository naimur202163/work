import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import VideoCardOverlay from './VideoCardOverlay/VideoCardOverlay';
import avatar_placeholder from "../assets/avtar_placeholder.png"
import OptionMenu from '../pages/OptionMenu';

const Wrapper = styled.div`
  text-align: center;
  .parent {
    position: relative;
    top: 0;
    left: 0;
  }

  .video-info-container {
    display: flex;
    flex-direction: column;
    margin-top: 0.3rem;
  }
  .channel-avatar {
    .avatar-image {
      height: 5rem;
      width: auto;
    }

    .png-img {
      width: 5rem;
      height: auto;
    }

    .custom-image {
      height: 5rem;
      width: 5rem;
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
    text-shadow: 2px 2px 10px rgba(255, 255, 255, 0.3);
    cursor: pointer;
  }

  .video-info span {
    font-size: 0.9rem;
    padding-right: 0.1rem;
  }

  .video-title {
    margin: auto;
  }
  .options-menu-right{
    float : right;
    padding:10px;
    color:white;
    background-color:unset;
    box-shadow:none;
  }
`;

const VideoCardV3 = ({
  nousername,
  hideavatar,
  video
}) => {
  const history = useHistory();

  const displaySettings = video.userSettings
  const badge = video.userSettings?.VisitorBadge.imgPath

  let location = '';
  if (displaySettings) {
    location = displaySettings.outOfThisWorld
      ? "out of this world"
      : displaySettings.city + " " + displaySettings.state;
  }

  const redirectToProfile = (userName) => {
    history.push(`/channel/${userName}`);
  };

  const isPngOrJpg = () => {
    const image = video.User.avatar === null ? badge : video.User.avatar;

    if (image && (image.includes(".png") || image.includes(".svg"))) {
      return (
        <img
          className={`${image.includes(".png") ? "png-img" : "avatar-image"}`}
          src={image}
          alt="badge"
          onClick={() => redirectToProfile(video.User.username)}
        />
      );
    } else {
      return (
        <img
          className="custom-image"
          src={!!image ? image : avatar_placeholder}
          alt="badge"
          onClick={() => redirectToProfile(video.User.username)}
        />
      );
    }
  };

  return (
    <Wrapper>
      <div
        className="parent pointer"
      >
        <VideoCardOverlay componentName={'VideoCardV3'} video={video} ></VideoCardOverlay>
      </div>
      <div className="video-info-container">
        <div className="video-info">
          <OptionMenu/>
          <Link to={`/watch/${video.id}`}>
            <h4 className="video-title">
              {video.title.length > 50
                ? video.title.substring(0, 50) + "..."
                : video.title}
            </h4>
          </Link>
          {!nousername && (
            <span className="secondary">
              <Link to={`/channel/${video.User.username}`}>
                <span className="user">{video.User.username}</span>,
              </Link>{" "}
              {location}
            </span>
          )}
        </div>
        <div className="channel-avatar pointer">{isPngOrJpg()}</div>
      </div>
    </Wrapper>
  );
};

export default VideoCardV3;
