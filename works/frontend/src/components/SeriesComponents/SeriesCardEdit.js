import React, { useContext } from "react";
import styled from "styled-components";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import ConfirmationModel from "../ConfirmationModel";
import Button from "../../styles/Button";
import { GlobalContext } from "../../context/GlobalContext";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteSeriesById } from "../../actions";
import { useHistory } from "react-router-dom";

const SeriesCardEdit = ({ item, setSelectedSeries, isMe }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id, title, thumbnail, price, description, videos } = item;
  const {
    setDeleteSeriesConfirmationModel,
    deleteSeriesConfirmationModel,
    setAddVideosToSeriesModel,
    setEditSeriesModel,
  } = useContext(GlobalContext);

  const deleteSeriesHandler = (id) => {
    dispatch(deleteSeriesById(id));
    toast.success("Series deleted successfully");
    setDeleteSeriesConfirmationModel(false);
  };

  return (
    <>
      <SeriesCardEditWrapper>
        <img src={thumbnail} alt={title} className="thumbnail" />

        <div className="metaInfo">
          <h5 className="metaInfo--title">{title}</h5>
          {/* <span className="metaInfo--sold">250 times sold</span> */}
          <span className="metaInfo--price">
            {price ? `${parseFloat(price).toFixed(2)} $` : "FREE"}
          </span>

          {isMe ? (
            <>
              <Button
                onClick={() => {
                  setAddVideosToSeriesModel(true);
                  setSelectedSeries({
                    id,
                    title,
                    thumbnail,
                    price,
                    description,
                  });
                }}
                className="metaInfo--addVideosBtn"
              >
                Add Videos
              </Button>

              <Button
                onClick={() => {
                  history.push(`/series/watch/${id}/${videos[0].videoId}`);
                }}
                className="metaInfo--addVideosBtn"
              >
                Watch Series
              </Button>

              <div className="metaInfo--action">
                <button
                  onClick={() => {
                    setEditSeriesModel(true);
                    setSelectedSeries({
                      id,
                      title,
                      thumbnail,
                      price,
                      description,
                    });
                  }}
                >
                  <EditIcon fill="#CC0000" height={15} width={15} />
                </button>

                <button onClick={() => setDeleteSeriesConfirmationModel(true)}>
                  <DeleteIcon fill="#CC0000" height={15} width={15} />
                </button>
              </div>
            </>
          ) : (
            <Button
              onClick={() => {
                history.push(`/series/watch/${id}/${videos[0].videoId}`);
              }}
              className="metaInfo--addVideosBtn"
            >
              Watch Series
            </Button>
          )}
        </div>
      </SeriesCardEditWrapper>

      {deleteSeriesConfirmationModel && (
        <ConfirmationModel
          title="Are you sure to delete this ?"
          open={deleteSeriesConfirmationModel}
          closeHandler={() => setDeleteSeriesConfirmationModel(false)}
          deleteHandler={() => deleteSeriesHandler(id)}
        />
      )}
    </>
  );
};

export default SeriesCardEdit;

const SeriesCardEditWrapper = styled.div`
  .thumbnail {
    width: 100%;
    height: 10rem;
    background-size: cover;
    background-position: center;
    object-fit: cover;
  }

  .metaInfo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &--title {
      font-size: 1rem;
      line-height: 1.4;
      font-weight: 300;
    }

    &--sold {
      color: rgba(255, 225, 225, 0.5);
      font-weight: 200;
      font-size: 0.85rem;
    }

    &--price {
      font-size: 1.1rem;
      color: #fff;
      font-weight: 500;
    }

    &--addVideosBtn {
      margin: 0.5rem 0;
      font-size: 0.8rem;
    }

    &--action {
      padding-top: 0.5rem;

      button {
        padding: 0.2rem 0.8rem;
        border-radius: 0.2rem;
        background-color: #fff;
        border: none;
        outline: none;

        &:nth-child(1) {
          margin-right: 0.5rem;
        }
      }
    }
  }
`;
