import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import BackIcon from "../../../assets/Icons/back.svg";
import UploadIcon from "../../../assets/Icons/upload-icon-white.svg";
import PlayIcon from "../../../assets/Icons/play-white.svg";
import AddIcon from "../../../assets/Icons/add.svg";
import VideoCardSelect from "./VideoCardSelect";
import { upload } from "../../../utils";
import { GlobalContext } from "../../../context/GlobalContext";
import { Col, Row } from "react-grid-system";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewSeries,
  addVideoToSeries,
  getSingleSeries,
} from "../../../actions";
import { ADD_VIDEO_TO_SERIES_RESET } from "../../../actions/types";

const CreateSeriesModel = () => {
  const dispatch = useDispatch();

  const { showCreateSeriesModel, setShowCreateSeriesModel } =
    useContext(GlobalContext);
  const { videos, isFetching } = useSelector((state) => state.profile);
  const { message: addVideoToSeriesMessage } = useSelector(
    (state) => state.addVideoToSeries
  );
  const { videos: seriesVideos } = useSelector((state) => state.singleSeries);

  const {
    info: createInfo,
    error: createError,
    loading: createLoading,
  } = useSelector((state) => state.createSeries);

  const [selectedVideos, setSelectedVideos] = useState([]);
  const [step, setStep] = useState(0); // 0 -> select form, 1 -> videos
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(null);
  const [customThumbnail, setCustomThumbnail] = useState({
    url: "",
    publicId: "",
  });

  useEffect(() => {
    if (createError) {
      toast.error("Unexpected server error occured!");
    }

    if (createInfo) {
      setStep(1);
      toast.success("Great! Now add some videos to it.");
    }
  }, [createError, createInfo]);

  useEffect(() => {
    if (addVideoToSeriesMessage) {
      toast.success("Congrats! video added to the series");
      dispatch({
        type: ADD_VIDEO_TO_SERIES_RESET,
      });
    }
  }, [addVideoToSeriesMessage]);

  useEffect(() => {
    if (step === 1) {
      dispatch(getSingleSeries(createInfo?.id));
    }
  }, [step]);

  const selectVideoHandler = (item) => {
    if (selectedVideos && selectedVideos.length > 0) {
      const isAlreadyAdded = selectedVideos.filter((val) => val === item.id);

      if (isAlreadyAdded.length > 0) {
        const newArr = selectedVideos.filter((val) => val !== item.id);
        setSelectedVideos(newArr);

        return;
      }
    }

    setSelectedVideos([...selectedVideos, item.id]);
  };

  const handleCustomThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const { publicId, url } = await upload("image", file);
      setCustomThumbnail({ url, publicId });
    }
  };

  const createNewSeriesHandler = () => {
    if (!title) {
      return toast.error("Please enter series title.");
    }
    if (!customThumbnail.url) {
      return toast.error("Please give series a thumbnail");
    }

    const data = {
      title,
      price: price > 0 ? price : null,
      thumbnail: customThumbnail.url,
      description: desc,
      publicId: customThumbnail.publicId,
    };

    dispatch(createNewSeries(data));
    toast.success("Series created successfully");

    // go to videos tab after all is ok
    setStep(1);
  };

  const addVideosToSeriesHandler = () => {
    if (!selectedVideos.length) {
      return toast.error("Please select some videos to add!");
    }

    selectedVideos.forEach((item, index) => {
      dispatch(
        addVideoToSeries(createInfo?.id, {
          videoId: item,
        })
      );
    });

    setSelectedVideos([]);
    setShowCreateSeriesModel(false);
    setTitle("");
    setDesc("");
    setPrice(null);
    setCustomThumbnail({
      url: "",
      publicId: "",
    });
    setStep(0);
  };

  return (
    <CreateSeriesModelStyled
      className={`${showCreateSeriesModel && "createSeriesModelActive"}`}
    >
      <div className="header">
        <div className="left">
          <div
            onClick={() => setShowCreateSeriesModel(false)}
            className="backIcon"
          >
            <img src={BackIcon} alt="" />
          </div>
          <div className="name">
            {step === 0
              ? "Select Videos"
              : step === 1
              ? "Provide Series Information"
              : null}
          </div>
        </div>

        <div className="right">
          {step === 0 ? (
            <button
              onClick={() => {
                createNewSeriesHandler();
              }}
              className="formState"
            >
              {createLoading ? "Creating..." : "next"}
            </button>
          ) : step === 1 ? (
            <button
              onClick={() => {
                addVideosToSeriesHandler();
              }}
              className="formState"
            >
              save
            </button>
          ) : null}
        </div>
      </div>

      <div className="content">
        {step === 1 ? (
          <>
            <div className="content__uploadBox">
              <div className="icon">
                <img src={UploadIcon} alt="" />
              </div>
              <div className="box">
                <div className="box__left">
                  <p className="boldText">Upload</p>
                  <p className="lightText">some videos for your series</p>
                </div>

                <div className="box__right">
                  <img src={PlayIcon} alt="" />
                </div>
              </div>
            </div>

            <div className="infoBlock">
              <p className="lightText">or select from</p>
              <p className="boldText">Videos List</p>
            </div>

            <div className="content__videos">
              <Row className="content__videos--row">
                {videos &&
                  videos.length > 0 &&
                  videos.map((item, i) => (
                    <Col
                      key={i}
                      lg={3}
                      md={6}
                      sm={6}
                      xs={6}
                      className="content__videos--col"
                      style={{
                        paddingLeft: "10px",
                        paddingRight: "10px",
                      }}
                    >
                      <VideoCardSelect
                        selectVideoHandler={selectVideoHandler}
                        item={item}
                        isSelected={selectedVideos.includes(item.id)}
                      />
                    </Col>
                  ))}

                {isFetching && (
                  <div className="loading">
                    Getting all videos, Please wait...
                  </div>
                )}

                {!isFetching && !videos.length && (
                  <div className="error">No videos found. Upload Some!</div>
                )}
              </Row>
            </div>
          </>
        ) : step === 0 ? (
          <form className="content__seriesForm">
            <div className="content__seriesForm--fieldGroup">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Series title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="content__seriesForm--fieldGroup">
              <label htmlFor="desc">Description</label>
              <textarea
                type="text"
                id="desc"
                placeholder="Series description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div className="content__seriesForm--fieldGroup">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                placeholder="Series price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="content__seriesForm--fieldGroup">
              <div className="title">Cover</div>
              <label htmlFor="uploadThumbnail" className="uploadThumbnail">
                <img src={AddIcon} alt="Add Icon" className="icon" />
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
          </form>
        ) : null}
      </div>
    </CreateSeriesModelStyled>
  );
};

