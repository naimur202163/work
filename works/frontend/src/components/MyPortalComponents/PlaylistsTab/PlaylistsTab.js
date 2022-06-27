import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import ArrowIcon from "../../../assets/Icons/arrow.svg";
import PlaylistCategory from "./PlaylistCategory";
import Skeleton from "../../../skeletons/PlaylistSkeleton";
import { GlobalContext } from "../../../context/GlobalContext";
import { getAllPlaylists } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";

const PlaylistsTab = ({ loading }) => {
  const dispatch = useDispatch();
  const {
    loading: playlistsLoading,
    error: playlistsError,
    playlists,
  } = useSelector((state) => state.getPlaylists);
  const { setShowPlaylistModelV2 } = useContext(GlobalContext);
  const isSelf = useSelector((state) => state.profile.isMe);

  useEffect(() => {
    dispatch(getAllPlaylists());
  }, []);

  if (loading) {
    return <Skeleton />;
  }

  return (
    <PlaylistsTabStyled>
      <div className="container">
        {isSelf && (
          <div
            onClick={() => setShowPlaylistModelV2(true)}
            className="container__createButton"
          >
            <div className="text">
              <div className="light">Create</div>
              <div className="bold">Playlist</div>
            </div>

            <img className="icon" src={ArrowIcon} alt="" />
          </div>
        )}

        <div className="container__row">
          {playlistsLoading && (
            <div className="loading">Getting playlists, Please wait...</div>
          )}

          {!playlistsLoading && playlistsError && (
            <div className="error">No playlists available. Create one!</div>
          )}

          {playlists &&
            playlists.length > 0 &&
            playlists.map((playlist, i) => {
              if (playlist.videos.length > 0) {
                return (
                  <PlaylistCategory
                    key={i}
                    isSelf={isSelf}
                    playlist={playlist}
                  />
                );
              }
            })}
        </div>
      </div>
    </PlaylistsTabStyled>
  );
};

export default PlaylistsTab;

const PlaylistsTabStyled = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 2.5rem 0;
  font-family: ${(props) => props.theme.montserrat};

  .container {
    width: 90%;
    min-width: 480px;
    margin: 0 auto;

    &__createButton {
      width: 50%;
      margin: 0 auto 4rem auto;
      background-color: #fff;
      padding: 0.8rem 1rem;
      border-radius: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #2c2c2e;
      font-size: 0.95rem;
      cursor: pointer;

      .text {
        display: flex;
        align-items: center;
        text-transform: capitalize;

        .light {
          font-weight: 400;
          padding-right: 0.5rem;
        }

        .bold {
          font-weight: 600;
        }
      }

      .icon {
        height: 1rem;
        width: auto;
      }
    }

    &__row {
      margin-bottom: 2rem;
    }
  }

  @media screen and (max-width: 768px) {
    .container {
      &__createButton {
        width: 80%;
        font-size: 0.95rem;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .container {
      min-width: 95%;

      &__createButton {
        width: 90%;
        font-size: 0.9rem;
        margin-bottom: 3rem;
      }
    }
  }
`;
