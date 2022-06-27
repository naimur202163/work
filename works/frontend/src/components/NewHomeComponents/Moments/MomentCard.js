import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Player from "react-player";
import MomentOptions from "./MomentOptions";
import { GlobalContext } from "../../../context/GlobalContext";
import { useSelector } from "react-redux";

const MOMENTOPTION1 = [
  { icon: <i class="far fa-eye"></i>, text: "View Moment" },
  { icon: <i class="far fa-bookmark"></i>, text: "Save Moment" },
  { icon: <i class="fas fa-share-alt"></i>, text: "Share Moment" },
];

const MOMENTOPTION2 = [
  { icon: <i class="fas fa-edit"></i>, text: "Edit Moment" },
  { icon: <i class="fas fa-trash-alt"></i>, text: "Delete Moment" },
];

const MomentCard = ({ moment, setSelectedMoment }) => {
  const user = useSelector((state) => state.user);
  const { showEditMomentModel } = useContext(GlobalContext);

  const [showVideo, setShowVideo] = useState(false);
  let timeout;

  const { id, caption, coverImgUrl, videoUrl, User } = moment;

  useEffect(() => {
    if (showEditMomentModel) {
      setShowVideo(false);
    }
  }, [showEditMomentModel]);

  return (
    <>
      <MomentCardStyled
        onMouseEnter={() => {
          timeout = setTimeout(() => {
            setShowVideo(true);
          }, [1500]);
        }}
        onMouseLeave={() => {
          clearTimeout(timeout);
          setShowVideo(false);
        }}
      >
        <img src={coverImgUrl} alt={caption} className="thumbnail" />
        <div className="backdrop"></div>

        <div className="metaData">
          <h1 className="metaData__title">{caption}</h1>

          <p className="metaData__views">457 Views</p>
        </div>

        {showVideo && (
          <Player
            playing={true}
            url={videoUrl}
            width="100%"
            height="100%"
            controls={false}
            className="Player"
            muted={false}
            loop={true}
          />
        )}

        <div className="dotMenu">
          <MomentOptions
            momentId={id}
            options={User.id === user.id ? MOMENTOPTION2 : MOMENTOPTION1}
            setSelectedMoment={setSelectedMoment}
            moment={moment}
          />
        </div>
      </MomentCardStyled>
    </>
  );
};

export default MomentCard;

const MomentCardStyled = styled.div`
  width: 100%;
  height: 20rem;
  overflow: hidden;
  border-radius: 0.5rem;
  position: relative;
  margin: 0 auto;
  position: relative;

  .dotMenu {
    z-index: 5;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    height: 2rem;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
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
  }

  .Player {
    z-index: 3;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transform: scale(1.25);
  }

  .thumbnail {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center;
    object-fit: cover;
    z-index: -1;
  }

  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 1;
    transition: all 0.2s ease;
    opacity: 0;
    visibility: hidden;
  }

  .metaData {
    position: absolute;
    z-index: 2;
    bottom: 0rem;
    left: 1rem;
    transition: all 0.2s ease;

    &__title {
      font-size: 1.2rem;
      line-height: 1.3;
      width: 90%;
    }

    &__views {
      font-size: 0.75rem;
      color: #fff;
      font-weight: 400;
      font-family: brother-1816, sans-serif;
      text-transform: uppercase;
      opacity: 0;
      transform: translateY(5px);
      transition: all 0.2s ease;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  &:hover {
    .backdrop {
      background-color: rgba(0, 0, 0, 0.4);
      transform: scale(1.2);
      opacity: 1;
      visibility: visible;
    }

    .metaData {
      bottom: 1rem;

      &__title {
        margin-bottom: 0.5rem;
      }

      &__views {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  @media screen and (max-width: 768px) {
    height: 18rem;

    .metaData {
      &__title {
        font-size: 1.2rem;
      }

      &__views {
        font-size: 0.7rem;
      }
    }
  }

  @media screen and (max-width: 480px) {
    height: 14rem;

    .dotMenu {
      height: 1.5rem;
      width: 1.5rem;

      i {
        font-size: 0.8rem;
      }
    }

    .Player {
      transform: scaleX(1.25) scaleY(1.4);
    }

    .metaData {
      left: 0.4rem;
      bottom: -0.6rem;

      &__title {
        font-size: 0.9rem;
        width: 95%;
      }

      &__views {
        font-size: 0.6rem;
      }
    }
  }
`;
