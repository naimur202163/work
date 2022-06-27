import React from "react";
import { toast } from "react-toastify";
import styled, { keyframes } from "styled-components";
import { useDispatch } from "react-redux";
import Button from "../styles/Button";
import { CloseIcon } from "./Icons";
import { deleteVideo, getProfile } from "../actions";
import axios from "axios";
import config from "../config/config";

const openModal = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 900;
  background: rgba(0, 0, 0, 0.7);
  animation: ${openModal} 0.5s ease-in-out;

  .edit-profile {
    width: 580px;
    border-radius: 4px;
    background: ${(props) => props.theme.grey};
    margin: 4rem auto;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.4), 0px 0px 4px rgba(0, 0, 0, 0.25);
  }

  .edit-profile img {
    object-fit: cover;
  }

  .avatar {
    margin-top: -40px;
    margin-left: 20px;
  }

  div.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.darkGrey};
  }

  h3 {
    display: flex;
    align-items: center;
  }

  h3.modal-message {
    display: block;
    align-items: center;
    padding-top: 2%;
    padding-bottom: 2%;
  }

  form {
    padding: 1rem;
  }

  .modal-content {
    text-align: center;
    padding: 5px;
    padding-bottom: 3%;
  }

  input,
  textarea {
    width: 100%;
    background: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.black};
    margin-bottom: 1rem;
    padding: 0.6rem 1rem;
    border-radius: 3px;
    color: ${(props) => props.theme.primaryColor};
  }

  textarea {
    height: 75px;
  }

  svg {
    fill: ${(props) => props.theme.red};
    height: 22px;
    width: 22px;
    margin-right: 1rem;
    position: relative;
    top: -1px;
  }

  @media screen and (max-width: 600px) {
    .edit-profile {
      width: 90%;
      margin: 4rem auto;
    }
  }

  @media screen and (max-width: 400px) {
    background: rgba(0, 0, 0, 0.9);
  }
`;

const DeleteVideoModal = ({ videoId, closeModal,filename,image }) => {
  const dispatch = useDispatch();
  const { id } = JSON.parse(localStorage.getItem("user"));
  const filenamesplit = filename.split('/').pop()
  const imagename = image.split('/').pop()

  const handleDeleteVideo = async () => {
    filenamesplit && await axios.delete(`${config.REACT_APP_BACKEND_URL}fileoperation/deleteFile/${filenamesplit}`)
    imagename && await axios.delete(`${config.REACT_APP_BACKEND_URL}fileoperation/deleteFile/${imagename}`)
    await dispatch(deleteVideo(videoId));
    toast.error("Video deleted.");
    closeModal();
    dispatch(getProfile(id));
  };

  return (
    <Wrapper>
      <div className="edit-profile">
        <div className="modal-header">
          <h3>
            <CloseIcon onClick={() => closeModal()} />
            <span>Delete Video</span>
          </h3>
        </div>
        <div className="modal-content">
          <h3 className="modal-message">
            Are you sure you want to delete this video?
            <br />
            Deleted content cannot be restored!
          </h3>
          <Button onClick={handleDeleteVideo}>Delete</Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default DeleteVideoModal;
