import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import VideoCardV2 from "../components/VideoCardV2";
import VideoCardV3 from "../components/VideoCardV3";
import VideoCardFeatured from "../components/VideoCardFeatured";
import VideoGridV2 from "../styles/VideoGridV2";
import VideoGridV3 from "../styles/VideoGridV3";
import VideoGridTrending from "../styles/VideoGridTrending";
import VideoCardTrending from "../components/VideoCardTrending"; 
// import VideoClipCard from "../components/NewHomeComponents/Clips/VideoClipCard";
import FeaturedVideoGrid from "../styles/VideoGridFeatured";
import Footer from "../components/Footer/Footer";
import { ScrollToTop } from "../utils/index";
import { getMarketingBanners, getVideos } from "../actions";
import Skeleton from "../skeletons/HomeSkeleton";
import SlickSlider from "react-slick";
import ContactBanner from "../components/Footer/ContactBanner";
import MarketingBanner from "../components/MarketingBanner/MarketingBanner";
import { setAuthHeader } from "../services/api";
// import HomeCategoryFilter from "../components/HomeCategoryFilter";

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

function MarketingBannerLayout(props) {
  const banners = useSelector((state) => state.marketingBanner);
  const dispatch = useDispatch();

  let filteredBanner = [];

  const tempFunc = useRef();
  const newdataFunc = () => {
    dispatch(getMarketingBanners());
  };
  tempFunc.current = newdataFunc;
  useEffect(() => {
    tempFunc.current();
  }, []);

  if (banners.length > 0) {
    filteredBanner = banners.filter((banner) => banner.bannerLocation === 0);
  }

  return (
    <>
      <MarketingBanner banners={filteredBanner} />
      {props.children}
    </>
  );
}

