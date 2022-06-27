import React from "react";
import styled from "styled-components";
import Button from "../../styles/Button";
import { useHistory } from "react-router-dom";

const StartSeriesCard = ({ series, userInfo, progressInfo, videos }) => {
  const history = useHistory();
  const { title, thumbnail } = series;
  const { firstname, lastname } = userInfo;

  return (
    <StartSeriesCardWrapper>
      <img
        onClick={() => {
          history.push(
            `/series/watch/${series.id}/${videos[0].singleDetailedVideo.id}`
          );
        }}
        src={thumbnail}
        alt={title}
        className="thumbnail"
      />

      <div className="metaInfo">
        <h5
          onClick={() => {
            history.push(
              `/series/watch/${series.id}/${videos[0].singleDetailedVideo.id}`
            );
          }}
          className="metaInfo--title"
        >
          {title}
        </h5>
        <span className="metaInfo--author">{firstname + " " + lastname}</span>

        {progressInfo?.percentage && (
          <div className="metaInfo--progress">
            <div
              style={{ width: `${progressInfo.percentage}%` }}
              className="metaInfo--progress-completed"
            />
          </div>
        )}

        {videos && videos.length > 0 && (
          <Button
            onClick={() => {
              history.push(
                `/series/watch/${series.id}/${videos[0].singleDetailedVideo.id}`
              );
            }}
            className="metaInfo--startBtn"
          >
            Start Series
          </Button>
        )}
      </div>
    </StartSeriesCardWrapper>
  );
};

export default StartSeriesCard;

const StartSeriesCardWrapper = styled.div`
  .thumbnail {
    width: 100%;
    height: 10rem;
    background-size: cover;
    background-position: center;
    object-fit: cover;
    cursor: pointer;
  }

  .metaInfo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &--title {
      font-size: 1rem;
      line-height: 1.4;
      font-weight: 300;
      cursor: pointer;
    }

    &--author {
      color: rgba(255, 225, 225, 0.5);
      font-weight: 200;
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
    }

    &--duration {
      font-size: 1rem;
      color: rgba(255, 225, 225, 0.5);
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    &--progress {
      width: 100%;
      margin: 0 auto;
      height: 10px;
      border: 1px solid rgba(255, 225, 225, 0.2);
      border-radius: 10rem;
      margin-bottom: 1.5rem;

      &-completed {
        height: 100%;
        background: ${(props) => props.theme.gradient};
        border-radius: 10rem;
      }
    }
  }
`;
