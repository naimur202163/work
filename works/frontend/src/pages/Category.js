/* eslint-disable */
import React, { useEffect, useState } from "react";
import VideoCardV2 from "../components/VideoCardV2";
import Skeleton from "../skeletons/HomeSkeleton";
import styled from "styled-components";
import FeaturedVideoGrid from "../styles/VideoGridFeatured";
import VideoCardFeatured from "../components/VideoCardFeatured";
import VideoGridV3 from "../styles/VideoGridV3";
import VideoCardV3 from "../components/VideoCardV3";
import VideoGridV2 from "../styles/VideoGridV2";
import { useSelector, useDispatch } from "react-redux";
import {
  getFeaturedByCategory,
  getStaffPickByCategory,
  getVideosByCategory,
  getMarketingBanners,
} from "../actions";
import VideoGridTrending from "../styles/VideoGridTrending";
import VideoCardTrending from "../components/VideoCardTrending";
import SlickSlider from "react-slick";
import ContactBanner from "../components/Footer/ContactBanner";
import Footer from "../components/Footer/Footer";
import MarketingBanner from "../components/MarketingBanner/MarketingBanner";
import { ScrollToTop } from "../utils/index";

function MarketingBannerLayout(props) {
  const banners = useSelector((state) => state.marketingBanner);
  const dispatch = useDispatch();

  let filteredBanner = [];

  useEffect(() => {
    dispatch(getMarketingBanners());
  }, [props.catId]);

  if (banners.length > 0) {
    filteredBanner = banners.filter(
      (banner) =>
        banner.bannerLocation === 1 && banner.categoryId === Number(props.catId)
    );
  }

  return (
    <>
      <MarketingBanner banners={filteredBanner} />
      {props.children}
    </>
  );
}

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
  padding-bottom: 7rem;

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

  .title5 {
    margin-bottom: 0.3rem;
    font-size: 1.7rem;
    text-transform: capitalize;
    background: white;
    // text-decoration: underline;
    text-decoration-color: #f66978;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .title6 {
    width: 90%;
    font-size: 0.9rem;
    color: #a6a6a6;
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
  }

  @media screen and (max-width: 600px) {
    width: 90%;
  }

  @media screen and (max-width: 530px) {
    width: 100%;
  }
`;

const SliderItem = styled.div`
  padding: 0 0.5rem;
  outline: none;
`;

const Category = ({ match }) => {
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
  const categoryID = match.params.id;
  const [trendingVideos, setTrendingVideos] = useState(null);
  const [latestVideos, setLatestVideos] = useState(null);
  const categoryFeatured = useSelector((state) => state.categoryFeatured);
  const categoryStaffpick = useSelector((state) => state.categoryStaffpick);
  const categoryVideos = useSelector((state) => state.categoryVideos);

  useEffect(() => {
    if (categoryID) {
      dispatch(getFeaturedByCategory(categoryID));
      dispatch(getStaffPickByCategory(categoryID));
      dispatch(getVideosByCategory(categoryID));
    }
  }, [categoryID, dispatch]);

  useEffect(() => {
    if (
      categoryVideos &&
      categoryVideos.videos &&
      categoryVideos.videos.length > 0
    ) {
      videosFilter();
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line no-use-before-define
  }, [categoryVideos, categoryVideos.videos]);

  const videosFilter = () => {
    const trendingVideos = categoryVideos.videos.sort(
      (a, b) => b.views - a.views
    );
    setTrendingVideos(trendingVideos);
    const latestVideos = categoryVideos.videos.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    setLatestVideos(latestVideos);
  };

  if (
    categoryFeatured.isFetching &&
    categoryStaffpick.isFetching &&
    categoryVideos.isFetching
  ) {
    return <Skeleton title={true} />;
  }

  if (categoryVideos.videos == null) {
    return (
      <StyledHome>
        <h2 className="title5">There's nothing here yet...</h2>
        <h3 className="title6">
          Help build our community, be the first Warrior Creator to upload
          content to this channel!
        </h3>
      </StyledHome>
    );
  }

  return (
    <MarketingBannerLayout catId={categoryID}>
      <ScrollToTop />
      <StyledHome>
        <h2 className="title1">FEATURED</h2>
        {!categoryFeatured.isFetching &&
          categoryFeatured.featuredVideos &&
          categoryFeatured.featuredVideos.length > 2 ? (
          <SlickSlider {...SliderSettings}>
            {!categoryFeatured.isFetching &&
              categoryFeatured.featuredVideos.map((video) => (
                <SliderItem>
                  <VideoCardFeatured key={video.id} video={video} />
                </SliderItem>
              ))}
          </SlickSlider>
        ) : (
          <FeaturedVideoGrid>
            {!categoryFeatured.isFetching &&
              categoryFeatured.featuredVideos &&
              categoryFeatured.featuredVideos.map((video) => (
                <VideoCardFeatured key={video.id} video={video} />
              ))}
          </FeaturedVideoGrid>
        )}

        <h2 className="title2">TRENDING</h2>
        <VideoGridTrending>
          {trendingVideos &&
            trendingVideos
              .slice(0, 8)
              .map((video) => (
                <VideoCardTrending key={video.id} video={video} />
              ))}
        </VideoGridTrending>

        <h2 className="title3">LATEST & GREATEST</h2>
        {latestVideos && latestVideos.length > 5 ? (
          <SlickSlider {...SliderSettings2}>
            {latestVideos.map((video) => (
              <SliderItem>
                <VideoCardV2 key={video.id} video={video} />
              </SliderItem>
            ))}
          </SlickSlider>
        ) : (
          <VideoGridV2>
            {latestVideos &&
              latestVideos.map((video) => (
                <VideoCardV2 key={video.id} video={video} />
              ))}
          </VideoGridV2>
        )}

        <h2 className="title4">STAFF PICKS</h2>
        <VideoGridV3>
          {!categoryStaffpick.isFetching &&
            categoryStaffpick.staffPick &&
            categoryStaffpick.staffPick
              .slice(0, 6)
              .map((video) => <VideoCardV3 key={video.id} video={video} />)}
        </VideoGridV3>
        
      </StyledHome>

      {/* rendering footer */}
      <ContactBanner />
      <Footer />
    </MarketingBannerLayout>
  );
};

export default Category;
