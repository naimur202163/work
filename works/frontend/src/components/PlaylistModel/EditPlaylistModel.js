import React, {  useState } from "react";
import styled, { keyframes } from "styled-components";
import BackdropV2 from "../BackdropV2";
import { CloseIcon } from "../Icons";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";

const EditPlaylistModel = ({
  open,
  closeHandler,
  playlistTitle,
  playlistDesc,
  updateHandler,
}) => {
  // const dispatch = useDispatch();
  const [title, setTitle] = useState(playlistTitle);
  const [desc, setDesc] = useState(playlistDesc);

  return (
    <>
      <EditPlaylistModelWrapper>
        <div className="header">
          <CloseIcon onClick={closeHandler} />
          <h1 className="header__title">Update Playlist ...</h1>
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

        <button
          onClick={() => updateHandler(title, desc)}
          className="playlistNew"
        >
          <span>Update Playlist</span>
        </button>
      </EditPlaylistModelWrapper>
      {open && <BackdropV2 close={closeHandler} />}
    </>
  );
};

export default EditPlaylistModel;

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

const EditPlaylistModelWrapper = styled.div`
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