export default CreateSeriesModel;

const CreateSeriesModelStyled = styled.div`
  position: fixed;
  overflow-y: auto;
  overflow-x: hidden;
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

    &__uploadBox {
      display: flex;
      align-items: center;
      width: 50%;
      margin: 0 auto 2rem auto;

      p {
        font-size: 1.1rem;
        color: #f2f2f7;
      }

      .lightText {
        font-weight: 400;
        margin-right: 0.5rem;
      }
      .boldText {
        font-weight: 600;
        margin-right: 0.5rem;
      }

      .icon {
        margin-right: 1rem;
        width: 4rem;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #2c2c2e;
        width: 100%;
        padding: 0.8rem 1rem;
        border-radius: 0.4rem;
        cursor: pointer;

        &__left {
          display: flex;
          align-items: center;
        }

        &__right {
          img {
            transform: translateY(4px);
            height: 1.2rem;
            width: auto;
          }
        }
      }
    }

    .infoBlock {
      display: flex;
      align-items: center;
      justify-content: center;

      p {
        color: #fff;
        padding: 0 3px;
        font-size: 1rem;
      }

      .lightText {
        font-weight: 400;
      }

      .boldText {
        font-weight: 600;
      }
    }

    &__videos {
      margin-bottom: 2rem;
      margin-top: 2rem;
    }

    &__seriesForm {
      width: 50%;
      margin: 0 auto 5rem auto;

      &--fieldGroup {
        margin-bottom: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

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
        textarea {
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
          height: 7rem;
          background-color: #3a3a3c;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;

          .icon {
            height: 2.5rem;
            width: auto;
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
  }

  @media screen and (max-width: 991px) {
    .content {
      &__uploadBox {
        width: 70%;
      }

      &__seriesForm {
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
      &__uploadBox {
        width: 90%;
      }

      &__seriesForm {
        width: 90%;
      }
    }
  }

  @media screen and (max-width: 600px) {
    .content {
      &__uploadBox {
        width: 100%;

        .icon {
          margin-right: 0.5rem;
        }

        p {
          font-size: 0.85rem;
        }

        .box {
          padding: 0.6rem 1rem;

          &__right {
            img {
              height: 1rem;
            }
          }
        }
      }

      &__seriesForm {
        width: 100%;
      }

      .infoBlock {
        p {
          font-size: 0.85rem;
        }
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
      &__seriesForm {
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

          textarea {
            height: 12rem;
          }

          .uploadThumbnail {
            height: 5rem;

            .icon {
              height: 2rem;
            }
          }

          .title {
            padding: 0 0 0.5rem 1rem;
            font-size: 0.95rem;
          }
        }
      }
    }
  }
`;