function Arrow2(props) {
  let classNames = props.type === "next" ? "nextArrow2" : "prevArrow2";
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

export const StyledHome = styled.div`
  padding: 1.3rem;
  width: 90%;
  margin: 0 auto;
  padding-bottom: 3rem;

  .title1 {
    margin-bottom: 1rem;
    font-size: 1.7rem;
    text-transform: capitalize;
    background: white;
    // text-decoration: underline;
    text-decoration-color: #f66978;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .title2 {
    margin-bottom: 1rem;
    font-size: 1.7rem;
    text-transform: capitalize;
    background: white;
    // text-decoration: underline;
    text-decoration-color: #f66978;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .title3 {
    margin-bottom: 1rem;
    font-size: 1.7rem;
    text-transform: capitalize;
    background: white;
    // text-decoration: underline;
    text-decoration-color: #f66978;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .title4 {
    margin-bottom: 1rem;
    font-size: 1.7rem;
    text-transform: capitalize;
    background: white;
    // text-decoration: underline;
    text-decoration-color: #f66978;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .prevArrow {
    position: absolute;
    top: 35%;
    cursor: pointer;
    left: 0;
    font-size: 2rem;
    color: #fff;
    transform: translateX(-1rem);
    z-index: 2;
  }

  .nextArrow {
    position: absolute;
    top: 35%;
    cursor: pointer;
    right: 0;
    transform: translateX(1rem);
    font-size: 2rem;
    color: #fff;
  }

  .prevArrow2 {
    position: absolute;
    top: 20%;
    cursor: pointer;
    left: 0;
    font-size: 2rem;
    color: #fff;
    transform: translateX(-1rem);
    z-index: 2;
  }

  .nextArrow2 {
    position: absolute;
    top: 20%;
    cursor: pointer;
    right: 0;
    transform: translateX(1rem);
    font-size: 2rem;
    color: #fff;
  }

  @media (max-width: 991px) {
    .prevArrow {
      font-size: 1.8rem;
      transform: translateX(1rem);
    }

    .nextArrow {
      transform: translateX(-1rem);
      font-size: 1.8rem;
    }
  }

  @media screen and (max-width: 1093px) {
    width: 95%;
  }

  @media screen and (max-width: 1090px) {
    width: 99%;
  }

  @media screen and (max-width: 870px) {
    width: 90%;
  }

  @media screen and (max-width: 670px) {
    width: 99%;
    .next-arrow-3 {
      display: none;
    }
    .prev-arrow-3 {
      display: none;
    }
  }

  @media screen and (max-width: 600px) {
    width: 90%;
    .next-arrow-3 {
      display: none;
    }
    .prev-arrow-3 {
      display: none;
    }
  }

  @media screen and (max-width: 530px) {
    width: 100%;
    .next-arrow-3 {
      display: none;
    }
    .prev-arrow-3 {
      display: none;
    }
  }
`;

const SliderItem = styled.div`
  padding: 0 0.5rem;
  outline: none;
`;

const Home = () => {
  const SliderSettings = {
    nextArrow: <Arrow type="next" />,
    prevArrow: <Arrow type="prev" />,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    speed: 500,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const SliderSettings2 = {
    nextArrow: <Arrow2 type="next" />,
    prevArrow: <Arrow2 type="prev" />,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    speed: 500,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
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

  const dispatch = useDispatch();
  const { featuredVideos, featuredFetching } = useSelector(
    (state) => state.featured
  );
  const trending = useSelector((state) => state.trending);
  const latest = useSelector((state) => state.latest);
  const staffPick = useSelector((state) => state.staffPick);

  const tempFunction = useRef();
  const newdataFunction = () => {
    setAuthHeader();
    dispatch(getVideos());
  };
  tempFunction.current = newdataFunction;
  useEffect(() => {
    tempFunction.current();
  }, []);

  if (
    trending.isFetching ||
    featuredFetching ||
    latest.isFetching ||
    staffPick.isFetching
  ) {
    return (
      <MarketingBannerLayout>
        <Skeleton title={true} />
      </MarketingBannerLayout>
    );
  }

  return (
    <MarketingBannerLayout>
      <ScrollToTop />
      <StyledHome>
        <h2 className="title1">FEATURED</h2>
        {!featuredFetching && featuredVideos.length > 2 ? (
          <SlickSlider {...SliderSettings}>
            {!featuredFetching &&
              featuredVideos.map((video, index) => (
                <SliderItem key={`feature${video.id}`}>
                  <VideoCardFeatured  video={video} />
                </SliderItem>
              ))}
          </SlickSlider>
        ) : (
          <FeaturedVideoGrid>
            {!featuredFetching &&
              featuredVideos
                .slice(0, 2)
                .map((video) => (
                  <VideoCardFeatured key={video.id} video={video} />
                ))}
          </FeaturedVideoGrid>
        )}

        <h2 className="title2">TRENDING</h2>
        <VideoGridTrending>
          {!trending.isFetching &&
            trending.videos
              .slice(0, 8)
              .map((video) => (
                <VideoCardTrending key={video.id} video={video} />
              ))}
        </VideoGridTrending>
        <h2 className="title3">LATEST & GREATEST</h2>
        {!latest.isFetching && latest.videos.length > 5 ? (
          <SlickSlider {...SliderSettings2}>
            {!latest.isFetching &&
              latest.videos.map((video) => (
                <SliderItem key={`latest${video.id}`}>
                  <VideoCardV2  video={video} />
                </SliderItem>
              ))}
          </SlickSlider>
        ) : (
          <VideoGridV2>
            {!latest.isFetching &&
              latest.videos
                .slice(0, 5)
                .map((video) => <VideoCardV2 key={video.id} video={video} />)}
          </VideoGridV2>
        )}

        {staffPick && staffPick.success === false ? (
          <h2 className="title4">No staff picks videos available</h2>
        ) : (
          <>
            <h2 className="title4">STAFF PICKS</h2>
            <VideoGridV3>
              {!staffPick.isFetching &&
                staffPick.videos
                  .slice(0, 6)
                  .map((video) => <VideoCardV3 key={video.id} video={video} />)}
            </VideoGridV3>
          </>
        )}
      </StyledHome>

      {/* rendering footer */}
      <ContactBanner />
      <Footer />
    </MarketingBannerLayout>
  );
};

export default Home;
