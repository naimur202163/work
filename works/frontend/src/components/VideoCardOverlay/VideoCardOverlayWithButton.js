import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled, { css } from "styled-components";
import Button from "../../styles/Button";
import { getImgPath } from "../../utils";
import PriceTipModal from "../PriceCard/PriceTipModal";

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
        width: 250px;
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

        @media screen and (max-width: 1440px) {
          h3 {
            font-size: 1rem;
            line-height: 1.2;
          }
        }

        @media screen and (max-width: 1366px) {
          top: 35%;
        }

        @media screen and (max-width: 1280px) {
          width: 55%;
        }

        @media screen and (max-width: 1024px) {
          width: 70%;
        }

        @media screen and (max-width: 480px) {
          width: 90%;
          top: 30%;

          h3 {
            font-size: 0.9rem;
          }
        }

        @media screen and (max-width: 414px) {
          top: 30%;

          h3 {
            font-size: 0.8rem;
          }
        }

        @media screen and (max-width: 375px) {
          top: 28%;
          width: 95%;

          h3 {
            font-size: 0.75rem;
          }
        }
      }
    `}


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

const VideoCardOverlay = ({ video, pageName, componentName }) => {
  const imgPath = video ? getImgPath(video) : "";
  const [showPaymentModel, setShowPaymentModel] = useState(false);
  const [action, setAction] = useState();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const unlockPayPerView = () => {
    togglePaymentModel(true);
    setAction("ppv_unlock");
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
      
      {video?.VideoAccessOverlay?.keyVideoAccess === 3 && (
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
          src={".." + imgPath}
          alt=""
          onClick={() =>
            !user || !user.id
              ? redirectToSingUpPage()
              : redirectToWatchVideo(video.id)
          }
        />
      ) : pageName === "watch-video" &&
        video &&
        video.VideoAccessOverlay &&
        !video.isVideoLocked ? null :  (
          <>
        <div
          className="overlay"
          onClick={() =>
            !user || !user.id
              ? redirectToSingUpPage()
              : redirectToWatchVideo(video.id)
          }
        /> 
        </>
        
      )}
      {video && video.VideoAccessOverlay && video.isVideoLocked && (
        <>
          {video?.VideoAccessOverlay?.keyVideoAccess === 2 && (
            <>
              {pageName === "watch-video" && (
                <div className="overlay-text">
                  <h3>This video requires a one-time <em>Karma Contribution</em> to view.</h3>
                </div>
              )}
              <Button
                className="floating-button"
                onClick={($event) => {
                  unlockPayPerView();
                }}
              >
                Pay Per View
                <span>
                  {video?.amount ? ` ($${(+video.amount).toFixed(2)}) ` : ""}
                </span>
              </Button>
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
                      You must be a Co-op Member to view this content. Relax, it's only $5 a year... That's a cup of coffee!
                    </h3>
                  </div>

                  <Button
                    className="floating-button"
                    onClick={($event) => {
                      upgradeMemberShip();
                    }}
                  >
                    Upgrade Membership
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
      {pageName !== "watch-video" && pageName !== "meeting" && (
        <img className="thumb pointer" src={video.thumbnail} alt="thumbnail" />
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
