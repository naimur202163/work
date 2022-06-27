import React, { useContext } from "react";
import styled from "styled-components";
import ChatIcon from "./icons/chat.svg";
import NotificationBell from "./Notification";
import { useSelector } from "react-redux";
import { GlobalContext } from "../../../context/GlobalContext";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const { setShowSidebar } = useContext(GlobalContext);
  const { setShowChatList } = useContext(GlobalContext)

  const isBadgeOrAvatar = () => {
    const image = !user.avatar ? user.badge : user.avatar;

    if (image && (image.includes(".png") || image.includes(".svg"))) {
      return (
        <div className="imageBadge">
          <img className="badge" src={image} alt="" />
        </div>
      );
    } else {
      return <img className="imageAvatar" src={image} alt="" />;
    }
  };

  return (
    <NavbarWrapper>
      <div className="wrapper">
        <div className="wrapper__left">
          <div
            onClick={() => setShowSidebar(true)}
            className="wrapper__left--avatar"
          >
            {isBadgeOrAvatar()}
          </div>

          <div
            onClick={() => setShowSidebar(true)}
            className="wrapper__left--role"
          >
            {user.userrole === 0
              ? "freeloader"
              : user.userrole === 1
              ? "tribe"
              : user.userrole === 2
              ? "warrior"
              : null}
          </div>
        </div>

        <div className="wrapper__right">
          <div className="wrapper__right--notification">
            <NotificationBell />

            {/* <div className="num">
              <span>9+</span>
            </div> */}
          </div>

          <div className="wrapper__right--message">
          <div onClick={() => setShowChatList(true)}><img src={ChatIcon} alt="Chats" /></div>


            <div className="num">
              <span>5</span>
            </div>
          </div>
        </div>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;

const NavbarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(242, 242, 247, 0.2);
  z-index: 100;
  background-color: ${(props) => props.theme.bg};

  .wrapper {
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__left {
      display: flex;
      align-items: center;

      &--avatar {
        cursor: pointer;
        height: 43px;
        width: 43px;
        border-radius: 50%;
        margin-right: 0.8rem;
        position: relative;

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

      &--role {
        cursor: pointer;
        line-height: 1;
        font-family: brother-1816, sans-serif;
        padding: 0.4rem 1rem;
        text-transform: uppercase;
        font-size: 1rem;
        letter-spacing: 2px;
        font-weight: 500;
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
        border-radius: 3px;
      }
    }

    &__right {
      display: flex;
      align-items: center;
      transform: translateY(7px);

      div:first-child {
        margin-right: 1rem;
      }

      &--notification {
        transform: translateY(-5px);
        position: relative;
      }

      &--message {
        position: relative;
        cursor: pointer;

        img {
          height: 1.8rem;
          width: auto;
        }

        .num {
          position: absolute;
          top: -0.5rem;
          left: -0.5rem;
          font-size: 0.7rem;
          font-weight: 300;
          line-height: 1;
          height: 1.3rem;
          width: 1.3rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
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

          span {
            padding-top: 2px;
          }
        }
      }
    }

    @media screen and (max-width: 480px) {
      &__left {
        &--avatar {
          height: 35px;
          width: 35px;
          margin-right: 0.5rem;
        }

        &--role {
          font-size: 0.9rem;
        }
      }

      &__right {
        div:first-child {
          margin-right: 0.5rem;
        }

        &--message {
          img {
            height: 1.5rem;
          }

          .num {
            font-size: 0.65rem;
            height: 1.2rem;
            width: 1.2rem;
          }
        }
      }
    }
  }
`;
