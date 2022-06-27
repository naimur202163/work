import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StyledTrending } from "./Trending";
import TrendingCard from "../components/TrendingCard";
import { getHistory } from "../actions";
import Skeleton from "../skeletons/TrendingSkeleton";
import ContactBanner from "../components/Footer/ContactBanner";
import Footer from "../components/Footer/Footer";
import {ScrollToTop} from "../utils/index";

const History = ({ nopad, isFetching, videos, getHistory }) => {

  useEffect(() => {
    getHistory();
  }, [videos.length, getHistory]);


  if (isFetching) {
    return <Skeleton />;
  }

  return (
    <>
      <ScrollToTop />
      <StyledTrending nopad={nopad}>
        <h2>History</h2>

        {!isFetching && !videos.length && (
          <p className="secondary">
            Videos that you have watched will show up here
          </p>
        )}

        {videos.map((video) => {
          return (
            <TrendingCard
              key={video.id}
              video={video}
            />
          );
        })}
      </StyledTrending>

      {/* rendering footer */}
      <ContactBanner />
      <Footer />
    </>
  );
};

const mapStateToProps = ({ history }) => ({
  isFetching: history.isFetching,
  videos: history.videos,
});

export default connect(mapStateToProps, { getHistory })(History);
