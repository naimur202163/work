import React, { useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import CategoryRequestModelBackdrop from "./VideoReportModelBackdrop";
import ReactTooltip from "react-tooltip";
import TimePicker from "react-time-picker";
import { useDispatch, useSelector } from "react-redux";
import { CloseIcon } from "../Icons";
import { toast } from "react-toastify";
import { videoReportAction } from "../../actions";
import { GlobalContext } from "../../context/GlobalContext";
import { useMediaQuery } from "react-responsive";

const VideoReportModel = ({
  open,
  closeHandler,
  video,
  uploaderUser,
  user,
}) => {
  const dispatch = useDispatch();
  const getFlagTypes = useSelector((state) => state.getFlagTypes);
  const { flagTypes } = getFlagTypes;
  const { singleVideoFormattedTimestamp } = useContext(GlobalContext);

  const [selectedType, setSelectedType] = useState(null);
  const [timestamp, setTimestamp] = useState(singleVideoFormattedTimestamp);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1); // allowed 1 and 2
  const is480Screen = useMediaQuery({ maxWidth: 480 });

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleCancelClick = () => {
    if (step === 1) {
      return closeHandler();
    } else if (step === 2) {
      return setStep(1);
    }
  };

  const handleNextClick = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      submitHandler();
    }
  };

  const submitHandler = () => {
    if (!message) {
      return toast.error(
        "please give some information on why you are reporting the video"
      );
    }

    if (message.length > 500) {
      return toast.error("message should be less than 500 characters");
    }

    const data = {
      warriorUserId: uploaderUser.id,
      warriorUsername: uploaderUser.username,
      warriorFirstName: uploaderUser.firstname,
      warriorLastName: uploaderUser.lastname,
      warriorEmail: uploaderUser.email,
      userUserId: user.id,
      userUsername: user.username,
      userFirstName: user.firstname,
      userLastName: user.lastname,
      userEmail: user.email,
      videoTitle: video.title,
      videoId: video.id,
      flagType: selectedType,
      flagTimestamp: timestamp,
      flagMessage: message,
    };

    dispatch(videoReportAction(data));
    setTimestamp("00:00:00");
    setMessage("");
    setSelectedType(null);
    closeHandler();

    toast.success(
      "Our support team got your report. We will get back to you as soon as possible."
    );
  };

  return (
    <>
      <VideoReportModelWrapper>
        <div className="header">
          <CloseIcon onClick={closeHandler} />
          <h1 className="header__title">Report video</h1>
        </div>

        {step === 1 ? (
          <div className="reportTypes">
            <form className="reportTypes__form">
              {flagTypes &&
                flagTypes.length > 0 &&
                flagTypes.map((item, i) => (
                  <div key={item.id} className="reportTypes__form--item">
                    <label>
                      <input
                        type="radio"
                        value={item.id}
                        checked={selectedType === item.id}
                        onChange={handleTypeChange}
                      />
                      {item.flagTypeName}
                    </label>

                    <i
                      data-tip
                      data-for={`infoText-${i}`}
                      className="questionMarkIcon fas fa-question-circle"
                    />
                    <ReactTooltip
                      className="Tooltip"
                      place={is480Screen ? "left" : "right"}
                      effect="solid"
                      backgroundColor="rgb(246, 92, 139)"
                      textColor="#eee"
                      id={`infoText-${i}`}
                    >
                      {item.flagTypeInfo}
                    </ReactTooltip>
                  </div>
                ))}
            </form>

            <p className="infoText">
              Flagged videos and users are reviewed by iSUTRA staff 24 hours a
              day, 7 days a week to determine whether they violate Community
              Guidelines. Accounts are penalized for Community Guidelines
              violations, and serious or repeated violations can lead to account
              termination.
            </p>
          </div>
        ) : step === 2 ? (
          <div className="userReport">
            <form className="userReport__form">
              <h2 className="userReport__form--title">
                Select timestamp (MM:SS)
              </h2>
              <TimePicker
                maxDetail="second"
                onChange={setTimestamp}
                value={timestamp}
                className="userReport__form--timestamp"
                format="mm:ss"
                disableClock={true}
              />

              <textarea
                name="message"
                placeholder="Please describe why you are flagging this content"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </form>

            <p className="infoText">
              You are about to flag this content as inappropriate and/or it is
              violating the iSUTRA Bill of Rights. Please describe below why you
              are flagging this video, if there is a particular section of the
              video please mention the time stamp
            </p>
          </div>
        ) : null}

        <div className="footer">
          <div className="footer__action">
            <button
              onClick={handleCancelClick}
              className="footer__action--cancel"
            >
              {step === 1 ? "Cancel" : "Go Back"}
            </button>
            <button
              disabled={selectedType === null ? true : false}
              onClick={handleNextClick}
              className="footer__action--next"
            >
              {step === 1 ? "Next" : "Submit Report"}
            </button>
          </div>
        </div>
      </VideoReportModelWrapper>
      {/* rendering the backdrop */}
      {open && <CategoryRequestModelBackdrop />}
    </>
  );
};

