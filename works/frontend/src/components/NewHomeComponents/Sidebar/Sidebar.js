import React, { useState, useContext, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import MenuIcon from "./icons/menuIcon.svg";
import Arrow from "./icons/arrow.svg";
import { GlobalContext } from "../../../context/GlobalContext";
import { useSelector, useDispatch } from "react-redux";
import { useFetch } from "../../../hooks/useFetch";
import { useHistory } from "react-router-dom";
import { disconnectSocket } from "../../../socket";
import { logoutUser, getAllPlaylists } from "../../../actions";
import {
  HistoryShell,
  CategoriesIcon,
  SubscriptionIconQuad,
} from "../../Icons";
import config from "../../../config/config";

const Sidebar = ({ close }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [online, setOnline] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [playlistDropdown, setPlaylistDropdown] = useState(false);
  const { loading, data } = useFetch(
    `${config.REACT_APP_BACKEND_URL}videos/categories`
  );
  const playlists = useSelector((state) => state.getPlaylists.playlists);
  const loadingPlaylists = useSelector((state) => state.getPlaylists.loading);
  const {
    showSidebar,
    setShowSidebar,
    setShowPlaylistModel,
    setShowMyAccount,
    setShowMyPortal,
    setPortalUsername,
  } = useContext(GlobalContext);

  useEffect(() => {
    dispatch(getAllPlaylists());
  }, [dispatch, showSidebar]);

  const navgateToPortal = () => {
    history.push(`/warrior-portal/${user.username}`);
  };

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
    <SidebarStyled className={`${showSidebar && "SidebarOpened"}`}>
      <div className="userMeta">
        <div className="userMeta__avatar">{isBadgeOrAvatar()}</div>

        <div
          onClick={() => setShowLogout(!showLogout)}
          className="userMeta__username"
        >
          {user.username} <i className="fas fa-angle-down"></i>
        </div>

        {showLogout && (
          <div
            onClick={() => {
              disconnectSocket();
              dispatch(logoutUser());
              history.push("/login");
            }}
            className="userMeta__logout"
          >
            Logout
          </div>
        )}

        <div className="userMeta__role">
          {user.userrole === 0
            ? "freeloader"
            : user.userrole === 1
            ? "tribe"
            : user.userrole === 2
            ? "warrior"
            : null}
        </div>

        <div className="userMeta__onlineState">
          <label class="userMeta__onlineState--switch">
            <input
              className={`${online && "inputChecked"}`}
              type="checkbox"
              checked={online}
              onChange={() => setOnline(!online)}
            />
            <span className={`slider ${online && "sliderChecked"}`}></span>

            <div
              style={{
                color: `${online ? "#2fdd92" : "#ececec"}`,
              }}
              className="userMeta__onlineState--switch-text"
            >
              {online ? "online" : "offline"}
            </div>
          </label>
        </div>
      </div>

      <div className="menus">
        <div
          className="menus__item"
          onClick={() => {
            setPortalUsername(user.username);
            setShowMyPortal(true);
            close();
          }}
        >
          <div className="menus__item--left">
            <img className="icon" src={MenuIcon} alt="" />
            <div className="name">My Portal</div>
          </div>

          <div className="menus__item--right">
            <img src={Arrow} alt="" className="arrow" />
          </div>
        </div>

        <div
          onClick={() => {
            setShowMyAccount(true);
            close();
          }}
          className="menus__item"
        >
          <div className="menus__item--left">
            <img className="icon" src={MenuIcon} alt="" />
            <div className="name">My Account</div>
          </div>

          <div className="menus__item--right">
            <img src={Arrow} alt="" className="arrow" />
          </div>
        </div>

        <div
          onClick={() => setPlaylistDropdown(!playlistDropdown)}
          className="menus__item"
        >
          <div className="menus__item--left">
            <img className="icon" src={MenuIcon} alt="" />
            <div className="name">Playlists</div>
          </div>

          <div className="menus__item--right">
            <img
              style={{
                transform: `${
                  playlistDropdown ? "rotate(90deg)" : "rotate(0deg)"
                }`,
              }}
              src={Arrow}
              alt=""
              className="arrow"
            />
          </div>
        </div>

        {playlistDropdown && (
          <div className="menus__dropdown">
            {loadingPlaylists && (
              <div className="menus__dropdown--loader">Loading...</div>
            )}

            <div
              onClick={() => {
                setShowSidebar(false);
                setShowPlaylistModel(true);
              }}
              className="menus__dropdown--item"
            >
              <div className="hoverArrow"></div>
              <div className="name">Create New Playlist</div>
            </div>

            {!loadingPlaylists &&
              playlists &&
              playlists.length > 0 &&
              playlists.map((playlist, i) => (
                <div
                  onClick={() => {
                    setShowSidebar(false);
                    history.push(`/playlist/${playlist.id}`);
                  }}
                  key={i}
                  className="menus__dropdown--item"
                >
                  <div className="hoverArrow"></div>
                  <div className="name">{playlist.title}</div>
                </div>
              ))}
          </div>
        )}

        <div
          onClick={() => setCategoryDropdown(!categoryDropdown)}
          className="menus__item"
        >
          <div className="menus__item--left">
            <CategoriesIcon className="icon" />
            <div className="name">Categories</div>
          </div>

          <div className="menus__item--right">
            <img
              style={{
                transform: `${
                  categoryDropdown ? "rotate(90deg)" : "rotate(0deg)"
                }`,
              }}
              src={Arrow}
              alt=""
              className="arrow"
            />
          </div>
        </div>

        {categoryDropdown && (
          <div className="menus__dropdown">
            {loading && (
              <div className="menus__dropdown--loader">Loading...</div>
            )}
            {!loading &&
              data.categories &&
              data.categories.length > 0 &&
              data.categories.map((cat, i) => (
                <div
                  onClick={() => {
                    history.push(`/categoryid/${cat.id}`);
                    setShowSidebar(false);
                  }}
                  key={i}
                  className="menus__dropdown--item"
                >
                  <div className="hoverArrow"></div>
                  <div className="name">{cat.name}</div>
                </div>
              ))}
          </div>
        )}

        <div className="menus__item">
          <div className="menus__item--left">
            <HistoryShell className="icon" />
            <div className="name">History</div>
          </div>

          <div className="menus__item--right">
            <img src={Arrow} alt="" className="arrow" />
          </div>
        </div>

        <div className="menus__item">
          <div className="menus__item--left">
            <SubscriptionIconQuad className="icon" />
            <div className="name">Connections</div>
          </div>

          <div className="menus__item--right">
            <img src={Arrow} alt="" className="arrow" />
          </div>
        </div>

        <div className="menus__item">
          <div className="menus__item--left">
            <img className="icon" src={MenuIcon} alt="" />
            <div className="name">Other</div>
          </div>

          <div className="menus__item--right">
            <img src={Arrow} alt="" className="arrow" />
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="footer__item">
          <i className="icon fas fa-cog"></i>
          <div className="name">Settings</div>
        </div>
      </div>
    </SidebarStyled>
  );
};

