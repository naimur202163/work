import React from "react";
import styled from "styled-components";
import SeriesOptions from "./SeriesOptions";
import Moment from "react-moment";
import { useSelector } from "react-redux";

const SeriesItem = ({ isSelf, series }) => {
  const { title, thumbnail, price, videos, createdAt } = series;
  const { profile } = useSelector((state) => state);

  if (isSelf) {
    return (
      <SeriesItemStyledV2>
        <div className="thumbnail">
          <img src={thumbnail} alt={title} />
        </div>

        <div className="metaInfo">
          <div className="metaInfo__left">
            <div className="metaInfo__left--videoMeta">
              <div className="title">{title}</div>

              <div className="seperatorInfo">
                <div className="bold">{profile.username}</div>
                <div className="light">
                  <Moment fromNow>{createdAt}</Moment>
                </div>
              </div>

              <div className="lightText">
                {!videos.length ? "Add Some Videos" : videos.length} Videos
              </div>
            </div>
          </div>
          <div className="metaInfo__right">
            <SeriesOptions />
          </div>
        </div>

        <div className="numVideos">
          <span>{videos.length} Videos</span>
        </div>

        <div className="price">
          {price > 0 ? (
            <span>${parseInt(price).toFixed(2)}</span>
          ) : (
            <span>free</span>
          )}
        </div>
      </SeriesItemStyledV2>
    );
  }

  return (
    <SeriesItemStyled>
      <div className="thumbnail">
        <img src={thumbnail} alt={title} />
      </div>

      <div className="metaInfo">
        <div className="metaInfo__left">
          <div className="metaInfo__left--videoMeta">
            <div className="title">{title}</div>

            <div className="seperatorInfo">
              <div className="bold">{profile.username}</div>
              <div className="light">
                <Moment fromNow>{createdAt}</Moment>
              </div>
            </div>

            <div className="lightText">
              {!videos.length ? "Add Some Videos" : videos.length} Videos
            </div>
          </div>
        </div>
        <div className="metaInfo__right">
          <SeriesOptions />
        </div>
      </div>

      <div className="numVideos">
        <span>{videos.length} Videos</span>
      </div>

      <div className="price">
        {price > 0 ? <span>${parseInt(price).toFixed(2)}</span> : "FREE"}
      </div>
    </SeriesItemStyled>
  );
};

export default SeriesItem;

const SeriesItemStyled = styled.div`
  margin-bottom: 2rem;
  position: relative;

  .numVideos {
    position: absolute;
    top: 9.5rem;
    right: 1rem;
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

  .price {
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

      &--videoMeta {
        cursor: pointer;

        .title {
          font-size: 0.95rem;
          font-weight: 500;
          line-height: 1.5;
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

        .lightText {
          font-weight: 400;
          font-size: 0.8rem;
          color: rgba(174, 174, 178, 1);
        }
      }
    }

    &__right {
      cursor: pointer;
    }
  }

  @media screen and (max-width: 480px) {
    .numVideos {
      top: 7rem;
      right: 0.5rem;
      font-size: 0.55rem;
      padding: 0.2rem 0.5rem;
    }

    .price {
      top: 7rem;
      left: 0.5rem;
      font-size: 0.65rem;
      padding: 0.2rem 0.5rem;
    }

    .thumbnail {
      margin-bottom: 0.5rem;
      height: 9rem;
    }

    .metaInfo {
      &__left {
        &--videoMeta {
          .title {
            font-size: 0.7rem;
          }

          .seperatorInfo {
            font-size: 0.6rem;
          }

          .lightText {
            font-size: 0.65rem;
          }
        }
      }
    }
  }
`;

const SeriesItemStyledV2 = styled.div`
  margin-bottom: 2rem;
  position: relative;

  .numVideos {
    position: absolute;
    top: 9.5rem;
    right: 1rem;
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

  .price {
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

      &--videoMeta {
        cursor: pointer;

        .title {
          font-size: 0.95rem;
          font-weight: 500;
          line-height: 1.5;
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

        .lightText {
          font-weight: 400;
          font-size: 0.8rem;
          color: rgba(174, 174, 178, 1);
        }
      }
    }

    &__right {
      cursor: pointer;
    }
  }

  @media screen and (max-width: 480px) {
    .numVideos {
      top: 7rem;
      right: 0.5rem;
      font-size: 0.55rem;
      padding: 0.2rem 0.5rem;
    }

    .price {
      top: 7rem;
      left: 0.5rem;
      font-size: 0.65rem;
      padding: 0.2rem 0.5rem;
    }

    .thumbnail {
      margin-bottom: 0.5rem;
      height: 9rem;
    }

    .metaInfo {
      &__left {
        &--videoMeta {
          .title {
            font-size: 0.8rem;
          }

          .seperatorInfo {
            font-size: 0.6rem;

            & > *:not(:last-child) {
              &::after {
                margin-left: 6px;
              }
            }
            & > *:not(:first-child) {
              margin-left: 15px;
            }
          }

          .lightText {
            font-size: 0.65rem;
          }
        }
      }
    }
  }

  @media screen and (max-width: 390px) {
    .metaInfo {
      &__left {
        &--videoMeta {
          .seperatorInfo {
            font-size: 0.55rem;
          }
        }
      }
    }
  }
`;
