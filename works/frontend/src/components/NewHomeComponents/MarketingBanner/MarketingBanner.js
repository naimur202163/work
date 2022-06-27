import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";

const MarketingBanner = ({ banners, page = "home" }) => {
  const SLIDERSETTINGS = {
    customPaging: function (i) {
      return <div className="Slider__dot"></div>;
    },
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 7000,
    adaptiveHeight: true,
    dots: true,
  };

  const is1920Screen = useMediaQuery({ minWidth: 1920 });
  const is1366Screen = useMediaQuery({ minWidth: 1366, maxWidth: 1920 });
  const is1280Screen = useMediaQuery({ minWidth: 1280, maxWidth: 1366 });
  const is1024Screen = useMediaQuery({ minWidth: 1024, maxWidth: 1280 });
  const is834Screen = useMediaQuery({ minWidth: 834, maxWidth: 1024 });
  const is768Screen = useMediaQuery({ minWidth: 768, maxWidth: 834 });
  const is428Screen = useMediaQuery({ minWidth: 428, maxWidth: 768 });
  const is414Screen = useMediaQuery({ minWidth: 414, maxWidth: 428 });
  const is375Screen = useMediaQuery({ minWidth: 375, maxWidth: 414 });

  if (banners && banners.length > 0) {
    let filteredBanner;
    if (page == "myPortal") {
      filteredBanner = banners.filter((banner) => banner.bannerLocation === 0);
    } else {
      filteredBanner = banners.filter((banner) => banner.bannerLocation === 0);
    }

    return (
      <MarketingBannerStyled>
        <Slider {...SLIDERSETTINGS} className="Slider">
          {filteredBanner &&
            filteredBanner.map((banner, i) => (
              <div key={i} className="Slider__item">
                {is1920Screen ? (
                  <img
                    className="Slider__item--banner"
                    src={
                      banner.bannerImgPathInternal_XL_1920x400
                        ? banner.bannerImgPathInternal_XL_1920x400
                        : banner.bannerImgPathBackup
                    }
                    alt="Marketing Banner"
                  />
                ) : is1366Screen ? (
                  <img
                    className="Slider__item--banner"
                    src={
                      banner.bannerImgPathInternal_L_1366x400
                        ? banner.bannerImgPathInternal_L_1366x400
                        : banner.bannerImgPathBackup
                    }
                    alt="Marketing Banner"
                  />
                ) : is1280Screen ? (
                  <img
                    className="Slider__item--banner"
                    src={
                      banner.bannerImgPathInternal_L_1280x400
                        ? banner.bannerImgPathInternal_L_1280x400
                        : banner.bannerImgPathBackup
                    }
                    alt="Marketing Banner"
                  />
                ) : is1024Screen ? (
                  <img
                    className="Slider__item--banner"
                    src={
                      banner.bannerImgPathInternal_L_1024x400
                        ? banner.bannerImgPathInternal_L_1024x400
                        : banner.bannerImgPathBackup
                    }
                    alt="Marketing Banner"
                  />
                ) : is834Screen ? (
                  <img
                    className="Slider__item--banner"
                    src={
                      banner.bannerImgPathInternal_MD_834x400
                        ? banner.bannerImgPathInternal_MD_834x400
                        : banner.bannerImgPathBackup
                    }
                    alt="Marketing Banner"
                  />
                ) : is768Screen ? (
                  <img
                    className="Slider__item--banner"
                    src={
                      banner.bannerImgPathInternal_MD_768x400
                        ? banner.bannerImgPathInternal_MD_768x400
                        : banner.bannerImgPathBackup
                    }
                    alt="Marketing Banner"
                  />
                ) : is428Screen ? (
                  <img
                    className="Slider__item--banner"
                    src={
                      banner.bannerImgPathInternal_SM_428x250
                        ? banner.bannerImgPathInternal_SM_428x250
                        : banner.bannerImgPathBackup
                    }
                    alt="Marketing Banner"
                  />
                ) : is414Screen ? (
                  <img
                    className="Slider__item--banner"
                    src={
                      banner.bannerImgPathInternal_SM_414x250
                        ? banner.bannerImgPathInternal_SM_414x250
                        : banner.bannerImgPathBackup
                    }
                    alt="Marketing Banner"
                  />
                ) : is375Screen ? (
                  <img
                    className="Slider__item--banner"
                    src={
                      banner.bannerImgPathInternal_SM_375x250
                        ? banner.bannerImgPathInternal_SM_375x250
                        : banner.bannerImgPathBackup
                    }
                    alt="Marketing Banner"
                  />
                ) : (
                  <img
                    className="Slider__item--banner"
                    src={
                      banner.bannerImgPathInternal_XL_1920x400
                        ? banner.bannerImgPathInternal_XL_1920x400
                        : banner.bannerImgPathBackup
                    }
                    alt="Marketing Banner"
                  />
                )}
              </div>
            ))}
        </Slider>
      </MarketingBannerStyled>
    );
  }

  return null;
};

export default MarketingBanner;

const MarketingBannerStyled = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(242, 242, 247, 0.2);
  padding: 0 0 2rem 0;

  .Slider {
    z-index: 2;
    position: relative;

    &__item {
      width: 100%;
      outline: none;

      &--banner {
        height: auto;
        width: 100%;
        background-size: cover;
        background-position: center;
        object-fit: cover;
        max-height: 400px;
      }
    }

    &__dot {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.8);
      transition: all 0.2s ease;
    }

    .slick-dots {
      bottom: -20px;

      li {
        margin: 0;
        padding: 0;
        height: 11px;
        width: 11px;
        transition: all 0.2s ease;

        &:not(:last-child) {
          margin-right: 10px;
        }
      }
    }

    .slick-active .Slider__dot {
      background: ${(props) => props.theme.gradient} !important;
      transform: scale(1.2);
    }
  }

  /* responsive */
  @media screen and (max-width: 768px) {
    .Slider {
      &__item {
        &--banner {
          max-height: 300px;
        }
      }

      .slick-dots {
        bottom: -20px;

        li {
          height: 10px;
          width: 10px;

          &:not(:last-child) {
            margin-right: 8px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 480px) {
    .Slider {
      &__item {
        &--banner {
          max-height: 250px;
        }
      }

      .slick-dots {
        bottom: -15px;

        li {
          height: 8px;
          width: 8px;

          &:not(:last-child) {
            margin-right: 6px;
          }
        }
      }
    }
  }
`;
