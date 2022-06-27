import React, { useEffect, useState } from "react";
import SlickSlider from "react-slick";
import VideoClipGrid from "./VideoClipGrid";
import VideoClipCard from "./VideoClipCard";
import styled from "styled-components";
import Button from "../../../styles/Button";

const SliderItem = styled.div`
  padding: 0 0.5rem;
  outline: none;
`;

const Clips = ({ clipVideos, page = "home", noAvatar = false }) => {
  const [videoClipLength, setVideoClipLength] = useState(8);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      handleResize();
    });
  }, []);

  const videoClipHandler = () => {
    if (videoClipLength == 8) return setVideoClipLength(16);
    setVideoClipLength(8);
  };

  if (windowWidth > 768) {
    return (
      <ClipsStyled>
        {page != "myPortal" && <div className="sectionTitle">Clips</div>}

        <VideoClipGrid>
          {!clipVideos.isFetching &&
            clipVideos.videos
              .slice(0, videoClipLength)
              .map((video) => (
                <VideoClipCard
                  key={video.id}
                  video={video}
                  noAvatar={noAvatar}
                />
              ))}
        </VideoClipGrid>
        <br />
        <br />
        <Button onClick={videoClipHandler}>
          {videoClipLength == 8 ? <>Load More</> : <>Load Less</>}
        </Button>
      </ClipsStyled>
    );
  } else {
    return (
      <ClipsStyled>
        {page != "myPortal" && <div className="sectionTitle">Clips</div>}
        <SlickSlider {...SliderSettings3}>
          {!clipVideos.isFetching &&
            clipVideos.videos.map((video) => (
              <SliderItem>
                <VideoClipCard
                  key={video.id}
                  video={video}
                  noAvatar={noAvatar}
                />
              </SliderItem>
            ))}
        </SlickSlider>
      </ClipsStyled>
    );
  }
};

export default Clips;

const ClipsStyled = styled.section`
  width: 100%;
  padding: 2rem 5rem;
  border-bottom: 1px solid rgba(242, 242, 247, 0.2);

  .sectionTitle {
    font-family: brother-1816, sans-serif;
    font-size: 1.7rem;
    font-weight: 500;
    line-height: 1;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .slider {
    cursor: pointer;
    .slick-slide {
      padding: 0 0.5rem;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 2rem;
  }

  @media screen and (max-width: 480px) {
    padding: 2rem 1rem;

    .sectionTitle {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .slider {
      .slick-slide {
        padding: 0 0.2rem;
      }
    }
  }
`;
