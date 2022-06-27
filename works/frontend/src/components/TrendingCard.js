import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import VideoCardOverlay from "./VideoCardOverlay/VideoCardOverlay";
import Moment from "react-moment";
import OptionMenu from "../pages/OptionMenu";

const Wrapper = styled.div`
  margin: 1.4rem 0;
  margin-top: 1rem;
  display: flex;

  .parent {
    position: relative;
    top: 0;
    left: 0;
    max-width: 363px;

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

  .video-info-container {
    margin-left: 1.2rem;
    width:100%;
  }
  .option-menu-container{
    width:100%;
  }
  .options-menu-right{
    float : right;
    padding:10px;
    color:white;
    background-color:unset;
    box-shadow:none;
  }
  p {
    font-size: 0.9rem;
  }

  p:last-child {
    margin-top: 0.2rem;
  }

  p span {
    padding-right: 0.3rem;
  }

  @media screen and (max-width: 750px) {
    margin: 1.2rem 0;

    .video-info-container {
      margin-left: 1.5rem;
    }
  }

  @media screen and (max-width: 645px) {
    flex-direction: column;

    .video-info-container {
      padding-bottom: 1rem;
    }

    .video-info-container {
      margin-left: 0;
      margin-top: 1rem;
    }
  }
`;

const TrendingCard = ({ video }) => {
  const location = video.userSettings?.outOfThisWorld
    ? "out of this world"
    : video.userSettings?.city + " " + video.userSettings?.state;

  return (
    <Wrapper>
      <div className="parent pointer">
        <VideoCardOverlay
          componentName="TrendingCard"
          video={video}
        ></VideoCardOverlay>
      </div>
      <div className="video-info-container">
        <Link to={`/watch/${video.id}`}>
          <h3>{video.title}</h3>
        </Link>
        <p className="secondary">
          <Link to={`/channel/${video.User.username}`}>
            <span className="user">{video.User.username}</span>
          </Link>{" "}
          <span>•</span> {location}{" "}
          {/* <span>{video.views || 0} views</span> */}
          <span>•</span>{" "}
          <span>
            <Moment fromNow>{video.createdAt}</Moment>
          </span>
        </p>
        {/* <p className="secondary">{video.description.substr(0, 130)}</p> */}
        <p className="secondary">{video.description}</p>
      </div>
      <div className="option-menu-container">
        <OptionMenu />
      </div>
    </Wrapper>
  );
};

export default TrendingCard;
