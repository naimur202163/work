import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import BackdropV2 from "../BackdropV2";
import Button from "../../styles/Button";
import path from "path";
import axios from "axios";
import api from "../../services/api";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import UploadFormModal from "../UploadComponent/UploadFormModal";
import { CloseIcon } from "../Icons";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewSeries,
  addVideoToSeries,
  getSingleSeries,
  removeVideoFromSeries,
  dragDropSeriesVideos,
  // savePPVUnlockInformation,
} from "../../actions";
import { toast } from "react-toastify";
import { upload } from "../../utils";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  ADD_VIDEO_TO_SERIES_RESET,
  REMOVE_VIDEO_FROM_SERIES_RESET,
} from "../../actions/types";
import Loader from "./Loader";
import config from "../../config/config";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const CreateSeriesModel = ({ open, closeHandler }) => {
  const dispatch = useDispatch();
  const {
    info: createInfo,
    error: createError,
    loading: createLoading,
  } = useSelector((state) => state.createSeries);
  const { videos: creatorsVideos } = useSelector((state) => state.profile);
  const { videos: seriesVideos, loading: getSeriesVideosLoading } = useSelector(
    (state) => state.singleSeries
  );
  const { message: addVideoToSeriesMessage } = useSelector(
    (state) => state.addVideoToSeries
  );
  const { message: removeVideoFromSeriesMessage } = useSelector(
    (state) => state.removeVideoFromSeries
  );

  // states
  const [tab, setTab] = useState("SERIES_FORM"); // SERIES_FORM, UPLOAD_VIDEOS, MANAGE_VIDEOS, CHOOSE_VIDEOS
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [customThumbnail, setCustomThumbnail] = useState({
    url: "",
    publicId: "",
    duration : "",
  });

  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [progressInfos, setProgressInfos] = useState({ val: [] });
  const [message, setMessage] = useState([]);
  const [fileInfos, setFileInfos] = useState([]);
  const progressInfosRef = useRef(null);
  const [completeProcessLoading, setCompleteProcessLoading] = useState(null);
  const [storeSeriesVideos, setStoreSeriesVideos] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [videosNotAddedToSeries, setVideosNotAddedToSeries] = useState(null);
  const [editVideoModel, setEditVideoModel] = useState(false);
  const [selectedVideoForEdit, setSelectedVideoForEdit] = useState(null);



  // useEffects
  useEffect(() => {
    if (selectedFiles && selectedFiles.length > 0) {
      if (!selectedFiles) {
        return toast.error("Please select some videos to upload");
      }
  
      const files = Array.from(selectedFiles);
  
      let _progressInfos = files.map((file) => ({
        percentage: 0,
        fileName: file.name,
      }));
  
      progressInfosRef.current = {
        val: _progressInfos,
      };
  
      files.map(async (file, i) => {
        await uploadVideoHandler(i, file);
      });
  
      setSelectedFiles([]);
    }
  }, [selectedFiles]);
  useEffect(() => {
    if (tab === "UPLOAD_VIDEOS") {
      setFileInfos([]);
      setProgressInfos({ val: [] });
      setMessage([]);
      setSelectedFiles([]);
    }
  }, [tab]);
  useEffect(() => {
    if (
      tab === "CHOOSE_VIDEOS" ||
      tab === "MANAGE_VIDEOS" ||
      (tab === "MANAGE_VIDEOS" && editVideoModel === false)
    ) {
      dispatch(getSingleSeries(createInfo?.id));
    }
  }, [
    tab,
    removeVideoFromSeriesMessage,
    addVideoToSeriesMessage,
    editVideoModel,
    createInfo,
    dispatch
  ]);
  useEffect(() => {
    if (addVideoToSeriesMessage) {
      toast.success(addVideoToSeriesMessage);
      dispatch({
        type: ADD_VIDEO_TO_SERIES_RESET,
      });
    }
  }, [dispatch, addVideoToSeriesMessage]);
  useEffect(() => {
    if (removeVideoFromSeriesMessage) {
      toast.error(removeVideoFromSeriesMessage);
      dispatch({
        type: REMOVE_VIDEO_FROM_SERIES_RESET,
      });
    }
  }, [dispatch, removeVideoFromSeriesMessage]);
  useEffect(() => {
    if (
      (creatorsVideos && creatorsVideos.length > 0) ||
      tab === "MANAGE_VIDEOS"
    ) {
      const result = creatorsVideos.filter(function (item) {
        if (seriesVideos && seriesVideos.length > 0) {
          return (
            seriesVideos.filter(function (item2) {
              return item.id === item2.singleDetailedVideo.id;
            }).length === 0
          );
        } else {
          return item;
        }
      });
  
      setVideosNotAddedToSeries(result);
    }

    if (seriesVideos && seriesVideos.length > 0) {
      setStoreSeriesVideos(seriesVideos);
    }
  }, [creatorsVideos, seriesVideos, tab]);
  useEffect(() => {
    if (videosNotAddedToSeries && videosNotAddedToSeries.length > 0) {
      let values = [];
      for (let i = 0; videosNotAddedToSeries.length > i; i++) {
        values.push(false);
      }

      setIsChecked(values);
    }
  }, [videosNotAddedToSeries]);

  useEffect(() => {
    if (message && message.length > 0) {
      toast.success(message[message.length - 1]);
    }
  }, [message]);

  useEffect(() => {
    if (createError) {
      toast.error("Unexpected server error occured!");
    }
  }, [createError]);

  // functions
  const handleCustomThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const { publicId, url,duration } = await upload("image", file);
      setCustomThumbnail({ url, publicId,duration });
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
      price: price.length > 0 ? +price : null,
      thumbnail: customThumbnail.url,
      description: desc,
      publicId: customThumbnail.publicId,
    };

    dispatch(createNewSeries(data));
    toast.success("Series created successfully");

    // go to videos tab after all is ok
    setTab("UPLOAD_VIDEOS");
  };

  const selectFilesHandler = (e) => {
    if (fileInfos && fileInfos.length > 0) {
      return toast.error(
        "You have some video that are not saved yet. Please save them"
      );
    }

    setSelectedFiles(e.target.files);
    setProgressInfos({ val: [] });
  };

 

  const uploadVideoHandler = async (idx, file) => {
    let _progressInfos = [...progressInfosRef.current.val];

    // upload functionality starts from here
    // const cloudNaryDomain = `${config.REACT_APP_CLOUDINARY_ENDPOINT}`;
    let numberOfChunks = Math.ceil(file.size / 6000000);
    let xUniqueUploadId = +new Date();
    let url = "";
    let publicId = "";
    // let duration = 0;
    let start = 0;
    let end = 0;
    let toastId = toast("Please Wait, Upload in Progress...", {
      progress: 0,
      autoClose: 30000,
      closeOnClick: false,
    });
    for (let index = 0; index < numberOfChunks; index++) {
      if (index > 0) {
        start = end + 1;
        end = index === numberOfChunks - 1 ? file.size : end + 6000000;
      } else {
        start = 0;
        end = index === numberOfChunks - 1 ? file.size : 6000000 - 1;
      }
      let slice = file.mozSlice
        ? file.mozSlice
        : file.webkitSlice
        ? file.webkitSlice
        : file.slice
        ? file.slice
        : () => {};
      const sliceData = slice.bind(file)(start, end + 1);

      const formData = new FormData();
      formData.append("upload_preset", "isutra");
      formData.append("cloud_name", "isutra");
      formData.append("file", file);
      delete axios.defaults.headers.common["X-CSCAPI-KEY"];
      const response = await axios.post(`${config.REACT_APP_BACKEND_URL}fileoperation/fileUpload`,formData)

      // const response = await axios.post(
      //   `${cloudNaryDomain}/video/upload`,
      //   formData,
      //   {
      //     headers: {
      //       "X-Unique-Upload-Id": `${xUniqueUploadId}`,
      //       "Content-Range": `bytes ${start}-${
      //         index === numberOfChunks - 1 ? end - 1 : end
      //       }/${file.size}`,
      //     },
      //   }
      // );

      toast.update(toastId, {
        progress: (index + 1) / numberOfChunks,
        // autoClose: false,
        closeOnClick: false,
        autoClose: 10000,
      });

      _progressInfos[idx].percentage = Math.round(
        ((index + 1) / numberOfChunks) * 100
      );
      setProgressInfos({ val: _progressInfos });

      url = config.REACT_APP_CLOUDFRONT_URL + '/' + `${file.name}`; ;
      publicId = 0;
      // duration = Math.round(response.data.duration);

      if (url && publicId) {
        const ext = path.extname(url);
        toast.dismiss(toastId);
        setMessage((prevMessage) => [
          ...prevMessage,
          "Uploaded the file successfully: " + file.name,
        ]);

        // const obj = {
        //   url,
        //   publicId,
        //   videoLength: duration,
        //   title: file.name,
        //   thumbnail: url.replace(ext, ".jpg"),
        // };
        
        setFileInfos((prevInfo) => [
          ...prevInfo,
          {
            title: file.name,
            url,
            // publicId,
            thumbnail: url.replace(ext, ".jpg"),
          },
        ]);
      }
    }
  };

  const uploadVideoToTable = async (data) => {
    const res = await api.post("videos", data);
    const { id: videoId } = res.data.data;
    const seriesId = createInfo?.id;

    dispatch(
      addVideoToSeries(seriesId, {
        videoId,
      })
    );
  };

  const completeProcess = async () => {
    setCompleteProcessLoading(true);

    const uploadVideosHandler = async () => {
      if (fileInfos.length > 0) {
        fileInfos.forEach(async (info) => {
          await uploadVideoToTable(info).catch((err) =>
            console.log(`upload video error`, err)
          );
        });
      } else {
        return null;
      }
    };

    await uploadVideosHandler();
    setCompleteProcessLoading(false);
    setFileInfos([]);
    setTab("MANAGE_VIDEOS");
  };

  const onDragEndHandler = async (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      storeSeriesVideos,
      result.source.index,
      result.destination.index
    );

    setStoreSeriesVideos(items);

    // setting the database
    const promises = items.map(async (item, index) => {
      let orderKey = index + 1;
      dispatch(
        dragDropSeriesVideos(createInfo?.id, {
          order: orderKey,
          videoId: item.singleDetailedVideo.id,
        })
      );
    });

    await Promise.all(promises);

    toast.success("Re-ordering saved into database");
  };

 

  const handleIsChecked = (position, e, videoId) => {
    const updatedIsChecked = isChecked.map((item, index) =>
      index === position ? !item : item
    );

    setIsChecked(updatedIsChecked);

    isChecked.forEach((item, i) => {
      if (i === position && e.target.checked === true) {
        dispatch(
          addVideoToSeries(createInfo?.id, {
            videoId,
          })
        );
      }

      if (i === position && e.target.checked === false) {
        dispatch(
          removeVideoFromSeries(createInfo?.id, {
            videoId,
          })
        );
      }
    });
  };

  return (
    <>
      <CreateSeriesModelWrapper>
        <div className="header">
          <div className="header__left">
            <CloseIcon
              onClick={() => {
                if (fileInfos && fileInfos.length > 0) {
                  return toast.error(
                    "You have some video that are not saved yet. Please save them"
                  );
                }
                closeHandler();
              }}
            />
            <h1 className="header__title">Create New Course ...</h1>
          </div>
          {tab === "MANAGE_VIDEOS" ? null : (
            <div
              onClick={() => {
                if (tab === "SERIES_FORM") {
                  createNewSeriesHandler();
                }
                if (tab === "UPLOAD_VIDEOS") {
                  completeProcess();
                }
                if (tab === "CHOOSE_VIDEOS") {
                  setTab("MANAGE_VIDEOS");
                }
              }}
              className="header__right"
            >
              <Button>
                {tab === "SERIES_FORM"
                  ? `${createLoading ? "Loading..." : "Next"}`
                  : tab === "UPLOAD_VIDEOS"
                  ? `${
                      completeProcessLoading
                        ? "Loading..."
                        : `${
                            fileInfos && fileInfos.length > 0
                              ? "Save"
                              : "Manage Videos"
                          }`
                    }`
                  : tab === "CHOOSE_VIDEOS"
                  ? "Manage Videos"
                  : null}
              </Button>
            </div>
          )}
        </div>

        {tab === "SERIES_FORM" ? (
          <div className="courseForm">
            <div className="courseForm__fieldGroup">
              <label htmlFor="title">
                Course Title <span>*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="courseForm__fieldGroup">
              <label htmlFor="price">Course Price</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Enter the course price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="uploadThumbnail">
              <label htmlFor="thumbnail">
                <div className="overlay">
                  <i className="fas fa-upload" />
                </div>
                Upload any custom image for your Video!
              </label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleCustomThumbnailUpload}
                style={{ display: "none" }}
              />

              {!!customThumbnail.url && (
                <ThumbnailPreview>
                  <h3>Preview</h3>
                  <img src={customThumbnail.url} alt=""/>
                </ThumbnailPreview>
              )}
            </div>

            <div className="courseForm__fieldGroup">
              <label htmlFor="desc">Description</label>
              <textarea
                id="desc"
                placeholder="Tell viewers about your course"
                name="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>
        ) : tab === "UPLOAD_VIDEOS" ? (
          <div className="uploadBox">
            <h1 className="uploadBox__title">
              Upload some videos for your series.
            </h1>

            <div className="uploadBox__upload">
              <label htmlFor="videos">
                <div className="overlay">
                  <i className="fas fa-upload" />
                </div>
                {selectedFiles && selectedFiles.length > 0
                  ? `${selectedFiles.length} Videos are selected.`
                  : "Upload videos for your course. You can select one or many videos as you want."}
              </label>
              <input
                id="videos"
                type="file"
                multiple="multiple"
                accept="video/*"
                style={{ display: "none" }}
                onChange={selectFilesHandler}
              />
            </div>

            <div className="uploadBox__actionBtns">
              <Button
                grey
                onClick={() => {
                  if (fileInfos && fileInfos.length > 0) {
                    return toast.error(
                      "You have some video that are not saved yet. Please save them"
                    );
                  }

                  setTab("CHOOSE_VIDEOS");
                }}
                className="uploadBox__chooseFrom"
              >
                Choose From List
              </Button>
            </div>

            <div
              className="uploadBox__videosList"
              style={{
                borderTop:
                  progressInfos &&
                  progressInfos.val.length > 0 &&
                  "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              {progressInfos &&
                progressInfos.val.length > 0 &&
                progressInfos.val.map((progressInfo, index) => (
                  <div key={index} className="uploadBox__videosList--item">
                    <img
                      src={
                        progressInfo.percentage < 100
                          ? `/assets/imgs/uploading.jpg`
                          : `/assets/imgs/uploaded.jpg`
                      }
                      alt=""
                      className="thumbnail"
                    />
                    <h5 className="title">{progressInfo.fileName}</h5>
                    <CircularProgressbar
                      styles={buildStyles({
                        textSize: "28px",
                        pathTransitionDuration: 1,
                        pathColor: `rgba(204, 0, 0, ${
                          progressInfo.percentage / 100
                        })`,
                        textColor: "#fff",
                      })}
                      className="progress"
                      value={progressInfo.percentage}
                      text={`${progressInfo.percentage}%`}
                    />
                  </div>
                ))}
            </div>
          </div>
        ) : tab === "MANAGE_VIDEOS" ? (
          <div className="manageVideos">
            <div className="manageVideos__title">Manage Your Videos</div>

            <div className="manageVideos__btn">
              <Button
                className="manageVideos__btn--btn1"
                onClick={() => setTab("CHOOSE_VIDEOS")}
              >
                Choose From List
              </Button>

              <Button
                grey
                className="manageVideos__btn--btn2"
                onClick={() => setTab("UPLOAD_VIDEOS")}
              >
                Upload Some
              </Button>
            </div>

            {getSeriesVideosLoading && <Loader />}

            {/* start */}
            <DragDropContext onDragEnd={(result) => onDragEndHandler(result)}>
              <Droppable droppableId="droppableId">
                {(provided, snapshot) => (
                  <div
                    className="manageVideos__list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {!getSeriesVideosLoading &&
                    storeSeriesVideos &&
                    storeSeriesVideos.length > 0
                      ? storeSeriesVideos.map((item, i) => {
                          return (
                            <>
                              <Draggable
                                key={item.columnId}
                                draggableId={item.columnId}
                                index={i}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    className="manageVideos__list--item"
                                    style={{
                                      userSelect: "none",
                                      background: snapshot.isDragging
                                        ? "#383838"
                                        : "#202020",
                                      left: "0px !important",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <div className="left">
                                      <div className="equalIcon">
                                        <i class="fas fa-equals"></i>
                                      </div>
                                      <img
                                        src={item.singleDetailedVideo.thumbnail}
                                        alt=""
                                        className="thumbnail"
                                      />
                                      <h5 className="title">
                                        {item.singleDetailedVideo.title}
                                      </h5>
                                    </div>

                                    <div className="right">
                                      <div className="editIcon">
                                        <img
                                          onClick={() => {
                                            setSelectedVideoForEdit(
                                              item.singleDetailedVideo
                                            );
                                            setEditVideoModel(true);
                                          }}
                                          src="/assets/icons/edit.svg"
                                          alt="edit series"
                                        />
                                      </div>

                                      <div className="deleteIcon">
                                        <img
                                          onClick={() => {
                                            dispatch(
                                              removeVideoFromSeries(
                                                createInfo?.id,
                                                {
                                                  videoId:
                                                    item.singleDetailedVideo.id,
                                                }
                                              )
                                            );
                                          }}
                                          src="/assets/icons/trash.svg"
                                          alt="delete series"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            </>
                          );
                        })
                      : !getSeriesVideosLoading &&
                        storeSeriesVideos.length === 0 && (
                          <h1
                            style={{ paddingLeft: "1rem" }}
                            className="loader"
                          >
                            No Videos found
                          </h1>
                        )}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {/* end */}
          </div>
        ) : tab === "CHOOSE_VIDEOS" ? (
          <div className="chooseVideos">
            <h1 className="chooseVideos__title">
              Choose From Your Videos List
            </h1>

            {getSeriesVideosLoading && <Loader />}

            <div className="chooseVideos__list">
              {!getSeriesVideosLoading &&
                videosNotAddedToSeries &&
                videosNotAddedToSeries.length > 0 &&
                videosNotAddedToSeries.map((item, i) => (
                  <div key={i} className="chooseVideos__list--item">
                    <div className="checkbox">
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
                              onChange={(e) => handleIsChecked(i, e, item.id)}
                              sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: 22,
                                  color: "#fff",
                                },
                              }}
                            />
                          }
                          label={""}
                        />
                      </FormGroup>
                    </div>

                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="thumbnail"
                    />
                    <h5 className="title">{item.title}</h5>
                  </div>
                ))}
            </div>
          </div>
        ) : null}
      </CreateSeriesModelWrapper>
      {open && <BackdropV2 />}
      {editVideoModel && (
        <UploadFormModal
          setShowModal={() => setEditVideoModel(false)}
          videoUpdate={selectedVideoForEdit}
        />
      )}
    </>
  );
};