export default VideoReportModel;

const openModal = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const VideoReportModelWrapper = styled.div`
  position: fixed;
  /* overflow: auto; */
  height: 80vh;
  width: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: ${(props) => props.theme.grey};
  border-radius: 0.3rem;
  animation: ${openModal} 0.5s ease-in-out;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.4), 0px 0px 4px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 480px) {
    .Tooltip {
      max-width: 15rem !important;
    }
  }

  .infoText {
    font-size: 0.7rem;
    color: #777;
    line-height: 1.2;
    font-weight: 200;
    margin-bottom: 1rem;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 4rem;
    padding: 0 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

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

  .reportTypes {
    padding: 1rem;
    height: calc(100% - 7.25rem);
    overflow-y: auto;

    /* width */
    ::-webkit-scrollbar {
      width: 8px;
      border-radius: 10rem;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #000;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #202020;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: rgb(246, 92, 139);
    }

    &__form {
      margin-bottom: 2rem;

      &--item {
        margin-bottom: 1.2rem;
        display: flex;
        align-items: center;

        label {
          display: flex;
          align-items: center;
          font-size: 1rem;
          font-weight: 300;
          color: #999;

          input {
            margin-right: 0.5rem;
          }

          input[type="radio"] {
            -webkit-appearance: none;
            appearance: none;
            background-color: #fff;
            margin: 0 0.8rem 0 0;
            width: 1rem;
            height: 1rem;
            border: 0.15em solid #fff;
            border-radius: 50%;
            transform: translateY(-0.075em);
            display: grid;
            place-content: center;

            &:before {
              content: "";
              width: 0.6em;
              height: 0.6em;
              border-radius: 50%;
              transform: scale(0);
              transition: 120ms transform ease-in-out;
              box-shadow: inset 1em 1em #666;
            }
          }

          input[type="radio"]:checked::before {
            transform: scale(1);
          }
        }

        .questionMarkIcon {
          margin-left: 1rem;
          height: 1rem;
          width: 1rem;
          cursor: pointer;
          color: #999;
        }
      }
    }
  }

  .userReport {
    padding: 1rem;
    height: calc(100% - 7.25rem);
    overflow-y: auto;

    /* width */
    ::-webkit-scrollbar {
      width: 6px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #000;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #666;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: rgb(246, 92, 139);
    }

    &__form {
      margin-bottom: 2rem;

      &--title {
        font-size: 1rem;
        text-transform: capitalize;
        margin-bottom: 0.5rem;
        font-weight: 300;
        color: #888;
      }

      &--timestamp {
        .react-time-picker__wrapper {
          border: none !important;
          margin-bottom: 1.5rem;
        }

        .react-time-picker__inputGroup {
          input {
            color: #fff !important;
            font-size: 1rem !important;
          }
        }

        .react-time-picker__inputGroup__divider {
          padding: 0 0.2rem;
        }

        .react-time-picker__clear-button {
          display: none !important;
        }
      }

      textarea {
        resize: none;
        height: 12rem;
        width: 100%;
        background: ${(props) => props.theme.black};
        border: 1px solid ${(props) => props.theme.black};
        padding: 0.5rem;
        border-radius: 4px;
        color: ${(props) => props.theme.primaryColor};
        font-size: 1rem;
      }
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 3.25rem;
    padding: 0 1.5rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px solid rgba(255, 255, 255, 0.08);

    &__action {
      display: flex;
      align-items: center;

      &--cancel,
      &--next {
        text-transform: uppercase;
        font-size: 1rem;
        border: none;
        background-color: transparent;
        outline: none;
        font-weight: 400;
        cursor: pointer;
        transition: all 0.2s ease;
        letter-spacing: 0.1px;
        color: #888;
      }

      &--cancel {
        margin-right: 2rem;
        &:hover {
          color: #ff0000;
        }
      }

      &--next {
        &:hover {
          color: #ff0000;
        }
      }

      button[disabled="disabled"],
      button:disabled {
        color: #888;
      }
    }
  }

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;
