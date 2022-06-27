import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import BackIcon from "../assets/Icons/back.svg";
import { GlobalContext } from "../context/GlobalContext";
import { getProfile } from "../actions";
import MyPortal from "../components/MyPortalComponents/MyPortal";
import { CLEAR_PROFILE } from "../actions/types";

const MyPortalPageX = ({ close }) => {
  const { showMyPortal, portalUsername, showEditClipModel } =
    useContext(GlobalContext);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProfile(portalUsername ? portalUsername : user?.id));
  }, [user, portalUsername, showEditClipModel]);

  return (
    <MyPortalStyled className={`${showMyPortal && "ShowMyPortalPage"}`}>
      <div className={`wrapper `}>
        <div className="wrapper__header">
          <div
            onClick={() => {
              dispatch({
                type: CLEAR_PROFILE,
              });

              close();
            }}
            className="backIcon"
          >
            <img src={BackIcon} alt="" />
          </div>
          <div className="name">My Portal</div>
        </div>

        <div className="wrapper__content">
          <MyPortal profile={profile} />
        </div>
      </div>
    </MyPortalStyled>
  );
};

export default MyPortalPageX;

const MyPortalStyled = styled.div`
  min-height: 100vh;
  height: auto;
  width: 100%;
  background-color: #1c1c1e;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  z-index: 150;
  opacity: 0;
  transform: translateX(-100%);
  transition: all 1s ease;

  .wrapper {
    height: 100%;
    width: 100%;

    .MuiBox-root {
      padding: 0 !important;
    }

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
      height: 100vh;
    }
  }

  @media screen and (max-width: 600px) {
    .wrapper {
      &__header {
        padding: 0.8rem 2rem;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .wrapper {
      &__header {
        padding: 0.5rem 1.5rem;

        .name {
          font-size: 1rem;
        }
      }
    }
  }
`;
