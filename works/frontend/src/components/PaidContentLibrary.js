import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { StyledTrending } from '../pages/Trending';
import TrendingCard from '../components/TrendingCard';
import { getLibraryVideos } from '../actions';
import Skeleton from '../skeletons/TrendingSkeleton';
import InfiniteScroll from "react-infinite-scroll-component";

const PaidContentLibrary = ({ isFetching, videos, hasMore }) => {
    const userId = useSelector((state) => state.user.id);
    const userrole = useSelector((state) => state.user.userrole)
    const [offset, setOffset] = useState(5);
    const dispatch = useDispatch();
  const tempFunction = useRef()
  const imgFunction = () =>{
    dispatch(getLibraryVideos(userId, offset));
  }
  tempFunction.current = imgFunction
    useEffect(() => {
        tempFunction.current()
        
    }, []);

    if (isFetching) {
        return <Skeleton />;
    }

    const fetchData = () => {
        const newOffset = offset + 10;
        dispatch(getLibraryVideos(userId, newOffset))
        setOffset(newOffset)
    }

    return (
        <StyledTrending>
            <h2>Paid Content Library</h2>

            {(videos.length === 0 || userrole === 0) && (
                <p className="secondary">
                    This is your own personal iSutra library.
                    Any videos you have given Karma to or purchased
                    via "Pay Per View" will be displayed here.
                    Give back some Karma to the Warrior Creators!
                    As a token of appreciation, your videos will be
                    saved here!
                </p>
            )}
            {
                videos.length !== 0 && userrole > 0 && (
                    <InfiniteScroll
                        dataLength={videos.length} //This is important field to render the next data
                        next={fetchData}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            videos.length > 0 && <p style={{ textAlign: 'center' }}>
                                <b>That's it! No more videos in your Library. Give Karma to add more!</b>
                            </p>
                        }
                    >
                        {videos.length > 0 && videos.map((video) => (
                                <TrendingCard
                                    key={video.id}
                                    video={video}
                                />
                            )
                        )}
                    </InfiniteScroll>
                )
            }

        </StyledTrending>
    );
};

const mapStateToProps = ({ library }) => ({
    isFetching: library.isFetching,
    videos: library.videos,
    hasMore: library.hasMore
});

export default connect(mapStateToProps, { getLibraryVideos })(PaidContentLibrary);
