import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import CaretDownIcon from "../../../assets/Icons/caret-down.svg";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { sendConnectionRequest } from "../../../actions/index";
import { toast } from "react-toastify";

const CustomisedRadio = withStyles({
  root: {
    color: "#FFF",
    "&$checked": {
      color: "#F86782",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const CoopReferralModal = ({ doNotClose, close, username, id }) => {
  const dispatch = useDispatch();
  const { loading, sendInfo, sendError } = useSelector(
    (state) => state.connection
  );
  const [showCollaborateBox, setShowCollaborateBox] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (sendError) {
      toast.error("You already send connection request.");
      setMessage("");
      setShowCollaborateBox(false);
      close();
    }

    if (sendInfo) {
      toast.success("Connection request sent.");
      setMessage("");
      setShowCollaborateBox(false);
      close();
    }
  }, [sendError, sendInfo]);

  const sendConnectionRequestHandler = () => {
    const obj = {
      message: message ? message : null,
      collaborate: showCollaborateBox,
      warriorId: id,
    };

    dispatch(sendConnectionRequest(obj));
  };

  return (
    <CoopReferralModelStyled ref={doNotClose}>
      <div onClick={close} className="header">
        <img src={CaretDownIcon} alt="" className="closeIcon" />
        <div className="title">Connect with {username}</div>
      </div>

      <div className="content">
        <p className="content__text">
          Get in touch with content creator, a frient request will automatically
          be sent.
        </p>

        <p className="content__text">
          Get notified when the creator goes live or posts content
        </p>

        <p className="content__text">
          Raising hand functionality to submit questions during live classes.
        </p>

        <div className="content__radioBox">
          <FormControlLabel
            control={
              <CustomisedRadio
                checked={showCollaborateBox}
                onClick={() => setShowCollaborateBox(!showCollaborateBox)}
              />
            }
            label="I also want to collaborate in a project"
          />
        </div>

        {showCollaborateBox && (
          <div className="content__collaborationRequestBox">
            <div className="title">Want to collaborate ?</div>
            <div className="smallText">
              Leave a message to let {username} know your plans.
            </div>

            <textarea
              placeholder="Sent a message"
              className="messageBox"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
        )}

        <button onClick={sendConnectionRequestHandler} className="sendMessage">
          {loading ? "sending..." : "connect"}
        </button>
      </div>
    </CoopReferralModelStyled>
  );
};

export default CoopReferralModal;

const openAnimation = keyframes`
  from {
    transform: translateY(5rem);
    opacity: 0;
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CoopReferralModelStyled = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  height: calc(100% - 5.5rem);
  background-color: #3a3a3c;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  animation: ${openAnimation} 0.35s ease-out;
  overflow-y: auto;
  overflow-x: hidden;
  border-top: 1px solid rgba(112, 112, 112, 0.25);
  font-family: ${(props) => props.theme.montserrat};

  /* width */
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #3a3a3c;
    border-radius: 7px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(246, 92, 139);
  }

  .header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(112, 112, 112, 0.5);
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    cursor: pointer;
    padding: 0.5rem 1rem;

    .closeIcon {
      height: 0.5rem;
      width: auto;
      margin-right: 1rem;
    }

    .title {
      font-size: 0.9rem;
      font-weight: 400;
      text-transform: capitalize;
      color: #f2f2f7;
    }
  }

  .content {
    padding: 0 2rem;

    &__text {
      font-size: 0.8rem;
      font-weight: 300;
      color: #f2f2f7;
      line-height: 1.3;
      margin-bottom: 1rem;
    }

    .MuiTypography-root {
      font-size: 0.85rem;
      font-weight: 400;
      color: #f2f2f7;
      line-height: 1.3;
      font-family: ${(props) => props.theme.montserrat};
    }

    &__collaborationRequestBox {
      margin: 2rem 0;

      .title {
        line-height: 1;
        font-size: 1.1rem;
        font-weight: 500;
        color: #f2f2f7;
        margin-bottom: 0.5rem;
      }

      .smallText {
        font-size: 0.75rem;
        font-weight: 300;
        color: #f2f2f7;
        line-height: 1;
        margin-bottom: 2rem;
      }

      .messageBox {
        width: 100%;
        border-radius: 0.6rem;
        padding: 0.7rem 1rem;
        background-color: #48484a;
        color: #fff;
        border: none;
        outline: none;
        font-size: 0.8rem;
        resize: none;
        height: 7rem;
        font-weight: 400;
        font-family: ${(props) => props.theme.montserrat};

        &::placeholder {
          color: #c9c9c9;
          font-weight: 300;
        }
      }
    }

    .sendMessage {
      width: 100%;
      padding: 0.7rem 0;
      font-size: 0.75rem;
      color: #fff;
      font-weight: 600;
      border-radius: 10rem;
      background: linear-gradient(to right bottom, #f9903d, #f75b8c);
      border: none;
      outline: none;
      font-family: ${(props) => props.theme.montserrat};
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-top: 1rem;
    }
  }

  @media screen and (max-width: 480px) {
    .content {
      padding: 0 1rem;

      &__text {
        font-size: 0.7rem;
      }

      .MuiTypography-root {
        font-size: 0.75rem;
      }

      &__collaborationRequestBox {
        .title {
          font-size: 1rem;
        }

        .smallText {
          font-size: 0.7rem;
        }
      }

      .sendMessage {
        font-size: 0.7rem;
      }
    }
  }
`;
