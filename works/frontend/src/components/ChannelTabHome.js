import React, { useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import ChannelSuggestion from "./ChannelTabHomeComponents/ChannelSuggestion";
import MarketingSlider from "./ChannelTabHomeComponents/MarketingSlider";
import { useSelector, useDispatch } from "react-redux";
import { getWarriorSlider, getFeaturedWarriors } from "../actions/index";
import { useRouteMatch } from "react-router-dom";
import { Row, Col } from "react-grid-system";
import ContactBanner from "./Footer/ContactBanner";
import Footer from "./Footer/Footer";
import { GlobalContext } from "../context/GlobalContext";
import VideoCardMoreFrom from "../components/VideoCardMoreFrom";

function Arrow(props) {
  let classNames = props.type === "next" ? "nextArrow" : "prevArrow";
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

const ChannelTabHome = ({ profile, userById, visitorBadge }) => {
  const { setShowEditProfileModel } = useContext(GlobalContext);
  const route = useRouteMatch();
  const dispatch = useDispatch();
  const { firstname, lastname, username, cover, tagline, isMe, videos } =
    profile;

  const sliders = useSelector((state) => state.slider);
  const featuredWarriors = useSelector((state) => state.featuredWarriors);

  // new add
  const tempFunction = useRef();
  const imgFunction = () => {
    dispatch(getWarriorSlider());
    dispatch(getFeaturedWarriors());
  };
  tempFunction.current = imgFunction;
  useEffect(() => {
    tempFunction.current();
  }, [route.params.userId]);

  const SliderSettings = {
    nextArrow: <Arrow type="next" />,
    prevArrow: <Arrow type="prev" />,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    speed: 500,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const isPngOrJpg = () => {
    const image = !profile.avatar ? profile.badge : profile.avatar;

    if (image && (image.includes(".png") || image.includes(".svg"))) {
      return (
        <img
          className={`${image.includes(".png") ? "png-img" : "avatar-image"}`}
          src={image}
          alt="badge"
        />
      );
    } else {
      return <img className="custom-image" src={image} alt="badge" />;
    }
  };

  let featuredVideos = [];
  if (videos && videos.length > 0) {
    featuredVideos = videos.filter((video) => {
      return video.featuredWarriorPortal === true;
    });
  }

  return (
    <>
      <TabHomeComponent>
        <div className="tab">
          <div className="tabheader">
            <img
              className="tabheader__banner"
              src={cover}
              alt={firstname + lastname}
            />

            {isPngOrJpg()}
          </div>

          <div className="warriorinfo">
            <h1 className="warriorinfo__gradientName">{username}</h1>
            {tagline && (
              <span className="warriorinfo_tagline">
                {tagline}
                {isMe && (
                  <i
                    onClick={() => setShowEditProfileModel(true)}
                    className="fas fa-pen"
                  />
                )}
              </span>
            )}
          </div>

          {featuredVideos && featuredVideos.length > 0 && (
            <div className="videosTitle">Videos</div>
          )}

          {featuredVideos && featuredVideos.length < 3 && (
            <div>
              <Row>
                {featuredVideos.map((video, i) => (
                  <Col xl={4} md={6} sm={12}>
                    <VideoCardMoreFrom
                      key={video.id}
                      hideavatar={true}
                      video={video}
                      nousername={false}
                      customClass={"card-margin"}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          )}
          {featuredVideos && featuredVideos.length >= 3 && (
            <div>
              <Slider {...SliderSettings}>
                {featuredVideos.map((video, i) => (
                  <VideoCardMoreFrom
                    key={video.id}
                    hideavatar={true}
                    video={video}
                    nousername={false}
                    customClass={"card-margin"}
                  />
                ))}
              </Slider>
            </div>
          )}
        </div>

        {sliders && sliders.length > 0 && <MarketingSlider sliders={sliders} />}

        <div className="tab">
          {featuredWarriors && featuredWarriors.length > 0 && (
            <ChannelSuggestion featuredWarriors={featuredWarriors} />
          )}
        </div>
      </TabHomeComponent>

      <ContactBanner />
      <Footer />
    </>
  );
};

export default ChannelTabHome;

const TabHomeComponent = styled.div`
  width: 100%;

  .tab {
    margin: 0 auto;
    margin-top: 1.5rem;
    width: 80%;

    @media screen and (max-width: 860px) {
      width: 90%;
    }
  }

  .tabheader {
    position: relative;
    width: 100%;
    height: 20rem;
    box-shadow: rgba(255, 255, 255, 0.15) 0px 48px 100px 0px;
    margin-bottom: 4rem;

    &__banner {
      height: 100%;
      width: 100%;
      background-size: cover;
      background-position: center;
      object-fit: cover;
      border-radius: 5px;
    }

    .avatar-image {
      width: 9rem;
      height: auto;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateY(50%) translateX(-50%);
    }

    .png-img {
      width: 9rem;
      height: auto;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateY(50%) translateX(-50%);
    }

    .custom-image {
      position: absolute;
      bottom: 0;
      left: 50%;
      height: 9rem;
      width: 9rem;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      object-fit: cover;
      border: 5px solid #fff;
      transform: translateY(50%) translateX(-50%);
    }
  }

  .warriorinfo {
    text-align: center;
    margin-bottom: 5rem;
    padding-left: 10%;
    padding-right: 10%;

    &__gradientName {
      font-size: 1.8rem;
      background: -webkit-linear-gradient(#ff4883, #fdb769);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-family: komet, sans-serif;
      font-weight: 600;
      letter-spacing: 0.02rem;
      cursor: pointer;
    }

    &__tagline {
      font-size: 17px;
      font-weight: 300;
      line-height: 1;

      i {
        padding-left: 0.5rem;
        cursor: pointer;
      }
    }
  }

  .videosBox {
    margin-bottom: 3rem;
  }

  .videosTitle {
    padding: 0.3rem;
    font-size: 1.5rem;
    color: #fff;
    border-top: 1px solid #fff;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 1rem;
    margin-bottom: 1rem;

    span {
      font-size: 0.9rem;
      color: #b0b0b0;
    }
  }

  .prevArrow {
    position: absolute;
    top: 30%;
    cursor: pointer;
    left: 0;
    font-size: 2rem;
    color: #fff;
    transform: translateX(-1rem);
    z-index: 2;
  }

  .nextArrow {
    position: absolute;
    top: 30%;
    cursor: pointer;
    right: 0;
    transform: translateX(1rem);
    font-size: 2rem;
    color: #fff;
  }
`;
