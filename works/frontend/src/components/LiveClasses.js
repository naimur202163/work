import React from "react";
import styled from "styled-components";
import LiveClassesCard from "./LiveClassesCard";
import Slider from "react-slick";

const Wrapper = styled.div`
  padding: 2rem 0;
  border-bottom: 1px solid rgba(242, 242, 247, 0.2);

  .parent {
    position: relative;
    top: 0;
    left: 0;
  }

  .video-info-container {
    display: flex;
    flex-direction: column;
    margin-top: 0.3rem;
  }

  .channel-avatar {
    display: flex;
    align-items: center;
    justify-content: center;

    .avatar-image {
      height: 5rem;
      width: auto;
    }

    .png-img {
      width: 5rem;
      height: auto;
    }

    .custom-image {
      height: 5rem;
      width: 5rem;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      object-fit: cover;
    }
  }

  .user {
    background: -webkit-linear-gradient(#ff4883, #fdb769);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 500;
    letter-spacing: 0.02rem;
    text-shadow: 2px 2px 10px rgba(255, 255, 255, 0.3);
    cursor: pointer;
  }

  .video-info span {
    font-size: 0.9rem;
    padding-right: 0.1rem;
  }
  .options-menu-right {
    float: right;
    padding: 0px 13px;
    color: white;
    background-color: unset;
    box-shadow: none;
  }
  .title {
    color: #f2f2f7;
    font-family: Montserrat;
    font-size: 20px;
    margin-left: 3%;
    font-weight: 600;
  }
`;

const LiveClasses = ({ video, nousername }) => {
  const SliderSettings3 = {
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    centerPadding: "20px",
    centerMode: true,
    speed: 500,
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
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Wrapper>
      {/* <div className="parent pointer">
        <VideoCardOverlay
          componentName={"LiveClasses"}
          video={video}
        ></VideoCardOverlay>
      </div> */}
      <div className="title">LIVE CLASSES</div>
      <div className="video-info-container">
        <div className="video-info">
          <Slider className="slider" {...SliderSettings3}>
            {[1, 2, 3, 4, 5, 6, 7].map((item, i) => (
              <div key={i} className="slider__item">
                <LiveClassesCard />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </Wrapper>
  );
};

export default LiveClasses;
