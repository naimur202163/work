import React from "react";
import styled from "styled-components";
import PlaylistOptions from "./PlaylistOptions";
import Moment from "react-moment";

const PlaylistItem = ({ isSelf, video }) => {
  const VIDEOOPTIONS1 = [
    { icon: "", text: "Manage Video" },
    { icon: <i class="fas fa-share-square"></i>, text: "Share Video" },
  ];

  const VIDEOOPTIONS2 = [
    { icon: <i class="far fa-eye"></i>, text: "View Video" },
    { icon: <i class="far fa-bookmark"></i>, text: "Save Video" },
    { icon: <i class="fas fa-share-alt"></i>, text: "Share Video" },
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

  const isBadgeOrAvatar = () => {
    const image = !video.User.avatar
      ? video.userSettings.VisitorBadge.imgPath
      : video.User.avatar;

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

  if (isSelf) {
    return (
      <PlaylistItemStyledV2>
        <div className={`thumbnail`}>
          <img src={video.thumbnail} alt={video.title} />
        </div>

        <div className="metaInfo">
          <div className="metaInfo__left">
            <div className={`metaInfo__left--videoMeta `}>
              <div className="title">{video.title}</div>

              <div className="seperatorInfo">
                <div className="bold">{video.User.username}</div>
                <div className="light">
                  <Moment fromNow>{video.createdAt}</Moment>
                </div>
              </div>
            </div>
          </div>
          <div className="metaInfo__right">
            <PlaylistOptions options={isSelf ? VIDEOOPTIONS1 : VIDEOOPTIONS2} />
          </div>
        </div>

        <div className="views">
          <span>{video.views} Views</span>
        </div>

        <div className="length">
          <span>{toHHMMSS(video.videoLength)}</span>
        </div>
      </PlaylistItemStyledV2>
    );
  }

  return (
    <PlaylistItemStyled>
      <div className={`thumbnail`}>
        <img src={video.thumbnail} alt={video.title} />
      </div>

      <div className="metaInfo">
        <div className="metaInfo__left">
          <div className="metaInfo__left--avatar">{isBadgeOrAvatar()}</div>

          <div className={`metaInfo__left--videoMeta `}>
            <div className="title">{video.title}</div>

            <div className="seperatorInfo">
              <div className="bold">{video.User.username}</div>
              <div className="light">
                <Moment fromNow>{video.createdAt}</Moment>
              </div>
            </div>
          </div>
        </div>
        <div className="metaInfo__right">
          <PlaylistOptions options={isSelf ? VIDEOOPTIONS1 : VIDEOOPTIONS2} />
        </div>
      </div>

      <div className="views">
        <span>{video.views} Views</span>
      </div>

      <div className="length">
        <span>{toHHMMSS(video.videoLength)}</span>
      </div>
    </PlaylistItemStyled>
  );
};

export default PlaylistItem;

const PlaylistItemStyled = styled.div`
  margin-bottom: 2rem;
  position: relative;

  .views {
    position: absolute;
    top: 9.5rem;
    left: 1rem;
    font-size: 0.8rem;
    padding: 0.2rem 0.7rem;
    color: #fff;
    z-index: 2;
    font-family: brother-1816, sans-serif;
    background-color: rgba(28, 28, 30, 1);
    text-transform: uppercase;
    border-radius: 0.3rem;
    cursor: pointer;
  }

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

  .thumbnail {
    width: 100%;
    height: 12rem;
    overflow: hidden;
    margin-bottom: 1rem;
    border-radius: 1rem;

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

      &--avatar {
        cursor: pointer;
        height: 3.2rem;
        width: 3.2rem;
        border-radius: 50%;
        position: relative;
        overflow: hidden;

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
            height: 38px;
            width: auto;
          }
        }
      }

      &--videoMeta {
        cursor: pointer;
        width: calc(100% - 4rem);
        overflow: hidden;
        text-overflow: ellipsis;

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
`;

const PlaylistItemStyledV2 = styled.div`
  margin-bottom: 2rem;
  position: relative;

  .views {
    position: absolute;
    top: 9.5rem;
    left: 1rem;
    font-size: 0.8rem;
    padding: 0.2rem 0.7rem;
    color: #fff;
    z-index: 2;
    font-family: brother-1816, sans-serif;
    background-color: rgba(28, 28, 30, 1);
    text-transform: uppercase;
    border-radius: 0.3rem;
    cursor: pointer;
  }

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

  .thumbnail {
    width: 100%;
    height: 12rem;
    overflow: hidden;
    margin-bottom: 1rem;
    border-radius: 1rem;

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
    .views {
      top: 8rem;
      left: 0.5rem;
      font-size: 0.65rem;
    }

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
    .views {
      top: 6rem;
      left: 0.5rem;
      font-size: 0.6rem;
    }

    .length {
      top: 6rem;
      right: 0.5rem;
      font-size: 0.6rem;
    }

    .thumbnail {
      height: 8rem;
      margin-bottom: 0.5rem;
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

  @media screen and (max-width: 390px) {
    .views {
      font-size: 0.55rem;
      padding: 0.2rem 0.4rem;
    }

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

          .seperatorInfo {
            font-size: 0.55rem;
          }
        }
      }
    }
  }
`;
