// This page is built during sprint 1
// This is just UI setup and functionality part is added in upcoming sprints.
import React from "react";
import { Row, Col } from "react-grid-system";
import styled from "styled-components";
import FilterBox from "../components/StreamsComponents/FilterBox/FilterBox";
import ClipItem from "../components/StreamsComponents/ClipItem/ClipItem";

const Streams = () => {
  return (
    <StreamsStyled>
      <FilterBox />

      <div className="items">
        <Row className="items__row">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => (
            <Col lg={4} md={6} sm={12} className="items__item">
              <ClipItem />
            </Col>
          ))}
        </Row>
      </div>
    </StreamsStyled>
  );
};

export default Streams;

const StreamsStyled = styled.div`
  padding-top: 40px;

  .items {
    width: 90%;
    margin: 2rem auto;

    &__row {
      margin-bottom: 5rem;
    }
  }

  @media screen and (max-width: 480px) {
    .items {
      width: 100%;
    }
  }
`;
