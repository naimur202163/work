import React, { useEffect, useState } from "react";
import MarketingBanner from "../../NewHomeComponents/MarketingBanner/MarketingBanner";
import Skeleton from "../../../skeletons/ProfilePortalSkeleton";
import Slider from "react-slick";
import SeriesItem from "../SeriesTab/SeriesItem";
import VideoItem from "../VideosTab/VideoItem";
import { Col, Row } from "react-grid-system";
import { useDispatch, useSelector } from "react-redux";
import {
  getTrendingVideos,
  getMarketingBanners,
  getAllSeriesOfUser,
} from "../../../actions";
import {
  TabHomeComponent,
  HomeBanner,
  TaglineAndBioSection,
  MarketingBannerSection,
  FeaturedSeriesSection,
  FeaturedClipsSection,
} from "./style";

const SLIDERSETTING1 = {
  infinite: false,
  arrows: false,
  dots: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  speed: 500,

  responsive: [
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },

    {
      breakpoint: 481,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

const SLIDERSETTING2 = {
  infinite: false,
  arrows: false,
  dots: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  speed: 500,

  responsive: [
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },

    {
      breakpoint: 481,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function HomeTab({ profile }) {
  const { cover, tagline, videos } = profile;
  const dispatch = useDispatch();
  const banners = useSelector((state) => state.marketingBanner);
  const {
    loading: getSeriesLoading,
    series: allSeries,
    error: getSeriesError,
  } = useSelector((state) => state.getAllSeriesOfUser);

  useEffect(() => {
    dispatch(getMarketingBanners());
    dispatch(getTrendingVideos());
  }, []);

  useEffect(() => {
    dispatch(getAllSeriesOfUser(profile?.username));
  }, [profile]);

  let featuredVideos = [];
  if (videos && videos.length > 0) {
    featuredVideos = videos.filter((video) => {
      return video.featuredWarriorPortal === true;
    });
  }

  if (profile?.isFetching) {
    return <Skeleton />;
  }

  return (
    <TabHomeComponent>
      <HomeBanner>
        <img src={cover} alt="" className="homeBanner" />
      </HomeBanner>
      <TaglineAndBioSection>
        <h2>{profile?.tagline}</h2>
        <p className="bio">
          Bio text example, Bio text example, Bio text example, Bio text
          example, Bio text example, Bio text example, Bio text example, Bio
          text example, Bio text example, Bio text example, Bio text example,
          Bio text example, Bio text example, Bio text example, Bio text
          example, Bio text example, Bio text example, Bio text example, Bio
          text example, Bio text example, Bio text example, Bio text example.
        </p>
      </TaglineAndBioSection>
      <MarketingBannerSection>
        {banners && banners.length && (
          <MarketingBanner banners={banners} page="myPortal" />
        )}
      </MarketingBannerSection>

      {allSeries && allSeries.length > 0 && (
        <FeaturedSeriesSection>
          {allSeries.length && (
            <div className="sectionTitle">Featured Series</div>
          )}

          {(getSeriesLoading || profile?.isFetching) && (
            <div className="loading">Getting all series, Please wait...</div>
          )}

          <div className="row">
            {allSeries && allSeries.length > 0 && (
              <>
                {profile?.isMe ? (
                  <Slider {...SLIDERSETTING1} className="slider">
                    {allSeries.map((item, i) => (
                      <SeriesItem
                        key={i}
                        isSelf={profile?.isMe}
                        series={item}
                      />
                    ))}
                  </Slider>
                ) : (
                  <Slider {...SLIDERSETTING2} className="slider">
                    {allSeries.map((item, i) => (
                      <SeriesItem
                        key={i}
                        isSelf={profile?.isMe}
                        series={item}
                      />
                    ))}
                  </Slider>
                )}
              </>
            )}
          </div>
        </FeaturedSeriesSection>
      )}

      {featuredVideos && featuredVideos.length > 0 && (
        <FeaturedClipsSection>
          <div className="sectionTitle">Featured Clips</div>

          {profile?.isFetching && (
            <div className="loading">
              Getting featured videos, Please wait...
            </div>
          )}

          <Row>
            {featuredVideos &&
              featuredVideos.length > 0 &&
              featuredVideos.map((item, i) => (
                <Col
                  key={i}
                  lg={3}
                  md={6}
                  sm={!profile?.isMe ? 12 : 6}
                  xs={!profile?.isMe ? 12 : 6}
                  className="container__videos--col"
                  style={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <VideoItem isSelf={profile?.isMe} video={item} />
                </Col>
              ))}
          </Row>
        </FeaturedClipsSection>
      )}
    </TabHomeComponent>
  );
}

export default HomeTab;
