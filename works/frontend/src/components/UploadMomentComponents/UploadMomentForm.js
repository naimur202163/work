import React, { useContext, useState, useEffect, createRef } from "react";
import styled from "styled-components";
import BackIcon from "../../assets/Icons/back.svg";
import Slider from "react-slick";
import ChooseCoverImage from "./ChooseCoverImage";
import TagPeople from "./TagPeople";
import PlusIcon from "../../assets/Icons/plus.svg";
import TagPeopleIcon from "../../assets/Icons/tag.svg";
import HashtagIcon from "../../assets/Icons/hashtag.svg";
import CaretRightIcon from "../../assets/Icons/caret-right.svg";
import UploadIcon from "../../assets/Icons/upload-icon-white.svg";
import api from "../../services/api";
import path from "path";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import config from "../../config/config";
import ReactTags from "react-tag-autocomplete";
import { Row, Col } from "react-grid-system";
import { GlobalContext } from "../../context/GlobalContext";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { upload } from "../../utils";
import { Video } from "video-metadata-thumbnails";
import { useFetch } from "../../hooks/useFetch";
import {
  uploadMoment,
  getHashtags,
  getAllFriends,
  getTaggedUsersInMoment,
} from "../../actions";

const SliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  autoPlay: false,
  slidesToShow: 6,
  slidesToScroll: 2,
  arrows: false,

  responsive: [
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
      },
    },

    {
      breakpoint: 481,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
  ],
};

