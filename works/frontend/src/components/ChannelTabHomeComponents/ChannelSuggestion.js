import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-grid-system";
import SuggestionCard from "./SuggestionCard";

const ChannelSuggestion = (props) => {
  const { featuredWarriors } = props;

  return (
    <ChannelSuggestionComponent>
      <h1 className="title">Members who liked this class also liked</h1>

      <Row>
        {featuredWarriors.map((warrior, index) => (
          <Col key={warrior.id} md={3} sm={6} xs={12}>
            <SuggestionCard key={warrior.id} warrior={warrior} />
          </Col>
        ))}
      </Row>
    </ChannelSuggestionComponent>
  );
};

export default ChannelSuggestion;

const ChannelSuggestionComponent = styled.div`
  text-align: center;

  .title {
    font-weight: 700;
    font-size: 1.3rem;
    letter-spacing: 0.05px;
    margin-bottom: 2rem;
    padding: 0 0.7rem;
    border-left: 5px solid #fff;
    text-align: center;
    display: inline-block;
  }
`;
