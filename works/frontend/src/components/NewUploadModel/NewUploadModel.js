import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../context/GlobalContext";
import DropdownArrow from "./icons/arrow.svg";
import GobackIcon from "./icons/back.svg";
import MomentIcon from "./icons/moment.svg";
import ClipIcon from "./icons/clip.svg";
import LiveIcon from "./icons/live.svg";
import CaretRightIcon from "./icons/caret-right.svg";
import ScheduleIcon from "./icons/schedule.svg";
import PostIcon from "../../assets/Icons/post.svg";
import UploadIcon from "./icons/upload.svg"
import StartLiveClass from "../StartLiveClass";

const NewUploadModel = ({ show, close }) => {
  const { setShowUploadMomentModel, setShowUploadClipModel } =
    useContext(GlobalContext);

  return (
    <UploadModelStyled className={`${show && "UploadModelShow"}`}>
      <div className="wrapper">
        <div className="wrapper__header">
          <div onClick={close} className="backIcon">
            <img src={GobackIcon} alt="" />
          </div>
          <div className="name">Go Live</div>
        </div>

        <div className="wrapper__content">
          <div className="wrapper__content--list">
            <div className="uploadType">
              <div className="icon">
                <img src={LiveIcon} alt="" />
              </div>
              <div className="box">
                <div className="box__left">
                  <p className="lightText">Start your</p>
                  <p className="boldText">Live Class</p>
                </div>

                <div className="box__right">
                  <img src={DropdownArrow} alt="" />
                </div>
              </div>
            </div>

            <div
              onClick={() => setShowUploadMomentModel(true)}
              className="uploadType"
            >
              <div className="icon">
                <img src={MomentIcon} alt="" />
              </div>
              <div className="box">
                <div className="box__left">
                  <p className="lightText">Record a </p>
                  <p className="boldText">Moment</p>
                </div>

                <div className="box__right">
                  <img src={DropdownArrow} alt="" />
                </div>
              </div>
            </div>

            <div
              onClick={() => {
                setShowUploadClipModel(true);
              }}
              className="uploadType"
            >
              <div className="icon">
                <img src={ClipIcon} alt="" />
              </div>
              <div className="box">
                <div className="box__left">
                  <p className="lightText">Upload</p>
                  <p className="boldText">Clip</p>
                </div>

                <div className="box__right">
                  <img src={DropdownArrow} alt="" />
                </div>
              </div>
            </div>

            <div className="uploadType">
              <div className="icon">
                <img src={PostIcon} alt="" />
              </div>
              <div className="box">
                <div className="box__left">
                  <p className="lightText">Create a</p>
                  <p className="boldText">Post</p>
                </div>

                <div className="box__right">
                  <img src={DropdownArrow} alt="" />
                </div>
              </div>
            </div>

            <div className="uploadType">
              <div className="icon">
                <img src={UploadIcon} alt="" />
              </div>
              <div className="box">
                <div className="box__left">
                  <p className="lightText">Upload</p>
                  <p className="boldText">Content</p>
                </div>

                <div className="box__right">
                  <img src={GobackIcon} alt="" />
                </div>
              </div>
            </div>

            <div className="uploadBySchedule">
              <p className="infoText">or check your schedule</p>

              <div className="schedule">
                <div className="icon">
                  <img src={ScheduleIcon} alt="" />
                </div>
                <div className="box">
                  <div className="box__left">
                    <p className="lightText">Start from</p>
                    <p className="boldText">Your Schedule</p>
                  </div>

                  <div className="box__right">
                    <img src={CaretRightIcon} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UploadModelStyled>
  );
};

export default NewUploadModel;

const UploadModelStyled = styled.div`
  position: fixed;
  z-index: 900;
  bottom: 3.5rem;
  height: 100%;
  width: 100%;
  background-color: #1c1c1e;
  color: #fff;
  transition: all 0.7s ease;
  scale: 0.8;
  opacity: 0.8;
  transform: translateY(150%);
  overflow-y: auto;

  .wrapper {
    margin: 60px auto 0 auto;
    font-family: ${(props) => props.theme.montserrat};

    &__header {
      display: flex;
      align-items: center;
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
        font-size: 1.2rem;
        font-weight: 400;
        text-transform: capitalize;
      }
    }

    &__content {
      width: 50%;
      max-width: 550px;
      margin: 2rem auto;

      &--list {
        width: 100%;

        .uploadType {
          display: flex;
          align-items: center;
          width: 100%;
          margin-bottom: 1rem;

          p {
            font-size: 0.8rem;
            color: #2c2c2e;
          }

          .lightText {
            font-weight: 400;
            margin-right: 0.2rem;
          }
          .boldText {
            font-weight: 600;
            margin-right: 0.5rem;
          }

          .icon {
            margin-right: 1rem;
            width: 3.5rem;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #fff;
            width: 100%;
            padding: 0.5rem 1rem;
            border-radius: 0.4rem;
            cursor: pointer;

            &__left {
              display: flex;
              align-items: center;
            }

            &__right {
              img {
                height: 0.8rem;
                width: auto;
              }
            }
          }
        }

        .uploadBySchedule {
          margin-top: 2rem;

          .infoText {
            text-align: center;
            font-size: 0.85rem;
            color: #f2f2f7;
            font-weight: 300;
            opacity: 0.9;
            margin-bottom: 0.25rem;
          }

          .schedule {
            display: flex;
            align-items: center;
            width: 100%;
            margin-bottom: 1rem;

            p {
              font-size: 0.8rem;
              color: #f2f2f7;
            }

            .lightText {
              font-weight: 300;
              margin-right: 0.5rem;
            }
            .boldText {
              font-weight: 500;
              margin-right: 0.5rem;
            }

            .icon {
              margin-right: 1rem;
              width: 3.5rem;
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
              padding: 0.5rem 1rem;
              border-radius: 0.4rem;
              cursor: pointer;

              &__left {
                display: flex;
                align-items: center;
              }

              &__right {
                img {
                  height: 0.8rem;
                  width: auto;
                }
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 480px) {
    .wrapper {
      &__header {
        padding: 0.8rem 1.5rem;

        .name {
          font-size: 1rem;
        }
      }

      &__content {
        width: 80%;

        .uploadType {
          margin-bottom: 0.8rem;

          p {
            font-size: 0.7rem;
          }

          .icon {
            width: 3rem;
          }

          .box {
            padding: 0.4rem 1rem;
          }
        }

        .uploadBySchedule {
          margin-top: 1.5rem;

          .infoText {
            font-size: 0.8rem;
          }

          .schedule {
            p {
              font-size: 0.7rem;
            }

            .icon {
              width: 3rem;
            }

            .box {
              padding: 0.4rem 1rem;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 375px) {
    .wrapper {
      &__content {
        width: 90%;
      }
    }
  }
`;
