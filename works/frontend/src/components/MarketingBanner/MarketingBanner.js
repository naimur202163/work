import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";

function Arrow(props) {
  let classNames =
    props.type === "next" ? "MarketingBannerNext" : "MarketingBannerPrev";
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

const MarketingBanner = (props) => {
  const { banners } = props;

  const settings = {
    nextArrow: <Arrow type="next" />,
    prevArrow: <Arrow type="prev" />,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 7000,
    adaptiveHeight: true,
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

  if (banners.length === 0) {
    return null;
  }

  if (banners.length === 1) {
    return (
      <MarketingBannerComponent>
        {is1920Screen ? (
          <img
            src={
              banners[0].bannerImgPathInternal_XL_1920x400
                ? banners[0].bannerImgPathInternal_XL_1920x400
                : banners[0].bannerImgPathBackup
            }
            alt="Marketing Banner"
          />
        ) : is1366Screen ? (
          <img
            src={
              banners[0].bannerImgPathInternal_L_1366x400
                ? banners[0].bannerImgPathInternal_L_1366x400
                : banners[0].bannerImgPathBackup
            }
            alt="Marketing Banner"
          />
        ) : is1280Screen ? (
          <img
            src={
              banners[0].bannerImgPathInternal_L_1280x400
                ? banners[0].bannerImgPathInternal_L_1280x400
                : banners[0].bannerImgPathBackup
            }
            alt="Marketing Banner"
          />
        ) : is1024Screen ? (
          <img
            src={
              banners[0].bannerImgPathInternal_L_1024x400
                ? banners[0].bannerImgPathInternal_L_1024x400
                : banners[0].bannerImgPathBackup
            }
            alt="Marketing Banner"
          />
        ) : is834Screen ? (
          <img
            src={
              banners[0].bannerImgPathInternal_MD_834x400
                ? banners[0].bannerImgPathInternal_MD_834x400
                : banners[0].bannerImgPathBackup
            }
            alt="Marketing Banner"
          />
        ) : is768Screen ? (
          <img
            src={
              banners[0].bannerImgPathInternal_MD_768x400
                ? banners[0].bannerImgPathInternal_MD_768x400
                : banners[0].bannerImgPathBackup
            }
            alt="Marketing Banner"
          />
        ) : is428Screen ? (
          <img
            src={
              banners[0].bannerImgPathInternal_SM_428x250
                ? banners[0].bannerImgPathInternal_SM_428x250
                : banners[0].bannerImgPathBackup
            }
            alt="Marketing Banner"
          />
        ) : is414Screen ? (
          <img
            src={
              banners[0].bannerImgPathInternal_SM_414x250
                ? banners[0].bannerImgPathInternal_SM_414x250
                : banners[0].bannerImgPathBackup
            }
            alt="Marketing Banner"
          />
        ) : is375Screen ? (
          <img
            src={
              banners[0].bannerImgPathInternal_SM_375x250
                ? banners[0].bannerImgPathInternal_SM_375x250
                : banners[0].bannerImgPathBackup
            }
            alt="Marketing Banner"
          />
        ) : (
          <img
            src={
              banners[0].bannerImgPathInternal_XL_1920x400
                ? banners[0].bannerImgPathInternal_XL_1920x400
                : banners[0].bannerImgPathBackup
            }
            alt="Marketing Banner"
          />
        )}
      </MarketingBannerComponent>
    );
  }

  return (
    <MarketingBannerComponent>
      <Slider {...settings}>
        {banners.map((banner, i) => (
          <div className="SliderItem" key={i}>
            {is1920Screen ? (
              <img
                src={
                  banner.bannerImgPathInternal_XL_1920x400
                    ? banner.bannerImgPathInternal_XL_1920x400
                    : banner.bannerImgPathBackup
                }
                alt="Marketing Banner"
              />
            ) : is1366Screen ? (
              <img
                src={
                  banner.bannerImgPathInternal_L_1366x400
                    ? banner.bannerImgPathInternal_L_1366x400
                    : banner.bannerImgPathBackup
                }
                alt="Marketing Banner"
              />
            ) : is1280Screen ? (
              <img
                src={
                  banner.bannerImgPathInternal_L_1280x400
                    ? banner.bannerImgPathInternal_L_1280x400
                    : banner.bannerImgPathBackup
                }
                alt="Marketing Banner"
              />
            ) : is1024Screen ? (
              <img
                src={
                  banner.bannerImgPathInternal_L_1024x400
                    ? banner.bannerImgPathInternal_L_1024x400
                    : banner.bannerImgPathBackup
                }
                alt="Marketing Banner"
              />
            ) : is834Screen ? (
              <img
                src={
                  banner.bannerImgPathInternal_MD_834x400
                    ? banner.bannerImgPathInternal_MD_834x400
                    : banner.bannerImgPathBackup
                }
                alt="Marketing Banner"
              />
            ) : is768Screen ? (
              <img
                src={
                  banner.bannerImgPathInternal_MD_768x400
                    ? banner.bannerImgPathInternal_MD_768x400
                    : banner.bannerImgPathBackup
                }
                alt="Marketing Banner"
              />
            ) : is428Screen ? (
              <img
                src={
                  banner.bannerImgPathInternal_SM_428x250
                    ? banner.bannerImgPathInternal_SM_428x250
                    : banner.bannerImgPathBackup
                }
                alt="Marketing Banner"
              />
            ) : is414Screen ? (
              <img
                src={
                  banner.bannerImgPathInternal_SM_414x250
                    ? banner.bannerImgPathInternal_SM_414x250
                    : banner.bannerImgPathBackup
                }
                alt="Marketing Banner"
              />
            ) : is375Screen ? (
              <img
                src={
                  banner.bannerImgPathInternal_SM_375x250
                    ? banner.bannerImgPathInternal_SM_375x250
                    : banner.bannerImgPathBackup
                }
                alt="Marketing Banner"
              />
            ) : (
              <img
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
    </MarketingBannerComponent>
  );
};

export default MarketingBanner;

const MarketingBannerComponent = styled.div`
  width: 100vw;

  img {
    height: auto;
    background-size: cover;
    background-position: center;
    object-fit: cover;
    width: 100vw;

    @media screen and (max-width: 375px) {
      width: auto;
    }
  }

  .SliderItem {
    width: 100%;
    position: relative;
    outline: none;

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  .MarketingBannerNext {
    position: absolute;
    top: 40%;
    transform: scale(0.8);
    cursor: pointer;
    right: 2rem;
    font-size: 1.8rem;
    height: 3.2rem;
    width: 3.2rem;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    transition-delay: 0.1s;
    opacity: 0;
    transform-origin: center;

    &:hover {
      background: ${(props) => props.theme.gradient};
    }
  }

  .MarketingBannerPrev {
    position: absolute;
    top: 40%;
    transform: scale(0.8);
    cursor: pointer;
    left: 1rem;
    z-index: 2;
    font-size: 1.8rem;
    height: 3.2rem;
    width: 3.2rem;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    transition-delay: 0.1s;
    opacity: 0;
    transform-origin: center;

    &:hover {
      background: ${(props) => props.theme.gradient};
    }
  }

  &:hover {
    .MarketingBannerNext,
    .MarketingBannerPrev {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (max-width: 768px) {
    .MarketingBannerPrev {
      left: 1rem;
      font-size: 1.2rem;
      height: 2.5rem;
      width: 2.5rem;
    }

    .MarketingBannerNext {
      right: 1.8rem;
      font-size: 1.2rem;
      height: 2.5rem;
      width: 2.5rem;
    }
  }
`;
