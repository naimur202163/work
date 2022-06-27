import React, { useEffect, useState, useContext, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled, { keyframes } from "styled-components";
import Player from "../Player";
import Button from "../../styles/Button";
import useInput from "../../hooks/useInput";
import { CloseIcon } from "../Icons";
import { upload } from "../../utils";
import path from "path";
import api from "../../services/api";
import {
  uploadVideo,
  updateVideo,
  getTrending,
  getLatest,
  getProfile,
  getVideoCategories,
  getVideoAccessOverlays,
  getHashtags,
} from "../../actions";

import ReactTags from "react-tag-autocomplete";
import "../../styles/react-tag.css";
import { GlobalContext } from "../../context/GlobalContext";
import VideoCategories from "../VideoCategory";
import { Video } from 'video-metadata-thumbnails';
// import { useFetch } from "../../hooks/useFetch";

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
  z-index: 1001;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
  animation: ${openModal} 0.5s ease-in-out;
  h2 {
    font-size: 1.2rem;
  }
  h4 {
    font-size: 0.8rem;
    color: #a6a6a6;
  }
  .upload-content {
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
  .model-video-form {
    border-top: 1px solid ${(props) => props.theme.darkGrey};
    border-bottom: 1px solid ${(props) => props.theme.darkGrey};
    padding: 0.5rem 1rem;
    margin: 0 !important;
    width: 100% !important;
  }
  .model-video-form input,
  .model-video-form textarea {
    width: 95%;
    background: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.darkGrey};
    color: ${(props) => props.theme.primaryColor};
    padding: 0.5rem 1rem;
    margin-bottom: 1.2rem;
    border-radius: 3px;
  }
  #replace-video {
    position: relative;
    img {
      width: 95%;
      height: 10rem;
    }
    button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .model-video-form textarea {
    height: 10rem;
  }
  .model-video-form select {
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
  /* img {
    width: 100%;
    height: 340px;
    object-fit: cover;
  } */
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
  .requestNewCategory {
    font-size: 0.9rem;
    color: #fff;
    font-weight: 300;
    border: none;
    outline: none;
    background-color: transparent;
    transform: translateY(-1.2rem);
    transition: all 0.2s ease;
    &:after {
      content: "";
      display: block;
      width: 0;
      height: 2px;
      background: ${(props) => props.theme.red};
      transition: width 0.3s;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover {
      color: ${(props) => props.theme.red};
    }
  }
  @media screen and (max-width: 835px) {
    .upload-content,
    .upload-content input,
    .upload-content textarea {
      width: 90%;
    }
    #replace-video {
      img {
        width: 90%;
      }
    }
    .select-box {
      select {
        width: 90%;
      }
    }
    .upload-content {
      margin-top: 7rem;
    }
  }
`;

const ShowUploadIcon = styled.div`
  padding: 2rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  .item {
    label {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .icon-box {
    cursor: pointer;
    height: 5rem;
    width: 5rem;
    background-color: #fff;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    i {
      font-size: 2.5rem;
      color: #777;
    }
  }
  span {
    font-size: 1.2rem;
    color: #fff;
    font-weight: 555;
  }
`;

const ButtonOutline = styled.button`
  padding: 0.3rem 1rem;
  background: ${(props) => props.theme.grey};
  color: ${(props) => props.theme.white};
  border: 3px solid ${(props) => props.theme.white};
  border-radius: 3px;
  letter-spacing: 1.1px;
  margin: 0 0.7rem !important;
`;

const VideoThumbnail = styled.div`
  display: flex;
  flex-direction: column;
  .uploadthumbnail {
    border: 1px solid #383838;
    border-radius: 1px;
    font-size: 1em;
    padding: 6px 0 0 6px;
    width: 95%;
  }
  .cover-upload-container {
    min-height: 6rem;
    position: relative;
    overflow: hidden;
    padding: 6px 0 12px 6px;
    border: 1px solid #383838;
    margin-bottom: 2rem;
    width: 95%;
    .img {
      background-size: cover;
      background-position: center;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    .overlay {
      height: 3rem;
      width: 3rem;
      position: absolute;
      bottom: 0.5rem;
      cursor: pointer;
      right: 0.5rem;
      z-index: 1;
      border-radius: 50%;
      color: #fff;
      font-size: 1rem;
      background-color: #181818;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      border: 1px solid #cc0000;
      /* opacity: 0; */
    }
    /* &:hover .overlay {
        opacity: 1;
      } */
  }
`;
const ThumbnailPreview = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 200px;
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

const UploadFormModal = ({ setShowModal, videoUpdate, videoId }) => {
  const videoCategories = useSelector((state) => state.video.videoCategories);
  const [defaultCategories, setDefaultCategories] = useState([]);
  const videoAccessOverlays = useSelector(
    (state) => state.video.videoAccessOverlays
  );
  const videoHashtags = useSelector((state) => state.video.videoHashtags);
  const user = useSelector((state) => state.user);

  const title = useInput(videoUpdate?.title || "");
  const ppvAmount = useInput("");
  const description = useInput(videoUpdate?.description || "");
  // const [category, setCategory] = useState("1");
  const category = "1";
  const [keyVideoAccess, setKeyVideoAccess] = useState(0);
  const [tab, setTab] = useState("FORM");
  const [previewVideo, setPreviewVideo] = useState();
  const [url, setUrl] = useState(videoUpdate?.url || "");
  const [publicId, setPublicId] = useState("");
  const [videoLength, setVideoLength] = useState(
    videoUpdate?.videoLength || null
  );
  const [thumbnail, setThumbnail] = useState(videoUpdate?.thumbnail || "");
  const [filesize, setVideoSize] = useState("");
  const [isFeatured, setIsFeatured] = useState(
    videoUpdate?.featuredWarriorPortal || false
  );
  const [customThumbnail, setCustomThumbnail] = useState({
    url: "",
    publicId: "",
  });
  const { setNewCategoryRequestModel } = useContext(GlobalContext);

  const [hashTags, sethashTags] = useState(videoUpdate?.hashTags || []);
  const [selectedCategory, setSelectedCategory] = React.useState([]);

  const reactTags = React.createRef();

  const dispatch = useDispatch();

  const tempFunc = useRef();
  const newFunc = () => {
    dispatch(getVideoAccessOverlays());
    dispatch(getVideoCategories());
    dispatch(getHashtags());
    getCurrentVideoCategory();
  };
  tempFunc.current = newFunc;
  useEffect(() => {
    tempFunc.current();
  }, []);

  // const handleChange = (event) => setCategory(event.target.value);
  const handleVideoAccessChange = (event) => {
    setKeyVideoAccess(+event.target.value);
  };
  const tempDataFunc = useRef();
  const newDataFunc = () => {
    if (thumbnail && !videoUpdate) {
      setTab("COMPLETE");
    }
  };
  tempDataFunc.current = newDataFunc;
  useEffect(() => {
    //check if a thumbnail is set and the form is not for editing video
    tempDataFunc.current();
  }, [thumbnail]);
  const getCurrentVideoCategory = async () => {
    const categoryResponse = await api.get(
      `videos/getCategoryByVideo/${videoId}`
    );
    if (categoryResponse.data.success) {
      setDefaultCategories(categoryResponse.data.videoSubCategories);
    }
  };

  const handleTab = () => {
    if (tab === "FORM") {
      const payPerViewAmount = ppvAmount.value.trim()
        ? (+ppvAmount.value.trim()).toFixed(2)
        : "";
      ppvAmount.setValue(payPerViewAmount);
      if (!title.value.trim()) {
        return toast.error("Please enter video title.");
      }
      if (title.length > 100) {
        return toast.error(
          "Sorry You are Exceeding the Limit for title, Maximum limit is 100 character."
        );
      }
      if (!selectedCategory.length) {
        return toast.error("Please select at least one category to continue.");
      }
      if (!description.value.trim()) {
        return toast.error("Please enter video description.");
      }
      if (keyVideoAccess === 2) {
        if (!payPerViewAmount) {
          return toast.error("Please enter pay per view amount.");
        }
        if (payPerViewAmount <= 1.49) {
          return toast.error("Minimum amount for pay per view is $1.50");
        }
      }

      setTab("UPLOAD");
    }
  };

  const completeVideoUpload = async () => {
    dispatch(
      uploadVideo({
        title: title.value,
        description: description.value,
        url,
        publicId,
        customThumbnail: customThumbnail.url,
        thumbnail,
        categoryId: +category,
        categoryList: selectedCategory,
        keyVideoAccess: +keyVideoAccess,
        filesize,
        hashTags: hashTags,
        ppvAmount: +ppvAmount.value,
        featuredWarriorPortal: isFeatured,
        videoLength,
      })
    );

    setShowModal(false);
    dispatch(getTrending());
    dispatch(getLatest());
    dispatch(getProfile(user.id));

    toast.success("Congrats! Video uploaded successfully.");
  };

  const completeVideoUpdate = async () => {
    // await api.delete(`videos/cloudinary/${videoUpdate.id}`);

    dispatch(
      updateVideo(videoUpdate.id, {
        title: title.value,
        description: description.value,
        url,
        publicId,
        thumbnail,
        customThumbnail: customThumbnail.url,
        categoryId: +category,
        categoryList: selectedCategory,
        keyVideoAccess: +keyVideoAccess,
        filesize,
        hashTags: hashTags,
        ppvAmount: +ppvAmount.value,
        featuredWarriorPortal: isFeatured,
        videoLength,
      })
    );

    setShowModal(false);
    dispatch(getProfile(user.id));

    toast.success("Congrats! Video updated successfully.");
  };

  const history = useHistory();
  const myAccountLink = () => {
    setShowModal(false);
    history.push(`/channel/${user.username}?tab=myaccount`);
  };

  const CustomToastWithLink = () => (
    <div onClick={myAccountLink}>
      <p>
        You've used up all your video storage! Please upgrade to a larger video
        package OR remove content from your channel. Click this message to
        upgrade your subscription.
      </p>
    </div>
  );


  const autoGenerateThumbnail = (video, file, ext) => {
    try {
      video
        .getThumbnails({
          quality: 1,
          scale: 0.8,
        })
        .then(async (thumbnails) => {
          const blobthird = thumbnails[3].blob;

          const newfile = new File([blobthird], file.name.replace(ext, ".jpg"), { type: "image/jpeg" });
          const { url } = await upload("image", newfile);
          setThumbnail(url);
        })
    } catch (error) {
      throw error;
    }
  }

  const handleVideoUpload = async (e) => {
    try {
      setTab("PREVIEW");

      const file = e.target.files[0];
      const userData = JSON.parse(localStorage.getItem("user"));
      const res = await api.get(`/users/space-left/${userData.id}`);

      if (!res.data.data) {
        return toast.error(CustomToastWithLink);
      } else {
        if (file) {
          setVideoSize(file.size);
          const size = file.size / 1000000;

          if (size > 2000) {
            setShowModal(false);
            return toast.error(
              "There is a 2GB per file size limit. Please upload a smaller file or use compression to reduce the size of this file"
            );
          }

          const url = URL.createObjectURL(file);
          setPreviewVideo(url);

          const data = await upload("video", file);

          setUrl(data.url);
          setPublicId(data.publicId);
          setVideoLength(Math.round(data.duration));

          const ext = path.extname(data.url);
          if (!!customThumbnail.url) {
            // if custom thumbnail is selected
            setThumbnail(customThumbnail.url);
          } else {
            const video = new Video(file);
            autoGenerateThumbnail(video, file, ext);
          }
        }
      }
    } catch (e) {
      setTab("FORM");
      toast.dismiss();
      return toast.error(
        "Opps... soemthing went wrong with the upload. Please try again."
      );
    }
  };

  const handleEditVideo = async (e) => {
    try {
      // setTab("PREVIEW");

      const file = e.target.files[0];
      const userData = JSON.parse(localStorage.getItem("user"));
      const res = await api.get(`/users/space-left/${userData.id}`);

      if (!res.data.data) {
        return toast.error(CustomToastWithLink);
      } else {
        if (file) {
          setVideoSize(file.size);
          const size = file.size / 1000000;

          if (size > 2000) {
            setShowModal(false);
            return toast.error(
              "There is a 2GB per file size limit. Please upload a smaller file or use compression to reduce the size of this file"
            );
          }

          const data = await upload("video", file);
          setUrl(data.url);
          setPublicId(data.publicId);
          setVideoLength(Math.round(data.duration));

          const ext = path.extname(data.url);
          if (!!customThumbnail.url) {
            // if custom thumbnail is selected
            setThumbnail(customThumbnail.url);
          } else {
            const video = new Video(file);
            autoGenerateThumbnail(video, file, ext);
          }
        }
      }
    } catch (e) {
      setTab("FORM");
      toast.dismiss();
      return toast.error(
        "Opps... soemthing went wrong with the upload. Please try again."
      );
    }
  };

  const onDelete = (i) => {
    const selectedHashtags = hashTags.slice(0);
    selectedHashtags.splice(i, 1);
    sethashTags(selectedHashtags);
  };

  const onAddition = (tag) => {
    const selectedHashtags = [].concat(hashTags, tag);
    sethashTags(selectedHashtags);
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

  const handleCustomThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const { publicId, url } = await upload("image", file);
      setCustomThumbnail({ url, publicId });
    }
  };

  return (
    <Wrapper>
      <div className="upload-content">
        <div className="modal-header">
          <div className="modal-header-left">
            <CloseIcon onClick={() => setShowModal(false)} />
            {tab === "FORM" && !videoUpdate && <h3>Give Video Details</h3>}
            {tab === "FORM" && videoUpdate && <h3>Edit Video Details</h3>}
            {tab === "UPLOAD" && <h3>Choose Your Video</h3>}
          </div>

          {tab === "FORM" && !videoUpdate && (
            <div onClick={handleTab}>
              <Button>Next</Button>
            </div>
          )}
          {tab === "FORM" && videoUpdate && (
            <div onClick={completeVideoUpdate}>
              <Button>Save</Button>
            </div>
          )}
          {tab === "UPLOAD" && (
            <ButtonOutline onClick={() => setTab("FORM")}>
              Go Back
            </ButtonOutline>
          )}
          {tab === "PREVIEW" && (
            <div>
              <Button>Uploading...</Button>
            </div>
          )}
          {tab === "COMPLETE" && (
            <div>
              <ButtonOutline
                onClick={() => {
                  setTab("UPLOAD");
                  setVideoSize("");
                  setPreviewVideo("");
                  setUrl("");
                  setPublicId("");
                  setThumbnail("");
                }}
              >
                Cancel
              </ButtonOutline>
              {!videoUpdate ? (
                <Button onClick={completeVideoUpload}>Post Video</Button>
              ) : (
                <Button onClick={completeVideoUpdate}>Save</Button>
              )}
            </div>
          )}
        </div>

        {tab === "UPLOAD" && (
          <ShowUploadIcon>
            <div className="item">
              <label htmlFor="video-upload">
                <div className="icon-box">
                  <i className="fas fa-upload" />
                </div>
                <span>Upload Video</span>
                <h4>Note: Maximum video file size is 2GB</h4>
              </label>

              <input
                style={{ display: "none" }}
                id="video-upload"
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
              />
            </div>
          </ShowUploadIcon>
        )}

        {previewVideo
          ? (tab === "PREVIEW" || tab === "COMPLETE") && (
            <div className="tab video-preview">
              <Player previewUrl={previewVideo} />
            </div>
          )
          : null}

        {tab === "FORM" && (
          <div className="tab model-video-form">
            <h2>
              Video Title
              <span className="asterisk"> *</span>
            </h2>
            <input
              type="text"
              placeholder="Enter the title"
              value={title.value}
              onChange={title.onChange}
              maxLength="100"
            />
            <div className="select-box">
              <h2>Choose Category </h2>
              <VideoCategories
                videoCategories={videoCategories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                defaultCategories={defaultCategories}
              />
            </div>

            <button
              onClick={() => {
                setNewCategoryRequestModel(true);
                setShowModal(false);
              }}
              className="requestNewCategory"
            >
              Request New Category
            </button>

            <div className="select-box">
              <h2>Video Access</h2>
              <select value={keyVideoAccess} onChange={handleVideoAccessChange}>
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
              <label className="checkBoxItem">
                <input
                  type="checkbox"
                  value={isFeatured}
                  onChange={() => setIsFeatured(!isFeatured)}
                />
                <span className="checkmark"></span>
                Featured Video
              </label>

              <p>
                check this to have your video display on your Warrior Home page
              </p>
            </FeaturedCheckbox>

            {keyVideoAccess && keyVideoAccess === 2 ? (
              <div>
                <h2>
                  Pay Per View Amount
                  <span className="asterisk"> *</span>
                </h2>
                <input
                  type="number"
                  placeholder="Enter Amount (Minimum $1.50)"
                  value={ppvAmount.value}
                  onChange={ppvAmount.onChange}
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
            <VideoThumbnail>
              <h2>Video Thumbnail</h2>
              <div className="cover-upload-container">
                <label htmlFor="cover-upload">
                  <div className="overlay">
                    <i className="fas fa-upload" />
                  </div>
                  <h4>
                    Upload any custom image for your Video! We'll auto-generate
                    a thumbnail from your video if you don't have one.
                  </h4>
                </label>
                <input
                  id="cover-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleCustomThumbnailUpload}
                  style={{ display: "none" }}
                />
                {!!customThumbnail.url && (
                  <ThumbnailPreview>
                    <h3>Preview</h3>
                    <img src={customThumbnail.url} alt="" />
                  </ThumbnailPreview>
                )}
              </div>
            </VideoThumbnail>
            {videoUpdate && (
              <VideoThumbnail>
                <h2>Update Video</h2>
                <div className="cover-upload-container">
                  <label htmlFor="video-upload">
                    <div className="overlay">
                      <i className="fas fa-upload" />
                    </div>
                    <h4>Replace the current video file with a new one.</h4>
                  </label>
                  <input
                    style={{ display: "none" }}
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    onChange={handleEditVideo}
                  />
                  {!!videoUpdate && (
                    <ThumbnailPreview>
                      <h3>Preview</h3>
                      <img src={thumbnail} alt="" />
                    </ThumbnailPreview>
                  )}
                </div>
              </VideoThumbnail>
            )}
            <h2>
              Description
              <span className="asterisk"> *</span>
            </h2>
            <textarea
              placeholder="Tell viewers about your video"
              value={description.value}
              onChange={description.onChange}
            />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default UploadFormModal;
