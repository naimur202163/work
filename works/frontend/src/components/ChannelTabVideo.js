import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoCardMoreFrom from "../components/VideoCardMoreFrom";
import styled from "styled-components";
import DeleteVideoModal from "./DeleteVideoModal";
import EditIcon from "./icons/EditIcon";
import DeleteIcon from "./icons/DeleteIcon";
import UploadFormModal from "./UploadComponent/UploadFormModal";
const Wrapper = styled.div`
  padding-bottom: 7rem;
  min-height: 100vh;

  .videos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;

    &-item {
      position: relative;

      .video-action {
        position: absolute;
        z-index: 2 !important;
        right: 0;
        top: 170px;
        width: 5.5rem;
        height: 2.5rem;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: space-between;

        button {
          padding: 0.3rem 0.5rem;
          border-radius: 0.2rem;
          background-color: #fff;
          border: none;
          outline: none;
        }
      }
    }
  }

  @media screen and (max-width: 830px) {
    .videos {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 540px) {
    .videos {
      grid-template-columns: 1fr;
    }
  }
`;

const ChannelTabVideo = () => {
  const { user } = useSelector((state) => state);
  const { videos } = useSelector((state) => state.profile);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [videoId, setVideoId] = useState();
  const [filename,setFilename] = useState()
  const [imageURL,setImageURL] = useState()
  const [selectedVideo, setSelectedVideo] = useState();
  const closeModal = () => setShowModal(false);
  const closeDeleteModal = () => setShowDeleteModal(false);
  const { userIdOrUserName } = useParams();
  const showButtons = userIdOrUserName
    ? user.id === userIdOrUserName || user.username === userIdOrUserName
    : false;

  if (!videos?.length) {
    return <p>This channel hasn't posted any videos yet</p>;
  }

  return (
    <Wrapper>
      <div className="videos">
        {videos?.map((video) => (
          <div className="videos-item" key={video.id}>
            <VideoCardMoreFrom
              nousername={true}
              hideavatar={true}
              video={video}
              titleLeft
            />
            {showButtons && (
              <div className="video-action">
                <button
                  onClick={() => {
                    setVideoId(video.id);
                    setFilename(video.url);
                    setImageURL(video.thumbnail)
                    setSelectedVideo(video);
                    setShowModal(true);
                  }}
                >
                  <EditIcon fill="#CC0000" />
                </button>
                <button
                  onClick={() => {
                    setVideoId(video.id);
                    setFilename(video.url);
                    setImageURL(video.thumbnail)
                    setShowDeleteModal(true);
                  }}
                >
                  <DeleteIcon fill="#CC0000" />
                </button>
              </div>
            )}
          </div>
        ))}

        {showModal && (
          <UploadFormModal
            setShowModal={closeModal}
            videoUpdate={selectedVideo}
            videoId={videoId}
          />
        )}
        {showDeleteModal && (
          <DeleteVideoModal closeModal={closeDeleteModal} videoId={videoId} filename={filename} image={imageURL} />
        )}
      </div>
    </Wrapper>
  );
};

export default ChannelTabVideo;
