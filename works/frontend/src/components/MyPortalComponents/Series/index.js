import React, { useEffect, useState } from "react";
import SlickSlider from "react-slick";
import styled from "styled-components";
import SeriesCard from "./SeriesCard";

const SliderItem = styled.div`
  padding: 0 0.5rem;
  outline: none;
`;

const Series = ({ series, page = "home" }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const SliderSettings3 = {
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 3000,

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

  if (windowWidth > 768) {
    return (
      <SeriesStyled>
        {page !== 'myPortal' && series?.length && <div className="sectionTitle">Series</div>}
        <div className="content">
          {series?.map((item) => (
            <SeriesCard item={item} showDate={true} />
          ))}
        </div>
      </SeriesStyled>
    );
  } else {
    return (
      <SeriesStyled>
        {
          page !== 'myPortal' && series?.length && <div className="sectionTitle">Series</div>
        }
        <SlickSlider {...SliderSettings3}>
          {series?.map((item) => (
            <SliderItem>
              <SeriesCard item={item} showDate={true} />
            </SliderItem>
          ))}
        </SlickSlider>
      </SeriesStyled>
    );
  }
};

export default Series;

const SeriesStyled = styled.section`
  width: 100%;
  margin: 0 auto 2rem auto;
  padding: 0 5rem 2rem 5rem;
  border-bottom: 1px solid rgba(242, 242, 247, 0.2);

  .sectionTitle {
    font-family: brother-1816, sans-serif;
    font-size: 1.7rem;
    font-weight: 500;
    line-height: 1;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    > div {
      @media screen and (min-width: 768px) {
        margin-right: 30px;
        margin-bottom:2rem;
      }
    }
  }

  .slider {
    cursor: pointer;
    .slick-slide {
      padding: 0 0.5rem;
    }
  }
  .slick-slider {
    margin: 0 -17px;
  }

  @media screen and (max-width: 768px) {
    padding: 0 3rem 2rem 3rem;
  }

  @media screen and (max-width: 480px) {
    padding: 0 1rem 2rem 1rem;

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