export default Sidebar;

const openDropdown = keyframes`
  from {
    transform: translateY(-4rem) scale(0.7);
    opacity: 0;
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const SidebarStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  transform: translateX(-100%);
  width: 350px;
  background: #2c2c2e;
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 1.5rem;
  transition: all 0.3s;
  z-index: 1000;
  padding: 2rem 0 1rem 0;
  font-family: ${(props) => props.theme.montserrat};
  transition: all 1s ease;

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

  .userMeta {
    width: 90%;
    margin: 0 auto 2.5rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__avatar {
      cursor: pointer;
      height: 5.5rem;
      width: 5.5rem;
      border-radius: 50%;
      position: relative;
      margin-bottom: 0.5rem;

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
          height: 5rem;
          width: auto;
        }
      }

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
    }

    &__username {
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      font-weight: 400;
      cursor: pointer;
      line-height: 1;
      margin-bottom: 1rem;

      i {
        margin-left: 0.5rem;
      }
    }

    &__logout {
      cursor: pointer;
      line-height: 1;
      font-family: brother-1816, sans-serif;
      padding: 0.4rem 1rem;
      text-transform: uppercase;
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 1rem;
      background-color: #fff;
      color: #f9903d;
      border-radius: 3px;
      animation: ${openDropdown} 0.2s ease;
    }

    &__role {
      cursor: pointer;
      line-height: 1;
      font-family: brother-1816, sans-serif;
      padding: 0.4rem 1rem;
      text-transform: uppercase;
      font-size: 0.9rem;
      letter-spacing: 2px;
      font-weight: 500;
      margin-bottom: 1rem;
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

    &__onlineState {
      &--switch {
        position: relative;
        display: inline-block;
        width: 100px;
        height: 25px;
        cursor: pointer;

        &-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 0.6rem;
          font-family: brother-1816, sans-serif;
          text-transform: uppercase;
          color: #ececec;
        }

        input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        input:checked + .slider {
          border: 2px solid #2fdd92;
        }

        input:checked + .slider:before {
          background-color: #2fdd92;
          transform: translateX(72px) translateY(-8px);
        }

        input:checked &-text {
          color: #2fdd92 !important;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: transparent;
          -webkit-transition: 0.4s;
          transition: 0.4s;
          border-radius: 10rem;
          border: 2px solid #ececec;

          &:before {
            position: absolute;
            bottom: -6px;
            left: 3px;
            transform: translateY(-50%);
            content: "";
            height: 17px;
            width: 17px;
            background-color: #ececec;
            -webkit-transition: 0.4s;
            transition: 0.4s;
            border-radius: 50%;
          }
        }
      }
    }
  }

  .menus {
    width: 90%;
    margin: 0 auto 5rem auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &__dropdown {
      background-color: #3a3a3c;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      animation: ${openDropdown} 0.2s ease;
      transition: all 0.2s ease;

      padding: 1rem;
      width: 100%;
      border-radius: 0.3rem;
      margin-bottom: 1rem;

      &--loader {
        font-size: 1rem;
        font-weight: 500;
        text-transform: uppercase;
        line-height: 1;
        font-family: brother-1816, sans-serif;
        color: rgb(246, 92, 139);
      }

      &--item:not(:last-child) {
        margin-bottom: 1rem;
      }

      &--item {
        display: flex;
        align-items: center;
        cursor: pointer;

        .name {
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: capitalize;
          line-height: 1;
        }

        .hoverArrow {
          height: 4px;
          border-radius: 2px;
          width: 0;
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
          margin-right: 0.25rem;
          transition: all 0.2s ease;
        }
      }

      &--item:hover .hoverArrow {
        width: 1.5rem;
        margin-right: 0.5rem;
      }
    }

    &__item {
      margin-bottom: 1rem;
      background-color: #3a3a3c;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 2.8rem;
      padding: 0 1rem;
      width: 100%;
      border-radius: 0.3rem;
      cursor: pointer;

      &--left {
        display: flex;
        align-items: center;

        .icon {
          height: 1.2rem;
          width: auto;
          margin-right: 0.6rem;
        }

        .name {
          font-size: 0.9rem;
          font-weight: 500;
          text-transform: capitalize;
        }
      }

      &--right {
        .arrow {
          height: 0.8rem;
          width: auto;
          transition: all 0.2s ease;
        }
      }
    }
  }

  .footer {
    width: 90%;
    margin: 0 auto;

    &__item {
      display: flex;
      align-items: center;
      cursor: pointer;

      .icon {
        margin: 0.5rem;
        font-size: 1.5rem;
      }

      .name {
        font-size: 0.9rem;
        font-weight: 500;
        text-transform: capitalize;
      }
    }
  }
`;