const UploadMomentForm = ({ close }) => {
  const reactTags = createRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading: categoryLoading, data: categoriesData } = useFetch(
    `${config.REACT_APP_BACKEND_URL}videos/categories`
  );
  const videoHashtags = useSelector((state) => state.video.videoHashtags);
  const user = useSelector((state) => state.user);
  const { uploadLoading, uploadError, moment } = useSelector(
    (state) => state.moment
  );
  const { message: momentTagMessage } = useSelector((state) => state.momentTag);
  const {
    showUploadMomentModel,
    setShowUploadMomentModel,
    setShowUploadModel,
  } = useContext(GlobalContext);
  const [show, setShow] = useState("FORM"); // FORM, COVER, TAG_PEOPLE
  const [title, setTitle] = useState("Upload your Moment");

  // form fields
  const [caption, setCaption] = useState("");
  const [whoCanWatch, setWhoCanWatch] = useState("0");
  const [whoCanMessage, setWhoCanMessage] = useState("0");
  const [videoSize, setVideoSize] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoLength, setVideoLength] = useState(null);
  const [cover, setCover] = useState({
    url: null,
    id: null,
  });
  const [categoryId, setCategoryId] = useState("");
  const [hashTags, sethashTags] = useState([]);

  useEffect(() => {
    dispatch(getHashtags());
    dispatch(getAllFriends());
  }, []);

  useEffect(() => {
    if (uploadError) {
      toast.error(uploadError);
    }
  }, [uploadError]);

  useEffect(() => {
    dispatch(getTaggedUsersInMoment(moment?.id));
  }, [momentTagMessage]);

  useEffect(() => {
    if (moment && moment.id) {
      setShow("TAG_PEOPLE");
      toast.success("Now Tag some connections to your Moment");

      // reset form values
      setCaption("");
      setCategoryId("");
      setVideoUrl(null);
      setCover({
        url: null,
        id: null,
      });
      setVideoSize(null);
      setWhoCanMessage("0");
      setWhoCanWatch("0");
      sethashTags([]);
    }
  }, [moment]);

  const myAccountLink = () => {
    setShowUploadMomentModel(false);
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
          setCover({
            url,
          });
        });
    } catch (error) {
      throw error;
    }
  };

  const handleUploadVideo = async (e) => {
    try {
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
            setShowUploadMomentModel(false);
            return toast.error(
              "There is a 2GB per file size limit. Please upload a smaller file or use compression to reduce the size of this file"
            );
          }

          const data = await upload("video", file);

          setVideoUrl(data.url);
          setVideoLength(Math.round(data.duration));

          const ext = path.extname(data.url);
          if (!!cover.url) {
            // if custom thumbnail is selected
            setCover({
              url: cover.url,
            });
          } else {
            const video = new Video(file);
            autoGenerateThumbnail(video, file, ext);
          }
        }
      }
    } catch (e) {
      toast.dismiss();
      return toast.error(
        "Opps... soemthing went wrong with the upload. Please try again."
      );
    }
  };

  const handleUploadCover = async (e) => {
    try {
      const file = e.target.files[0];
      const userData = JSON.parse(localStorage.getItem("user"));
      const res = await api.get(`/users/space-left/${userData.id}`);

      if (!res.data.data) {
        return toast.error(CustomToastWithLink);
      } else {
        if (file) {
          const size = file.size / 1000000;

          if (size > 2000) {
            setShowUploadMomentModel(false);
            return toast.error(
              "There is a 2GB per file size limit. Please upload a smaller file or use compression to reduce the size of this file"
            );
          }

          const data = await upload("image", file);

          setCover({
            url: data.url,
          });
        }
      }
    } catch (e) {
      toast.dismiss();
      return toast.error(
        "Opps... soemthing went wrong with the upload. Please try again."
      );
    }
  };

  const handleUploadMoment = async () => {
    if (!title) {
      toast.error(`Please provide moment caption`);
    }

    if (!videoUrl) {
      toast.error(`Please provide moment video.`);
    }
    if (!categoryId) {
      return toast.error("Please select category to continue.");
    }

    const obj = {
      caption,
      categoryId: categoryId,
      videoUrl,
      coverImgUrl: cover.url,
      fileSize: videoSize,
      whoCanMessage,
      whoCanWatch,
      hashTags,
    };

    dispatch(uploadMoment(obj));
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

  return (
    <UploadMomentFormStyled
      className={`${showUploadMomentModel && "ShowUploadMomentForm"}`}
    >
      <div className="header">
        <div
          onClick={() => {
            if (show === "FORM") {
              close();
            }
            if (show === "COVER" || "TAG_PEOPLE") {
              setShow("FORM");
              setTitle("Share your Moment");
            }
          }}
          className="close"
        >
          <img src={BackIcon} alt="" />
        </div>

        <div className="title">{title}</div>

        {show === "TAG_PEOPLE" ? (
          <div
            onClick={() => {
              close();
              setShowUploadModel(false);
              setShow("FORM");
              toast.success("Congrats! Moment posted successfully");
            }}
            className="button"
          >
            complete
          </div>
        ) : (
          <div
            onClick={() => {
              handleUploadMoment();
            }}
            className="button"
          >
            {uploadLoading ? "saving..." : "save"}
          </div>
        )}
      </div>

      {/* <div className="headerV2">
        <div
          onClick={() => {
            if (show === "FORM") {
              close();
            }
            if (show === "COVER" || "TAG_PEOPLE") {
              setShow("FORM");
            }
          }}
          className="close"
        >
          <img src={BackIcon} alt="" />
        </div>

        <div className="title">{title}</div>
      </div> */}

      {show === "FORM" && (
        <div className="form">
          <Row className="form__row">
            <Col md={4} sm={4} xs={4} className="form__item">
              {cover.url ? (
                <div className="showCover">
                  <div className="title">Cover</div>

                  <label htmlFor="uploadCover">
                    <div className="box">
                      <img className="image" src={cover.url} alt="" />

                      <div className="button">Choose Another</div>
                    </div>
                  </label>
                </div>
              ) : (
                <label
                  htmlFor="uploadCover"
                  className="form__left"
                  // onClick={() => {
                  //   setTitle("Select your Cover");
                  //   setShow("COVER");
                  // }}
                >
                  <div className="form__title">Cover</div>
                  <div className="form__box cover">
                    <img src={PlusIcon} alt="" className="icon" />
                  </div>
                </label>
              )}

              <input
                style={{ display: "none" }}
                id="uploadCover"
                type="file"
                accept="image/*"
                onChange={handleUploadCover}
              />
            </Col>
            <Col md={8} sm={8} xs={8} className="form__item">
              <div className="form__right">
                <label htmlFor="uploadMoment" className="form__card">
                  <div className="left">
                    <img src={UploadIcon} alt="" className="icon" /> Upload
                    Moment
                  </div>
                  <div className="right">
                    <img src={CaretRightIcon} alt="" className="icon" />
                  </div>
                </label>

                <input
                  style={{ display: "none" }}
                  id="uploadMoment"
                  type="file"
                  accept="video/*"
                  onChange={handleUploadVideo}
                />

                <div
                  onClick={() => {
                    if (!moment) {
                      return toast.error("First save moment to tag users!");
                    }

                    setTitle("Tag some People");
                    setShow("TAG_PEOPLE");
                  }}
                  className="form__card"
                >
                  <div className="left">
                    <img src={TagPeopleIcon} alt="" className="icon" />
                    Tag people
                  </div>
                  <div className="right">
                    <img src={CaretRightIcon} alt="" className="icon" />
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <div className="form__description">
            <div className="title">Caption your Moment</div>
            <textarea
              name="desc"
              id="desc"
              placeholder="Describe this Moment"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
          </div>

          <div className="form__hashtags">
            <div className="title">Enter Hashtags</div>

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

          <div className="form__categories">
            <div className="title">Choose category</div>

            {categoryLoading && (
              <div className="loading">Fetching categories...</div>
            )}
            <Select
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
              }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">Choose Category</MenuItem>
              {!categoryLoading &&
                categoriesData.categories &&
                categoriesData.categories.length > 0 &&
                categoriesData.categories.map((cat, i) => (
                  <MenuItem value={cat.id}>{cat.name}</MenuItem>
                ))}
            </Select>
          </div>

          <div className="options">
            <div className="options__slider">
              <div className="options__slider--title">
                Who can watch this Moment ?
              </div>

              <Slider
                {...SliderSettings}
                className="options__slider--listSlider"
              >
                <div className={`item ${whoCanWatch === "0" && "active"}`}>
                  <button
                    onClick={() => setWhoCanWatch("0")}
                    className="optionBtn"
                  >
                    Everyone
                  </button>
                </div>

                <div className={`item ${whoCanWatch === "1" && "active"}`}>
                  <button
                    onClick={() => setWhoCanWatch("1")}
                    className="optionBtn"
                  >
                    Connections
                  </button>
                </div>

                <div className={`item ${whoCanWatch === "2" && "active"}`}>
                  <button
                    onClick={() => setWhoCanWatch("2")}
                    className="optionBtn"
                  >
                    Only Me
                  </button>
                </div>
              </Slider>
            </div>

            <div className="options__slider">
              <div className="options__slider--title">
                Who can message on this Moment ?
              </div>

              <Slider
                {...SliderSettings}
                className="options__slider--listSlider"
              >
                <div className={`item ${whoCanMessage === "0" && "active"}`}>
                  <button
                    onClick={() => setWhoCanMessage("0")}
                    className="optionBtn"
                  >
                    Everyone
                  </button>
                </div>

                <div className={`item ${whoCanMessage === "1" && "active"}`}>
                  <button
                    onClick={() => setWhoCanMessage("1")}
                    className="optionBtn"
                  >
                    Connections
                  </button>
                </div>

                <div className={`item ${whoCanMessage === "2" && "active"}`}>
                  <button
                    onClick={() => setWhoCanMessage("2")}
                    className="optionBtn"
                  >
                    Only Me
                  </button>
                </div>
              </Slider>
            </div>
          </div>

          <div className="form__submit">
            <button onClick={handleUploadMoment}>
              {uploadLoading ? "Creating Moment..." : "Post Moment"}
            </button>
          </div>
        </div>
      )}

      {show === "COVER" && <ChooseCoverImage />}

      {show === "TAG_PEOPLE" && <TagPeople momentId={moment.id} />}
    </UploadMomentFormStyled>
  );
};

