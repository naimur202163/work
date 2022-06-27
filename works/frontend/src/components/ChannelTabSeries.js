import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import SeriesCardEdit from "./SeriesComponents/SeriesCardEdit";
import StartSeriesCard from "./SeriesComponents/StartSeriesCard";
import Button from "../styles/Button";
import Skeleton from "../skeletons/SeriesSkeleton";
import EditSeriesModel from "../components/SeriesComponents/EditSeriesModel";
import { Col, Row } from "react-grid-system";
import { GlobalContext } from "../context/GlobalContext";
import { useSelector, useDispatch } from "react-redux";
import { getAllSeriesOfUser, getAllPurchasedSeries } from "../actions";
import { useParams } from "react-router-dom";

const ChannelTabSeries = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const { profile } = useSelector((state) => state);
  const {
    loading: getSeriesLoading,
    series: allSeries,
    error: getSeriesError,
  } = useSelector((state) => state.getAllSeriesOfUser);
  const {
    loading: getPurchasedSeriesLoading,
    allSeries: allPurchasedSeries,
    error: getPurchasedSeriesError,
  } = useSelector((state) => state.PurchasedSeries);
  const { info: createInfo } = useSelector((state) => state.createSeries);
  const { message: deleteSeriesMessage } = useSelector(
    (state) => state.deleteSeries
  );
  const { message: updateSeriesMessage } = useSelector(
    (state) => state.editSeries
  );
  const isWarrior = profile.userrole === 2;
  const {
    setCreateCourseModel,
    editSeriesModel,
    setEditSeriesModel,
    selectedSeries,
    setSelectedSeries,
  } = useContext(GlobalContext);
  const [courseTab, setCourseTab] = useState("CREATED"); // CREATED or PURCHASED
  const { userIdOrUserName } = useParams();

  const isMe = userIdOrUserName
    ? user.id === userIdOrUserName || user.username === userIdOrUserName
    : false;

  useEffect(() => {
    if (isWarrior) {
      setCourseTab("CREATED");
      dispatch(getAllSeriesOfUser(userIdOrUserName));
    } else {
      setCourseTab("PURCHASED");
    }
  }, [dispatch,isWarrior, userIdOrUserName]);

  useEffect(() => {
    if (courseTab === "CREATED") {
      dispatch(getAllSeriesOfUser(userIdOrUserName));
    }

    if (courseTab === "PURCHASED") {
      dispatch(getAllPurchasedSeries());
    }
  }, [dispatch, courseTab, userIdOrUserName]);

  useEffect(() => {
    if (deleteSeriesMessage || updateSeriesMessage) {
      dispatch(getAllSeriesOfUser(userIdOrUserName));
    }
  }, [dispatch, deleteSeriesMessage, updateSeriesMessage, userIdOrUserName]);

  useEffect(() => {
    if (createInfo) {
      dispatch(getAllSeriesOfUser(userIdOrUserName));
    }
  }, [dispatch, createInfo, userIdOrUserName]);

  if (getSeriesLoading) {
    return <Skeleton />;
  }

  if (getPurchasedSeriesLoading) {
    return <Skeleton />;
  }
  return (
    <>
      <ChannelTabSeriesWrapper>
        {isWarrior && isMe && (
          <div className="btnTab">
            <div className="btnTab__left">
              <button
                onClick={() => setCourseTab("CREATED")}
                className={`btnTab__button  ${
                  courseTab === "CREATED" && "btnTab__button--active"
                }`}
              >
                Your Series
              </button>

              <button
                onClick={() => setCourseTab("PURCHASED")}
                className={`btnTab__button  ${
                  courseTab === "PURCHASED" && "btnTab__button--active"
                }`}
              >
                Purchased Series
              </button>
            </div>

            <div className="btnTab__right">
              <Button onClick={() => setCreateCourseModel(true)}>
                Create Series
              </Button>
            </div>
          </div>
        )}

        <div className="courses">
          {courseTab === "CREATED" && (
            <Row className="coursesWrapper">
              {getSeriesError && (
                <h1 className="notFoundError">No Series Available!</h1>
              )}
              {!getSeriesError &&
                allSeries &&
                allSeries.length > 0 &&
                allSeries.map((series) => (
                  <Col
                    key={series.id}
                    className="coursesWrapper__item"
                    md={6}
                    sm={12}
                    lg={4}
                  >
                    <SeriesCardEdit
                      setSelectedSeries={setSelectedSeries}
                      item={series}
                      isMe={isMe}
                    />
                  </Col>
                ))}
            </Row>
          )}

          {courseTab === "PURCHASED" && (
            <Row className="coursesWrapper">
              {getPurchasedSeriesError && (
                <h1 className="notFoundError">
                  You haven't purchased any series!
                </h1>
              )}

              {!getPurchasedSeriesError &&
                allPurchasedSeries &&
                allPurchasedSeries.length > 0 &&
                allPurchasedSeries.map((item) => (
                  <Col
                    key={item.singleDetailedSeries.id}
                    className="coursesWrapper__item"
                    md={6}
                    sm={12}
                    lg={4}
                  >
                    <StartSeriesCard
                      series={item.singleDetailedSeries}
                      userInfo={item.userInfo}
                      progressInfo={item.seriesProgress}
                      videos={item.seriesVideos}
                    />
                  </Col>
                ))}
            </Row>
          )}
        </div>
      </ChannelTabSeriesWrapper>

      {/* render edit series model */}
      {editSeriesModel && (
        <EditSeriesModel
          open={editSeriesModel}
          closeHandler={() => setEditSeriesModel(false)}
          selectedSeries={selectedSeries}
        />
      )}
    </>
  );
};

export default ChannelTabSeries;

const ChannelTabSeriesWrapper = styled.div`
  min-height: 70vh;

  .coursesWrapper {
    &__item {
      margin-bottom: 1.5rem;
    }
  }

  .btnTab {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    justify-content: space-between;

    &__button {
      border: none;
      padding: 0.4rem 1.5rem;
      font-weight: lighter;
      background: #fff;
      color: rgba(0, 0, 0, 0.7);

      &--active {
        background: ${(props) => props.theme.gradient} !important;
        color: #fff !important;
        font-weight: 500 !important;
      }
    }
  }

  @media screen and (max-width: 600px) {
    .btnTab {
      flex-direction: column;
      align-items: flex-start;

      &__left {
        margin-bottom: 1rem;
      }
    }
  }
`;
