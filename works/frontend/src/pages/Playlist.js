import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Button from "../styles/Button";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Skeleton from "../skeletons/PlaylistSkeleton";
import Moment from "react-moment";
import ConfirmationModel from "../components/ConfirmationModel";
import EditPlaylistModel from "../components/PlaylistModel/EditPlaylistModel";
import { Col, Row } from "react-grid-system";
import { useDispatch, useSelector } from "react-redux";
import {
  getSinglePlaylist,
  deletePlaylistById,
  editPlaylistById,
  removeVideoFromPlaylist,
} from "../actions";
import { REMOVE_VIDEO_FROM_PLAYLIST_RESET } from "../actions/types";
import { useParams } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { toast } from "react-toastify";

const Playlist = () => {
  const {
    deletePlaylistConfirmationModel,
    setDeletePlaylistConfirmationModel,
    editPlaylistModel,
    setEditPlaylistModel,
  } = useContext(GlobalContext);
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const playlistId = params.playlistName;
  const singlePlaylistSelector = useSelector((state) => state.singlePlaylist);
  const editInfoSelector = useSelector((state) => state.editPlaylist);
  const removeVideoSelector = useSelector(
    (state) => state.removeVideoFromPlaylist
  );

  const sortButtonRef = React.useRef(null);
  const [openSortButton, setOpenSortButton] = useState(false);

  useEffect(() => {
    dispatch(getSinglePlaylist(playlistId));
  }, [dispatch, playlistId]);

  useEffect(() => {
    if (editInfoSelector && editInfoSelector.message) {
      dispatch(getSinglePlaylist(playlistId));
    }
  }, [dispatch, playlistId, editInfoSelector]);

  useEffect(() => {
    if (removeVideoSelector && removeVideoSelector.message) {
      toast.success(removeVideoSelector.message);

      dispatch({
        type: REMOVE_VIDEO_FROM_PLAYLIST_RESET,
      });

      dispatch(getSinglePlaylist(playlistId));
    }
  }, [dispatch, playlistId, removeVideoSelector]);

  const removeVideoHandler = (videoId) => {
    dispatch(
      removeVideoFromPlaylist(playlistId, {
        videoId,
      })
    );
  };

  const updatePlaylistHandler = (title, desc) => {
    dispatch(
      editPlaylistById(playlistId, {
        title: title,
        description: desc,
      })
    );

    toast.success("Playlist updated");
    setEditPlaylistModel(false);
  };

  const handleToggleSortButton = () => {
    setOpenSortButton(!openSortButton);
  };

  const handleCloseSortButton = (event) => {
    if (sortButtonRef.current && sortButtonRef.current.contains(event.target)) {
      return;
    }

    setOpenSortButton(false);
  };

  const deletePlaylistHandler = () => {
    dispatch(deletePlaylistById(playlistId));
    toast.success("Playlist deleted successfully");
    setDeletePlaylistConfirmationModel(false);
    history.push("/");
  };

  const sortHandlerForDate = (type) => {
    dispatch(getSinglePlaylist(playlistId, type, null));
  };

  const sortHandlerForPopularity = (type) => {
    dispatch(getSinglePlaylist(playlistId, null, type));
  };

  const randomPlayHandler = () => {
    if (
      singlePlaylistSelector &&
      singlePlaylistSelector.videos &&
      singlePlaylistSelector.videos.length > 0
    ) {
      const randomIndex = Math.floor(
        Math.random() * singlePlaylistSelector.videos.length
      );

      const randomVideoObj = singlePlaylistSelector.videos[randomIndex];

      history.push(`/watch/${randomVideoObj.singleDetailedVideo.id}`);
    }
  };

  if (singlePlaylistSelector && singlePlaylistSelector.loading) {
    return <Skeleton />;
  }

  if (
    (singlePlaylistSelector &&
      !singlePlaylistSelector.loading &&
      singlePlaylistSelector.message) ||
    (singlePlaylistSelector && singlePlaylistSelector.error)
  ) {
    return (
      <PlaylistWrapper>
        <Row>
          <h1>Playlist not found</h1>
        </Row>
      </PlaylistWrapper>
    );
  }

  return (
    <>
      <PlaylistWrapper>
        <Row>
          <Col lg={4} md={12}>
            <div className="playlistInfo">
              <h1 className="playlistInfo__title">
                {singlePlaylistSelector &&
                  singlePlaylistSelector.info &&
                  singlePlaylistSelector.info.title}

                <div className="playlistInfo__title--editIcon">
                  <i
                    onClick={() => setEditPlaylistModel(true)}
                    className="far fa-edit"
                  />
                </div>

                <div className="playlistInfo__title--deleteIcon">
                  <img
                    onClick={() => setDeletePlaylistConfirmationModel(true)}
                    src="/assets/icons/trash.svg"
                    alt="delete playlist"
                  />
                </div>
              </h1>

              <div className="playlistInfo__meta">
                <p className="playlistInfo__meta--videos">
                  {singlePlaylistSelector &&
                    singlePlaylistSelector.videos &&
                    singlePlaylistSelector.videos.length}{" "}
                  videos
                </p>
                <i class="fas fa-circle"></i>
                <p className="playlistInfo__meta--updated">
                  Last Updated:{" "}
                  <Moment fromNow>
                    {singlePlaylistSelector &&
                      singlePlaylistSelector.info &&
                      singlePlaylistSelector.info.updatedAt}
                  </Moment>
                </p>
              </div>

              <p className="playlistInfo__desc">
                {singlePlaylistSelector &&
                  singlePlaylistSelector.info &&
                  singlePlaylistSelector.info.description ? (
                  singlePlaylistSelector.info.description
                ) : (
                  <div className="playlistInfo__desc--noDesc">
                    Add description{" "}
                    <i
                      onClick={() => setEditPlaylistModel(true)}
                      className="far fa-edit"
                    />
                  </div>
                )}
              </p>
            </div>
          </Col>

          <Col lg={8} md={12}>
            {singlePlaylistSelector &&
              singlePlaylistSelector.videos &&
              singlePlaylistSelector.videos.length > 0 ? (
              <div className="playlistActionBtn">
                <Button
                  className="playlistActionBtn__sortBtn"
                  ref={sortButtonRef}
                  onClick={handleToggleSortButton}
                >
                  Sort
                </Button>

                <Button
                  className="playlistActionBtn__randomBtn"
                  onClick={randomPlayHandler}
                >
                  Play Random
                  <img
                    className="playlistAction__playRandom"
                    src="/assets/icons/random.svg"
                    alt="Play Random"
                  />
                </Button>
              </div>
            ) : null}

            <div className="videos">
              {singlePlaylistSelector &&
                singlePlaylistSelector.videos &&
                singlePlaylistSelector.videos.length > 0 ? (
                <>
                  {singlePlaylistSelector.videos.map((video) => (
                    <div
                      key={video.singleDetailedVideo.id}
                      className="videos__item"
                    >
                      <Row>
                        <img
                          onClick={() =>
                            removeVideoHandler(video?.singleDetailedVideo.id)
                          }
                          src="/assets/icons/trash.svg"
                          alt="delete playlist"
                          className="videos__item--delete"
                        />

                        <Col md={3} sm={12} className="videos__item--thumbnail">
                          <Link to={`/watch/${video.singleDetailedVideo.id}`}>
                            <img
                              src={video.singleDetailedVideo.thumbnail}
                              alt={video.singleDetailedVideo.title}
                            />
                          </Link>
                        </Col>

                        <Col md={9} sm={12} className="videos__item--metaInfo">
                          <Link to={`/watch/${video.singleDetailedVideo.id}`}>
                            <h5 className="videos__item--metaInfo-title">
                              {video.singleDetailedVideo.title}
                            </h5>
                          </Link>

                          <Link
                            to={`/channel/${video.singleDetailedVideo.User.username}`}
                          >
                            <p className="videos__item--metaInfo-channel">
                              {video.singleDetailedVideo.User.username}
                            </p>
                          </Link>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </>
              ) : (
                <div className="noVideos">
                  <h1 className="noVideos__title">No videos</h1>
                  <Button className="noVideos__btn">Add some</Button>
                </div>
              )}
            </div>

            {/* button dropdown */}
            <Popper
              open={openSortButton}
              anchorEl={sortButtonRef.current}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseSortButton}>
                      <MenuList
                        autoFocusItem={openSortButton}
                        sx={{
                          "& .MuiMenuItem-root": {
                            fontFamily: "ingra",
                            fontSize: 16,
                          },
                        }}
                      >
                        <MenuItem
                          onClick={(e) => {
                            sortHandlerForDate("ASC");
                            handleCloseSortButton(e);
                          }}
                        >
                          Date added (oldest)
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            sortHandlerForDate("DESC");
                            handleCloseSortButton(e);
                          }}
                        >
                          Date added (newest)
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            sortHandlerForPopularity("HIGH");
                            handleCloseSortButton(e);
                          }}
                        >
                          Most popular
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Col>
        </Row>
      </PlaylistWrapper>

      {deletePlaylistConfirmationModel && (
        <ConfirmationModel
          title="Are you sure to delete this ?"
          open={deletePlaylistConfirmationModel}
          closeHandler={() => setDeletePlaylistConfirmationModel(false)}
          deleteHandler={deletePlaylistHandler}
        />
      )}
      {editPlaylistModel && (
        <EditPlaylistModel
          updateHandler={updatePlaylistHandler}
          playlistTitle={
            singlePlaylistSelector &&
            singlePlaylistSelector.info &&
            singlePlaylistSelector.info.title
          }
          playlistDesc={
            singlePlaylistSelector &&
            singlePlaylistSelector.info &&
            singlePlaylistSelector.info.description
          }
          open={editPlaylistModel}
          closeHandler={() => setEditPlaylistModel(false)}
        />
      )}
    </>
  );
};

