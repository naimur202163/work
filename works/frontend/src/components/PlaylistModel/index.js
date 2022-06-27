import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import BackdropV2 from "../BackdropV2";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link } from "react-router-dom";
import { CloseIcon } from "../Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewPlaylist,
  getAllPlaylists,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
} from "../../actions";
import {
  ADD_VIDEO_TO_PLAYLIST_RESET,
  REMOVE_VIDEO_FROM_PLAYLIST_RESET,
} from "../../actions/types";
import { toast } from "react-toastify";

const PlaylistModel = ({ open, closeHandler, type, videoId }) => {
  const dispatch = useDispatch();
  const {
    loading: createLoading,
    info: createInfo,
    error: createError,
  } = useSelector((state) => state.createPlaylist);
  // const { loading: addVideoLoading, message: addVideoMessage } = useSelector(
  //   (state) => state.addVideoToPlaylist
  // );
  const { message: addVideoMessage } = useSelector(
    (state) => state.addVideoToPlaylist
  );
  const removeVideoSelector = useSelector(
    (state) => state.removeVideoFromPlaylist
  );
  const {
    playlists,
    loading: playlistsLoading,
    error: playlistsError,
  } = useSelector((state) => state.getPlaylists);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isChecked, setIsChecked] = useState([]);

  useEffect(() => {

    if (playlists && playlists.length > 0) {
      let values = [];
      for (let i = 0; i < playlists.length; i++) {
        values.push(
          playlists[i].videos.filter((item) => item.videoId === videoId)
            .length > 0
            ? true
            : false
        );
      }

      setIsChecked(values);
    }

  }, [playlists, videoId]);

  useEffect(() => {
    dispatch(getAllPlaylists());
  }, [dispatch, createInfo]);

  useEffect(() => {
    if (addVideoMessage) {
      toast.success(addVideoMessage);
      dispatch({
        type: ADD_VIDEO_TO_PLAYLIST_RESET,
      });
    }
  }, [dispatch, addVideoMessage]);

  useEffect(() => {
    if (removeVideoSelector && removeVideoSelector.message) {
      toast.success(removeVideoSelector.message);

      dispatch({
        type: REMOVE_VIDEO_FROM_PLAYLIST_RESET,
      });
    }
  }, [dispatch, removeVideoSelector]);

  useEffect(() => {
    if (createError) {
      return toast.error("Unexpected server error occurred!");
    }
  }, [createError]);

  const createBlankPlaylistHandler = () => {
    if (!title) {
      return toast.error("Please give title for the playlist");
    }

    const obj = {
      title,
      description: desc,
    };

    dispatch(createNewPlaylist(obj));

    setTitle("");
    setDesc("");

    closeHandler();
    toast.success("Playlist created successfully");
  };

  const createBlankPlaylistHandler2 = () => {
    if (!title) {
      return toast.error("Please give title for the playlist");
    }

    const obj = {
      title,
      description: desc,
    };

    dispatch(createNewPlaylist(obj));

    setTitle("");
    setDesc("");

    setShowForm(false);
    toast.success("Playlist created successfully");
  };

  const addVideoToPlaylistHandler = (id) => {
    dispatch(
      addVideoToPlaylist(id, {
        videoId,
      })
    );
  };

  const removeVideoFromPlaylistHandler = (playlistId, videoId) => {
    dispatch(
      removeVideoFromPlaylist(playlistId, {
        videoId,
      })
    );
  };

  const handleIsChecked = (position, e, playlistId) => {
    const updatedIsChecked = isChecked.map((item, index) =>
      index === position ? !item : item
    );

    setIsChecked(updatedIsChecked);

    isChecked.forEach((item, i) => {
      if (i === position && e.target.checked === true) {
        addVideoToPlaylistHandler(playlistId);
      }

      if (i === position && e.target.checked === false) {
        removeVideoFromPlaylistHandler(playlistId, videoId);
      }
    });
  };



  if (type === "create") {
    return (
      <>
        <PlaylistModelWrapper>
          <div className="header">
            <CloseIcon onClick={closeHandler} />
            <h1 className="header__title">Create New Playlist ...</h1>
          </div>

          <form className="createPlaylist">
            <div className="createPlaylist__fieldGroup">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter Playlist Name ..."
                name="name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="createPlaylist__fieldGroup">
              <label htmlFor="desc">Description</label>
              <input
                type="text"
                placeholder="Enter Playlist Description ..."
                name="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </form>

          <button onClick={createBlankPlaylistHandler} className="playlistNew">
            <img src="/assets/icons/plus.svg" alt="Create New Playlist" />
            <span>{createLoading ? "Loading..." : "Create New Playlist"}</span>
          </button>
        </PlaylistModelWrapper>
        {open && <BackdropV2 close={closeHandler} />}
      </>
    );
  }

  if (type === "save") {
    return (
      <>
        <PlaylistModelWrapper>
          <div className="header">
            <CloseIcon onClick={closeHandler} />
            <h1 className="header__title">Save to ...</h1>
          </div>
          <div
            className="playlist"
            style={{
              borderBottom: showForm && "1px solid rgba(255, 255, 255, 0.09)",
            }}
          >
            {playlists && playlists.length > 0 && (
              <>
                {playlists.map((item, i) => {
                  return (
                    <div className="playlist__item" key={item.id}>
                      <div className="playlist__item--left">
                        <FormGroup>
                          <FormControlLabel
                            sx={{
                              "& .MuiTypography-root": {
                                color: "#fff",
                                fontFamily: "Noto Sans Display",
                                fontSize: 15,
                                fontWeight: 200,
                              },
                            }}
                            control={
                              <Checkbox
                                checked={isChecked[i]}
                                name="playlistCheckbox"
                                onChange={(e) =>
                                  // addVideoToPlaylistHandler(e, item.id)
                                  handleIsChecked(i, e, item.id)
                                }
                                sx={{
                                  "& .MuiSvgIcon-root": {
                                    fontSize: 22,
                                    color: "#fff",
                                  },
                                }}
                              />
                            }
                            label={item.title}
                          />
                        </FormGroup>
                      </div>

                      <div className="playlist__item--right">
                        <Link
                          onClick={() => {
                            closeHandler();
                          }}
                          to={`/playlist/${item.id}`}
                        >
                          <img
                            className="viewIcon"
                            src="/assets/icons/eye.svg"
                            alt="Lock"
                          />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {playlistsLoading && <span>Loading...</span>}

            {!playlistsLoading && playlistsError && (
              <span>No playlist available. Create One</span>
            )}
          </div>

          {showForm && (
            <form className="createPlaylist">
              <div className="createPlaylist__fieldGroup">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  placeholder="Enter Playlist Name ..."
                  name="name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="createPlaylist__fieldGroup">
                <label htmlFor="desc">Description</label>
                <input
                  type="text"
                  placeholder="Enter Playlist Description ..."
                  name="desc"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
            </form>
          )}

          <button
            onClick={() => {
              if (showForm) {
                createBlankPlaylistHandler2();
              } else {
                setShowForm(true);
              }
            }}
            className="playlistNew"
          >
            <img src="/assets/icons/plus.svg" alt="Create New Playlist" />
            <span>Create New Playlist</span>
          </button>
        </PlaylistModelWrapper>
        {open && <BackdropV2 close={closeHandler} />}
      </>
    );
  }

  return null;
};

export default PlaylistModel;

const openModal = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const openForm = keyframes`
  from {
    transform: translateY('-2rem');
    opacity: 0;
  }

  to {
    transform: translateY('0');
    opacity: 1;
  }
`;

const PlaylistModelWrapper = styled.div`
  position: fixed;
  overflow-y: auto;
  height: 80vh;
  width: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: #202020;
  border-radius: 0.3rem;
  animation: ${openModal} 0.5s ease-in-out;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.4), 0px 0px 4px rgba(0, 0, 0, 0.25);

  /* width */
  ::-webkit-scrollbar {
    width: 8px;
    border-radius: 10rem;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #000;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #202020;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(246, 92, 139);
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 4rem;
    padding: 0 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    margin-bottom: 1rem;

    svg {
      fill: ${(props) => props.theme.red};
      height: 27px;
      width: 27px;
      margin-right: 1rem;
    }

    &__title {
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 1;
      text-transform: capitalize;
    }
  }

  .playlist {
    padding: 0 1rem 1rem 1rem;
    margin-bottom: 0.5rem;

    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.5rem;

      &--right {
        cursor: pointer;

        .viewIcon {
          margin-left: 1rem;
          height: 1rem;
          width: auto;
        }
      }
    }
  }

  .createPlaylist {
    padding: 0 1rem;
    margin-bottom: 1rem;
    animation: ${openForm} 0.3s ease-in-out;

    &__fieldGroup {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-family: "Noto Sans Display", sans-serif;

      label {
        font-size: 1rem;
        font-weight: 400;
      }

      input {
        overflow: hidden;
        border-radius: 3px;
        width: 100%;
        padding: 0.4rem 1rem;
        background: ${(props) => props.theme.black};
        border: 1px solid ${(props) => props.theme.black};
        margin-bottom: 1rem;
        color: #fff;
        font-size: 0.85rem;
        font-weight: 300;
        font-family: "Noto Sans Display", sans-serif;

        &::placeholder {
          font-weight: 300;
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }

  .playlistNew {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45%;
    padding: 0.6rem 0;
    margin-left: 1rem;
    border-radius: 0.2rem;
    border: 1px solid #fff;
    transition: all 0.2s ease;
    outline: none;
    background-color: transparent;
    margin-bottom: 3rem;

    img {
      height: 0.9rem;
      width: auto;
      margin-right: 0.5rem;
    }

    span {
      font-family: "Noto Sans Display", sans-serif;
      font-weight: 200;
      font-size: 0.9rem;
      color: #fff;
    }

    &:hover {
      transform: translateY(-4px);
    }

    &:active {
      transform: translateY(2px);
    }
  }

  /* responsive */
  @media screen and (max-width: 480px) {
    width: 90%;

    .playlistNew {
      width: 70%;
    }
  }
`;
