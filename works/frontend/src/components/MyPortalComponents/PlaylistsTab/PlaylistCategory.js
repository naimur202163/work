import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import PlaylistItem from "./PlaylistItem";

const PlaylistCategory = ({ isSelf, playlist }) => {
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
    <PlaylistCategoryStyled>
      {isSelf ? (
        <div className="titleLeft">{playlist.title}</div>
      ) : (
        <div className="titleCenter">{playlist.title}</div>
      )}

      {isSelf ? (
        <Slider {...SLIDERSETTING1} className="slider">
          {playlist.videos.map((item, i) => (
            <PlaylistItem key={i} isSelf={isSelf} video={item} />
          ))}
        </Slider>
      ) : (
        <Slider {...SLIDERSETTING2} className="slider">
          {playlist.videos.map((item, i) => (
            <PlaylistItem key={i} isSelf={isSelf} video={item} />
          ))}
        </Slider>
      )}
    </PlaylistCategoryStyled>
  );
};

export default PlaylistCategory;

const PlaylistCategoryStyled = styled.div`
  .titleLeft {
    font-weight: 500;
    font-size: 1.05rem;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 1rem;
    padding: 0 2rem;
  }

  .titleCenter {
    font-weight: 500;
    font-size: 1.05rem;
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
