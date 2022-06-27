import React from "react";
import styled, { keyframes } from "styled-components";
import VideoOptions from "../VideosTab/VideoOptions";
import TickIcon from "../../../assets/Icons/tick.svg";
import Moment from "react-moment";

const VideoCardSelect = ({ selectVideoHandler, item, isSelected }) => {
  const VIDEOOPTIONS = [
    { icon: "", text: "Manage Video" },
    { icon: "", text: "Share Video" },
  ];

  const toHHMMSS = (secs) => {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;

    console.log(hours, minutes, seconds, "to hh mm ss");

    const result = [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");

    return (
      result +
      `${hours && !minutes ? " hour" : minutes && !hours ? " min" : " sec"}`
    );
  };

  return (
    <VideoCardSelectStyled>
      <div
        onClick={() => selectVideoHandler({ id: item.id })}
        className={`thumbnail`}
      >
        <img src={item.thumbnail} alt={item.title} />
      </div>

      <div className="metaInfo">
        <div className="metaInfo__left">
          <div className={`metaInfo__left--videoMeta `}>
            <div className="title">{item.title}</div>

            <div className="seperatorInfo">
              <div className="bold">{item.User?.username}</div>
              <div className="light">
                <Moment fromNow>{item.createdAt}</Moment>
              </div>
            </div>
          </div>
        </div>
        <div className="metaInfo__right">
          <VideoOptions options={VIDEOOPTIONS} />
        </div>
      </div>

      <div className="length">
        <span>{toHHMMSS(item.videoLength)}</span>
      </div>

      <div
        onClick={() => selectVideoHandler({ id: item })}
        className={`selectVideo ${isSelected && "selectVideo__selected"}`}
      >
        {isSelected && <img src={TickIcon} alt="Tick Icon" />}
      </div>
    </VideoCardSelectStyled>
  );
};

export default VideoCardSelect;

const TickIconAnimation = keyframes`
  from {
    transform: translateY(7px) scale(0.7);
    opacity: 0;
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const VideoCardSelectStyled = styled.div`
  margin-bottom: 2rem;
  position: relative;

  .length {
    font-family: brother-1816, sans-serif;
    position: absolute;
    top: 9.5rem;
    right: 1rem;
    font-size: 0.75rem;
    padding: 0.2rem 0.7rem;
    color: #fff;
    z-index: 2;
    background-color: rgba(28, 28, 30, 1);
    border-radius: 0.3rem;
    cursor: pointer;
  }

  .selectVideo {
    position: absolute;
    top: 1rem;
    right: 1rem;
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    border: 4px solid #f9903d;
    background-color: #000;
    cursor: pointer;
    transition: all 0.25s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &__selected {
      background-color: #f9903d !important;
    }

    img {
      width: 1.6rem;
      height: auto;
      animation: ${TickIconAnimation} 0.2s ease;
      transition: all 0.2s ease;
    }
  }

  .thumbnail {
    width: 100%;
    height: 12rem;
    overflow: hidden;
    margin-bottom: 1rem;
    border-radius: 1rem;
    cursor: pointer;

    img {
      height: 100%;
      width: 100%;
      background-size: cover;
      background-position: center;
      object-fit: cover;
    }
  }

  .metaInfo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.5rem;
    font-family: ${(props) => props.theme.montserrat};

    &__left {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 95%;

      &--videoMeta {
        cursor: pointer;
        width: calc(100% - 4rem);

        .title {
          font-size: 0.95rem;
          font-weight: 500;
          line-height: 1.5;
          margin-bottom: 0.25rem;
        }

        .seperatorInfo {
          font-size: 0.75rem;
          display: flex;
          align-items: center;

          & > *:not(:last-child) {
            &::after {
              content: "•";
              margin-left: 8px;
              position: absolute;
              display: inline-block;
              font-weight: 700;
            }
          }
          & > *:not(:first-child) {
            margin-left: 18px;
          }

          .bold {
            font-weight: 500;
            color: rgba(199, 199, 204, 1);
          }

          .light {
            color: rgba(174, 174, 178, 1);
            font-size: 300;
          }
        }
      }
    }

    &__right {
      cursor: pointer;
    }
  }

  @media screen and (max-width: 600px) {
    .length {
      top: 8rem;
      right: 0.5rem;
      font-size: 0.65rem;
    }

    .thumbnail {
      height: 10rem;
      margin-bottom: 0.5rem;
    }
  }

  @media screen and (max-width: 480px) {
    .length {
      top: 6rem;
      right: 0.5rem;
      font-size: 0.6rem;
    }

    .thumbnail {
      height: 8rem;
      margin-bottom: 0.5rem;
    }

    .selectVideo {
      height: 1.8rem;
      width: 1.8rem;
      border: 3px solid #f9903d;

      img {
        width: 1.5rem;
      }
    }

    .metaInfo {
      &__left {
        &--videoMeta {
          width: 100%;

          .title {
            font-size: 0.7rem;
            margin-bottom: 0.2rem;
          }

          .seperatorInfo {
            font-size: 0.6rem;
          }
        }
      }
    }
  }

  @media screen and (max-width: 375px) {
    .length {
      font-size: 0.55rem;
      padding: 0.2rem 0.4rem;
    }

    .metaInfo {
      &__left {
        &--videoMeta {
          width: 100%;

          .title {
            font-size: 0.7rem;
            margin-bottom: 0.2rem;
          }
        }
      }
    }
  }
`;
