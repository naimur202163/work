import React, { useState, useContext } from "react";
import styled from "styled-components";
import VideoItem from "./VideoItem";
import Skeleton from "../../../skeletons/VideosSkeleton";
import { Col, Row } from "react-grid-system";
import { useSelector } from "react-redux";
import EditClipForm from "../../UploadClipComponent/EditClipForm";
import { GlobalContext } from "../../../context/GlobalContext"

const VideosTab = ({ videos, loading }) => {
  const isSelf = useSelector((state) => state.profile.isMe);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const { setShowEditClipModel } = useContext(GlobalContext);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <>
      <VideosTabStyled>
        <div className="container">
          <div className="container__videos">
            <Row className="container__videos--row">
              {videos &&
                videos.length > 0 &&
                videos.map((item, i) => (
                  <Col
                    key={i}
                    lg={3}
                    md={6}
                    sm={!isSelf ? 12 : 6}
                    xs={!isSelf ? 12 : 6}
                    className="container__videos--col"
                    style={{
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    <VideoItem
                      video={item}
                      isSelf={isSelf}
                      setSelectedVideo={setSelectedVideo}
                      setVideoId={setVideoId}
                    />
                  </Col>
                ))}
            </Row>
          </div>
        </div>
      </VideosTabStyled>

      {/* show edit clip form */}
      {selectedVideo && videoId && (
        <EditClipForm videoUpdate={selectedVideo} videoId={videoId} close={() => setShowEditClipModel(false)} />
      )}
    </>
  );
};

export default VideosTab;

const VideosTabStyled = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 2.5rem 0;
  font-family: ${(props) => props.theme.montserrat};

  .container {
    width: 90%;
    margin: 0 auto;

    &__videos {
      margin-bottom: 5rem;
    }
  }
`;
