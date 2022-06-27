import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import SeriesItem from "./SeriesItem";

const SeriesCategory = ({ isSelf, allSeries }) => {
  const SLIDERSETTING1 = {
    infinite: false,
    arrows: false,
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,

    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 481,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const SLIDERSETTING2 = {
    infinite: false,
    arrows: false,
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,

    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 481,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <SeriesCategoryStyled>
      {isSelf ? (
        <div className="titleLeft">Series Category 01</div>
      ) : (
        <div className="titleCenter">Series Category 01</div>
      )}

      {isSelf ? (
        <Slider {...SLIDERSETTING1} className="slider">
          {allSeries.map((item, i) => (
            <SeriesItem key={i} isSelf={isSelf} series={item} />
          ))}
        </Slider>
      ) : (
        <Slider {...SLIDERSETTING2} className="slider">
          {allSeries.map((item, i) => (
            <SeriesItem key={i} isSelf={isSelf} series={item} />
          ))}
        </Slider>
      )}
    </SeriesCategoryStyled>
  );
};

export default SeriesCategory;

const SeriesCategoryStyled = styled.div`
  .titleLeft {
    font-weight: 500;
    font-size: 0.95rem;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 1rem;
    padding: 0 2rem;
  }

  .titleCenter {
    font-weight: 500;
    font-size: 0.95rem;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 1rem;
    padding: 0 2rem;
  }

  .slider {
    .slick-slide {
      padding: 0 10px;
    }

    .slick-track {
      margin-left: 0;
    }
  }

  @media screen and (max-width: 768px) {
    .titleCenter {
      text-align: center;
      width: 100%;
      padding: 0;
    }
  }

  @media screen and (max-width: 480px) {
    .titleCenter,
    .titleLeft {
      font-size: 0.9rem;
    }
  }
`;
