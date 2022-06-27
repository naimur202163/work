import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import BackIcon from "../../../assets/Icons/back.svg";
import PlaylistOptions from "./PlaylistOptions";
import Moment from "react-moment";
import { GlobalContext } from "../../../context/GlobalContext";
import { useSelector, useDispatch } from "react-redux";
import {
  createNewPlaylist,
  getAllPlaylists,
  editPlaylistById,
  deletePlaylistById,
} from "../../../actions";
import { toast } from "react-toastify";

const PLAYLISTOPTIONS = [
  { icon: <i class="far fa-eye"></i>, text: "View Playlist" },
  { icon: <i class="far fa-edit"></i>, text: "Edit Playlist" },
  { icon: <i class="far fa-trash-alt"></i>, text: "Delete Playlist" },
];

const CreatePlaylistModel = () => {
  const dispatch = useDispatch();
  const {
    loading: createLoading,
    info: createInfo,
    error: createError,
  } = useSelector((state) => state.createPlaylist);
  const {
    playlists,
    loading: playlistsLoading,
    error: playlistsError,
  } = useSelector((state) => state.getPlaylists);
  const { loading: updateLoading, error: updateError } = useSelector(
    (state) => state.editPlaylist
  );
  const { message: deleteMessage } = useSelector(
    (state) => state.deletePlaylist
  );

  const { showPlaylistModelV2, setShowPlaylistModelV2 } =
    useContext(GlobalContext);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [showType, setShowType] = useState("CREATE_FORM"); // CREATE_FORM, PLAYLISTS, UPDATE_FORM
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
    if (createError) {
      return toast.error("Unexpected server error occurred!");
    }
  }, [createError]);

  useEffect(() => {
    if (deleteMessage) {
      toast.success("Playlist deleted!");
      dispatch(getAllPlaylists());
    }
  }, [deleteMessage]);

  useEffect(() => {
    if (showType === "CREATE_FORM") {
      setSelectedPlaylist(null);
      setTitle("");
      setDesc("");
    }
  }, [showType]);

  useEffect(() => {
    if (updateError) {
      return toast.error("Unexpected server error occurred!");
    }
  }, [updateError]);

  useEffect(() => {
    if (showType === "PLAYLISTS") {
      dispatch(getAllPlaylists());
    }
  }, [showType]);

  useEffect(() => {
    if (selectedPlaylist) {
      setTitle(selectedPlaylist.title);
      setDesc(selectedPlaylist.desc);
    }
  }, [selectedPlaylist]);

  const createBlankPlaylistHandler = (e) => {
    e.preventDefault();

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

    toast.success("Playlist created successfully");
  };

  const updatePlaylistHandler = (e) => {
    e.preventDefault();

    dispatch(
      editPlaylistById(selectedPlaylist.id, {
        title: title,
        description: desc,
      })
    );

    toast.success("Playlist updated");
  };

  return (
    <CreatePlaylistModelStyled
      className={`${showPlaylistModelV2 && "createPlaylistModelActive"}`}
    >
      <div className="header">
        <div className="left">
          <div
            onClick={() => setShowPlaylistModelV2(false)}
            className="backIcon"
          >
            <img src={BackIcon} alt="" />
          </div>
          <div className="name">Create Playlist</div>
        </div>

        <div className="right">
          <button
            onClick={() => {
              if (showType === "CREATE_FORM") {
                setShowType("PLAYLISTS");
              } else if (showType === "PLAYLISTS") {
                setShowType("CREATE_FORM");
              } else if (showType === "UPDATE_FORM") {
                setShowType("PLAYLISTS");
              }
            }}
            className="formState"
          >
            {showType === "CREATE_FORM"
              ? "view all"
              : showType === "PLAYLISTS"
              ? "add new"
              : showType === "UPDATE_FORM"
              ? "view all"
              : null}
          </button>
        </div>
      </div>

      <div className="content">
        {showType === "CREATE_FORM" ? (
          <form onSubmit={createBlankPlaylistHandler} className="content__form">
            <div className="content__form--fieldGroup">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Give playlist name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="content__form--fieldGroup">
              <label htmlFor="desc">Description</label>
              <input
                type="text"
                id="desc"
                placeholder="Give playlist description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <button type="submit" className="content__form--submit">
              {createLoading ? "Loading..." : "Create Playlist"}
            </button>
          </form>
        ) : showType === "PLAYLISTS" ? (
          <div className="content__list">
            {playlistsLoading && (
              <div className="loading">
                Getting all playlists, Please wait...
              </div>
            )}

            {!playlistsLoading && playlistsError && (
              <div className="error">No playlist available. Create One</div>
            )}

            {playlists &&
              playlists.length > 0 &&
              playlists.map((item, i) => (
                <div key={item.id} className="content__list--item">
                  <div className="left">
                    <div className="card">
                      <div className="layer layer1"></div>
                      <div className="layer layer2"></div>
                      <div className="numVideos">
                        {item.videos.length} videos
                      </div>
                    </div>

                    <div className="info">
                      <div className="title">{item.title}</div>

                      <div className="subText">
                        Created <Moment fromNow>{item.createdAt}</Moment>
                      </div>
                    </div>
                  </div>

                  <div className="right">
                    <PlaylistOptions
                      options={PLAYLISTOPTIONS}
                      setShowType={setShowType}
                      item={item}
                      setSelectedPlaylist={setSelectedPlaylist}
                    />
                  </div>
                </div>
              ))}
          </div>
        ) : showType === "UPDATE_FORM" ? (
          <form onSubmit={updatePlaylistHandler} className="content__form">
            <div className="content__form--fieldGroup">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Give playlist name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="content__form--fieldGroup">
              <label htmlFor="desc">Description</label>
              <input
                type="text"
                id="desc"
                placeholder="Give playlist description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <button type="submit" className="content__form--submit">
              {updateLoading ? "Loading..." : "Update Playlist"}
            </button>
          </form>
        ) : null}
      </div>
    </CreatePlaylistModelStyled>
  );
};

