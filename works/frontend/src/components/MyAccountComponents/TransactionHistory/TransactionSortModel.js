import React from "react";
import styled, { keyframes } from "styled-components";
import CaretDownIcon from "../../../assets/Icons/caret-down.svg";

const TransactionSortModel = ({ doNotClose, close, sortBy, setSortBy }) => {
  return (
    <TransactionSortModelStyled ref={doNotClose}>
      <div onClick={close} className="header">
        <img src={CaretDownIcon} alt="" className="closeIcon" />
        <div className="title">Filter Karma Transaction by</div>
      </div>

      <div className="options">
        <div className={`options__item ${sortBy === 'mostRecent' && 'active'}`} onClick={() => setSortBy('mostRecent')}>Most recent</div>
        <div className={`options__item ${sortBy === 'lessRecent' && 'active'}`} onClick={() => setSortBy('lessRecent')}>Less recent</div>
        <div className={`options__item ${sortBy === 'mostExp' && 'active'}`} onClick={() => setSortBy('mostExp')}>Most expensive</div>
        <div className={`options__item ${sortBy === 'lessExp' && 'active'}`} onClick={() => setSortBy('lessExp')}>Less expensive</div>
      </div>
    </TransactionSortModelStyled>
  );
};

export default TransactionSortModel;

const openAnimation = keyframes`
  from {
    transform: translateY(5rem);
    opacity: 0;
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TransactionSortModelStyled = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  height: calc(100% - 4rem);
  background-color: #3a3a3c;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  padding: 1rem 2rem;
  animation: ${openAnimation} 0.35s ease-out;
  border-top: 1px solid rgba(112, 112, 112, 0.25);

  .header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(112, 112, 112, 0.5);
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    cursor: pointer;

    .closeIcon {
      height: 0.5rem;
      width: auto;
      margin-right: 1rem;
    }

    .title {
      font-size: 0.9rem;
      font-weight: 500;
      text-transform: capitalize;
      color: #f2f2f7;
    }
  }

  .options {
    width: 100%;

    &__item {
      padding: 0.5rem 0;
      font-size: 0.85rem;
      font-weight: 600;
      color: #636366;
      border-bottom: 2px solid rgba(99, 99, 102, 0.5);
      cursor: pointer;
    }

    .active {
      color: #f2f2f7;
    }
  }

  @media screen and (max-width: 480px) {
    .header {
      .title {
        font-size: 0.8rem;
      }
    }

    .options {
      &__item {
        padding: 0.5rem 0;
        font-size: 0.8rem;
      }
    }
  }
`;
