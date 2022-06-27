import React from "react";
import styled from "styled-components";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const VideoCard = (props) => {
  const { video } = props;
  const {
    thumbnail,
    title,
    createdAt,
    id,
    VideoAccessOverlay,
    User: { username },
  } = video;

  return (
    <Link to={`/watch/${id}`}>
      <VideoCardComponent>
        <img src={thumbnail} alt={title} />
        <h1 className="title">{title}</h1>

        <div className="featured-video-info">
          <h2>{username}</h2>
          <div className="featured-video-info__dot">
            <svg xmlns="http://www.w3.org/2000/svg">
              <circle cx="3" cy="3" r="3" fill="#b0b0b0" />
            </svg>
          </div>
          {/* <h2>{views} views</h2>
          <div className="info__dot">
            <svg xmlns="http://www.w3.org/2000/svg">
              <circle cx="3" cy="3" r="3" fill="#b0b0b0" />
            </svg>
          </div> */}

          <h2 className="featured-video-info__date">
            <Moment fromNow>{createdAt}</Moment>
          </h2>
        </div>

        {VideoAccessOverlay?.keyVideoAccess === 2 && (
          <div className="ribbon">
            <p>{VideoAccessOverlay?.name}</p>
          </div>
        )}

        {VideoAccessOverlay?.keyVideoAccess === 3 && (
          <div className="ribbon">
            <p>{VideoAccessOverlay?.name}</p>
          </div>
        )}

        {VideoAccessOverlay?.keyVideoAccess === 1 && (
          <div className="ribbon">
            <p>Join the Co-op</p>
          </div>
        )}
      </VideoCardComponent>
    </Link>
  );
};

export default VideoCard;

const VideoCardComponent = styled.div`
  padding: 0 0.7rem;
  position: relative;

  img {
    width: 100%;
    height: 12rem;
    border-radius: 5px;
    background-size: cover;
    background-position: center;
    object-fit: cover;
    margin-bottom: 0.5rem;
  }

  .title {
    font-size: 1rem;
    color: #fff;
    line-height: 1.5;
    text-align: center;
    margin-bottom: 0.1rem;
    margin-top: 0.7rem;
  }

  .featured-video-info {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    h1 {
      font-size: 1rem;
    }

    h2 {
      font-size: 0.8rem;
      color: #b0b0b0;
    }

    &__dot {
      height: 0.3rem;
      width: 0.3rem;
      padding-right: 18px;
      padding-left: 10px;
    }
  }

  /* ribbon css */
  .ribbon {
    font-family: "Poppins", sans-serif;
    position: absolute;
    top: 0px;
    right: 11px;
    padding: 3px 15px 3px 30px;
    z-index: 98;
    background: linear-gradient(
      29deg,
      rgb(249, 154, 45),
      rgb(246, 92, 139) 71%
    );
    box-shadow: -1px 2px 3px rgba(0, 0, 0, 0.3);
    clip-path: polygon(0 0, 100% 0%, 100% 100%, 0 100%, 12% 50%);
    transition: all 0.3s ease;

    p {
      font-size: 0.7rem;
      text-transform: capitalize;
      font-weight: 300;
      letter-spacing: 0.1px;
      margin: 0;
      padding: 0;
      transition: all 0.2s ease;

      span {
        font-weight: bold;
      }
    }

    &:hover {
      background: linear-gradient(
        29deg,
        rgb(249, 154, 45),
        rgb(246, 92, 139) 71%
      ) !important;

      p {
        transform: scale(1.1);
      }
    }
  }

  &:hover {
    .ribbon {
      background: linear-gradient(
        29deg,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5)
      );

      p {
        color: #fff;
      }
    }
  }
`;
