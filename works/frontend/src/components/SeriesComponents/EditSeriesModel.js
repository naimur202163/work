import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import BackdropV2 from "../BackdropV2";
import Button from "../../styles/Button";
import { CloseIcon } from "../Icons";
import { useDispatch } from "react-redux";
import { editSeriesById } from "../../actions";
import { upload } from "../../utils";
import { toast } from "react-toastify";

const UpdateSeriesModel = ({ open, closeHandler, selectedSeries }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(selectedSeries?.title || "");
  const [desc, setDesc] = useState(selectedSeries?.description || "");
  const [price, setPrice] = useState(
    parseInt(selectedSeries?.price).toFixed(2) || ""
  );
  const [customThumbnail, setCustomThumbnail] = useState({
    url: selectedSeries?.thumbnail || "",
    publicId: "",
  });

  const handleCustomThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const { publicId, url } = await upload("image", file);
      setCustomThumbnail({ url, publicId });
    }
  };

  const updateSeriesHandler = () => {
    if (!title) {
      return toast.error("Please enter series title.");
    }
    if (!customThumbnail.url) {
      return toast.error("Please give series a thumbnail");
    }

    const data = {
      title,
      price: price.length > 0 ? (+price).toFixed(2) : null,
      thumbnail: customThumbnail.url,
      description: desc,
      publicId: customThumbnail.publicId,
    };

    dispatch(editSeriesById(selectedSeries?.id, data));
    closeHandler();
    toast.success("Series updated successfully");
  };

  return (
    <>
      <UpdateSeriesModelWrapper>
        <div className="editSeriesHeader">
          <div className="editSeriesHeader__left">
            <CloseIcon onClick={closeHandler} />
            <h1 className="editSeriesHeader__title">Update Series ...</h1>
          </div>

          <div className="editSeriesHeader__right">
            <Button onClick={updateSeriesHandler}>Update</Button>
          </div>
        </div>

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
                <img src={customThumbnail.url} alt="" />
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
      </UpdateSeriesModelWrapper>
      {open && <BackdropV2 close={closeHandler} />}
    </>
  );
};

export default UpdateSeriesModel;

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

const UpdateSeriesModelWrapper = styled.div`
  position: fixed;
  overflow-y: auto;
  height: 85vh;
  width: 600px;
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
    border-radius: 7px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(246, 92, 139);
    border-radius: 10rem;
  }

  .editSeriesHeader {
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

  @media screen and (max-width: 600px) {
    width: 95%;
    margin: 0 auto;
  }

  @media screen and (max-width: 480px) {
    .editSeriesHeader {
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