export default CreateSeriesModel;

const openModal = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ThumbnailPreview = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 200px;
`;

const CreateSeriesModelWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  margin: auto;
  overflow-y: auto;
  height: 85vh;
  width: 600px;
  z-index: 1000;
  background: #202020;
  border-radius: 0.3rem;
  animation: ${openModal} 0.5s ease-in-out;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.4), 0px 0px 4px rgba(0, 0, 0, 0.25);
  overflow-x: hidden;

  .primaryBtn {
    font-size: 0.9rem;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 8px;
    border-radius: 10rem;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #000;
    border-radius: 7px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(246, 92, 139);
    border-radius: 10rem;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
    padding: 0 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    margin-bottom: 1rem;

    &__left {
      display: flex;
      align-items: center;
    }

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

  .courseForm {
    padding: 0 1.5rem;

    &__fieldGroup {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      label {
        font-size: 1.2rem;
        font-weight: 400;
        color: #fff;
        display: flex;
        align-items: center;

        span {
          color: ${(props) => props.theme.red};
          margin-left: 0.25rem;
        }
      }

      input,
      textarea {
        width: 100%;
        background: ${(props) => props.theme.black};
        border: 1px solid ${(props) => props.theme.darkGrey};
        color: ${(props) => props.theme.primaryColor};
        padding: 0.5rem 1rem;
        margin-bottom: 1.2rem;
        border-radius: 3px;
      }

      textarea {
        height: 10rem;
        resize: none;
      }
    }

    .uploadThumbnail {
      min-height: 5rem;
      position: relative;
      overflow: hidden;
      padding: 6px 0 12px 6px;
      border: 1px solid #383838;
      margin-bottom: 1.2rem;
      width: 100%;

      label {
        font-size: 0.8rem;
        color: #a6a6a6;
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
      }
    }
  }

  .uploadBox {
    padding: 0 1.5rem;

    &__title {
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 1;
      text-transform: capitalize;
      margin-bottom: 1.5rem;
      margin-top: 0.5rem;
    }

    &__upload {
      min-height: 5rem;
      position: relative;
      overflow: hidden;
      padding: 6px 0 12px 6px;
      border: 1px solid #383838;
      margin-bottom: 1.5rem;
      width: 100%;

      label {
        font-size: 0.8rem;
        color: #a6a6a6;
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
      }
    }

    &__actionBtns {
      display: flex;
      align-items: center;
    }

    &__uploaderVideos,
    &__chooseFrom {
      text-transform: capitalize;
      font-size: 1rem;
      margin-bottom: 2rem;
    }

    &__videosList {
      padding: 1rem 0;

      &--item {
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        position: relative;
        transition: all 0.2s ease;

        &:hover {
          cursor: pointer;
        }

        .thumbnail {
          width: auto;
          height: 2.5rem;
          margin-right: 0.8rem;
          background-size: cover;
          background-position: center;
          object-fit: cover;
          border-radius: 4px;
        }

        .title {
          font-size: 0.85rem;
          font-weight: 200;
          line-height: 1.3;
          width: 80%;
        }

        .progress {
          height: 2.5rem;
          width: 2.5rem;
          position: absolute;
          top: 50%;
          right: 0.5rem;
          transform: translateY(-50%);
        }
      }
    }
  }

  .manageVideos {
    &__btn {
      margin-bottom: 1.5rem;

      &--btn1 {
        margin-left: 1rem;
        margin-right: 1rem;
      }
    }

    &__title {
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 1;
      text-transform: capitalize;
      margin-bottom: 1rem;
      margin-top: 0.5rem;
      padding: 0 1rem;
    }

    .loader {
      font-size: 1.2rem;
      color: ${(props) => props.theme.red};
    }

    &__list {
      &--item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.8rem 1rem;
        transition: all 0.3s ease-in-out;
        margin-bottom: 1.2rem;
        cursor: pointer;

        &:hover {
          background-color: #383838;
        }

        .left {
          display: flex;
          align-items: center;
        }

        .right {
          display: flex;
          align-items: center;
        }

        .equalIcon {
          i {
            font-size: 1rem;
            margin-right: 0.8rem;
            color: #999;
          }
        }

        .editIcon,
        .deleteIcon {
          img {
            height: 1.2rem;
            width: auto;
            padding: 0 0.5rem;
            cursor: pointer;
          }
        }

        .thumbnail {
          width: 4rem;
          height: auto;
          margin-right: 0.8rem;
          background-size: cover;
          background-position: center;
          object-fit: cover;
          border-radius: 4px;
        }

        .title {
          font-size: 0.85rem;
          font-weight: 200;
          line-height: 1.3;
          width: 70%;
        }
      }
    }
  }

  .chooseVideos {
    padding: 0 1rem;

    &__title {
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 1;
      text-transform: capitalize;
      margin-bottom: 2rem;
      margin-top: 0.5rem;
    }

    .loader {
      font-size: 1.2rem;
      color: ${(props) => props.theme.red};
    }

    &__list {
      &--item {
        width: 100%;
        display: flex;
        align-items: flex-start;
        margin-bottom: 0.5rem;
        transition: all 0.2s ease;

        &:hover {
          cursor: pointer;
        }

        .thumbnail {
          width: 4rem;
          height: auto;
          margin-right: 0.8rem;
          background-size: cover;
          background-position: center;
          object-fit: cover;
          border-radius: 4px;
          margin-bottom: 1rem;
        }

        .title {
          font-size: 0.9rem;
          font-weight: 200;
          line-height: 1.3;
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    width: 95%;
    margin: 0 auto;
  }

  @media screen and (max-width: 480px) {
    .header {
      svg {
        height: 24px;
        width: 24px;
      }

      &__title {
        font-size: 1rem;
      }
    }

    .courseForm {
      &__fieldGroup {
        label {
          font-size: 1rem;
        }

        textarea {
          height: 8rem;
        }
      }

      .uploadThumbnail {
        .overlay {
          height: 2.5rem;
          width: 2.5rem;
        }
      }
    }
  }
`;
