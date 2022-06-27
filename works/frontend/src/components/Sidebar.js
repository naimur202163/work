import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import { NavLink, useHistory, Link } from "react-router-dom";
import Subscriptions from "./Subscriptions";
import { useFetch } from "../hooks/useFetch";
import { closeSidebar, logoutUser, getAllPlaylists } from "../actions";
import DropdownIconRight from "./icons/arrow-left.svg";
import DropdownIconDown from "./icons/arrow-down.svg";
import { SignoutIcon, CloseIcon } from "./Icons";
import { disconnectSocket } from "../socket";
import {
  HomeHutIcon,
  SubscriptionIconQuad,
  HistoryShell,
  BookmarkLibrary,
  TrendingCampfire,
  YourVideoFilmStrip,
  CategoriesIcon,
  LibIconPadLock,
  LikeIcon,
} from "./Icons";
import PlaylistIcon from "./icons/PlaylistIcon";
import UpgradeAccountModal from "./UpgradeAccountModal";
import { GlobalContext } from "../context/GlobalContext";
import config from "../config/config";

const openPlaylist = keyframes`
  from {
    transform: scaleY(0);
    opacity: 0;
  }

  to {
    transform: scaleY(1);
    opacity: 1;
  }
`;

const Dropdown = styled.div`
  width: 93%;
  margin-left: auto;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  transition: all 0.2s ease;
  transform-origin: top;
  overflow: hidden;
`;

const DropdownPlaylist = styled.div`
  width: 93%;
  margin-left: auto;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  transition: all 0.2s ease;
  transform-origin: top;
  overflow: hidden;
  animation: ${openPlaylist} 0.3s ease-in-out;

  .item {
    display: flex;
    align-items: center;
    padding: 0.6rem 0;
    padding-left: 1.5rem;
    font-weight: 400;
    font-size: 0.9rem;
    line-height: 1.2;
    transition: all 0.2s ease;

    &:hover {
      background: ${(props) => props.theme.darkGrey};
      cursor: pointer;
    }

    &--icon {
      width: 1.3rem;
      height: auto;
      margin-right: 0.6rem;
    }

    span {
      font-size: 0.9rem;
      font-weight: 200;
    }
  }
`;

const SidebarWrapper = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  height: 100vh;
  width: 240px;
  background: ${(props) => props.theme.grey};
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 1.5rem;
  transition: all 0.3s;
  z-index: 1000;

  .dropdown--arrow {
    margin-left: auto;
    width: 1rem;
    height: auto;
    margin-right: 1rem;
  }

  .dropdown--box {
    width: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 400;
    transition: all 0.2s ease;
    padding: 0.6rem 0 0.6rem 1.5rem;

    &:hover {
      background: ${(props) => props.theme.darkGrey};
      cursor: pointer;
    }

    span {
      padding-left: 1rem;
    }
  }

  .dropdown--open {
    opacity: 1;
    transform: scaleY(1);
    height: auto;
  }
  .dropdown--close {
    opacity: 0;
    transform: scaleY(0);
    height: 0;
  }

  &::-webkit-scrollbar {
    width: 0;
  }

  .icon {
    display: flex;
    align-items: center;
    padding: 0.6rem 0;
    padding-left: 1.5rem;
    margin-bottom: 0.4rem;
    font-weight: 400;
    font-size: 0.9rem;
    line-height: 1.2;

    .categoryIcon {
      width: 1.3rem;
      height: auto;
    }
  }

  .iconright {
    display: flex;
    align-items: center;
    padding-left: 40%;
  }

  .icon:not(.hover-disable):hover {
    background: ${(props) => props.theme.darkGrey};
    cursor: pointer;
  }

  .active div {
    background: ${(props) => props.theme.darkGrey};
    cursor: pointer;
  }

  .active svg {
    fill: #fff;
  }

  .icon span {
    padding-left: 1rem;
    position: relative;
    top: 1px;
  }

  .bottomBar {
    padding: 0.65rem 1.5rem;
    margin-bottom: 2.5rem;
    margin-top: 1rem;
    border-top: 0.1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.2s ease;

    .menu {
      margin: 0;
      padding: 0;
      line-height: 0;

      svg {
        height: 25px;
        width: 25px;
        cursor: pointer;
        fill: #fff;
        transition: all 0.2s ease;
      }

      &:hover {
        svg {
          fill: #cc0000;
          transform: translateY(-3px) scale(1.05);
        }
      }
    }

    .logout {
      display: flex;
      align-items: center;

      &:hover {
        svg {
          transform: translateY(-3px) scale(1.05);
          fill: #cc0000;
        }

        p {
          transform: translateY(-3px) scale(1.05);
          color: #cc0000;
        }
      }

      svg {
        width: 25px;
        height: 25px;
        cursor: pointer;
        fill: #fff;
        transition: all 0.2s ease;
      }

      p {
        font-size: 0.9rem;
        margin-left: 0.5rem;
        cursor: pointer;
        transition: all 0.2s ease;
        color: #fff;
      }
    }
  }

  .playList {
    display: flex;
    align-items: center;
    display: flex;
    align-items: center;
    padding: 0.6rem 0;
    padding-left: 1.5rem;
    margin-bottom: 0.4rem;
    font-weight: 400;
    font-size: 0.9rem;
    line-height: 1.2;
    transition: all 0.2s ease;
    position: relative;

    &--arrow {
      position: absolute;
      top: 50%;
      right: 1rem;
      transform: translateY(-50%);
      height: 1rem;
      width: auto;
    }

    &:hover {
      background: ${(props) => props.theme.darkGrey};
      cursor: pointer;
    }

    span {
      padding-left: 1rem;
    }
  }

  /* sidebar collapse */
  transform: translateX(-100%);
  ${(props) =>
    props.open &&
    css`
      transform: translateX(0);
    `}
