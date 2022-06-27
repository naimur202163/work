import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StyledTrending } from "./Trending";
import TrendingCard from "../components/TrendingCard";
import { getLikedVideos } from "../actions";
import Skeleton from "../skeletons/TrendingSkeleton";
import ContactBanner from "../components/Footer/ContactBanner";
import Footer from "../components/Footer/Footer";
import { ScrollToTop } from "../utils/index";

const LikedVideos = ({ isFetching, videos, getLikedVideos }) => {

  useEffect(() => {
    getLikedVideos();
  }, [videos.length, getLikedVideos]);

  if (isFetching) {
    return <Skeleton />;
  }

  return (
    <>
      <ScrollToTop />
      <StyledTrending>
        <h2>Liked Videos</h2>

        {videos?.length === 0 && (
          <p className="secondary">
            Videos that you have liked will show up here
          </p>
        )}

        {videos.map((video) => (
            <TrendingCard
              key={video.id}
              video={video}
            />
          )
        )}
      </StyledTrending>

      {/* rendering footer */}
      <ContactBanner />
      <Footer />
    </>
  );
};

const mapStateToProps = ({ likedVideo }) => ({
  isFetching: likedVideo.isFetching,
  videos: likedVideo.videos,
});

export default connect(mapStateToProps, { getLikedVideos })(LikedVideos);
