import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TrendingCard from "../components/TrendingCard";
import { getTrending } from "../actions";
import Skeleton from "../skeletons/TrendingSkeleton";
import ContactBanner from "../components/Footer/ContactBanner";
import Footer from "../components/Footer/Footer";
import { ScrollToTop } from "../utils/index";

export const StyledTrending = styled.div`
  padding: 1rem 1.3rem;
  width: 85%;
  margin: 0 auto;
  padding-top: 2rem;
  padding-bottom: 7rem;
  padding-bottom: ${(props) => (props.nopad ? "0.5rem" : "7rem")};

  @media screen and (max-width: 930px) {
    width: 95%;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const Trending = ({ isFetching, videos, getTrending }) => {
  useEffect(() => {
    getTrending();
  }, [getTrending, videos.length]);

  if (isFetching) {
    return <Skeleton />;
  }

  return (
    <>
      <ScrollToTop />
      <StyledTrending>
        <h2>Trending</h2>
        <div className="trending">
          {!isFetching &&
            videos.map((video) => (
              <TrendingCard key={video.id} video={video} />
            ))}
        </div>
      </StyledTrending>

      {/* rendering footer */}
      <ContactBanner />
      <Footer />
    </>
  );
};

const mapStateToProps = ({ trending }) => ({
  isFetching: trending.isFetching,
  videos: trending.videos,
});

export default connect(mapStateToProps, { getTrending })(Trending);
