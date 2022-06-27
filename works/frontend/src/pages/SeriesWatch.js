import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Moment from "react-moment";
// import PlaylistIcon from "../components/icons/PlaylistIcon";
import Button from "../styles/Button";
// import StartSeriesCard from "../components/SeriesComponents/StartSeriesCard";
import ContactBanner from "../components/Footer/ContactBanner";
import Footer from "../components/Footer/Footer";
import Skeleton from "../skeletons/SeriesSkeleton";
import VideoReportModel from "../components/VideoReportModel";
import ReactPlayer from "react-player";
import api from "../services/api";
import { Row, Col } from "react-grid-system";
import { LikeIcon, DislikeIcon } from "../components/Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleSeries,
  subscribeChannel,
  unsubscribeChannel,
  likeVideo,
  cancelLike,
  dislikeVideo,
  cancelDislike,
  getUserById,
  getFlagTypesAction,
  updateSeriesProgress,
} from "../actions";
import { SUBSCRIBE_FROM_VIDEO, UNSUBSCRIBE_FROM_VIDEO } from "../actions/types";
import { useParams, Link, useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import "video.js/dist/video-js.css";
import { toast } from "react-toastify";

const CourseWatch = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const seriesId = params.seriesId;
  const videoId = params.videoId;
  const {
    info: seriesInfo,
    videos: seriesVideos,
    loading: getSeriesVideosLoading,
    // error: getSeriesError,
  } = useSelector((state) => state.singleSeries);
  const userById = useSelector((state) => state.userById);
  const user = useSelector((state) => state.user);

  const [playingVideo, setPlayingVideo] = useState(null);
  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDislike, setToggleDislike] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(""); // SUBSCRIBED, UNSUBSCRIBED, ISMINE
  const [isPurchased, setIsPurchased] = useState();

  const { showVideoReportModel, setShowVideoReportModel } =
    useContext(GlobalContext);

  useEffect(() => {
    dispatch(getSingleSeries(seriesId));
  }, [dispatch, seriesId]);

  useEffect(() => {
    if (seriesInfo?.userId === user.id) {
      setIsPurchased(true);
    }
  }, [seriesInfo, user.id]);

  useEffect(() => {
    if (seriesVideos && seriesVideos.length > 0) {
      const videoToPlay = seriesVideos.find(
        (item) => item.singleDetailedVideo.id === videoId
      );

      setPlayingVideo(videoToPlay.singleDetailedVideo);
    }
  }, [seriesVideos, videoId]);

  useEffect(() => {
    if (playingVideo) {
      setToggleDislike(playingVideo?.isDisliked);
      setToggleLike(playingVideo?.isLiked);

      if (!playingVideo.isVideoMine && playingVideo.isSubscribed) {
        setIsSubscribed("SUBSCRIBED");
      } else if (!playingVideo.isVideoMine && !playingVideo.isSubscribed) {
        setIsSubscribed("UNSUBSCRIBED");
      } else if (playingVideo.isVideoMine) {
        setIsSubscribed("ISMINE");
      }
    }
  }, [playingVideo]);

  useEffect(() => {
    if (playingVideo && playingVideo.userId) {
      dispatch(getUserById(playingVideo.userId));
    }
  }, [dispatch, playingVideo]);
  useEffect(() => {
    dispatch(getFlagTypesAction());

    const isSeriesPurchased = async () => {
      const res = await api.get(`series/purchasedSeries/${seriesId}`);
      if (res.data.status === true) {
        setIsPurchased(true);
      } else {
        setIsPurchased(false);
      }
    };

    isSeriesPurchased();
  }, [dispatch, seriesId]);

  useEffect(() => {
    if (isPurchased === false) {
      history.push(`/series/details/${seriesId}`);
    }
  }, [history, isPurchased, seriesId]);

  if (getSeriesVideosLoading) {
    return <Skeleton />;
  }

  const videoBadge = playingVideo?.userSettings.VisitorBadge.imgPath;

  const handleLike = () => {
    if (playingVideo.isLiked) {
      dispatch(cancelLike(playingVideo.id));
    } else {
      dispatch(likeVideo(playingVideo));

      if (playingVideo.isDisliked) {
        dispatch(cancelDislike(playingVideo.id));
      }
    }
  };

  const handleDislike = () => {
    if (playingVideo.isDisliked) {
      dispatch(cancelDislike(playingVideo.id));
    } else {
      dispatch(dislikeVideo(playingVideo.id));

      if (playingVideo.isLiked) {
        dispatch(cancelLike(playingVideo.id));
      }
    }
  };

  const videoEndHandler = () => {
    const isLastVideo =
      seriesVideos[seriesVideos.length - 1].singleDetailedVideo.id ===
      playingVideo.id;

    if (!isLastVideo) {
      // set playing video to next one
      const indexOfCurrentVideo = seriesVideos.findIndex(
        (item) => item.singleDetailedVideo.id === playingVideo.id
      );
      const nextVideo = seriesVideos[indexOfCurrentVideo + 1];

      setPlayingVideo(nextVideo.singleDetailedVideo);
    }

    // update the progress bar
    dispatch(updateSeriesProgress(seriesId, playingVideo.id));

    if (isLastVideo) {
      return toast.success(`Congrats! You successfully completed the series.`);
    }
  };

  if (!isPurchased) {
    return (
      <NotPurchased>
        <h1>You haven't Purchased This Series.</h1>
        <Button
          onClick={() => history.push(`/series/details/${seriesId}`)}
          className="purchaseBtn"
        >
          Purchase Series
        </Button>
      </NotPurchased>
    );
  }

  if (
    !getSeriesVideosLoading &&
    playingVideo &&
    seriesVideos &&
    seriesVideos.length > 0 &&
    seriesInfo
  ) {
    return (
      <>
        <CourseWatchWrapper>
          <Row className="course">
            <Col className="colItem" md={12} lg={8}>
              <div className="course__videoWatch">
                <ReactPlayer
                  playing={true}
                  url={playingVideo.url}
                  width="100%"
                  height="100%"
                  controls={true}
                  className="VideoPlayer"
                  onEnded={videoEndHandler}
                />

                <div className="course__videoWatch--videoInfo">
                  <h3 className="course__videoWatch--videoInfo-title">
                    {playingVideo.title}
                  </h3>

                  <div className="course__videoWatch--videoInfo-stats">
                    <span className="date">
                      <Moment fromNow>{playingVideo.createdAt}</Moment>
                    </span>

                    <div className="likedislike">
                      <p className={`like ${toggleLike && "liked"}`}>
                        <LikeIcon
                          onClick={() => {
                            if (toggleDislike) {
                              setToggleLike(true);
                              setToggleDislike(false);
                            } else {
                              setToggleLike(!toggleLike);
                            }

                            handleLike();
                          }}
                        />
                      </p>
                      <p
                        className={`dislike ${toggleDislike && "disliked"}`}
                        style={{ marginLeft: "1rem" }}
                      >
                        <DislikeIcon
                          onClick={() => {
                            if (toggleLike) {
                              setToggleDislike(true);
                              setToggleLike(false);
                            } else {
                              setToggleDislike(!toggleDislike);
                            }
                            handleDislike();
                          }}
                        />
                      </p>
                    </div>

                    <div className="videoReportIcon">
                      <img
                        onClick={() => {
                          setShowVideoReportModel(true);
                          // setPauseVideoForReport(true);
                        }}
                        className="videoReportIcon__icon"
                        src="/assets/icons/flag.svg"
                        alt="Flat"
                      />
                    </div>

                    <Button>Give Karma</Button>
                  </div>
                </div>

                <div className="course__videoWatch--channelInfo">
                  <Link to={`/channel/${playingVideo?.User.username}`}>
                    <div className="course__videoWatch--channelInfo-authorBox">
                      <img
                        className="uploadedImg"
                        src={seriesInfo?.userInfo.avatar}
                        // alt={seriesInfo?.userInfo.username}
                        alt=""
                      />
                      <p className="name">{seriesInfo?.userInfo.username}</p>
                    </div>
                  </Link>

                  {isSubscribed !== "ISMINE" &&
                    isSubscribed === "UNSUBSCRIBED" && (
                      <Button
                        grey
                        className={`${
                          isSubscribed === "UNSUBSCRIBED" &&
                          "subscribeButtonActive"
                        }`}
                        onClick={() => {
                          setIsSubscribed("SUBSCRIBED");
                          dispatch(
                            subscribeChannel({
                              channel: {
                                id: playingVideo.User.id,
                                avatar: playingVideo.User.avatar,
                                username: playingVideo.User.username,
                                visitorBadge: {
                                  imgPath: videoBadge,
                                },
                              },
                              type: SUBSCRIBE_FROM_VIDEO,
                            })
                          );
                        }}
                      >
                        Add to Streams
                      </Button>
                    )}
                  {isSubscribed !== "ISMINE" && isSubscribed === "SUBSCRIBED" && (
                    <Button
                      grey
                      onClick={() => {
                        setIsSubscribed("UNSUBSCRIBED");
                        dispatch(
                          unsubscribeChannel({
                            type: UNSUBSCRIBE_FROM_VIDEO,
                            channelId: playingVideo.User.id,
                          })
                        );
                      }}
                    >
                      Remove Stream
                    </Button>
                  )}
                </div>

                {seriesInfo?.description && (
                  <div className="course__videoWatch--videoDesc">
                    <p>
                      {seriesInfo.description}
                      {/* <span onClick={showMoreDescHandler} className="showMore">
                      Show More
                    </span> */}
                    </p>
                  </div>
                )}
              </div>
            </Col>

            <Col className="colItem" md={12} lg={4}>
              <div className="course__videosList">
                {seriesVideos.map((item, i) => {
                  let formatedMinuteSeconds;

                  if (
                    item.singleDetailedVideo.videoLength &&
                    item.singleDetailedVideo.videoLength !== "NaN"
                  ) {
                    formatedMinuteSeconds = new Date(
                      item.singleDetailedVideo.videoLength * 1000
                    )
                      .toISOString()
                      .substr(11, 8);
                  } else {
                    formatedMinuteSeconds = null;
                  }

                  return (
                    <Link
                      to={`/series/watch/${seriesId}/${item.singleDetailedVideo.id}`}
                      onClick={() => setPlayingVideo(item.singleDetailedVideo)}
                    >
                      <div key={i} className={`course__videosList--item`}>
                        <img
                          src={item.singleDetailedVideo.thumbnail}
                          alt={item.singleDetailedVideo.title}
                          className="thumbnail"
                        />

                        <div className="metaInfo">
                          <h3 className="metaInfo__title">
                            {item.singleDetailedVideo.title.length > 60
                              ? item.singleDetailedVideo.title.substring(
                                  0,
                                  60
                                ) + "..."
                              : item.singleDetailedVideo.title}
                          </h3>

                          {formatedMinuteSeconds ? (
                            <span className="metaInfo__duration">
                              Duration: {formatedMinuteSeconds} HH:MM:SS
                            </span>
                          ) : null}
                        </div>

                        {playingVideo.id === item.singleDetailedVideo.id && (
                          <div className="watching">Watching</div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* <div className="course__courseList">
                <h3 className="course__courseList--title">
                  Learn other series
                </h3>
                <div className="course__courseList--list">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div className="course__courseList--item">
                      <StartSeriesCard key={item} />
                    </div>
                  ))}
                </div>
              </div> */}
            </Col>
          </Row>
        </CourseWatchWrapper>

        {/* rendering footer */}
        <ContactBanner />
        <Footer />

        {/* render video report model */}
        {showVideoReportModel && (
          <VideoReportModel
            closeHandler={() => setShowVideoReportModel(false)}
            open={showVideoReportModel}
            video={playingVideo}
            uploaderUser={userById}
            user={user}
          />
        )}
      </>
    );
  }

  return null;
};

export default CourseWatch;

const CourseWatchWrapper = styled.div`
  padding: 2rem 0;
  width: 92%;
  margin: 0 auto;

  .colItem {
    padding-left: 10px !important;
    padding-right: 10px !important;
  }

  .subscribeButtonActive {
    background: ${(props) => props.theme.gradient} !important;
    color: ${(props) => props.theme.white} !important;
  }

  .course {
    margin-bottom: 3rem;

    &__videoWatch {
      margin-bottom: 1rem;

      &--videoInfo {
        &-title {
          font-size: 1.2rem;
          color: #fff;
          line-height: 1.4;
          margin-top: 0.5rem;
        }

        &-stats {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 1rem;

          svg {
            fill: ${(props) => props.theme.darkGrey};
          }

          .likedislike {
            display: flex;
            align-items: center;

            .liked {
              svg {
                fill: ${(props) => props.theme.blue} !important;
              }
            }

            .disliked {
              svg {
                fill: ${(props) => props.theme.blue} !important;
              }
            }
          }

          .date {
            color: ${(props) => props.theme.secondaryColor};
            font-size: 0.9rem;
            font-weight: 300;
          }

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
      }

      /* channel info */
      &--channelInfo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2rem;

        &-authorBox {
          display: flex;
          align-items: center;

          .uploadedImg {
            height: 3rem;
            width: 3rem;
            border-radius: 50%;
            background-size: cover;
            background-position: center;
            object-fit: cover;
            margin-right: 1rem;
          }

          .name {
            font-weight: 500;
            font-size: 0.95rem;
          }
        }
      }

      /* video desc */
      &--videoDesc {
        font-size: 0.9rem;
        font-weight: 300;
        line-height: 1.6;
        color: #fff;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        margin-bottom: 2rem;

        .showMore {
          padding-left: 0.25rem;
          background: ${(props) => props.theme.gradient};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold;
          cursor: pointer;
        }
      }
    }

    &__videosList {
      width: 100%;
      padding: 1rem;
      background-color: #222;
      border-radius: 0.5rem;
      margin-bottom: 3rem;
      max-height: 25rem;
      height: 25rem;
      overflow: auto;

      &--item {
        width: 100%;
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;

        .watching {
          position: absolute;
          top: 0.2rem;
          left: 0.2rem;
          z-index: 3;
          background: ${(props) => props.theme.gradient};
          color: #fff;
          font-family: "Noto Sans Display", sans-serif;
          font-size: 0.7rem;
          font-weight: 400;
          padding: 0 0.4rem;
          border-radius: 5px;
        }

        .thumbnail {
          height: auto;
          width: 6.5rem;
          margin-right: 1rem;
          background-size: cover;
          background-position: center;
          object-fit: cover;
          border-radius: 5px;
          margin-bottom: 1rem;
        }

        .metaInfo {
          &__title {
            font-size: 0.9rem;
            line-height: 1.3;
            margin-bottom: 0.5rem;
            font-weight: 300;
          }

          &__duration {
            font-size: 0.7rem;
            color: ${(props) => props.theme.secondaryColor};
            font-weight: 200;
          }
        }
      }

      /* scrollbar */
      /* width */
      ::-webkit-scrollbar {
        width: 8px;
        border-radius: 10rem;
      }

      /* Track */
      ::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.7);
        border-radius: 10px;
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: #333;
        border-radius: 10rem;
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: rgb(246, 92, 139);
        cursor: pointer;
      }
    }

    &__courseList {
      &--title {
        font-size: 1.5rem;
        font-weight: 500;
        margin-bottom: 1rem;
        line-height: 1;
      }

      &--item {
        margin-bottom: 2rem;
        padding: 7px;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
    }
  }
`;

const NotPurchased = styled.div`
  padding: 2rem 0;
  width: 92%;
  margin: 0 auto;

  h1 {
    margin-bottom: 1rem;
  }
`;
