import React, { useState } from "react";
import styled, {  } from "styled-components";
import { motion } from "framer-motion";
import MomentIcon from "./icons/moment.svg";
import ClipIcon from "./icons/clip.svg";
import LiveIcon from "./icons/live.svg";
import PostIcon from "./icons/post.svg";

const FilterBox = () => {
  const [clipFilterActive, setClipFilterActive] = useState(false);
  const [liveFilterActive, setLiveFilterActive] = useState(false);
  const [postFilterActive, setPostFilterActive] = useState(false);
  const [momentFilterActive, setMomentFilterActive] = useState(false);

  return (
    <FilterBoxStyled>
      <motion.div
        initial={{ opacity: 0, y: "-20rem" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.25, stiffness: 150 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{
          scale: 1,
        }}
        className="wrapper"
      >
        <div
          onClick={() => setClipFilterActive(!clipFilterActive)}
          className="wrapper__item clipBox"
        >
          <div className={`tearShape ${clipFilterActive && "active"}`}>
            <img className="icon" src={ClipIcon} alt="" />
          </div>
        </div>

        <div
          onClick={() => setLiveFilterActive(!liveFilterActive)}
          className="wrapper__item liveBox"
        >
          <div className={`tearShape ${liveFilterActive && "active"}`}>
            <img className="icon" src={LiveIcon} alt="" />
          </div>
        </div>

        <div
          onClick={() => setPostFilterActive(!postFilterActive)}
          className="wrapper__item postBox"
        >
          <div className={`tearShape ${postFilterActive && "active"}`}>
            <img className="icon" src={PostIcon} alt="" />
          </div>
        </div>

        <div
          onClick={() => setMomentFilterActive(!momentFilterActive)}
          className="wrapper__item momentBox"
        >
          <div className={`tearShape ${momentFilterActive && "active"}`}>
            <img className="icon" src={MomentIcon} alt="" />
          </div>
        </div>
      </motion.div>
    </FilterBoxStyled>
  );
};

export default FilterBox;

const FilterBoxStyled = styled.div`
  width: 100%;
  padding-bottom: 25px;
  border-bottom: 1px solid rgba(242, 242, 247, 0.2);

  .wrapper {
    height: 16rem;
    width: 16rem;
    border-radius: 50%;
    margin: 0 auto;
    position: relative;

    &__item {
      position: absolute;
      color: #fff;
      cursor: pointer;

      .tearShape {
        align-items: center;
        display: flex;
        justify-content: center;
        border: 2px solid transparent;
        border-radius: 8px 50% 50% 50%;
        height: 100px;
        width: 100px;
        background-color: #2c2c2e;
        transition: all 0.2s ease;
      }

      .active {
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

      &:hover {
        .tearShape {
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

    .clipBox {
      top: 0;
      left: 50%;
      transform: translateX(-50%);

      .tearShape {
        transform: rotate(225deg);

        .icon {
          transform: rotate(45deg);
          width: 3rem;
          height: auto;
        }
      }
    }

    .liveBox {
      top: 50%;
      right: 0;
      transform: translateY(-50%);

      .tearShape {
        transform: rotate(-40deg);

        .icon {
          transform: rotate(40deg);
          width: 3rem;
          height: auto;
        }
      }
    }

    .postBox {
      bottom: 0.5rem;
      left: 50%;
      transform: translateX(-50%);

      .tearShape {
        transform: rotate(45deg);

        .icon {
          transform: rotate(-45deg);
          width: 2rem;
          height: auto;
        }
      }
    }

    .momentBox {
      top: 50%;
      left: 0;
      transform: translateY(-50%);

      .tearShape {
        transform: rotate(130deg);

        .icon {
          transform: rotate(140deg);
          width: 2rem;
          height: auto;
        }
      }
    }
  }
`;
