import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import ArrowIcon from "../../../assets/Icons/arrow.svg";
import SeriesCategory from "./SeriesCategory";
import Skeleton from "../../../skeletons/SeriesSkeleton";
import { GlobalContext } from "../../../context/GlobalContext";
import { useSelector, useDispatch } from "react-redux";
import { getAllSeriesOfUser } from "../../../actions";

const SeriesTab = ({ loading }) => {
  const dispatch = useDispatch();
  const {
    loading: getSeriesLoading,
    series: allSeries,
    error: getSeriesError,
  } = useSelector((state) => state.getAllSeriesOfUser);
  const { showCreateSeriesModel, setShowCreateSeriesModel } =
    useContext(GlobalContext);
  const { profile } = useSelector((state) => state);
  const isSelf = useSelector((state) => state.profile.isMe);

  useEffect(() => {
    dispatch(getAllSeriesOfUser(profile?.username));
  }, [showCreateSeriesModel, profile]);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <SeriesTabStyled>
      <div className="container">
        {isSelf && (
          <>
            <div
              onClick={() => setShowCreateSeriesModel(true)}
              className="container__createButton"
            >
              <div className="text">
                <div className="light">Create</div>
                <div className="bold">Series</div>
              </div>

              <img className="icon" src={ArrowIcon} alt="" />
            </div>

            <div className="container__goToPurchases">
              <div className="text">
                <div className="light">Go to your</div>
                <div className="bold">Purchases</div>
              </div>

              <img className="icon" src={ArrowIcon} alt="" />
            </div>
          </>
        )}

        <div className="container__row">
          {getSeriesLoading && (
            <div className="loading">Getting all series, Please wait...</div>
          )}

          {!getSeriesLoading && getSeriesError && (
            <div className="error">No series available. Create One!</div>
          )}

          {allSeries && allSeries.length > 0 && (
            <SeriesCategory isSelf={isSelf} allSeries={allSeries} />
          )}
        </div>
      </div>
    </SeriesTabStyled>
  );
};

export default SeriesTab;

const SeriesTabStyled = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 2.5rem 0;
  font-family: ${(props) => props.theme.montserrat};

  .container {
    width: 90%;
    margin: 0 auto;

    &__createButton {
      width: 50%;
      margin: 0 auto 1rem auto;
      background-color: #fff;
      padding: 0.8rem 1rem;
      border-radius: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #2c2c2e;
      font-size: 0.95rem;
      cursor: pointer;

      .text {
        display: flex;
        align-items: center;
        text-transform: capitalize;

        .light {
          font-weight: 400;
          padding-right: 0.5rem;
        }

        .bold {
          font-weight: 600;
        }
      }

      .icon {
        height: 1rem;
        width: auto;
      }
    }

    &__goToPurchases {
      width: 50%;
      margin: 0 auto 4rem auto;
      background-color: #3a3a3c;
      padding: 0.8rem 1rem;
      border-radius: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      font-size: 0.95rem;
      cursor: pointer;

      .text {
        display: flex;
        align-items: center;

        .light {
          font-weight: 400;
          padding-right: 0.5rem;
        }

        .bold {
          font-weight: 600;
        }
      }

      .icon {
        height: 1rem;
        width: auto;
      }
    }

    &__row {
      margin-bottom: 2rem;
    }
  }

  @media screen and (max-width: 768px) {
    .container {
      width: 90%;
      margin: 0 auto;

      &__createButton {
        width: 80%;
        font-size: 0.9rem;
      }

      &__goToPurchases {
        width: 80%;
        font-size: 0.9rem;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .container {
      width: 95%;

      &__createButton {
        width: 100%;
        font-size: 0.85rem;
      }

      &__goToPurchases {
        width: 100%;
        font-size: 0.85rem;
        margin: 0 auto 3rem auto;
      }
    }
  }
`;