export default Playlist;

const PlaylistWrapper = styled.div`
  padding: 1rem 1.3rem;
  width: 85%;
  margin: 0 auto;
  padding-top: 4rem;
  padding-bottom: 7rem;

  .playlistInfo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 2rem;

    &__title {
      font-size: 1.6rem;
      color: #fff;
      font-weight: 500;
      margin-bottom: 0.5rem;
      line-height: 1;
      display: flex;
      align-items: center;

      &--editIcon {
        margin-left: 1rem;
        font-size: 0.9rem;
        cursor: pointer;
        color: #fff;
      }

      &--deleteIcon {
        margin-left: 0.5rem;
        cursor: pointer;

        img {
          height: 1rem;
          width: auto;
        }
      }
    }

    &__meta {
      display: flex;
      align-items: center;
      color: #777;
      margin-bottom: 1rem;

      i {
        margin: 0 0.5rem;
        font-size: 0.4rem;
      }

      p {
        font-size: 0.9rem;
      }
    }

    &__desc {
      font-size: 0.9rem;
      color: #dddddd;
      display: flex;
      align-items: center;

      &--noDesc {
        cursor: pointer;

        i {
          font-size: 1rem;
          margin-left: 0.5rem;
          color: #dddddd;
        }
      }
    }
  }

  .playlistActionBtn {
    display: flex;
    align-items: center;
    margin-bottom: 3rem;

    button {
      margin-right: 1.5rem;
    }

    &__randomBtn {
      display: flex;
      align-items: center;

      img {
        height: 1rem;
        width: auto;
        margin-left: 0.5rem;
      }
    }
  }

  .videos {
    display: flex;
    flex-direction: column;

    .noVideos {
      &__title {
        font-weight: 300;
        font-size: 2.2rem;
        line-height: 1;
        margin-bottom: 1.5rem;
      }
    }

    &__item {
      width: 100%;
      transition: all 0.2s ease;
      padding: 1rem 2rem 1rem 1rem;
      position: relative;
      margin-bottom: 1rem;

      &--delete {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        height: 1.4rem;
        width: auto;
        z-index: 5;
      }

      &:hover {
        background-color: ${(props) => props.theme.grey};
        border-radius: 0.3rem;
        cursor: pointer;
        box-shadow: rgba(255, 255, 255, 0.09);
      }

      &--thumbnail {
        height: 5.5rem;
        padding-right: 0 !important;

        img {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          object-fit: cover;
          border-radius: 0.3rem;
        }
      }

      &--metaInfo {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        &-title {
          font-size: 1rem;
          line-height: 1.2;
          font-weight: 500;
          color: #fff;
          margin-bottom: 1.5rem;
        }

        &-channel {
          color: #777;
          font-size: 0.9rem;
          font-weight: 200;
        }
      }
    }
  }

  @media screen and (max-width: 991px) {
    .playlistAction {
      margin-bottom: 2rem;
    }
    .playlistActionBtn {
      margin-bottom: 1.5rem;
    }
  }

  @media screen and (max-width: 768px) {
    width: 95%;
  }

  @media screen and (max-width: 600px) {
    .videos {
      &__item {
        &--delete {
          right: 1.5rem;
          top: 12rem;
          transform: translateY(0);
          height: 1.2rem;
        }

        &--thumbnail {
          margin-bottom: 0.5rem;
          height: 10rem;
        }

        &--metaInfo {
          &-title {
            margin-bottom: 1rem;
          }
        }
      }
    }
  }

  @media screen and (max-width: 480px) {
    width: 95%;
    padding: 1rem 0.5rem;

    .videos {
      margin-bottom: 5rem;

      &__item {
        &--metaInfo {
          &-title {
            font-size: 0.9rem;
            line-height: 1.4;
          }
        }
      }
    }
  }
`;
