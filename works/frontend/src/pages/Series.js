import React, { useEffect } from "react";
import styled from "styled-components";
import SeriesCardSmall from "../components/SeriesComponents/SeriesCardSmall";
// import SeriesCardBig from "../components/SeriesComponents/SeriesCardBig";
import ContactBanner from "../components/Footer/ContactBanner";
import Footer from "../components/Footer/Footer";
import Skeleton from "../skeletons/SeriesSkeleton";
import { Col, Row } from "react-grid-system";
import { getAllSeries } from "../actions";
import { useDispatch, useSelector } from "react-redux";

const Series = () => {
  const dispatch = useDispatch();
  const {
    loading: getSeriesLoading,
    series: allSeries,
    // error: getSeriesError,
  } = useSelector((state) => state.getAllSeries);

  useEffect(() => {
    dispatch(getAllSeries());
  }, [dispatch]);

  if (getSeriesLoading) {
    return <Skeleton />;
  }

  return (
    <>
      <SeriesWrapper>
        {/* <h2 className="heading">Most popular</h2>
        <Row className="seriesWrapper">
          <Col className="seriesWrapper__item" md={12} lg={6}>
            <SeriesCardBig show />
          </Col>
          <Col className="seriesWrapper__item" md={12} lg={6}>
            <SeriesCardBig />
          </Col>
        </Row> */}

        <h2 className="heading">Newest</h2>
        <Row className="seriesWrapper">
          {allSeries &&
            allSeries.length > 0 ?
            allSeries.map((item, i) => (
              <Col
                key={i}
                className="seriesWrapper__item"
                md={6}
                sm={12}
                lg={3}
              >
                <SeriesCardSmall item={item} show />
              </Col>
            )) : ''}
        </Row>

        {/* <h2 className="heading">Recommended for you</h2>
        <Row className="seriesWrapper">
          <Col className="seriesWrapper__item" md={6} sm={12} lg={3}>
            <SeriesCardSmall show />
          </Col>
          <Col className="seriesWrapper__item" md={6} sm={12} lg={3}>
            <SeriesCardSmall />
          </Col>
          <Col className="seriesWrapper__item" md={6} sm={12} lg={3}>
            <SeriesCardSmall show />
          </Col>
          <Col className="seriesWrapper__item" md={6} sm={12} lg={3}>
            <SeriesCardSmall />
          </Col>
        </Row> */}
      </SeriesWrapper>

      {/* rendering footer */}
      <ContactBanner />
      <Footer />
    </>
  );
};

export default Series;

const SeriesWrapper = styled.div`
  padding: 1.3rem;
  width: 90%;
  margin: 0 auto;
  padding-bottom: 3rem;

  .heading {
    margin-bottom: 0.5rem;
    font-size: 1.6rem;
    color: #fff;
    font-weight: 500;
    cursor: pointer;
  }

  .seriesWrapper {
    margin-bottom: 3rem;

    &__item {
      padding-left: 8px !important;
      padding-right: 8px !important;
    }
  }

  @media screen and (max-width: 991px) {
    .seriesWrapper {
      &__item {
        margin-bottom: 1.5rem;
      }
    }
  }

  @media screen and (max-width: 480px) {
    width: 95%;
  }
`;
