import React from "react";
import styled from "styled-components";
import Moment from "react-moment";
import { Link } from "react-router-dom";


const SeriesCard = ({ item, showDate = false }) => {
  const { title, thumbnail, price, videos, createdAt, user } = item;
  return (
    <>
      <SeriesCardWrapper>
        <div className="series">
          <img src={thumbnail} alt={title} className="thumbnail" />
          <div className="series__overlaybox">
            <div className="series__overlaybox--left">
              {videos.length ? videos.length : 0} videos
            </div>
            <div className="series__overlaybox--right">
              {price ? `${parseFloat(price).toFixed(2)} $` : "FREE"}
            </div>
          </div>
        </div>

        <div className="metaInfo">
          <h5 className="metaInfo--title">{title}</h5>
          {user && (
            <span className="secondary">
              <Link to={`/channel/${user.username}`}>
                <span className="user">{user.username}</span>
              </Link>
              <span className="separator">{" - "}</span>
              <span className="time">
                {showDate && <Moment fromNow>{createdAt}</Moment>}
              </span>
            </span>
          )}
          <div className="time">
            {videos.length ? videos.length : 0} videos
          </div>
        </div>
      </SeriesCardWrapper>
    </>
  );
};

export default SeriesCard;

const SeriesCardWrapper = styled.div`
  .thumbnail {
    width: 100%;
    height: 6rem;
    background-size: cover;
    background-position: center;
    object-fit: cover;
  }

  .series {
    position: relative;
    width:222px;
    &__overlaybox {
      display: flex;
      justify-content: space-between;
      position: absolute;
      bottom: 6px;
      width: 100%;
      &--left {
        margin: 5px;
        background: #1c1c1e;
        padding: 6px 20px;
        font-family: montserrat;
        font-weight: 400;
        color: #f2f2f7;
        line-height: 10px;
        font-size: 13px;
        border-radius: 9px;
      }
      &--right {
        margin: 5px;
        background: #1c1c1e;
        padding: 6px 20px;
        font-family: montserrat;
        font-weight: 400;
        color: #f2f2f7;
        line-height: 10px;
        font-size: 13px;
        border-radius: 9px;
      }
    }
  }

  .metaInfo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top:11px;
     > .secondary{
      display: flex;
      line-height: 1.3;
      color: #D1D1D6;
      align-items: center;
    }
    .user {
    background: -webkit-linear-gradient(#ff4883, #fdb769);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 500;
    letter-spacing: 0.02rem;
    cursor: pointer;
    text-shadow: 2px 2px 10px rgba(255, 255, 255, 0.3);
    font-size: 13px;
  }
  .time {
    font-size: 13px;
    color: #AAAAAA;

  }
  .separator {
    padding: 0 5px;
  }
    &--title {
      line-height: 1.4;
      font-weight: 300;
      color: #F2F2F7;
      font-size: 13px;
      @media screen and (max-width: 768px) {
        font-size:13px;
      }
    
      @media screen and (max-width: 480px) {
        font-size:10px;      
      }
  }
  
    }

    &--sold {
      color: rgba(255, 225, 225, 0.5);
      font-weight: 200;
      font-size: 0.85rem;
    }

    &--price {
      font-size: 1.1rem;
      color: #fff;
      font-weight: 500;
    }

    &--addVideosBtn {
      margin: 0.5rem 0;
      font-size: 0.8rem;
    }

    &--action {
      padding-top: 0.5rem;

      button {
        padding: 0.2rem 0.8rem;
        border-radius: 0.2rem;
        background-color: #fff;
        border: none;
        outline: none;

        &:nth-child(1) {
          margin-right: 0.5rem;
        }
      }
    }
`;
