import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Button from "../styles/Button";
import { CloseIcon } from "./Icons";
import useInput from "../hooks/useInput";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  getVideo,
  updateVideo,
  getProfile,
  clearVideo,
  getVideoCategories,
  getVideoAccessOverlays,
  getHashtags,
} from "../actions";

import ReactTags from "react-tag-autocomplete";
import "../styles/react-tag.css";

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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 900;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
  animation: ${openModal} 0.5s ease-in-out;
  h2 {
    font-size: 1.2rem;
  }
  .modal-content {
    width: 600px;
    margin: 4rem auto;
    background: ${(props) => props.theme.grey};
    border-radius: 3px;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.4), 0px 0px 4px rgba(0, 0, 0, 0.25);
  }
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }
  .modal-header-left {
    display: flex;
    align-items: center;
  }
  .modal-header-left svg {
    margin-right: 1rem;
    position: relative;
    fill: ${(props) => props.theme.red};
    top: -1px;
  }
  .video-form {
    border-top: 1px solid ${(props) => props.theme.darkGrey};
    border-bottom: 1px solid ${(props) => props.theme.darkGrey};
    padding: 0.5rem 1rem;
  }
  .video-form input,
  .video-form textarea {
    width: 95%;
    background: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.darkGrey};
    color: ${(props) => props.theme.primaryColor};
    padding: 0.5rem 1rem;
    margin-bottom: 1.2rem;
    border-radius: 3px;
  }
  .video-form textarea {
    height: 10rem;
  }
  .video-form select {
    background: #121212;
    color: white;
  }
  .modal-footer {
    display: flex;
    height: 70px;
    padding: 1rem;
  }
  button {
    margin-left: auto;
  }
  img {
    width: 100%;
    height: 340px;
    object-fit: cover;
  }
  svg {
    width: 30px;
    height: 30px;
    fill: ${(props) => props.theme.red};
  }
  .select-box {
    margin-bottom: 1.5rem;
    h2 {
      font-size: 1.2rem;
      margin-right: 0.5rem;
    }
    select {
      width: 95%;
      outline: none;
      padding: 0.5rem 1rem;
      background: ${(props) => props.theme.black};
      border: 1px solid ${(props) => props.theme.darkGrey};
      font-size: 1rem;
      border-radius: 3px;
    }
  }
  @media screen and (max-width: 835px) {
    .modal-content,
    .modal-content input,
    .modal-content textarea {
      width: 90%;
    }
    .select-box {
      select {
        width: 90%;
      }
    }
    .modal-content {
      margin-top: 7rem;
    }
  }
  @media screen and (max-width: 400px) {
    background: rgba(0, 0, 0, 0.9);
  }
