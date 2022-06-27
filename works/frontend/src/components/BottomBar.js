import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HomeHutIcon,
  TrendingCampfire,
  SubscriptionIconQuad,
  HistoryShell,
  LibIconPadLock,
} from "./Icons";

const Wrapper = styled.div`
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0;
  width: 100%;
  background: ${(props) => props.theme.grey};
  border-top: 1px solid ${(props) => props.theme.darkGrey};
  display: none;
  padding: 0.8rem 1rem;

  .icons a {
    padding: 0;
    margin: 0;
  }

  .icons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .icons svg {
    width: 30px;
    height: 30px;
    fill: ${(props) => props.theme.darkGrey};
  }

  .icons img {
    width: 26px;
    height: 26px;
    object-fit: cover;
    border-radius: 13px;
  }

  .active svg {
    fill: ${(props) => props.theme.primaryColor};
  }

  .active {
    span {
      font-size: 0.8rem !important;
      font-weight: 500;
      color: ${(props) => props.theme.primaryColor} !important;
    }
  }

  .navItem {
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      font-family: ${(props) => props.theme.font}, sans-serif;
      font-size: 0.75rem;
      font-weight: 400;
      text-transform: capitalize;
      color: ${(props) => props.theme.darkGrey};
      transition: all 0.2s ease;
    }
  }

  @media screen and (max-width: 500px) {
    display: block;
  }

  @media screen and (max-width: 375px) {
    .navItem {
      span {
        font-size: 0.7rem;
      }
    }

    .active {
      span {
        font-size: 0.72rem !important;
      }
    }
  }
`;

const BottomBar = () => {
  return (
    <Wrapper>
      <div className="icons">
        <NavLink className="navItem" activeClassName="active" exact to="/">
          <HomeHutIcon />
          <span>Home</span>
        </NavLink>

        <NavLink
          className="navItem"
          activeClassName="active"
          exact
          to="/feed/trending"
        >
          <TrendingCampfire />
          <span>Trending</span>
        </NavLink>

        <NavLink
          className="navItem"
          activeClassName="active"
          exact
          to="/feed/subscriptions"
        >
          <SubscriptionIconQuad />
          <span>Streams</span>
        </NavLink>

        <NavLink
          className="navItem"
          activeClassName="active"
          exact
          to="/feed/history"
        >
          <HistoryShell />
          <span>History</span>
        </NavLink>

        <NavLink
          className="navItem"
          activeClassName="active"
          exact
          to="/feed/library"
        >
          <LibIconPadLock />
          <span>Library</span>
        </NavLink>
      </div>
    </Wrapper>
  );
};

export default BottomBar;