export default CreatePlaylistModel;

const CreatePlaylistModelStyled = styled.div`
  position: fixed;
  overflow-y: auto;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 1000;
  background: #202020;
  border-radius: 0.3rem;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.4), 0px 0px 4px rgba(0, 0, 0, 0.25);
  transform: translateY(-100%);
  transition: all 1s ease;
  font-family: ${(props) => props.theme.montserrat};

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 5rem;
    border-bottom: 1px solid rgba(112, 112, 112, 0.4);

    .backIcon {
      margin-right: 1rem;
      cursor: pointer;

      img {
        height: 1rem;
        width: auto;
      }
    }

    .name {
      font-size: 1.3rem;
      font-weight: 500;
      color: #f2f2f7;
      text-transform: capitalize;
    }

    .left {
      display: flex;
      align-items: center;
    }

    .formState {
      border: 3px solid #fff;
      padding: 0.3rem 1.2rem;
      border-radius: 10rem;
      font-size: 1rem;
      background-color: transparent;
      color: #fff;
      font-family: ${(props) => props.theme.montserrat};
      font-weight: 400;
      text-transform: capitalize;
      transition: all 0.2s ease;
      cursor: pointer;

      &:hover {
        background-color: #fff;
        color: #000;
      }
    }
  }

  .content {
    width: 90%;
    margin: 2rem auto;

    &__form {
      width: 50%;
      margin: 0 auto;

      &--fieldGroup {
        margin-bottom: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        label {
          padding: 0 0 0.7rem 1rem;
          font-size: 1rem;
          font-weight: 400;
          text-transform: capitalize;
          color: #f2f2f7;
          letter-spacing: 1px;
        }

        input {
          width: 100%;
          padding: 1rem;
          background-color: #3a3a3c;
          color: #f2f2f7;
          border-radius: 0.5rem;
          border: none;
          outline: none;
          font-size: 1rem;
          font-weight: 400;
          color: #f2f2f7;
          font-family: ${(props) => props.theme.montserrat};
          transition: all 0.25s ease;
          border: 3px solid transparent;

          &::placeholder {
            font-weight: 300;
            color: #f2f2f7;
            letter-spacing: 0.3px;
          }

          &:focus {
            border: 3px solid #f88946;
          }
        }
      }

      &--submit {
        color: #fff;
        border: none;
        outline: none;
        cursor: pointer;
        line-height: 1;
        font-family: ${(props) => props.theme.montserrat};
        padding: 0.8rem 1rem;
        text-transform: uppercase;
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 1rem;
        background: transparent
          linear-gradient(
            130deg,
            var(--profile-icon-bg) 14%,
            #f88946 23%,
            #f8795f 37%,
            #f75e87 55%,
            #f75b8c 57%
          )
          0% 0% no-repeat padding-box;
        background: transparent
          linear-gradient(
            130deg,
            #f9903d 14%,
            #f88946 23%,
            #f8795f 37%,
            #f75e87 55%,
            #f75b8c 57%
          )
          0% 0% no-repeat padding-box;
        border-radius: 0.5rem;
      }
    }

    &__list {
      width: 50%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      &--item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
        padding: 1rem;
        width: 100%;
        border-bottom: 1px solid rgba(112, 112, 112, 0.4);

        .right {
          cursor: pointer;
        }

        .left {
          display: flex;
          align-items: center;

          .card {
            height: 3rem;
            width: 5rem;
            background-color: #2c2c2e;
            border-radius: 0.3rem;
            border: 1px solid #f86782;
            position: relative;
            margin-right: 1rem;

            .layer {
              position: absolute;
              height: 100%;
              width: 100%;
              border-radius: 0.3rem;
              background-color: #2c2c2e;
              border: 1px solid #f86782;
              top: 0;
              left: 0;
            }

            .layer1 {
              transform: translateY(-2px) translateX(-2px);
            }
            .layer2 {
              transform: translateY(-6px) translateX(-4px);
            }

            .numVideos {
              color: #fff;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              z-index: 2;
              font-size: 0.55rem;
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100%;
              text-transform: uppercase;
            }
          }

          .info {
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            .title {
              font-size: 1.2rem;
              font-weight: 500;
              color: #f2f2f7;
              line-height: 1.2;
            }

            .subText {
              font-size: 0.8rem;
              font-weight: 300;
              color: #aeaeb2;
            }
          }
        }

        .right {
        }
      }
    }
  }

  @media screen and (max-width: 991px) {
    .content {
      &__from {
        width: 70%;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .header {
      padding: 1rem 2.5rem;

      .name {
        font-size: 1.1rem;
      }
    }

    .content {
      &__form {
        width: 90%;
      }
    }
  }

  @media screen and (max-width: 600px) {
    .content {
      &__form {
        width: 100%;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .header {
      padding: 1rem 1.5rem;

      .name {
        font-size: 0.9rem;
      }

      .formState {
        font-size: 0.9rem;
      }
    }

    .content {
      &__form {
        &--fieldGroup {
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          label {
            padding: 0 0 0.7rem 1rem;
            font-size: 1rem;
            font-weight: 400;
            text-transform: capitalize;
            color: #f2f2f7;
            letter-spacing: 1px;
          }

          input,
          textarea {
            padding: 0.8rem 1rem;
            font-size: 0.9rem;
          }
        }

        &--submit {
          padding: 0.7rem 1rem;
          font-size: 0.9rem;
        }
      }

      &__list {
        width: 100%;

        &--item {
          .left {
            .card {
              height: 2.5rem;
              width: 4rem;
              margin-right: 0.8rem;
            }

            .info {
              .title {
                font-size: 1rem;
              }

              .subText {
                font-size: 0.7rem;
              }
            }
          }
        }
      }
    }
  }
`;
