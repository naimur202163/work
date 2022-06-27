import React, { useContext, useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Comments from "../components/Comments";
import VideoCardMoreFrom from "../components/VideoCardMoreFrom";
import Button from "../styles/Button";
import Player from "../components/Player";
import NoResults from "../components/NoResults";
import { useModal } from "../components/Modal";
import Skeleton from "../skeletons/WatchVideoSkeleton";
import { LikeIcon, DislikeIcon } from "../components/Icons";
import VideoGridTrending from "../styles/VideoGridTrending";
import VideoCardTrending from "../components/VideoCardTrending";
import Moment from "react-moment";
import VideoReportModel from "../components/VideoReportModel";
import { toast } from "react-toastify";
import PlaylistIcon from "../components/icons/PlaylistIcon";

import {
  getRecommendations,
  clearVideo,
  getVideo,
  unsubscribeChannel,
  subscribeChannel,
  likeVideo,
  dislikeVideo,
  cancelLike,
  cancelDislike,
  clearNotFound,
  moreFromUser,
  getVideosByCategory,
  getUserById,
  getFlagTypesAction,
} from "../actions";
import { SUBSCRIBE_FROM_VIDEO, UNSUBSCRIBE_FROM_VIDEO } from "../actions/types";
import { useSelector, useDispatch } from "react-redux";
import PriceTipModal from "../components/PriceCard/PriceTipModal";
import VideoCardOverlayWithButton from "../components/VideoCardOverlay/VideoCardOverlayWithButton";
import ContactBanner from "../components/Footer/ContactBanner";
import Footer from "../components/Footer/Footer";
import { ScrollToTop } from "../utils/index";
import { GlobalContext } from "../context/GlobalContext";
import OptionMenu from "./OptionMenu";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 70% 1fr;
  grid-gap: 2rem;
  padding: 1.3rem 0;
  width: 95%;
  margin: 0 auto;
  margin-bottom: 3rem;

  .video-container .video-info {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .overlay-container {
    position: relative;
  }

  .video-overlays {
    position: absolute;
    width: -webkit-fill-available;
    z-index: 1;
  }
  .overlay-button {
    z-index: 23;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .tip-menu-container {
    position: absolute;
    top: 6%;
    left: 2%;
    z-index: 12;
    border: 1px solid red;
    padding: 5px;
    min-width: 234px;
    min-height: 300px;
    max-height: 300px;
  }
  .toast-one {
    top: 2rem !important;
    left: 2rem !important;
  }

  .video-info span {
    color: ${(props) => props.theme.secondaryColor};
  }

  .channel-info-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .channel-info-meta {
    margin-left: 0.5rem;
  }

  .video-info-stats {
    display: flex;
    align-items: center;

    .videoReportIcon {
      height: 2.2rem;
      width: 2.2rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      &__icon {
        height: 1.2rem;
        width: 1.2rem;
        cursor: pointer;
      }
    }

    .saveVideo {
      display: flex;
      align-items: center;
      cursor: pointer;

      h5 {
        font-size: 0.9rem;
        color: #888;
        margin-left: 0.2rem;
      }
    }
  }

  .video-info-stats div {
    margin-left: 6rem;
    position: relative;
    top: -2px;
  }

  .channel-info-flex button {
    font-size: 0.9rem;
  }

  .channel-info {
    .avatar2 {
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      margin-right: 0.5rem;

      .avatar-image2 {
        height: 2.5rem;
        width: auto;
      }

      .png-img2 {
        height: 4rem;
        width: auto;
      }

      .custom-image2 {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
      }
    }
  }

  .channel-info-description {
    padding-top: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.darkGrey};
    border-top: 1px solid ${(props) => props.theme.darkGrey};
  }

  .channel-info-description p {
    font-size: 0.9rem;
    padding: 1rem 0;
  }

  .related-videos {
    .sidebar-title {
      margin-bottom: 1rem;

      .gradient {
        font-size: 1.2rem;
        margin-left: 0.5rem;
        text-transform: capitalize;
        background: -webkit-linear-gradient(#ff4883, #fdb769);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 500;
        letter-spacing: 0.02rem;
        text-shadow: 2px 2px 10px rgba(255, 255, 255, 0.3);
        cursor: pointer;
      }
    }

    .banner-section {
      width: 100%;
      padding: 1rem;
      background-color: #222;
      border-radius: 0.5rem;
      margin-bottom: 1.5rem;

      .banner {
        width: 100%;
        height: 5rem;
        background-size: cover;
        background-position: center;
        object-fit: cover;
        border-radius: 0.5rem;
      }

      .avatar {
        height: 4.5rem;
        width: 4.5rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        margin-right: 0.5rem;

        .avatar-image {
          height: 4.5rem;
          width: auto;
        }

        .png-img {
          height: 5rem;
          width: auto;
        }

        .custom-image {
          height: 100%;
          width: 100%;
          object-fit: cover;
          border-radius: 50%;
          background-size: cover;
          background-position: center;
        }
      }

      .avatar-box {
        margin-top: -2.5rem;
        margin-left: 0.5rem;
        display: flex;
        align-items: center;
        margin-bottom: 0;

        h1 {
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          /* margin-top: .7rem; */

          &:hover {
            background: -webkit-linear-gradient(#ff4883, #fdb769);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 2px 2px 10px rgba(255, 255, 255, 0.3);
          }
        }
      }

      p {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.5);
      }

      .badgeAvatar {
        height: 4rem;
        width: 4rem;
        border-radius: 50%;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          height: 3.5rem;
          width: auto;
        }
      }
    }
  }

  .related-videos img {
    height: 200px;
  }

  .related-videos div {
    margin-bottom: 1rem;
  }

  .floating-button {
    position: absolute;
    left: 50%;
    top: 50%;
    padding-top: 15px;
    padding-bottom: 15px;
    transform: translate(-50%, -50%);
    z-index: 98;
  }

  svg {
    fill: ${(props) => props.theme.darkGrey};
  }

  ${(props) =>
    props.isVideoLocked === false &&
    css`
      .vjs-big-play-button {
        z-index: 22;
      }
      .vjs-control-bar {
        z-index: 22;
      }
    `}

  ${(props) =>
    props.filledLike &&
    css`
      .like svg {
        fill: ${(props) => props.theme.blue};
      }
    `}

  ${(props) =>
    props.filledDislike &&
    css`
      .dislike svg {
        fill: ${(props) => props.theme.blue};
      }
    `}

	@media screen and (max-width: 930px) {
    grid-template-columns: 90%;
    .related-videos {
      display: none;
    }
    .overlay-button {
      top: 60%;
    }
  }

  @media screen and (max-width: 930px) {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 425px) {
    .video-info-stats div {
      margin-left: 1rem;
    }
    .overlay-button {
      top: 80%;
    }
  }
`;

const VideoSuggestionBox = styled.div`
  padding: 1rem 2rem;
  border-top: 0.3px solid rgba(238, 238, 238, 0.3);
  margin-bottom: 5rem;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const WatchVideo = ({
  isFetching,
  clearVideo,
  getVideo,
  getRecommendations,
  subscribeChannel,
  unsubscribeChannel,
  likeVideo,
  cancelLike,
  dislikeVideo,
  cancelDislike,
  notfound,
  clearNotFound,
  getFlagTypesAction,
}) => {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const { toggle } = useModal();
  const [showModal, setShowModal] = useState(false);
  const [showModalNew, setShowModalNew] = useState(false);
  const [fixedTipPrice, setFixedTipPrice] = useState(null);
  // const closeModal = () => setShowModal(false);
  const [resume, setResume] = useState(false);
  const [setShowReplayResume] = useState(0); //0 for none, 1 for resume, -1 for replay
  const [isKarmaModalOpen, setKarmaModalOpen] = useState(false);
  const moreVideos = useSelector((state) => state.moreVideos);
  const categoryVideos = useSelector((state) => state.categoryVideos);
  const video = useSelector((state) => state.video);
  const userById = useSelector((state) => state.userById);
  const user = useSelector((state) => state.user);
  const {
    setShowTipPopups,
    showVideoReportModel,
    setShowVideoReportModel,
    setPauseVideoForReport,
    setShowPlaylistModel,
    setPlaylistModelType,
    setSelectedVideoId,
    setShowMyPortal,
    setPortalUsername,
  } = useContext(GlobalContext);

  const w = window.innerWidth || document.documentElement.clientWidth;
  const TOAST = {
    TIP_ONE: "1.50",
    TIP_THREE: "3.25",
    TIP_FIVE: "5.00",
    TIP_CUSTOM: "custom",
    NO_TIP: "no-tip",
  };
  const tempFunction = useRef();
  const imgFunction = () => {
    getFlagTypesAction();
  };
  tempFunction.current = imgFunction;

  // fetch all the flag types for the report form
  useEffect(() => {
    tempFunction.current();
  }, []);

  const tempFun = useRef();
  const imgFun = () => {
    if (video?.categoryId) {
      dispatch(getVideosByCategory(video?.categoryId));
    }

    if (video && video.userId) {
      dispatch(moreFromUser(video.userId));
      dispatch(getUserById(video.userId));
    }
    return () => {
      toast.dismiss();
    };
  };
  tempFun.current = imgFun;
  useEffect(() => {
    tempFun.current();
  }, [video]);

  const handleLike = () => {
    if (video.isLiked) {
      cancelLike(videoId);
    } else {
      likeVideo(video);

      if (video.isDisliked) {
        cancelDislike(videoId);
      }
    }
  };

  const handleDislike = () => {
    if (video.isDisliked) {
      cancelDislike(videoId);
    } else {
      dislikeVideo(videoId);

      if (video.isLiked) {
        cancelLike(videoId);
      }
    }
  };
  useEffect(() => {
    getVideo(videoId);
    getRecommendations();

    return () => {
      clearNotFound();
      clearVideo();
    };
  }, [videoId, clearVideo, getRecommendations, getVideo, clearNotFound]);

  if (notfound) {
    return (
      <NoResults
        title="Page not found"
        text="The page you are looking for is not found or it may have been removed"
      />
    );
  }

  if (isFetching) {
    return <Skeleton />;
  }

  const filteredMoreVideos = () => {
    if (moreVideos && moreVideos.length > 0 && video && video.id) {
      const filtered = moreVideos.filter((item) => item.id !== video.id);
      return filtered;
    }
  };

  const filteredCategoryVideos = () => {
    if (
      categoryVideos &&
      categoryVideos.videos &&
      categoryVideos.videos.length > 0 &&
      video &&
      video.id
    ) {
      const filtered = categoryVideos.videos.filter(
        (item) => item.id !== video.id
      );
      return filtered;
    }
  };

  const filteredMore = filteredMoreVideos();
  const filteredCategory = filteredCategoryVideos();

  const isPngOrJpg = (url) => {
    const image = url;

    if (image && (image.includes(".png") || image.includes(".svg"))) {
      return (
        <img
          className={`${image.includes(".png") ? "png-img" : "avatar-image"}`}
          src={image}
          alt="badge"
        />
      );
    } else {
      return <img className="custom-image" src={image} alt="badge" />;
    }
  };

  const printImg = (url) => {
    const image = url;

    if (image && (image.includes(".png") || image.includes(".svg"))) {
      return (
        <img
          className={`${image.includes(".png") ? "png-img2" : "avatar-image2"}`}
          src={image}
          alt="badge"
        />
      );
    } else {
      return <img className="custom-image2" src={image} alt="badge" />;
    }
  };

  const handleCallbackGiveKarmaModal = (index, isVideoEnded) => {
    if (user && userById && user.id === userById.id) {
      return;
    }

    if (!isKarmaModalOpen) {
      toggle(index);
      setResume(false);
      setShowReplayResume(index === true ? (isVideoEnded ? -1 : 1) : 0);
      notify();
      return;
    } else {
      setKarmaModalOpen(false);
      toast.dismiss();
      setShowTipPopups(false);
      return;
    }
  };

  const giveKarma = () => {
    if (!isKarmaModalOpen) {
      notify();
    } else {
      setKarmaModalOpen(false);
      toast.dismiss();
      setShowTipPopups(true);
    }
  };

  const openForm = (type) => {
    switch (type) {
      case "custom":
        setShowModal(true);
        toast.dismiss();
        setKarmaModalOpen(false);
        // closeTippingPopups();
        break;
      case "no-tip":
        toast.dismiss();
        setKarmaModalOpen(false);
        // closeTippingPopups();

        break;
      case 5:
        setShowModalNew(true);
        setFixedTipPrice(5);
        toast.dismiss();
        setKarmaModalOpen(false);
        // closeTippingPopups();
        break;
      case 3.25:
        setShowModalNew(true);
        setFixedTipPrice(3.25);
        toast.dismiss();
        setKarmaModalOpen(false);
        // closeTippingPopups();
        break;
      case 1.5:
        setShowModalNew(true);
        setFixedTipPrice(1.5);
        toast.dismiss();
        setKarmaModalOpen(false);
        // closeTippingPopups();
        break;
      default:
        toast.dismiss();
        setShowTipPopups(false);
    }
  };

  const notify = async () => {
    if (!isKarmaModalOpen) {
      setKarmaModalOpen(true);
      setShowTipPopups(true);
    }
    let toastItemStyle = {};
    let toastItemStylesMobile = {
      minHeight: "30px",
      width: "185px",
      marginBottom: "3px",
      padding: "3px",
      fontSize: "small",
    };
    let toastItemStylesDesktop = {
      minHeight: "54px",
    };

    let tipAfter2ToastStyleMobile;

    if (w < 600) {
      if (video.keyVideoAccess === 3) {
        // if video is TipAfterTwo
        tipAfter2ToastStyleMobile = {
          minHeight: "30px",
          width: "160px",
          fontSize: "small",
          marginBottom: "3px",
          position: "absolute",
          right: "10px",
          top: "81px",
        };
      }
      toastItemStyle = toastItemStylesMobile;
    } else {
      toastItemStyle = toastItemStylesDesktop;
    }
    let twoMin = await localStorage.getItem("TwoMinReached");

    if (video.isTATVideoLocked && twoMin) {
      toast.error(
        "This video requires Karma to continue viewing! Please tip your Content Creator any amount to resume playback.",
        {
          toastId: "someId",
          position: "top-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: w < 600 ? tipAfter2ToastStyleMobile : toastItemStyle,
        }
      );
    }

    toast.success("💰 $1.50 Karma", {
      toastId: TOAST.TIP_ONE,
      position: "top-left",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: toastItemStyle,
      onClick: () => {
        openForm(1.5);
      },
    });

    toast.success("💰💰 $3.25 Karma", {
      toastId: TOAST.TIP_THREE,
      position: "top-left",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: toastItemStyle,
      delay: 200,

      onClick: () => {
        openForm(3.25);
      },
    });

    toast.success("💰💰💰 $5.00 Karma", {
      toastId: TOAST.TIP_FIVE,
      position: "top-left",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: toastItemStyle,
      delay: 400,
      onClick: () => {
        openForm(5);
      },
    });

    toast.info("💰 CUSTOM TIP 💰", {
      toastId: TOAST.TIP_CUSTOM,
      position: "top-left",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: toastItemStyle,
      delay: 600,
      onClick: () => {
        openForm("custom");
      },
    });

    toast.dark("💔🗑 NO TIP / CLOSE 🗑💔", {
      toastId: TOAST.NO_TIP,
      position: "top-left",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: toastItemStyle,
      delay: 800,
      onClick: () => {
        openForm("no-tip");
      },
    });

    //   //set time out - close tipping popup after 10 sec
    //   setTimeout(() => {
    //     toast.dismiss();
    //     setKarmaModalOpen(false);
    //     closeTippingPopups();
    //   }, 10000);
    // };

    // const closeAfterTenSec = (isOpen) => {
    //   if (isOpen) {
    //   }
    // };

    // const closeTippingPopups = () => {
    //   setTimeout(() => {
    //     setShowTipPopups(false);
    //   }, 1000);
  };

  const hideKarmaModel = () => {
    toast.dismiss();
    setKarmaModalOpen(false);
    localStorage.removeItem("TwoMinReached");
  };
  const videoBadge = video.userSettings.VisitorBadge.imgPath;

  return (
    <>
      <ScrollToTop />
      <Wrapper
        filledLike={video && video.isLiked}
        filledDislike={video && video.isDisliked}
        isVideoLocked={video && video.isVideoLocked}
      >
        <div className="video-container">
          <div className="video">
            {!isFetching && (
              <div className="overlay-container">
                <VideoCardOverlayWithButton
                  componentName={"WatchVideo"}
                  video={video}
                  pageName={"watch-video"}
                ></VideoCardOverlayWithButton>
                <Player
                  resumeCallback={resume}
                  hideKarmaModel={hideKarmaModel}
                  setGiveKarmaParentCallback={handleCallbackGiveKarmaModal}
                />
              </div>
            )}
          </div>

          <div className="video-info">
            <div style={{ float: "right", padding: "10px" }}>
              <OptionMenu />
            </div>
            <h3>{video.title}</h3>

            <div className="video-info-stats">
              <p>
                <span>
                  <Moment fromNow>{video.createdAt}</Moment>
                </span>
              </p>
              {user && userById && user.id !== userById.id && (
                <div className="likes-dislikes flex-row">
                  <p className="flex-row like">
                    <LikeIcon onClick={handleLike} />{" "}
                  </p>
                  <p
                    className="flex-row dislike"
                    style={{ marginLeft: "1rem" }}
                  >
                    <DislikeIcon onClick={handleDislike} />{" "}
                  </p>
                </div>
              )}

              <div
                onClick={() => {
                  setShowVideoReportModel(true);
                  setPauseVideoForReport(true);
                }}
                className="videoReportIcon"
              >
                <img
                  className="videoReportIcon__icon"
                  src="/assets/icons/flag.svg"
                  alt="Flat"
                />
              </div>

              <div
                onClick={() => {
                  setSelectedVideoId(video.id);
                  setPlaylistModelType("save");
                  setShowPlaylistModel(true);
                }}
                className="saveVideo"
              >
                <PlaylistIcon fill={"#888"} height={25} width={25} />
                <h5>Save</h5>
              </div>

              {user && userById && user.id !== userById.id && (
                <div>
                  <Button onClick={giveKarma}>Give Karma</Button>
                </div>
              )}
            </div>
          </div>

          <div className="channel-info-description">
            <div className="channel-info-flex">
              <div className="channel-info flex-row">
                <div className="avatar2">
                  {printImg(!userById.avatar ? videoBadge : userById.avatar)}
                </div>

                <div className="channel-info-meta">
                  <h4>
                    <Link to={`/channel/${video.User?.username}`}>
                      {video.User?.username}
                    </Link>
                  </h4>
                </div>
              </div>
              {!video.isVideoMine && !video.isSubscribed && (
                <Button
                  onClick={() =>
                    subscribeChannel({
                      channel: {
                        id: video.User.id,
                        avatar: video.User.avatar,
                        username: video.User.username,
                        visitorBadge: {
                          imgPath: videoBadge,
                        },
                      },
                      type: SUBSCRIBE_FROM_VIDEO,
                    })
                  }
                >
                  Add to Streams
                </Button>
              )}
              {!video.isVideoMine && video.isSubscribed && (
                <Button
                  grey
                  onClick={() =>
                    unsubscribeChannel({
                      type: UNSUBSCRIBE_FROM_VIDEO,
                      channelId: video.userId,
                    })
                  }
                >
                  Remove Stream
                </Button>
              )}
            </div>

            <p>{video.description}</p>
          </div>
          <Comments videoId={videoId} />
        </div>

        <div className="related-videos">
          {!moreVideos.length ? null : (
            <>
              {userById.id && (
                <div className="banner-section">
                  <img className="banner" alt="banner" src={userById.cover} />
                  <div className="avatar-box">
                    <div className="avatar">
                      {isPngOrJpg(
                        !userById.avatar ? videoBadge : userById.avatar
                      )}
                    </div>

                    <Link to={`/channel/${userById.id}`}>
                      <h1>{userById.username}</h1>
                    </Link>
                  </div>

                  {userById.userrole === 2 ? <p>{userById.tagline}</p> : null}
                </div>
              )}

              <h3 className="sidebar-title">
                More From
                <span
                  onClick={() => {
                    setPortalUsername(userById.username);
                    setShowMyPortal(true);
                  }}
                  className="gradient"
                >
                  {userById.username}
                </span>
              </h3>

              {filteredMore &&
                filteredMore.length > 0 &&
                filteredMore
                  .splice(0, 3)
                  .map((vid) => (
                    <VideoCardMoreFrom
                      key={vid.id}
                      hideavatar={true}
                      video={vid}
                    />
                  ))}
            </>
          )}
        </div>
        {showModalNew && (
          <PriceTipModal
            closeModalNew={() => setShowModalNew(false)}
            price={
              fixedTipPrice
                ? parseFloat(fixedTipPrice).toFixed(2)
                : fixedTipPrice
            }
            toggle={toggle}
            video={video}
            action={"tip"}
          />
        )}

        {showModal && (
          <PriceTipModal
            closeModalNew={() => setShowModal(false)}
            price={
              fixedTipPrice
                ? parseFloat(fixedTipPrice).toFixed(2)
                : fixedTipPrice
            }
            toggle={toggle}
            video={video}
            customTip={true}
            action={"custom tip"}
          />
        )}
      </Wrapper>

      {filteredCategory && filteredCategory.length > 0 && (
        <VideoSuggestionBox>
          <h3>You may also like</h3>

          <VideoGridTrending>
            {!categoryVideos.isFetching &&
              filteredCategory
                .slice(0, 4)
                .map((video) => (
                  <VideoCardTrending key={video.id} video={video} />
                ))}
          </VideoGridTrending>
        </VideoSuggestionBox>
      )}

      {/* rendering footer */}
      <ContactBanner />
      <Footer />

      {/* render video report model */}
      {showVideoReportModel && (
        <VideoReportModel
          closeHandler={() => setShowVideoReportModel(false)}
          open={showVideoReportModel}
          video={video}
          uploaderUser={userById}
          user={user}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ notfound, video, recommendation, user }) => ({
  isFetching: video.isFetching || recommendation.isFetching,
  video,
  next: recommendation.videos,
  notfound,
  user,
});

export default connect(mapStateToProps, {
  clearVideo,
  getVideo,
  getRecommendations,
  subscribeChannel,
  unsubscribeChannel,
  likeVideo,
  dislikeVideo,
  cancelLike,
  cancelDislike,
  clearNotFound,
  getFlagTypesAction,
})(WatchVideo);
