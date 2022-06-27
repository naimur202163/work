import React, { useContext, useState, useEffect, useRef } from "react";
import BackIcon from "../../assets/Icons/back.svg";
import AddIcon from "../../assets/Icons/add.svg";
import Player from "../Player";
import Button from "../../styles/Button";
import useInput from "../../hooks/useInput";
import path from "path";
import api from "../../services/api";
import ReactTags from "react-tag-autocomplete";
import VideoCategories from "./VideoCategory";
import styled, { keyframes } from "styled-components";
import { GlobalContext } from "../../context/GlobalContext";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { CloseIcon } from "../Icons";
import { upload } from "../../utils";
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
import "../../styles/react-tag.css";
import { Video } from "video-metadata-thumbnails";

const EditClipForm = ({ close, videoUpdate, videoId }) => {
  console.log(videoUpdate, videoId, "from edit clip form");

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
  const {
    setNewCategoryRequestModel,
    setShowEditClipModel,
    showEditClipModel,
  } = useContext(GlobalContext);

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

    setShowEditClipModel(false);
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

    setShowEditClipModel(false);
    dispatch(getProfile(user.id));

    toast.success("Congrats! Video updated successfully.");
  };

  const history = useHistory();
  const myAccountLink = () => {
    setShowEditClipModel(false);
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

          const newfile = new File(
            [blobthird],
            file.name.replace(ext, ".jpg"),
            { type: "image/jpeg" }
          );
          const { url } = await upload("image", newfile);
          setThumbnail(url);
        });
    } catch (error) {
      throw error;
    }
  };

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
            setShowEditClipModel(false);
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
            setShowEditClipModel(false);
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
    <EditClipFormStyled
      className={`${showEditClipModel && "ShowEditClipForm"}`}
    >
      <div className="header">
        <div onClick={close} className="close">
          <img src={BackIcon} alt="" />
        </div>

        <div className="title">
          {tab === "FORM" && !videoUpdate && "Give Video Details"}
          {tab === "FORM" && videoUpdate && "Edit Video Details"}
          {tab === "UPLOAD" && "Choose Your Video"}
        </div>

        {tab === "FORM" && !videoUpdate && (
          <div className="button" onClick={handleTab}>
            next
          </div>
        )}
        {tab === "FORM" && videoUpdate && (
          <div className="button" onClick={completeVideoUpdate}>
            save
          </div>
        )}
        {tab === "UPLOAD" && (
          <div className="button" onClick={() => setTab("FORM")}>
            Go Back
          </div>
        )}
        {tab === "PREVIEW" && <div className="button">Uploading...</div>}
        {tab === "COMPLETE" && (
          <div className="group">
            <div
              className="button"
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
            </div>
            {!videoUpdate ? (
              <div className="button" onClick={completeVideoUpload}>
                Post Video
              </div>
            ) : (
              <div className="button" onClick={completeVideoUpdate}>
                Save
              </div>
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
            <div className="videoPreviewBox">
              <Player previewUrl={previewVideo} />
            </div>
          )
        : null}

      {tab === "FORM" && (
        <div className="form">
          <div className="form--fieldGroup">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Video title"
              value={title.value}
              onChange={title.onChange}
            />
          </div>

          <div className="form--fieldGroup">
            <label htmlFor="">Choose category</label>
            <VideoCategories
              videoCategories={videoCategories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              defaultCategories={defaultCategories}
            />

            <button
              onClick={() => {
                setNewCategoryRequestModel(true);
              }}
              className="requestNewCategory"
            >
              Request New Category
            </button>
          </div>

          <div className="form--fieldGroup">
            <label htmlFor="">Video Access</label>

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

          {keyVideoAccess && keyVideoAccess === 2 ? (
            <div className="form--fieldGroup">
              <label>
                Pay Per View Amount
                <span className="asterisk"> *</span>
              </label>
              <input
                type="number"
                placeholder="Enter Amount (Minimum $1.50)"
                value={ppvAmount.value}
                onChange={ppvAmount.onChange}
              />
            </div>
          ) : null}

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

            <p>Check this video to show it on homepage of profile portal.</p>
          </FeaturedCheckbox>

          <div className="form--fieldGroup">
            <label>Video Hashtags</label>
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
          </div>

          <div className="form--fieldGroup">
            <div className="title">Cover</div>

            <label htmlFor="uploadThumbnail" className="uploadThumbnail">
              <img src={AddIcon} alt="Add Icon" className="icon" />

              <p>
                Upload any custom image for your Video! We'll auto-generate a
                thumbnail from your video if you don't have one.
              </p>
            </label>

            <input
              style={{ display: "none" }}
              id="uploadThumbnail"
              type="file"
              accept="image/*"
              onChange={handleCustomThumbnailUpload}
            />

            {!!customThumbnail.url && (
              <div className="uploadedCoverPreview">
                <img src={customThumbnail.url} alt="" />
              </div>
            )}
          </div>

          {videoUpdate && (
            <div className="form--fieldGroup">
              <div className="title">Update Video</div>
              <label htmlFor="uploadVideo" className="uploadThumbnail">
                <img src={AddIcon} alt="Add Icon" className="icon" />

                <p>Replace the current video with new one</p>
              </label>

              <input
                style={{ display: "none" }}
                id="uploadVideo"
                type="file"
                accept="video/*"
                onChange={handleEditVideo}
              />

              {!!videoUpdate && (
                <div className="uploadedCoverPreview">
                  <img src={thumbnail} alt="" />
                </div>
              )}
            </div>
          )}

          <div className="form--fieldGroup">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              placeholder="Tell viewers about your video"
              value={description.value}
              onChange={description.onChange}
            />
          </div>
        </div>
      )}
    </EditClipFormStyled>
  );
};

export default EditClipForm;

const EditClipFormStyled = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #1c1c1e;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  z-index: 901;
  opacity: 0;
  transform: translateX(-100%);
  transition: all 1s ease;
  font-family: ${(props) => props.theme.montserrat};

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 5rem;
    border-bottom: 1px solid rgba(112, 112, 112, 0.4);
    margin-bottom: 2rem;

    .close {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 2rem;
        height: auto;
        cursor: pointer;
      }
    }

    .title {
      font-size: 1.2rem;
      font-weight: 400;
      text-transform: capitalize;
    }

    .group {
      display: flex;
      align-items: center;

      .button:not(:last-child) {
        margin-right: 0.5rem;
      }
    }

    .button {
      border: 2px solid #fff;
      padding: 0.2rem 1.5rem;
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

  .videoPreviewBox {
    width: 50%;
    margin: 0 auto 5rem auto;
  }

  .form {
    width: 50%;
    margin: 0 auto 5rem auto;

    &--fieldGroup {
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .requestNewCategory {
        cursor: pointer;
        line-height: 1;
        font-family: brother-1816, sans-serif;
        padding: 0.4rem 1rem;
        text-transform: uppercase;
        font-size: 0.75rem;
        letter-spacing: 1px;
        font-weight: 500;
        color: #fff;
        border: none;
        outline: none;
        margin-top: 1rem;
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
        border-radius: 3px;
      }

      .uploadedCoverPreview {
        width: 100%;
        margin-top: 2rem;

        img {
          width: 100%;
          height: auto;
          border-radius: 1rem;
          background-size: cover;
          background-position: center;
          object-fit: cover;
        }
      }

      label {
        padding: 0 0 0.7rem 1rem;
        font-size: 1rem;
        font-weight: 400;
        text-transform: capitalize;
        color: #f2f2f7;
        letter-spacing: 1px;
      }

      input,
      textarea,
      select {
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

      textarea {
        resize: none;
        height: 15rem;
      }

      .uploadThumbnail {
        width: 100%;
        min-height: 7rem;
        background-color: #3a3a3c;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;
        overflow: hidden;
        padding: 0 2rem;
        height: auto;

        img {
          height: 2.5rem;
          width: auto;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        p {
          font-size: 0.85rem;
          font-weight: 300;
          color: #f2f2f7;
          line-height: 1.4;
          margin-bottom: 2rem;
          text-align: center;
        }
      }

      .title {
        padding: 0 0 0.7rem 1rem;
        font-size: 1rem;
        font-weight: 400;
        text-transform: capitalize;
        color: #f2f2f7;
        letter-spacing: 1px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .header {
      padding: 1rem 2rem;
      margin-bottom: 1.5rem;

      .title {
        font-size: 1rem;
      }

      .button {
        font-size: 0.9rem;
      }
    }

    .form {
      width: 90%;

      &__description {
        .title {
          font-size: 1rem;
        }
      }

      input,
      textarea {
        font-size: 0.9rem;
      }

      textarea {
        height: 12rem;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .header {
      margin-bottom: 1rem;

      .button {
        font-size: 0.8rem;
      }
    }

    .videoPreviewBox {
      width: 90%;
    }

    .form {
      width: 90%;

      textarea {
        height: 10rem;
      }
    }
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
    font-size: 0.85rem;
    font-weight: 500;
    color: #f2f2f7;
    line-height: 1.4;
    margin-bottom: 2rem;
    text-align: left;
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
