import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
// import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import HomeOutlineIcon from "./icons/homeOutline.svg";
import SearchOutlineIcon from "./icons/searchOutline.svg";
import StreamOutlineIcon from "./icons/streamOutline.svg";
import LibraryOutlineIcon from "./icons/libraryOutline.svg";
import HomeFilledIcon from "./icons/homeFilled.svg";
import StreamFilledIcon from "./icons/streamFilled.svg";
import VideoIcon from "./icons/videoIcon.svg";
import { useHistory } from "react-router-dom";
import NewUploadModel from "../../NewUploadModel/NewUploadModel";
import { GlobalContext } from "../../../context/GlobalContext";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const BottomBar = () => {
  const [activeTab, setActiveTab] = useState(null);
  const { showUploadModel, setShowUploadModel } = useContext(GlobalContext)
  
  const history = useHistory();

  useEffect(() => {
    if (
      history.location.pathname === "/home" ||
      history.location.pathname === "/"
    ) {
      setActiveTab("HOME");
    } else if (history.location.pathname === "/search") {
      setActiveTab("SEARCH");
    } else if (history.location.pathname === "/streams") {
      setActiveTab("STREAM");
    } else if (history.location.pathname === "/library") {
      setActiveTab("LIBRARY");
    }
  }, [history.location.pathname]);

  return (
    <>
      <BottomBarStyled>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="menus"
        >
          <motion.div
            onClick={() => {
              history.push("/home");
              setActiveTab("HOME");
            }}
            variants={item}
            className={`menus__item homeItem ${
              (history.location.pathname === "/home" ||
                history.location.pathname === "/") &&
              "active"
            }`}
          >
            <div className="icon">
              <img
                src={activeTab === "HOME" ? HomeFilledIcon : HomeOutlineIcon}
                alt=""
              />
            </div>
            <div className="name">Home</div>
          </motion.div>
          <motion.div
            onClick={() => {
              history.push("/search");
              setActiveTab("SEARCH");
            }}
            variants={item}
            className={`menus__item searchItem ${
              history.location.pathname === "/search" && "active"
            }`}
          >
            <div className="icon">
              <img src={SearchOutlineIcon} alt="" />
            </div>
            <div className="name">Search</div>
          </motion.div>
          <motion.div
            onClick={() => setShowUploadModel(true)}
            className="uploadItem"
          >
            <img src={VideoIcon} alt="" className="icon" />
          </motion.div>
          <motion.div
            onClick={() => {
              history.push("/streams");
              setActiveTab("STREAM");
            }}
            variants={item}
            className={`menus__item streamItem ${
              history.location.pathname === "/streams" && "active"
            }`}
          >
            <div className="icon">
              <img
                src={
                  activeTab === "STREAM" ? StreamFilledIcon : StreamOutlineIcon
                }
                alt=""
              />
            </div>
            <div className="name">Streams</div>
          </motion.div>
          <motion.div
            onClick={() => {
              history.push("/library");
              setActiveTab("LIBRARY");
            }}
            variants={item}
            className={`menus__item libraryItem ${
              history.location.pathname === "/library" && "active"
            }`}
          >
            <div className="icon">
              <img src={LibraryOutlineIcon} alt="" />
            </div>
            <div className="name">Library</div>
          </motion.div>
        </motion.div>
      </BottomBarStyled>

      <NewUploadModel
        show={showUploadModel}
        close={() => setShowUploadModel(false)}
      />
    </>
  );
};

export default BottomBar;

const BottomBarStyled = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 3.5rem;
  z-index: 100;
  background-color: #212123;
  border-top: 1px solid rgba(112, 112, 112, 0.5);

  .menus {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    margin: 0 auto;

    &__item {
      display: flex;
      align-items: center;
      flex-direction: column;
      cursor: pointer;

      .icon {
        margin: 0;
        padding: 0;
        transform: translateY(5px);

        img {
          height: auto;
          width: 1.1;
        }
      }

      .name {
        font-family: ${(props) => props.theme.montserrat};
        line-height: 1;
        font-size: 0.7rem;
        font-weight: 200;
        text-transform: capitalize;
      }
    }

    .active .name {
      font-weight: 600;
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
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .uploadItem {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 1.4rem;
      border-radius: 10rem;
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

      .icon {
        height: 0.8rem;
        width: auto;
      }
    }
  }

  @media screen and (max-width: 375px) {
    .menus {
      width: 95%;

      &__item {
        img {
          width: 1.1rem;
        }
      }

      .name {
        font-size: 0.7rem;
      }

      .uploadItem {
        padding: 0.4rem 1.2rem;

        .icon {
          height: 0.75rem;
        }
      }
    }
  }
`;
