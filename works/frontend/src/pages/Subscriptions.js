import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { StyledHome } from "./Home";
import VideoCard from "../components/VideoCard";
import VideoGrid from "../styles/VideoGrid";
import Suggestions from "../components/Suggestions";
import { getFeed } from "../actions";
import Skeleton from "../skeletons/HomeSkeleton";
import ContactBanner from "../components/Footer/ContactBanner";
import Footer from "../components/Footer/Footer";
import { ScrollToTop } from "../utils/index";

const Subscriptions = ({ isFetching, videos, getFeed }) => {
  useEffect(() => {
    getFeed();
  }, [getFeed]);

  if (isFetching) {
    return <Skeleton />;
  }

  if (!isFetching && !videos.length) {
    return <Suggestions />;
  }

  return (
    <>
      <ScrollToTop />
      <StyledHome>
        <div style={{ marginTop: "1.5rem" }}>
          <h2 style={{ marginBottom: "1.5rem" }}>My Streams</h2>
        </div>
        <VideoGrid>
          {!isFetching &&
            videos.map((video) => (
              <Link key={video.id} to={`/watch/${video.id}`}>
                <VideoCard key={video.id} hideavatar={true} video={video} />
              </Link>
            ))}
        </VideoGrid>
      </StyledHome>

      {/* rendering footer */}
      <ContactBanner />
      <Footer />
    </>
  );
};

const mapStateToProps = ({ feed }) => ({
  isFetching: feed.isFetching,
  videos: feed.videos,
});

export default connect(mapStateToProps, { getFeed })(Subscriptions);
