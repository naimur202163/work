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

const SignupMarketingBanner = ({ children, banner }) => {
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

  if (!banner) {
    return <>{children}</>;
  }

  if (banner.length === 1) {
    return (
      <StyleComponent>
        {/* 1 */}
        <div className="singleBanner">
          {is1920Screen ? (
            <img
              src={
                banner[0].bannerImgPathInternal_XL_1920x400
                  ? banner[0].bannerImgPathInternal_XL_1920x400
                  : banner[0].bannerImgPathBackup
              }
              alt="Marketing Banner"
            />
          ) : is1366Screen ? (
            <img
              src={
                banner[0].bannerImgPathInternal_L_1366x400
                  ? banner[0].bannerImgPathInternal_L_1366x400
                  : banner[0].bannerImgPathBackup
              }
              alt="Marketing Banner"
            />
          ) : is1280Screen ? (
            <img
              src={
                banner[0].bannerImgPathInternal_L_1280x400
                  ? banner[0].bannerImgPathInternal_L_1280x400
                  : banner[0].bannerImgPathBackup
              }
              alt="Marketing Banner"
            />
          ) : is1024Screen ? (
            <img
              src={
                banner[0].bannerImgPathInternal_L_1024x400
                  ? banner[0].bannerImgPathInternal_L_1024x400
                  : banner[0].bannerImgPathBackup
              }
              alt="Marketing Banner"
            />
          ) : is834Screen ? (
            <img
              src={
                banner[0].bannerImgPathInternal_MD_834x400
                  ? banner[0].bannerImgPathInternal_MD_834x400
                  : banner[0].bannerImgPathBackup
              }
              alt="Marketing Banner"
            />
          ) : is768Screen ? (
            <img
              src={
                banner[0].bannerImgPathInternal_MD_768x400
                  ? banner[0].bannerImgPathInternal_MD_768x400
                  : banner[0].bannerImgPathBackup
              }
              alt="Marketing Banner"
            />
          ) : is428Screen ? (
            <img
              src={
                banner[0].bannerImgPathInternal_SM_428x250
                  ? banner[0].bannerImgPathInternal_SM_428x250
                  : banner[0].bannerImgPathBackup
              }
              alt="Marketing Banner"
            />
          ) : is414Screen ? (
            <img
              src={
                banner[0].bannerImgPathInternal_SM_414x250
                  ? banner[0].bannerImgPathInternal_SM_414x250
                  : banner[0].bannerImgPathBackup
              }
              alt="Marketing Banner"
            />
          ) : is375Screen ? (
            <img
              src={
                banner[0].bannerImgPathInternal_SM_375x250
                  ? banner[0].bannerImgPathInternal_SM_375x250
                  : banner[0].bannerImgPathBackup
              }
              alt="Marketing Banner"
            />
          ) : (
            <img
              src={
                banner[0].bannerImgPathInternal_XL_1920x400
                  ? banner[0].bannerImgPathInternal_XL_1920x400
                  : banner[0].bannerImgPathBackup
              }
              alt="Marketing Banner"
            />
          )}

          {(banner[0].title ||
            banner[0].description ||
            banner[0].button1Text ||
            banner[0].button1Url ||
            banner[0].button2Text ||
            banner[0].button2Url) && (
            <div className="infoBlock">
              {banner[0].title && <h1>{banner[0].title}</h1>}
              {banner[0].description && <p>{banner[0].description}</p>}
              <div className="infoBlock__btnGroup">
                {banner[0].button1Text && (
                  <a href={banner[0]?.button1Url} target="_blank" rel="noopener noreferrer">
                    <button className="buttonPrimary">
                      {banner[0].button1Text}
                    </button>
                  </a>
                )}

                {banner[0].button2Text && (
                  <button className="buttonSecondary">
                    <a href={banner[0]?.button2Url} target="_blank" rel="noopener noreferrer">
                      {banner[0].button2Text}
                    </a>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {children}
      </StyleComponent>
    );
  }

  if (banner.length > 1) {
    return (
      <StyleComponent>
        <Slider {...settings}>
          {banner.map((banner, i) => (
            <div key={i} className="SliderItem">
              <div className="infoBlock">
                <h1>Awesome heading goes here and only here. </h1>

                <div className="infoBlock__btnGroup">
                  <button className="buttonPrimary">Button 1</button>

                  <button className="buttonSecondary">Button 2</button>
                </div>
              </div>

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
        {children}
      </StyleComponent>
    );
  }
};

export default SignupMarketingBanner;

const StyleComponent = styled.div`
  width: 100vw;

  img {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    object-fit: cover;
  }

  .singleBanner {
    height: auto;
    position: relative;

    .infoBlock {
      position: absolute;
      top: 50%;
      width: 50%;
      max-width: auto;
      left: 50%;
      transform: translate(-50%, -50%);
      // background: rgba(0, 0, 0, 0.5);
      padding: 1rem;
      border-radius: 0.4rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      h1 {
        font-size: 1.5rem;
        font-weight: 400;
        text-transform: capitalize;
        line-height: 1;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1rem;
        font-weight: 400;
        border-radius: 0.3rem;
        margin-bottom: 1.5rem;
      }

      &__btnGroup {
        display: flex;
        align-items: center;

        button {
          border: none;
          outline: none;
          padding: 0.5rem 1.5rem;
          transition: all 0.2s ease;
          font-size: 0.85rem;
          font-weight: 300;
          border-radius: 0.3rem;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .buttonPrimary {
          margin-right: 0.5rem;
          margin-top: 5rem;
          background: ${(props) => props.theme.gradient};
          color: #fff;

          &:hover {
            color: rgb(249, 154, 45);
            background: #fff;
          }
        }

        .buttonSecondary {
          margin-left: 0.5rem;
          background-color: rgba(0, 0, 0, 0.5);
          color: #fff;

          &:hover {
            background-color: #fff;
            color: rgba(0, 0, 0, 0.5);
          }
        }
      }

      @media screen and (max-width: 768px) {
        width: 70%;
      }

      @media screen and (max-width: 480px) {
        width: 85%;

        h1 {
          font-size: 1rem;
        }

        p {
          font-size: 0.8rem;
        }

        button {
          padding: 0.3rem 1rem;
          font-size: 0.7rem;
          border-radius: 0.2rem;
        }
      }
    }
  }

  .SliderItem {
    width: 100%;
    position: relative;
    outline: none;
    height: auto;

    .infoBlock {
      position: absolute;
      top: 50%;
      width: 50%;
      max-width: auto;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.5);
      padding: 1rem;
      border-radius: 0.4rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      h1 {
        font-size: 1.5rem;
        font-weight: 400;
        text-transform: capitalize;
        line-height: 1;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1rem;
        font-weight: 400;
        border-radius: 0.3rem;
        margin-bottom: 1.5rem;
      }

      &__btnGroup {
        display: flex;
        align-items: center;

        button {
          border: none;
          outline: none;
          padding: 0.5rem 1.5rem;
          transition: all 0.2s ease;
          font-size: 0.85rem;
          font-weight: 300;
          border-radius: 0.3rem;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .buttonPrimary {
          margin-right: 0.5rem;
          background: ${(props) => props.theme.gradient};
          color: #fff;

          &:hover {
            color: rgb(249, 154, 45);
            background: #fff;
          }
        }

        .buttonSecondary {
          margin-left: 0.5rem;
          background-color: rgba(0, 0, 0, 0.5);
          color: #fff;

          &:hover {
            background-color: #fff;
            color: rgba(0, 0, 0, 0.5);
          }
        }
      }

      @media screen and (max-width: 768px) {
        width: 70%;
      }

      @media screen and (max-width: 480px) {
        width: 85%;

        h1 {
          font-size: 1rem;
        }

        p {
          font-size: 0.8rem;
        }

        button {
          padding: 0.3rem 1rem;
          font-size: 0.7rem;
          border-radius: 0.2rem;
        }
      }
    }

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
