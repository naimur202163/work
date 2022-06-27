import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled, { css } from "styled-components";
import Button from "../../styles/Button";
import { getImgPath } from "../../utils";
import PriceTipModal from "../PriceCard/PriceTipModal";
import Moment from "react-moment";
import moment from "moment";

export const Wrapper = styled.div`
  overflow: hidden;

  .overlay {
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    position: absolute;
  }
  .thumb {
    width: 100%;
    object-fit: cover;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    position: relative;
  }
  @media screen and (max-width: 600px) {
    .overlay {
      height: 250px;
    }
    .thumb {
      height: 250px;
    }
  }
  @media screen and (max-width: 420px) {
    .overlay {
      height: 200px;
    }
    .thumb {
      height: 200px;
    }
  }
  ${(props) =>
    props.componentName === "TrendingCard" &&
    css`
      .thumb {
        min-width: 250px;
        max-width: 100%;
        height: 140px;
        object-fit: cover; // added to fix portrait 9:16 res videos
        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
        border-radius: 4px;
      }
      .overlay {
        position: absolute;
        z-index: 11;
        height: auto;
        width: 100%;
        left: 0;
      }
    `}
  ${(props) =>
    props.componentName === "VideoCard" &&
    css`
      .thumb {
        height: 160px;
      }
      .overlay {
        z-index: 11;
        height: 200px;
        margin: 0 !important;
        width: 100%;
      }
    `}
    ${(props) =>
    props.componentName === "LiveClasses" &&
    css`
      border-radius: 12px;
      .thumb {
        height: 250px;
      }
      .overlay {
        z-index: 11;
        height: 250px;
        width: 100%;
      }
      .ribbon {
        display: none;
      }
    `}
    ${(props) =>
    props.componentName === "VideoCardFeatured" &&
    css`
      .thumb {
        height: 360px;
      }
      .overlay {
        z-index: 11;
        height: 360px;
        width: 100%;
      }
      .floating-button {
        position: absolute;
        left: 50%;
        top: 85%;
        transform: translate(-50%, -50%);
        z-index: 98;
      }
    `}
    ${(props) =>
    props.componentName === "VideoCardTrending" &&
    css`
      .thumb {
        height: 195px;
      }
      .overlay {
        z-index: 11;
        height: 195px;
        width: 100%;
      }
      .floating-button {
        position: absolute;
        left: 50%;
        top: 80%;
        transform: translate(-50%, -50%);
        z-index: 98;
      }
    `}
    ${(props) =>
    props.componentName === "VideoCardClip" &&
    css`
      height: 196px;
      .thumb {
        height: 221px;
      }
    `}
    ${(props) =>
    props.componentName === "VideoCardV2" &&
    css`
      .thumb {
        height: 160px;
      }
      .overlay {
        z-index: 11;
        height: 160px;
        width: 100%;
      }
      .floating-button {
        position: absolute;
        left: 50%;
        top: 75%;
        transform: translate(-50%, -50%);
        z-index: 98;
      }
    `}
    ${(props) =>
    props.componentName === "VideoCardV3" &&
    css`
      .thumb {
        height: 200px;
      }
      .overlay {
        z-index: 11;
        height: 200px;
        width: 100%;
      }
      .floating-button {
        position: absolute;
        left: 50%;
        top: 80%;
        transform: translate(-50%, -50%);
        z-index: 98;
      }
    `}
    ${(props) =>
    props.componentName === "WatchVideo" &&
    css`
      .overlay {
        position: absolute;
        width: -webkit-fill-available;
        z-index: 1;
        height: 100%;
      }
      .overlay-text {
        z-index: 23;
        position: absolute;
        top: 37%;
        left: 50%;
        border-radius: 5px;
        text-align: center;
        background: rgba(0, 0, 0, 0.3);
        transform: translate(-50%, -50%);
        padding: 0.5%;
      }
    `}
    .views {
    position: absolute;
    bottom: 5px;
    z-index: 1;
    padding: 0 9px;
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .views span {
    padding: 6px 13px;
    background-color: #1c1c1e;
    color: #f2f2f7;
    font-size: 10px;
    border-radius: 7px;
  }
  .live-badge {
    font-family: Montserrat;
    position: absolute;
    top: 10px;
    padding: 3px 15px 3px 15px;
    z-index: 98;
    border-radius: 10px;
    left: 10px;
    background: linear-gradient(
      29deg,
      rgb(249, 154, 45),
      rgb(246, 92, 139) 71%
    ) !important;
    box-shadow: -1px 2px 3px rgba(0, 0, 0, 0.3);
    clip-path: polygon(0 0, 100% 0%, 100% 100%, 0 100%, 0% 50%);
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
  }
  .view-badge {
    font-family: Montserrat;
    position: absolute;
    bottom: 10px;
    padding: 3px 15px 3px 15px;
    z-index: 98;
    border-radius: 10px;
    left: 10px;
    background: #181818;
    box-shadow: -1px 2px 3px rgba(0, 0, 0, 0.3);
    clip-path: polygon(0 0, 100% 0%, 100% 100%, 0 100%, 0% 50%);
    transition: all 0.3s ease;
  }
  .ribbon {
    font-family: "Poppins", sans-serif;
    position: absolute;
    top: 0px;
    right: 0px;
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
      border: none !important;
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
      border: none !important;
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

const VideoCardOverlay = ({ video, pageName, componentName, clip }) => {
  const imgPath = video ? getImgPath(video) : "";

  const [showPaymentModel, setShowPaymentModel] = useState(false);
  const [action, setAction] = useState();
  const history = useHistory();
  const thumbnail = video.customThumbnail || video.thumbnail;
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const unlockPayPerView = () => {
    togglePaymentModel(true);
    setAction("ppv_unlock");
  };
  const videoLength = moment().add(parseInt(video.videoLength) / -3600, "h");

  const minuteOrHrs = (videoLength) => {
    videoLength = parseInt(videoLength) / 60;
    if (videoLength >= 60) return "hrs";
    else if (videoLength >= 1) return "mins";
    else return "s";
  };

  const redirectToSingUpPage = () => {
    history.push(`/signup?code=${profile.username}`);
  };

  const upgradeMemberShip = () => {
    history.push(`/channel/${user.username}?tab=myaccount`);
  };

  const togglePaymentModel = (flag) => {
    setShowPaymentModel(flag);
  };

  const redirectToWatchVideo = (videoId) => {
    history.push(`/watch/${videoId}`);
  };

  return (
    <Wrapper componentName={componentName}>
      {componentName === "LiveClasses" && (
        <>
          <div className="live-badge">LIVE</div>
          <div className="view-badge">0000 Viewers</div>
        </>
      )}
      {componentName === "VideoCardClip" && (
        <>
          <div className="views">
            <span>{video.views} views</span>
            <span>
              <Moment date={videoLength} format="h:m:s" trim durationFromNow />{" "}
              {minuteOrHrs(video.videoLength)}
            </span>
          </div>
        </>
      )}
      {user && user.id && video?.VideoAccessOverlay?.keyVideoAccess === 3 && (
        <>
          {pageName !== "watch-video" && (
            <div className="ribbon">
              <p>{video.VideoAccessOverlay.name}</p>
            </div>
          )}
        </>
      )}

      {imgPath && video && video.VideoAccessOverlay && video.isVideoLocked ? (
        <img
          className="overlay"
          alt=""
          src={".." + imgPath}
          onClick={() =>
            !user || !user.id
              ? redirectToSingUpPage()
              : redirectToWatchVideo(video.id)
          }
        />
      ) : pageName === "watch-video" &&
        video &&
        video.VideoAccessOverlay &&
        !video.isVideoLocked ? null : (
        <div
          className="overlay"
          onClick={() =>
            !user || !user.id
              ? redirectToSingUpPage()
              : redirectToWatchVideo(video.id)
          }
        />
      )}

      {!user || !user.id ? (
        <Button
          className="ribbon"
          onClick={($event) => {
            redirectToSingUpPage();
          }}
        >
          <p>Join the Co-op</p>
        </Button>
      ) : null}

      {user &&
        user.id &&
        video &&
        video.VideoAccessOverlay &&
        video.isVideoLocked && (
          <>
            {video?.VideoAccessOverlay?.keyVideoAccess === 2 && (
              <>
                {pageName === "watch-video" && (
                  <div className="overlay-text">
                    <h3>
                      This video requires a one-time <em>Karma Contribution</em>{" "}
                      to view.
                    </h3>
                  </div>
                )}
                {pageName !== "watch-video" && (
                  <div
                    className="ribbon"
                    onClick={($event) => {
                      unlockPayPerView();
                    }}
                  >
                    <p>
                      {video.VideoAccessOverlay.name}
                      <span className="price">
                        {video?.amount
                          ? ` ($${(+video.amount).toFixed(2)}) `
                          : ""}
                      </span>
                    </p>
                  </div>
                )}
              </>
            )}

            {video?.VideoAccessOverlay?.keyVideoAccess === 1 && (
              <>
                {pageName === "watch-video" && (
                  <>
                    <div className="overlay-text">
                      <h3>
                        You must be a Co-op Member to view this content. Relax,
                        it's only $5 a year... That's a cup of coffee!
                      </h3>
                    </div>

                    <Button
                      className="floating-button"
                      onClick={($event) => {
                        upgradeMemberShip();
                      }}
                    >
                      <p>Upgrade Membership</p>
                    </Button>
                  </>
                )}
              </>
            )}

            {video?.VideoAccessOverlay?.keyVideoAccess === 1 && (
              <>
                {pageName !== "watch-video" && (
                  <div
                    className="ribbon"
                    onClick={($event) => {
                      upgradeMemberShip();
                    }}
                  >
                    <p>Join the Co-op</p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      {pageName !== "watch-video" && (
        <img
          className="thumb pointer"
          onClick={() =>
            !user || !user.id
              ? redirectToSingUpPage()
              : redirectToWatchVideo(video.id)
          }
          src={thumbnail}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://res.cloudinary.com/dq87imngy/image/upload/v1653667310/defaultImage_smbzwn.png";
          }}
          alt="thumbnail"
        />
      )}
      {showPaymentModel && (
        <PriceTipModal
          closeModalNew={() => togglePaymentModel(false)}
          price={(+video.amount).toFixed(2)}
          video={video}
          action={action}
        />
      )}
    </Wrapper>
  );
};

export default VideoCardOverlay;
