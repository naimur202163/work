import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { Link } from "react-router-dom";

function Arrow(props) {
  let classNames =
    props.type === "next" ? "marketingSliderNext" : "marketingSliderPrev";
  classNames += " arrow";

  const Icon =
    props.type === "next" ? (
      <i className="fas fa-chevron-right" />
    ) : (
      <i className="fas fa-chevron-left" />
    );

  return (
    <div className={classNames} onClick={props.onClick}>
      {Icon}
    </div>
  );
}

const MarketingSlider = (props) => {
  const { sliders } = props;

  const settings = {
    nextArrow: <Arrow type="next" />,
    prevArrow: <Arrow type="prev" />,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 7000,
    fade: true,
    adaptiveHeight: true,
  };

  return (
    <MarketingSliderComponent>
      <Slider {...settings}>
        {sliders.map((slider, index) => (
          <div key={`slider-${index}`} className="SliderItem">
            <img
              src={
                slider.bannerImgPathInternal_XL_1920x400
                  ? slider.bannerImgPathInternal_XL_1920x400
                  : slider.bannerImgPathBackup
              }
              alt={slider.title}
            />

            <div className="overlay" />

            <div className="content">
              {slider.title ? (
                <h1 className="content__title">{slider.title}</h1>
              ) : null}

              {slider.description ? (
                <p className="content__paragraph">{slider.description}</p>
              ) : null}

              <div className="content__button">
                {slider.button1Text ? (
                  <button>
                    <Link href={`${slider.button1Url}`} target="_blank">
                      {slider.button1Text}
                    </Link>
                  </button>
                ) : null}

                {slider.button2Text ? (
                  <button>
                    <Link href={slider.button2Url} target="_blank">
                      {slider.button2Text}
                    </Link>
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </MarketingSliderComponent>
  );
};

export default MarketingSlider;

const MarketingSliderComponent = styled.div`
  margin-bottom: 3rem;
  margin-top: 2rem;

  .SliderItem {
    width: 100%;
    height: 75vh;
    position: relative;

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.2);
    }

    img {
      background-size: cover;
      width: 100%;
      height: 100%;
      background-position: center;
      justify-content: center;
      object-fit: cover;
      z-index: -1;
    }

    .content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70%;
      z-index: 3;

      &__title {
        background-color: rgba(0, 0, 0, 0.4);
        color: #fff;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        font-size: 2.2rem;
        text-transform: uppercase;
        font-weight: 500;
        margin-bottom: 2rem;
        display: inline-block;
        line-height: 1.3;
      }

      &__paragraph {
        background-color: rgba(0, 0, 0, 0.4);
        color: #fff;
        padding: 0 1rem;
        border-radius: 7px;
        font-size: 1.2rem;
        font-weight: 300;
        margin-bottom: 2rem;
        display: inline-block;
      }

      &__button {
        width: 100%;
        text-align: right;

        button {
          border: none;
          outline: none;
          background: ${(props) => props.theme.gradient};
          color: #fff;
          text-transform: uppercase;
          font-size: 1.2rem;
          font-weight: 400;
          letter-spacing: 0.2px;
          padding: 1.2rem 2rem;
          border-radius: 5px;
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          transition: all 0.2s ease;
          // margin: 0 0.5rem;
          margin-top: 10px;
          margin-lef: 0.5rem;
          margin-right: 0.5rem;

          &:hover {
            // border: 2px solid #ffa200;
            color: ${(props) => props.theme.white};
            transform: scale(0.95);
            background-color: ${(props) => props.theme.pink};
          }
        }
      }
    }
  }

  .marketingSliderNext {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    right: 3rem;
    font-size: 2rem;
  }

  .marketingSliderPrev {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    left: 3rem;
    z-index: 2;
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    .SliderItem {
      .content {
        width: 80%;

        &__title {
          font-size: 1.7rem;
        }

        &__paragraph {
          font-size: 0.9rem;
        }

        &__button {
          button {
            font-size: 0.9rem;
            padding: 0.8rem 1.8rem;
          }
        }
      }
    }

    .marketingSliderPrev {
      left: 1.5rem;
      font-size: 1.5rem;
    }

    .marketingSliderNext {
      right: 1.5rem;
      font-size: 1.5rem;
    }
  }
`;