`;

const FeaturedCheckbox = styled.div`
  .checkBoxItem {
    display: block;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding-left: 2.5rem;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    font-weight: 500;
    transform: translateY(0.6rem);
  }
  .checkBoxItem:hover input ~ .checkmark {
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  .checkBoxItem input:checked ~ .checkmark {
    background-image: linear-gradient(to bottom, #ff4883, #fdb769);
  }
  .checkBoxItem input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .checkBoxItem .checkmark {
    position: absolute;
    top: -0.2rem;
    left: 0;
    height: 27px;
    width: 27px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    outline: none;
  }
  .checkBoxItem .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  .checkBoxItem input:checked ~ .checkmark:after {
    display: block;
  }
  .checkBoxItem .checkmark:after {
    left: 9px;
    top: 2px;
    width: 8px;
    height: 15px;
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  p {
    font-size: 0.8rem;
    color: ${(props) => props.theme.red};
    margin-bottom: 1rem;
  }
`;

const EditVideoModal = ({ videoId, closeModal }) => {
  const videoCategories = useSelector((state) => state.video.videoCategories);
  const videoAccessOverlays = useSelector(
    (state) => state.video.videoAccessOverlays
  );
  const videoHashtags = useSelector((state) => state.video.videoHashtags);
  const user = useSelector((state) => state.user);
  const { video } = useSelector((state) => state);
  const { register, handleSubmit } = useForm();
  const title = useInput(video.title || null);
  const description = useInput(video.description || null);
  const [category, setCategory] = useState("1");
  const [keyVideoAccess, setKeyVideoAccess] = useState(0);
  const [hashTags, setHashTags] = useState(video.hashTags || []);
  const [isFeatured, setIsFeatured] = useState(false);
  const reactTags = React.createRef();
  const { id } = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();

  useEffect(() => {
    if (video && video.featuredWarriorPortal === true) {
      setIsFeatured(true);
    } else if (video && video.featuredWarriorPortal === false) {
      setIsFeatured(false);
    } else if (video && video.featuredWarriorPortal === null) {
      setIsFeatured(false);
    }
  }, [video]);

  useEffect(() => {
    if (videoCategories === undefined) {
      dispatch(getVideoAccessOverlays());
      dispatch(getVideoCategories());
      dispatch(getHashtags());
      setCategory(video.categoryId);
      setKeyVideoAccess(video.keyVideoAccess);
      setHashTags(video.hashTags);
    }
  }, [videoCategories]);

  const handleChange = (event) => setCategory(event.target.value);
  const handleVideoAccessChange = (event) =>
    setKeyVideoAccess(+event.target.value);

  useEffect(() => {
    dispatch(clearVideo());
    dispatch(getVideo(videoId));
  }, [videoId]);

  const onSubmit = async (data) => {
    let payPerViewAmount = 0;
    if (!data.title.trim()) {
      return toast.error("Please enter video title.");
    }
    if (title.length > 100) {
      return toast.error(
        "Sorry, you have exceeded the Limit for a video title, Maximum limit is 100 character."
      );
    }
    if (!data.description.trim()) {
      return toast.error("Please enter a video description.");
    }
    if (keyVideoAccess === 2) {
      if (!data.amount || !data.amount.trim() || isNaN(data.amount.trim())) {
        return toast.error("Please enter a valid amount.");
      }
      payPerViewAmount =
        data.amount && data.amount.trim()
          ? (+data.amount.trim()).toFixed(2)
          : "";
      if (!payPerViewAmount) {
        return toast.error("Please enter Pay Per View $ amount.");
      }
      if (payPerViewAmount <= 1.49) {
        return toast.error("Minimum amount Pay Per View is $1.50");
      }
    }

    await dispatch(
      updateVideo(videoId, {
        title: data.title,
        categoryId: category,
        keyVideoAccess: +keyVideoAccess,
        description: data.description,
        hashTags: hashTags,
        amount: payPerViewAmount,
        featuredWarriorPortal: isFeatured,
      })
    );
    toast.error("Video updated!");
    dispatch(getProfile(id));
    closeModal();
  };

  const onDelete = (i) => {
    const selectedHashtags = hashTags.slice(0);
    selectedHashtags.splice(i, 1);
    setHashTags(selectedHashtags);
  };

  const onAddition = (tag) => {
    const selectedHashtags = [].concat(hashTags, tag);
    setHashTags(selectedHashtags);
  };

  const onValidate = (tag) => {
    if (tag.name.length > 140) {
      toast.error("Hashtag must be less than 140 characters.");
      return false;
    }

    if (/[^a-zA-Z0-9]/.test(tag.name)) {
      toast.error(
        "Please remove invalid character. (only letters and numbers please)"
      );
      return false;
    }

    if (hashTags.length > 0) {
      if (hashTags.length >= 20) {
        toast.error("You can add up to 20 hashtags. Please remove some.");
        return false;
      }
      for (var i = 0; i < hashTags.length; i++) {
        if (
          hashTags[i].name.toString().toLowerCase() ===
          tag.name.toString().toLowerCase()
        ) {
          toast.error("Video hashtag already added.");
          return false;
        }
      }
    }
    return true;
  };

  return (
    <Wrapper>
      <div className="modal-content">
        {video.isFetching ? (
          <p>loading</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-header">
              <div className="modal-header-left">
                <CloseIcon
                  onClick={() => {
                    dispatch(clearVideo());
                    closeModal();
                  }}
                />
                <h3>Edit Video</h3>
              </div>
              <Button type="submit">Save</Button>
            </div>
            <div className="video-form">
              <h2>
                Video Title
                <span class="asterisk"> *</span>
              </h2>
              <input
                type="text"
                placeholder="Enter the title"
                name="title"
                defaultValue={video.title}
                ref={register({ required: true })}
                maxLength="100"
              />

              <div className="select-box">
                <h2>Choose Category </h2>
                <select
                  value={category}
                  onChange={handleChange}
                  name="category"
                >
                  {videoCategories &&
                    videoCategories.length &&
                    videoCategories.map((category, index) => {
                      return (
                        <option value={category.id} key={index + category.name}>
                          {category.name}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="select-box">
                <h2>Video Access</h2>
                <select
                  value={keyVideoAccess}
                  onChange={handleVideoAccessChange}
                  name="keyVideoAccess"
                >
                  {videoAccessOverlays &&
                    videoAccessOverlays.length &&
                    videoAccessOverlays.map((vao, index) => {
                      return (
                        <option value={vao.keyVideoAccess} key={index}>
                          {vao.name}
                        </option>
                      );
                    })}
                </select>
              </div>

              <FeaturedCheckbox>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isFeatured}
                      onChange={() => setIsFeatured(!isFeatured)}
                      name="isFeatured"
                    />
                  }
                  label="Featured Video"
                />

                <p>
                  check this to have your video display on your Warrior Home
                  page
                </p>
              </FeaturedCheckbox>

              {keyVideoAccess && keyVideoAccess === 2 ? (
                <div>
                  <h2>
                    Pay Per View Amount
                    <span class="asterisk"> *</span>
                  </h2>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Enter Amount (Minimum $1.50)"
                    defaultValue={
                      video.amount
                        ? parseFloat(+video.amount.trim()).toFixed(2)
                        : ""
                    }
                    ref={register({ required: true })}
                  />
                </div>
              ) : null}

              <h2>Video Hashtags</h2>
              <ReactTags
                ref={reactTags}
                tags={hashTags}
                suggestions={videoHashtags}
                onDelete={onDelete.bind(this)}
                onAddition={onAddition.bind(this)}
                onValidate={onValidate.bind(this)}
                placeholderText="Enter new hashtag"
                allowNew={true}
              />

              <h2>
                Description
                <span class="asterisk"> *</span>
              </h2>
              <textarea
                type="text"
                name="description"
                placeholder="Description"
                defaultValue={video.description}
                ref={register({ required: true })}
              />
            </div>
          </form>
        )}
      </div>
    </Wrapper>
  );
};

export default EditVideoModal;
