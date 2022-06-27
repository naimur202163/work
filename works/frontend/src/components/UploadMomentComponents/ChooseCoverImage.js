import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

const ChooseCoverImage = () => {
  const SliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    autoPlay: false,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrows: false,

    responsive: [
      {
        breakpoint: 481,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <ChooseCoverImageStyled>
      <div className="container">
        <div className="coverImage">
          <img
            src="https://webgradients.com/public/webgradients_png/045%20Loon%20Crest.png"
            alt=""
          />
        </div>

        <div className="options">
          <Slider {...SliderSettings}>
            <div className="options__item">
              <img
                src="https://webgradients.com/public/webgradients_png/045%20Loon%20Crest.png"
                alt=""
              />
            </div>

            <div className="options__item">
              <img
                src="https://webgradients.com/public/webgradients_png/045%20Loon%20Crest.png"
                alt=""
              />
            </div>

            <div className="options__item">
              <img
                src="https://webgradients.com/public/webgradients_png/045%20Loon%20Crest.png"
                alt=""
              />
            </div>

            <div className="options__item">
              <img
                src="https://webgradients.com/public/webgradients_png/045%20Loon%20Crest.png"
                alt=""
              />
            </div>

            <div className="options__item">
              <img
                src="https://webgradients.com/public/webgradients_png/045%20Loon%20Crest.png"
                alt=""
              />
            </div>

            <div className="options__item">
              <img
                src="https://webgradients.com/public/webgradients_png/045%20Loon%20Crest.png"
                alt=""
              />
            </div>

            <div className="options__item">
              <img
                src="https://webgradients.com/public/webgradients_png/045%20Loon%20Crest.png"
                alt=""
              />
            </div>
          </Slider>
        </div>
      </div>
    </ChooseCoverImageStyled>
  );
};

export default ChooseCoverImage;

const ChooseCoverImageStyled = styled.div`
  width: 50%;
  margin: 0 auto 5rem auto;

  .container {
    .coverImage {
      width: 100%;
      height: 80vh;
      margin-bottom: 2rem;

      img {
        background-size: cover;
        background-position: center;
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 1rem;
      }
    }

    .options {
      &__item {
        aspect-ratio: 1/1;
        width: 100%;
        border-radius: 0.5rem;
        transition: all 0.5s ease;
        outline: none;
        cursor: pointer;

        &:hover {
          border: 3px solid #f88946;
        }

        img {
          height: 100%;
          width: 100%;
          background-size: cover;
          background-position: center;
          object-fit: cover;
          border-radius: 0.5rem;
        }
      }

      .slick-slide {
        padding-right: 0.7rem;
      }
    }
  }

  @media screen and (max-width: 991px) {
    width: 70%;
  }

  @media screen and (max-width: 768px) {
    width: 80%;

    .container {
      .coverImage {
        margin-bottom: 1.5rem;
      }

      .options {
        .slick-slide {
          padding-right: 0.5rem;
        }
      }
    }
  }

  @media screen and (max-width: 480px) {
    width: 90%;

    .container {
      .coverImage {
        margin-bottom: 1rem;
      }
    }
  }
`;