`;

const Sidebar = ({
  open,
  user,
  closeSidebar,
  logoutUser,
  channels,
  playlists,
  getAllPlaylists,
  playlistsLoading,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openPlaylistMenu, setOpenPlaylistMenu] = useState(false);
  const [openUpgrade, setOpenUpgrade] = useState(false);
  const history = useHistory();
  // const { loading, data } = useFetch(
  //   `${config.REACT_APP_BACKEND_URL}videos/categories`
  // );
  const { data } = useFetch(
    `${config.REACT_APP_BACKEND_URL}videos/categories`
  );

  useEffect(() => {
    getAllPlaylists();
  }, [getAllPlaylists, open]);

  const {
    setNewCategoryRequestModel,
    setShowPlaylistModel,
    setPlaylistModelType,
  } = useContext(GlobalContext);

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const openUpgradeModal = () => {
    setOpenUpgrade(!openUpgrade);
    closeSidebar();
  };

  const redirectToLogin = () => {
    history.push("/login");
  };

  const redirectToAccount = () => {
    setOpenUpgrade(false);
    closeSidebar();
    history.push(`/channel/${user.username}/?tab=myaccount`);
  };

  return (
    <React.Fragment>
      <SidebarWrapper open={open}>
        <NavLink
          onClick={() => closeSidebar()}
          to="/"
          exact
          isActive={(match, location) => {
            if (location.pathname === "/home" || match) {
              return true;
            }
          }}
          activeClassName="active"
        >
          <div className="icon">
            <HomeHutIcon />
            <span>Home</span>
          </div>
        </NavLink>

        <NavLink
          onClick={() => closeSidebar()}
          to="/feed/trending"
          activeClassName="active"
        >
          <div className="icon">
            <TrendingCampfire />
            <span>Trending</span>
          </div>
        </NavLink>

        <NavLink
          onClick={() => closeSidebar()}
          to="/feed/subscriptions"
          activeClassName="active"
        >
          <div className="icon">
            <SubscriptionIconQuad />
            <span>Streams</span>
          </div>
        </NavLink>

        <NavLink
          onClick={() => closeSidebar()}
          to="/series"
          activeClassName="active"
        >
          <div className="icon">
            <SubscriptionIconQuad />
            <span>Series</span>
          </div>
        </NavLink>

        <div
          onClick={() => {
            setPlaylistModelType("create");
            setOpenPlaylistMenu(!openPlaylistMenu);
          }}
          className="playList"
        >
          <PlaylistIcon fill={"#AAAAAA"} height={28} width={28} />
          <span>Playlists</span>

          <img
            className="playList--arrow"
            src={openPlaylistMenu ? DropdownIconDown : DropdownIconRight}
            alt="arrow right"
          />
        </div>

        {openPlaylistMenu && (
          <DropdownPlaylist>
            <div
              className="item"
              onClick={() => {
                closeSidebar();
                setShowPlaylistModel(true);
              }}
            >
              <img
                className="item--icon"
                src={"/assets/icons/plus.svg"}
                alt="Create new playlist"
              />
              <span>Create New Playlist</span>
            </div>
            {playlists && playlists.length > 0 && (
              <>
                {playlists.map((item) => (
                  <Link
                    to={`/playlist/${item.id}`}
                    className="item"
                    onClick={() => closeSidebar()}
                    key={item.id}
                  >
                    <img
                      className="item--icon"
                      src={"/assets/icons/isutraBrand.png"}
                      alt="default icon"
                    />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </>
            )}
            {playlistsLoading && <span>Loading...</span>}
          </DropdownPlaylist>
        )}

        <div onClick={toggleDropdown} className="dropdown--box">
          <CategoriesIcon /> <span>Categories</span>
          <img
            className="dropdown--arrow"
            src={openDropdown ? DropdownIconDown : DropdownIconRight}
            alt="arrow right"
          />
        </div>

        {data.categories && data.categories.length && data.success && (
          <Dropdown
            className={openDropdown ? "dropdown--open" : "dropdown--close"}
          >
            {data.categories.map((cat, i) => (
              <NavLink
                key={i}
                onClick={() => closeSidebar()}
                to={`/categoryid/${cat.id}`}
                activeClassName="active"
              >
                <div className="icon">
                  <img
                    className="categoryIcon"
                    src={
                      cat.iconPath
                        ? cat.iconPath
                        : "/assets/icons/isutraBrand.png"
                    }
                    alt="default icon"
                  />
                  <span>{cat.name}</span>
                </div>
              </NavLink>
            ))}

            <div 
              onClick={() => {
                setNewCategoryRequestModel(true);
                closeSidebar();
              }}
            >
              <div className="icon">
                <img
                  className="categoryIcon"
                  src={"/assets/icons/categoryRequestIcon.svg"}
                  alt="default icon"
                />
                <span>Request New Category</span>
              </div>
            </div>
          </Dropdown>
        )}

        <div className="ruler"></div>

        <NavLink
          onClick={() => {
            user.userrole === 0 ? openUpgradeModal() : closeSidebar();
          }}
          // to={user.userrole !== 0 && "/feed/library"}
          to={"/feed/library"}
          activeClassName="active"
        >
          
          <div className="icon">
            <BookmarkLibrary />
            <span>Library</span>
            {user.userrole === 0 && (
              <div className="iconright">
                <LibIconPadLock />
              </div>
            )}
          </div>
        </NavLink>

        <NavLink
          onClick={() => closeSidebar()}
          to="/feed/history"
          activeClassName="active"
        >
          <div className="icon">
            <HistoryShell />
            <span>History</span>
          </div>
        </NavLink>
        {/* {user.userrole === 2 && (
        <NavLink
          onClick={() => closeSidebar()}
          to="/feed/history"
          activeClassName="active"
        >
          <div className="icon">
            <HistoryIcon />
            <span>History</span>
          </div>
        </NavLink>
      )} */}
        {user.userrole === 2 && (
          <NavLink
            onClick={() => closeSidebar()}
            to="/feed/my_videos"
            activeClassName="active"
          >
            <div className="icon">
              <YourVideoFilmStrip />
              <span>Your videos</span>
            </div>
          </NavLink>
        )}
        <NavLink
          onClick={() => closeSidebar()}
          to="/feed/liked_videos"
          activeClassName="active"
        >
          <div className="icon">
            <LikeIcon />
            <span>Liked videos</span>
          </div>
        </NavLink>

        {channels && channels.length > 0 && <div className="ruler"></div>}
        <Subscriptions />

        <div className="bottomBar">
          <div
            onClick={() => {
              disconnectSocket();
              logoutUser();
              redirectToLogin();
            }}
            className="logout"
          >
            <SignoutIcon />
            <p>Logout</p>
          </div>

          <div onClick={() => closeSidebar()} className="menu">
            <CloseIcon />
          </div>
        </div>
      </SidebarWrapper>
      {openUpgrade && (
        <UpgradeAccountModal
          closeModal={setOpenUpgrade}
          redirectToAccount={redirectToAccount}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  open: state.sidebar,
  user: state.user,
  channels: state.user.channels,
  playlists: state.getPlaylists.playlists,
  playlistsLoading: state.getPlaylists.loading,
});

export default connect(mapStateToProps, {
  closeSidebar,
  logoutUser,
  getAllPlaylists,
})(Sidebar);
