import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Button from "../styles/Button";
import ReactModel from "react-modal-video";
import ContactBanner from "../components/Footer/ContactBanner";
import Footer from "../components/Footer/Footer";
import Skeleton from "../skeletons/SeriesSkeleton";
import PurchaseSeriesModel from "../components/SeriesComponents/PurchaseSeriesModel";
import api from "../services/api";
import LockIcon from "../components/icons/LockIcon.js";
import { Row, Col } from "react-grid-system";
import {
  getSingleSeries,
  savePPVUnlockInformation,
  createSeriesProgress,
} from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useParams, useHistory } from "react-router-dom";
// import { secondsToHms } from "../utils";

const SeriesDetails = () => {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const seriesId = params.seriesId;
  const {
    info: seriesInfo,
    videos: seriesVideos,
    loading: getSeriesVideosLoading,
    error: getSeriesError,
  } = useSelector((state) => state.singleSeries);
  const user = useSelector((state) => state.user);
  const [showIntroModel, setShowIntroModel] = useState(false);
  let value = 3.5;
  let show = true;
  const [showPurchaseSeriesModel, setShowPurchaseSeriesModel] = useState(null);
  const [isPurchased, setIsPurchased] = useState();

  useEffect(() => {
    dispatch(getSingleSeries(seriesId));

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
    if (seriesInfo?.userId === user.id) {
      setIsPurchased(true);
    }
  }, [seriesInfo, user.id]);

  useEffect(() => {
    if (getSeriesError) {
      toast.error(getSeriesError);
    }
  }, [getSeriesError]);

  const getForFreeHandler = () => {
    dispatch(createSeriesProgress(seriesId));

    dispatch(
      savePPVUnlockInformation({
        seriesId,
        userId: user.id,
      })
    );

    toast.success(`You purchased this series. Enjoy Watching`);

    history.push(
      `/series/watch/${seriesInfo.id}/${seriesVideos[0].singleDetailedVideo.id}`
    );
  };

  if (getSeriesVideosLoading) {
    return <Skeleton />;
  }

  return (
    <>
      <SeriesDetailsWrapper>
        <div className="hero">
          <img src={seriesInfo.thumbnail} alt="" className="hero__banner" />
          <div className="hero__overlay" />

          <Row
            style={{
              paddingLeft: "5px !important",
              paddingRight: "5px !important",
              minHeight: "18rem",
              maxHeight: "auto",
            }}
          >
            <Col lg={8} md={12}>
              <div className="hero__courseInfo">
                <h1 className="title">{seriesInfo.title}</h1>
                <div className="author">
                  <Link to={`/channel/${seriesInfo.userInfo.username}`}>
                    {seriesInfo.userInfo.firstname +
                      seriesInfo.userInfo.lastname}
                  </Link>
                </div>

                <div className="ratingBox">
                  {show ? (
                    <div className="rating">
                      <p className="rating__num">4.6</p>
                      <div className="rating__stars">
                        <i
                          className={
                            value >= 1
                              ? "fas fa-star"
                              : value >= 0.5
                              ? "fas fa-star-half-alt"
                              : "far fa-star"
                          }
                        />
                        <i
                          className={
                            value >= 2
                              ? "fas fa-star"
                              : value >= 1.5
                              ? "fas fa-star-half-alt"
                              : "far fa-star"
                          }
                        />
                        <i
                          className={
                            value >= 3
                              ? "fas fa-star"
                              : value >= 2.5
                              ? "fas fa-star-half-alt"
                              : "far fa-star"
                          }
                        />
                        <i
                          className={
                            value >= 4
                              ? "fas fa-star"
                              : value >= 3.5
                              ? "fas fa-star-half-alt"
                              : "far fa-star"
                          }
                        />
                        <i
                          className={
                            value >= 5
                              ? "fas fa-star"
                              : value >= 4.5
                              ? "fas fa-star-half-alt"
                              : "far fa-star"
                          }
                        />
                      </div>

                      <p className="rating__people">(458)</p>
                    </div>
                  ) : (
                    <span className="notRated">Not rated</span>
                  )}
                </div>

                {seriesInfo.price ? (
                  <p className="price">
                    ${parseFloat(seriesInfo.price).toFixed(2)}
                  </p>
                ) : (
                  <p className="price">FREE</p>
                )}

                {seriesInfo.description && (
                  <div className="excerpt">{seriesInfo.description}</div>
                )}

                {/* <div className="duration">Duration: {formatedTotalLength}</div> */}

                {isPurchased ? (
                  <Button
                    onClick={() => {
                      history.push(
                        `/series/watch/${seriesInfo.id}/${seriesVideos[0].singleDetailedVideo.id}`
                      );
                    }}
                    className="purchaseBtn"
                  >
                    Start Series
                  </Button>
                ) : seriesInfo.price ? (
                  <Button
                    onClick={() => setShowPurchaseSeriesModel(true)}
                    className="purchaseBtn"
                  >
                    Purchase Couse
                  </Button>
                ) : (
                  <Button onClick={getForFreeHandler} className="purchaseBtn">
                    Get For Free
                  </Button>
                )}
              </div>
            </Col>
            <Col lg={4} md={12}>
              <div className="hero__playBox">
                <div
                  onClick={() => setShowIntroModel(true)}
                  className="playBtn"
                >
                  <img src="/assets/icons/play.svg" alt="Play Video" />
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {seriesVideos && seriesVideos.length > 0 && (
          <div className="content">
            <h5 className="content__title">Tables of content</h5>
            <div className="content__videos">
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
                  <div
                    onClick={() => {
                      if (isPurchased) {
                        history.push(
                          `/series/watch/${seriesInfo.id}/${item.singleDetailedVideo.id}`
                        );
                      } else {
                        toast.error("You need to purchase series to access!");
                      }
                    }}
                    key={i}
                    className={`content__videos--item`}
                  >
                    {!isPurchased && <LockIcon className="lockIcon" />}

                    <img
                      src={item.singleDetailedVideo.thumbnail}
                      alt={item.singleDetailedVideo.title}
                      className="thumbnail"
                    />

                    <div className="metaInfo">
                      <h3 className="metaInfo__title">
                        {item.singleDetailedVideo.title.length > 100
                          ? item.singleDetailedVideo.title.substring(0, 100) +
                            "..."
                          : item.singleDetailedVideo.title}
                      </h3>

                      {formatedMinuteSeconds ? (
                        <span className="metaInfo__duration">
                          Duration: {formatedMinuteSeconds} HH:MM:SS
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </SeriesDetailsWrapper>

      {/* If you want to change the video need to update videoID */}
      <ReactModel
        channel={"custom"}
        url={seriesVideos[0].singleDetailedVideo.url}
        isOpen={showIntroModel}
        onClose={() => setShowIntroModel(false)}
      />

      {/* rendering purchase series model */}
      {showPurchaseSeriesModel && (
        <PurchaseSeriesModel
          closeModel={() => setShowPurchaseSeriesModel(false)}
          price={(+seriesInfo.price).toFixed(2)}
          seriesId={seriesInfo.id}
          creatorId={seriesInfo.userId}
          videos={seriesVideos}
        />
      )}

      {/* rendering footer */}
      <ContactBanner />
      <Footer />
    </>
  );
};

export default SeriesDetails;

const ripple = keyframes`
  0% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  75% {
    -webkit-transform: scale(1.75);
    transform: scale(1.75);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(2);
    transform: scale(2);
    opacity: 0;
  }
`;

const SeriesDetailsWrapper = styled.div`
  .hero {
    position: relative;
    padding: 2rem 4rem;
    width: 100%;
    margin-bottom: 2rem;

    &__banner {
      position: absolute;
      top: 0;
      left: 0;
      background-size: cover;
      background-position: center;
      object-fit: cover;
      height: 100%;
      width: 100%;
      z-index: -1;
    }

    &__overlay {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.3);
    }

    &__courseInfo {
      height: 100%;
      border-radius: 1rem;
      width: 100%;
      background-color: rgba(34, 34, 34, 0.7);
      padding: 1.5rem;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;

      .title {
        font-size: 2rem;
        font-weight: 500;
        line-height: 1.4;
      }

      .author,
      .duration {
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.9rem;
      }

      .duration {
        margin-bottom: 0.5rem;
      }

      .ratingBox {
        margin-bottom: 0.5rem;

        .notRated {
          background: -webkit-linear-gradient(#ff4883, #fdb769);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
        }

        .rating {
          display: flex;
          align-items: center;

          &__num {
            font-size: 1.1rem;
            font-weight: 600;
            background: -webkit-linear-gradient(#ff4883, #fdb769);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-right: 0.5rem;
          }

          &__stars {
            i {
              font-size: 0.9rem;
              margin-right: 0.1rem;
              background: -webkit-linear-gradient(#ff4883, #fdb769);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }

          &__people {
            font-size: 0.9rem;
            color: rgba(255, 225, 225, 0.4);
            font-weight: 200;
            padding: 0 0.4rem;
          }
        }
      }

      .price {
        font-size: 1.4rem;
        font-weight: 500;
        margin-bottom: 1rem;
        line-height: 1;
      }

      .excerpt {
        color: rgba(255, 255, 255, 0.9);
        font-size: 1rem;
        line-height: 1.6;
        margin-bottom: 1rem;
      }
    }

    &__playBox {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      position: relative;

      .playBtn {
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 5rem;
        height: 5rem;
        z-index: 2;
        -webkit-transform: translateY(-50%) translateX(-50%);
        transform: translateY(-50%) translateX(-50%);
        background: linear-gradient(44.44deg, #ed2775 7.79%, #ff7448 94.18%);
        border-radius: 50%;
        color: #fff;
        -webkit-box-shadow: 15px 25px 35px rgba(38, 42, 55, 0.2);
        box-shadow: 15px 25px 35px rgba(38, 42, 55, 0.2);
        cursor: pointer;

        &::after,
        &::before {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          z-index: -1;
          bottom: 0;
          left: 0;
          border-radius: 50%;
          border: 1px solid #fff;
        }

        &::before {
          -webkit-animation: ${ripple} 2s linear infinite;
          animation: ${ripple} 2s linear infinite;
        }

        &::after {
          -webkit-animation: ${ripple} 2s linear 1s infinite;
          animation: ${ripple} 2s linear 1s infinite;
        }

        img {
          height: 1.8rem;
          width: 1.8rem;
        }
      }
    }
  }

  .content {
    width: 60%;
    margin: 0 auto;
    background-color: #222;
    border-radius: 0.5rem;
    margin-bottom: 2rem;

    &__title {
      padding: 1rem;
      font-size: 1.4rem;
      font-weight: 400;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    &__videos {
      padding: 1rem 0;
      max-height: 35rem;
      overflow: auto;

      .lockIcon {
        margin-right: 1rem;
      }

      &--item:not(:last-child) {
        margin-bottom: 2rem;
      }

      &--item {
        padding: 0 1.5rem;
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;

        .thumbnail {
          height: auto;
          width: 7rem;
          margin-right: 1rem;
          background-size: cover;
          background-position: center;
          object-fit: cover;
          border-radius: 5px;
        }

        .metaInfo {
          &__title {
            font-size: 1.05rem;
            line-height: 1.3;
            margin-bottom: 0.5rem;
            font-weight: 300;
          }

          &__duration {
            font-size: 0.8rem;
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
  }

  @media screen and (max-width: 991px) {
    .hero {
      padding: 2rem;

      &__banner {
        margin-bottom: 3rem;
      }

      &__playBox {
        height: 8rem;
      }
    }

    .content {
      width: 80%;
    }
  }

  @media screen and (max-width: 768px) {
    .content {
      width: 90%;
    }
  }

  @media screen and (max-width: 480px) {
    .hero {
      &__courseInfo {
        padding: 1rem;

        .title {
          font-size: 1.7rem;
        }

        .author {
          font-size: 0.8rem;
        }

        .ratingBox {
          .rating {
            &__num {
              font-size: 1rem;
            }
          }
        }

        .price {
          font-size: 1.2rem;
        }

        .excerpt {
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }
      }
    }

    .content {
      width: 95%;

      &__title {
        font-size: 1.2rem;
      }

      &__videos {
        &--item {
          .thumbnail {
            width: 5.5rem;
          }

          .metaInfo {
            &__title {
              font-size: 0.8rem;
            }

            &__duration {
              font-size: 0.7rem;
            }
          }
        }
      }
    }
  }
`;
