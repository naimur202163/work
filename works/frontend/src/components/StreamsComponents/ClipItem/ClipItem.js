import React, { useState } from "react";
import styled from "styled-components";
import VideoOptionsModel from "./VideoOptionsModel";
import BackdropV2 from "../../BackdropV2";

const ClipItem = () => {
  const [openVideoOptions, setOpenVideoOptions] = useState(false);

  return (
    <>
      <ClipStyled>
        <div className="thumbnail">
          <img
            src="https://res.cloudinary.com/dq87imngy/image/upload/v1653667310/defaultImage_smbzwn.png"
            alt=""
          />
        </div>

        <div className="metaInfo">
          <div className="metaInfo__left">
            <div className="metaInfo__left--avatar">
              {/* <div className="imageBadge">
              <img
                className="badge"
                src={
                  "https://thesecondangle.com/wp-content/uploads/schema-and-structured-data-for-wp/Marvel-star-Robert-Downey-Jr.jpg"
                }
                alt=""
              />
            </div> */}

              <img
                className="imageAvatar"
                src={
                  "https://thesecondangle.com/wp-content/uploads/schema-and-structured-data-for-wp/Marvel-star-Robert-Downey-Jr.jpg"
                }
                alt=""
              />
            </div>

            <div className="metaInfo__left--videoMeta">
              <div className="title">Title of the video</div>
              <div className="namedate">
                <div className="name">Manjil Junior</div>
                <div className="date">5 days ago</div>
              </div>
            </div>
          </div>
          <div className="metaInfo__right">
            <i
              aria-controls="fade-menu"
              aria-haspopup="true"
              onClick={() => setOpenVideoOptions(true)}
              className="fas fa-ellipsis-v"
            />
          </div>
        </div>

        <div className="views">
          <span>0000 Views</span>
        </div>
      </ClipStyled>

      {openVideoOptions && (
        <>
          <VideoOptionsModel />
          <BackdropV2 close={() => setOpenVideoOptions(false)} />
        </>
      )}
    </>
  );
};

export default ClipItem;

const ClipStyled = styled.div`
  margin-bottom: 2rem;
  position: relative;

  .views {
    position: absolute;
    top: 11.5rem;
    left: 1rem;
    font-size: 0.7rem;
    padding: 0.2rem 0.7rem;
    color: #fff;
    z-index: 2;
    font-family: brother-1816, sans-serif;
    background-color: rgba(28, 28, 30, 1);
    text-transform: uppercase;
    border-radius: 0.3rem;
    cursor: pointer;
  }

  .thumbnail {
    width: 100%;
    height: 14rem;
    overflow: hidden;
    margin-bottom: 0.5rem;

    img {
      height: 100%;
      width: 100%;
      background-size: cover;
      background-position: center;
      object-fit: cover;
    }
  }

  .metaInfo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.5rem;
    font-family: ${(props) => props.theme.montserrat};

    &__left {
      display: flex;
      align-items: center;

      &--avatar {
        cursor: pointer;
        height: 45px;
        width: 45px;
        border-radius: 50%;
        margin-right: 0.8rem;
        position: relative;
        overflow: hidden;

        .imageAvatar {
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 50%;
          background-size: cover;
          background-position: center;
          object-fit: cover;
          height: 100%;
          width: 100%;
        }

        .imageBadge {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

          .badge {
            height: 38px;
            width: auto;
          }
        }
      }

      &--videoMeta {
        cursor: pointer;

        .title {
          font-size: 0.9rem;
          font-weight: 500;
          line-height: 1.5;
        }

        .namedate {
          font-size: 0.7rem;
          display: flex;
          align-items: center;

          & > *:not(:last-child) {
            &::after {
              content: "•";
              margin-left: 8px;
              position: absolute;
              display: inline-block;
              font-weight: 700;
            }
          }
          & > *:not(:first-child) {
            margin-left: 18px;
          }

          .name {
            font-weight: 500;
            color: rgba(199, 199, 204, 1);
          }

          .date {
            color: rgba(174, 174, 178, 1);
            font-size: 300;
          }
        }
      }
    }

    &__right {
      i {
        font-size: 1rem;
        color: #fff;
        cursor: pointer;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .metaInfo {
      padding: 0 1rem;
    }

    .views {
      font-size: 0.65rem;
    }
  }
`;
