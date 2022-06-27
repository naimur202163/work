import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SuggestionCard = (props) => {
  const { warrior } = props;
  const {
    title,
    description,
    featuredWarriorImgPathInternal,
    warriorUserName,
  } = warrior;

  if (warriorUserName === null) {
    return (
      <SuggestionCardComponent>
        <Link to={{ pathname: "https://isutra.tv" }} target="_blank">
          <img src={featuredWarriorImgPathInternal} alt={title} />
          <div className="content">
            <h1 className="content__name">{title}</h1>
            <span className="content__tag">{description}</span>
          </div>
        </Link>
      </SuggestionCardComponent>
    );
  } else
    return (
      <SuggestionCardComponent>
        <Link to={warriorUserName} target="_blank">
          <img src={featuredWarriorImgPathInternal} alt={title} />
          <div className="content">
            <h1 className="content__name">{title}</h1>
            <span className="content__tag">{description}</span>
          </div>
        </Link>
      </SuggestionCardComponent>
    );
};

export default SuggestionCard;

const SuggestionCardComponent = styled.div`
  cursor: pointer;
  margin-bottom: 2rem;

  img {
    width: 100%;
    height: 23rem;
    border-radius: 7px;
    background-size: cover;
    background-position: center;
    object-fit: cover;
    box-shadow: rgba(255, 255, 255, 0.1) 0px 48px 100px 0px;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &__name {
      font-size: 1.2rem;
      color: #fff;
      font-size: 300;
    }

    &__tag {
      font-size: 0.9rem;
      color: #b0b0b0;
      text-align: left;
    }
  }
`;