export default UploadMomentForm;

const UploadMomentFormStyled = styled.div`
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

  .loading,
  .error {
    font-family: brother-1816, sans-serif;
    font-size: 0.8rem;
    font-weight: 300;
    line-height: 1;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  /* mui styles */
  .MuiInputBase-root {
    width: 100%;
    background-color: #3a3a3c;
    color: #f2f2f7;
    border-radius: 0.5rem;
    border: none;
    outline: none;
    font-size: 1rem;
    font-weight: 300;
    color: #f2f2f7;
    font-family: ${(props) => props.theme.montserrat};
    transition: all 0.25s ease;
    border: 3px solid transparent;

    &::placeholder {
      font-weight: 300;
      color: #f2f2f7;
      letter-spacing: 0.3px;
    }

    &:focus,
    &:hover {
      border: 3px solid #f88946 !important;
    }
  }

  .MuiOutlinedInput-notchedOutline {
    display: none !important;
  }

  .headerV2 {
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
      width: 100%;
      text-align: center;
      font-size: 1.2rem;
      font-weight: 400;
      text-transform: capitalize;
    }
  }

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

  .form {
    width: 80%;
    margin: 0 auto 5rem auto;

    &__title {
      padding: 0 0 0.5rem 1rem;
      font-size: 1.05rem;
      font-weight: 500;
      text-transform: capitalize;
      color: #f2f2f7;
    }
    &__box {
      background-color: #3a3a3c;
      border-radius: 0.5rem;
    }

    .cover {
      height: 28rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;

      .icon {
        height: 2rem;
        width: auto;
      }
    }

    .showCover {
      .title {
        padding: 0 0 0.5rem 1rem;
        font-size: 1.05rem;
        font-weight: 500;
        text-transform: capitalize;
        color: #f2f2f7;
      }

      .box {
        height: 28rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        background-color: #3a3a3c;
        border-radius: 0.5rem;
        overflow: hidden;

        .image {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          height: 100%;
          width: 100%;
          background-size: cover;
          background-position: center;
          object-fit: cover;
        }

        .button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 70%;
          z-index: 2;
          cursor: pointer;
          line-height: 1;
          font-family: brother-1816, sans-serif;
          padding: 0.4rem 0;
          text-transform: uppercase;
          font-size: 0.9rem;
          letter-spacing: 2px;
          font-weight: 500;
          margin: 0 !important;
          text-align: center;
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
        }
      }
    }

    &__right {
      margin-top: 3rem;
    }

    &__card {
      background-color: #3a3a3c;
      border-radius: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.8rem 1.5rem;
      margin-bottom: 1.5rem;
      font-size: 0.95rem;
      text-transform: capitalize;
      font-weight: 400;
      color: #f2f2f7;
      cursor: pointer;

      .left {
        display: flex;
        align-items: center;

        .icon {
          margin-right: 0.8rem;
          height: 1.4rem;
          width: auto;
        }
      }

      .right {
        .icon {
          width: auto;
          height: 1rem;
        }
      }
    }

    &__row {
      margin-bottom: 2rem;
    }

    &__description,
    &__categories,
    &__hashtags {
      margin-bottom: 2rem;

      .title {
        padding: 0 0 0.5rem 1rem;
        font-size: 1.05rem;
        font-weight: 500;
        color: #f2f2f7;
      }
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
      font-weight: 300;
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

    &__submit {
      text-align: center;
      width: 100%;

      button {
        font-family: ${(props) => props.theme.montserrat};
        font-weight: 600;
        font-size: 1rem;
        padding: 1rem 4rem;
        border-radius: 10rem;
        background-color: #fff;
        color: #f88946;
        text-transform: uppercase;
        border: none;
        outline: none;
        transition: all 0.5s ease;
        letter-spacing: 2px;

        &:hover {
          background-color: #f88946;
          color: #fff;
          letter-spacing: 0;
        }
      }
    }
  }

  .options {
    &__slider {
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(99, 99, 102, 0.5);
      margin-bottom: 2rem;

      &--title {
        font-weight: 600;
        color: #c7c7cc;
        font-size: 1.05rem;
        text-transform: capitalize;
        margin-bottom: 0.7rem;
      }

      &--list {
        display: flex;
        align-items: center;

        .active .optionBtn {
          color: #1c1c1e !important;
          background-color: #f2f2f7 !important;
          font-weight: 600 !important;
        }

        .item {
          margin-right: 1rem;

          .optionBtn {
            width: 100%;
            padding: 0.7rem 1.5rem;
            border-radius: 0.5rem;
            background-color: #636366;
            color: #f2f2f7;
            font-size: 0.85rem;
            font-weight: 300;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0.5rem;
            border: none;
            outline: none;
            font-family: ${(props) => props.theme.montserrat};
          }
        }
      }

      &--listSlider {
        .slick-slide {
          padding-right: 1rem;
          outline: none;
        }

        .slick-track {
          margin-left: 0;
        }

        .active .optionBtn {
          color: #1c1c1e !important;
          background-color: #f2f2f7 !important;
          font-weight: 600 !important;
        }

        .item {
          .optionBtn {
            width: 100%;
            padding: 0.7rem 0;
            border-radius: 0.5rem;
            background-color: #636366;
            color: #f2f2f7;
            font-size: 0.85rem;
            font-weight: 300;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0.5rem;
            border: none;
            outline: none;
            font-family: ${(props) => props.theme.montserrat};
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .headerV2,
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

      &__item {
        padding-left: 8px !important;
        padding-right: 8px !important;
      }

      &__title {
        font-size: 1rem;
      }

      .cover {
        height: 18rem;
      }

      .showCover {
        .title {
          font-size: 1rem;
        }

        .box {
          height: 18rem;

          .button {
            width: 100%;
            font-size: 0.8rem;
            letter-spacing: 1px;
          }
        }
      }

      &__card {
        padding: 0.6rem 1.5rem;
      }

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

    .options {
      &__slider {
        margin-bottom: 1.5rem;

        &--title {
          font-size: 1rem;
        }

        &--list {
          .item {
            margin-right: 0.5rem;

            .optionBtn {
              padding: 0.6rem 1.2rem;
            }
          }
        }

        &--listSlider {
          .slick-slide {
            padding-right: 0.5rem;
            outline: none;
          }

          .item {
            .optionBtn {
              padding: 0.6rem 0;
              font-size: 0.8rem;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 480px) {
    .headerV2,
    .header {
      margin-bottom: 1rem;

      .button {
        font-size: 0.8rem;
      }
    }

    .form {
      width: 90%;

      .cover {
        height: 15rem;

        .icon {
          height: 1.5rem;
        }
      }

      .showCover {
        .title {
          font-size: 1rem;
        }

        .box {
          height: 15rem;

          .button {
            font-size: 0.6rem;
            font-weight: 300;
            border-radius: 0;
          }
        }
      }

      &__card {
        padding: 0.5rem 1.3rem;

        .left {
          .icon {
            margin-right: 0.5rem;
            height: 1.2rem;
          }
        }

        .right {
          .icon {
            height: 0.8rem;
          }
        }
      }

      textarea {
        height: 10rem;
      }

      &__submit {
        text-align: center;
        width: 100%;

        button {
          padding: 1em 5rem;
          font-size: 0.9rem;
        }
      }
    }

    .options {
      &__slider {
        margin-bottom: 1.5rem;

        &--list {
          .item {
            .optionBtn {
              padding: 0.5rem 1rem;
            }
          }
        }

        &--listSlider {
          .item {
            .optionBtn {
              padding: 0.5rem 0;
              font-size: 0.8rem;
            }
          }
        }
      }
    }
  }
`;
