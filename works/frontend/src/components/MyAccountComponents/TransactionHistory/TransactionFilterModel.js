import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import CaretDownIcon from "../../../assets/Icons/caret-down.svg";
import Slider from "react-slick";


const TransactionFilterModel = ({ isFetching, filters, error, doNotClose, close, onUpdateFilters, savingFilter }) => {
  const [filter, setFilters] = useState(filters);

  useEffect(() => {
    setFilters(filters)
  }, [filters])

  const SliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    autoPlay: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  };


  return (
    <TransactionFilterModelStyled ref={doNotClose}>
      <div onClick={close} className="header">
        <img src={CaretDownIcon} alt="" className="closeIcon" />
        <div className="title">Filter Karma Transaction by</div>
      </div>

      <div className="options">
        <div className="options__slider">
          <div className="options__slider--title">Time Frame</div>

          <Slider {...SliderSettings} className="options__slider--listSlider">
            <div className={`item ${filter.timeFrame === 'always' && 'active'}`}>
              <button className="optionBtn" onClick={() => setFilters({ ...filter, timeFrame: 'always' })}>Always</button>
            </div>

            <div className={`item ${filter.timeFrame === 'last7days' && 'active'}`}>
              <button className="optionBtn" onClick={() => setFilters({ ...filter, timeFrame: 'last7days' })}>Last 7 days</button>
            </div>

            <div className={`item ${filter.timeFrame === 'lastMonth' && 'active'}`}>
              <button className="optionBtn" onClick={() => setFilters({ ...filter, timeFrame: 'lastMonth' })}>Last month</button>
            </div>

            <div className={`item ${filter.timeFrame === 'lastYear' && 'active'}`}>
              <button className="optionBtn" onClick={() => setFilters({ ...filter, timeFrame: 'lastYear' })}>Last year</button>
            </div>
          </Slider>
        </div>

        {/* <div className="options__slider">
          <div className="options__slider--title" >Amount</div>

          <div className="options__slider--list">
            <div className={`item ${filter.amount === 'any' && 'active'}`}>
              <button className="optionBtn" onClick={() => setFilters({ ...filter, amount: 'any' })}>Any</button>
            </div>

            <div className={`item ${filter.amount === 'interval' && 'active'}`}>
              <button className="optionBtn" onClick={() => setFilters({ ...filter, amount: 'interval' })}>Interval</button>
            </div>
          </div>
        </div> */}

        <div className="options__slider">
          <div className="options__slider--title">Source</div>

          <Slider {...SliderSettings} className="options__slider--listSlider">
            <div className={`item ${filter.source === 'all' && 'active'}`}>
              <button className="optionBtn" onClick={() => setFilters({ ...filter, source: 'all' })}>All</button>
            </div>

            <div className={`item ${filter.source === 'tip' && 'active'}`}>
              <button className="optionBtn" onClick={() => setFilters({ ...filter, source: 'tip' })}>Tip</button>
            </div>

            <div className={`item ${filter.source === 'referral' && 'active'}`}>
              <button className="optionBtn" onClick={() => setFilters({ ...filter, source: 'referral' })}>Refferal</button>
            </div>

            <div className={`item ${filter.source === 'karma' && 'active'}`}>
              <button className="optionBtn" onClick={() => setFilters({ ...filter, source: 'karma' })}>Karma</button>
            </div>
          </Slider>
        </div>
      </div>

      <div className="applyFilters">
        <button onClick={() => onUpdateFilters(filter)}> {savingFilter ? 'Saving...' : 'Save'}</button>
      </div>
    </TransactionFilterModelStyled>
  );
};

export default TransactionFilterModel;

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

const TransactionFilterModelStyled = styled.div`
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
  overflow-y: auto;
  overflow-x: hidden;
  border-top: 1px solid rgba(112, 112, 112, 0.25);

  /* width */
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #3a3a3c;
    border-radius: 7px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(246, 92, 139);
  }

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
      font-weight: 400;
      text-transform: capitalize;
      color: #f2f2f7;
    }
  }

  .options {
    &__slider {
      padding: 0.5rem 0;
      border-bottom: 2px solid rgba(99, 99, 102, 0.5);
      margin-bottom: 1rem;

      &--title {
        font-weight: 600;
        color: #c7c7cc;
        font-size: 0.9rem;
        text-transform: capitalize;
        margin-bottom: 0.5rem;
      }

      &--list {
        display: flex;
        align-items: center;

        .active .optionBtn {
          color: #1c1c1e !important;
          background-color: #f2f2f7 !important;
          font-weight: 600 !important;
        }

        .item {
          margin-right: 1rem;

          .optionBtn {
            width: 100%;
            padding: 0.5rem 1.5rem;
            border-radius: 0.5rem;
            background-color: #636366;
            color: #f2f2f7;
            font-size: 0.85rem;
            font-weight: 300;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0.5rem;
            border: none;
            outline: none;
            font-family: ${(props) => props.theme.montserrat};
          }
        }
      }

      &--listSlider {
        .slick-slide {
          padding-right: 1rem;
          outline: none;
        }

        .active .optionBtn {
          color: #1c1c1e !important;
          background-color: #f2f2f7 !important;
          font-weight: 600 !important;
        }

        .item {
          .optionBtn {
            width: 100%;
            padding: 0.5rem 0;
            border-radius: 0.5rem;
            background-color: #636366;
            color: #f2f2f7;
            font-size: 0.85rem;
            font-weight: 300;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0.5rem;
            border: none;
            outline: none;
            font-family: ${(props) => props.theme.montserrat};
          }
        }
      }
    }
  }

  .applyFilters {
    text-align: center;
    margin-top: 5rem;

    button {
      width: 100%;
      padding: 0.7rem 0;
      font-size: 0.9rem;
      color: #fff;
      font-weight: 500;
      border-radius: 4px;
      background: linear-gradient(to right bottom, #f9903d, #f75b8c);
      border: none;
      outline: none;
      font-family: ${(props) => props.theme.montserrat};
      text-transform: capitalize;
    }
  }

  @media screen and (max-width: 375px) {
    .header {
      .title {
        font-size: 0.8rem;
      }
    }

    .options {
      &__slider {
        &--title {
          font-size: 0.8rem;
        }

        &--list {
          .item {
            margin-right: 0.8rem;

            .optionBtn {
              font-size: 0.75rem;
            }
          }
        }

        &--listSlider {
          .slick-slide {
            padding-right: 0.8rem;
          }

          .item {
            .optionBtn {
              font-size: 0.75rem;
            }
          }
        }
      }
    }
  }
`;
