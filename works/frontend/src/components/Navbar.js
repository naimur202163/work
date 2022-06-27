import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import UploadVideo from "./UploadVideo";
import NotificationBell from "./notificationBell";
import Search from "./Search";
import UploadFormModal from "./UploadComponent/UploadFormModal";
import { IsutraIcon, SearchIcon } from "./Icons";
import { openSidebar, closeSidebar, stripeOnboard } from "../actions";
import MobileSearch from "./MobileSearch";
import { toast } from "react-toastify";
import Burger from "@animated-burgers/burger-squeeze";
import "@animated-burgers/burger-squeeze/dist/styles.css";
import avatar_placeholder from "../assets/avtar_placeholder.png";
import { GlobalContext } from "../context/GlobalContext";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: ${(props) => props.theme.grey};
  z-index: 99;
  padding: 0.7rem 1.5rem;

  .categoriesModelToggler {
    margin-right: 1.5rem;

    img {
      height: 1.5rem;
      width: auto;
    }
  }

  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: ${(props) => props.theme.grey};
    z-index: 99;
    padding: 0.7rem 1.5rem;
    transition: all 0.2s ease;
  }

  .nav barClosed {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: ${(props) => props.theme.grey};
    z-index: 99;
    padding: 0.7rem 1.5rem;
    transition: all 0.2s ease;
    opacity: 0;
    transform: translateY(-100%);
  }

  .user-badge {
    display: flex;
    align-items: center;
    margin-left: 2.8rem;
    cursor: pointer;
    font-family: brother-1816, sans-serif;
    font-weight: 600;
    font-style: normal;
    transition: all 0.2s ease;
    transition-delay: 0.5s;
    position: relative;

    .upgrade-account {
      position: absolute;
      bottom: -0.5rem;
      right: 0.5rem;
      z-index: 2;
      font-size: 0.8rem;
      font-weight: 500;
      letter-spacing: 0.5px;
      color: #50affb;
    }

    &-move {
      margin-left: 0;
    }

    p {
      padding: 0 0.5rem;
      font-size: 1.5rem;
      display: block;
      text-transform: uppercase;
      background: -webkit-linear-gradient(#ff4883, #fdb769);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 0.02rem;
      text-shadow: 2px 2px 10px rgba(255, 255, 255, 0.3);
    }

    @media (max-width: 600px) {
      margin-left: 0.5rem;
      font-size: 1.2rem;
    }

    @media (max-width: 480px) {
      margin-left: 0.5rem;
      p {
        font-size: 1.2rem;
        letter-spacing: none;
        padding: 0rem;
      }
    }

    @media (max-width: 480px) {
      p {
        font-size: 0.9rem;
      }
    }
  }
  input {
    width: 500px;
  }
  .logo span {
    position: relative;
    top: 1px;
  }
  ul {
    list-style: none;
    display: flex;
    position: relative;
    top: 2px;
  }
  li svg {
    margin-right: 1.7rem;
    position: relative;
    top: 3px;
  }
  img {
    position: relative;
    top: 3px;
  }

  .avatar-box {
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    background-color: transparent;
    margin-top: -0.2rem;

    .avatar-image {
      height: 1.8rem;
      width: auto;
    }

    .png-img {
      height: 2.2rem;
      width: auto;
      margin-left: 6px;
    }

    .custom-image {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      margin-bottom: 7px;
    }

    @media screen and (max-width: 375px) {
      height: 1.8rem;
      width: 1.8rem;
    }
  }

  @media screen and (max-width: 1093px) {
    .toggle-navhandler {
      display: block;
    }
  }
  @media screen and (max-width: 1000px) {
    input {
      width: 400px;
    }
  }
  @media screen and (max-width: 850px) {
    input {
      width: 280px;
    }
  }
  @media screen and (min-width: 700px) {
    .search-icon {
      display: none;
    }
  }
  @media screen and (max-width: 500px) {
    li svg {
      width: 35px;
      height: 35px;
      margin-right: 1.7rem;
      position: relative;
      top: 0px;
    }
  }

  @media screen and (max-width: 480px) {
    ul {
      display: flex;
      align-items: center;
    }

    li {
      &:nth-child(1) {
        transform: translateY(1px);
      }
      &:nth-child(2) {
        transform: translateY(2px);
      }
      &:nth-child(3) {
        transform: translateY(2px);
      }
      &:nth-child(4) {
        transform: translateY(2px);
      }
    }

    li svg {
      height: 1.5rem;
      width: 1.5rem;
    }
  }

  @media screen and (max-width: 414px) {
    li svg {
      margin-right: 1rem;
    }

    .categoriesModelToggler {
      margin-right: 1rem;

      img {
        height: 1rem;
      }
    }
  }

  @media screen and (max-width: 375px) {
    li svg {
      height: 1rem;
      width: 1rem;
    }
  }
`;

const Navbar = ({
  logoutUser,
  user,
  open,
  openSidebar,
  closeSidebar,
  stripeOnboard,
}) => {
  const history = useHistory();
  const { uploadVideoModal, setUploadVideoModal } = useContext(GlobalContext);
  const [openModal, setOpenModal] = useState(false);
  // const { setHomeCategoryModel } = useContext(GlobalContext);

  const handleToggleSidebar = () => {
    setOpenModal(false);
    if (open) {
      closeSidebar();
    } else {
      openSidebar();
    }
  };

  const tempFunc = useRef();
  const newdataFunc = () => {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const connectCode = url.searchParams.get("code");

    if (url.href.indexOf("signup") !== -1 && connectCode && user.id) {
      history.push("/home");
      return;
    }
    if (connectCode) {
      onBoarding(connectCode);
    }
  };
  tempFunc.current = newdataFunc;
  useEffect(() => {
    tempFunc.current();
  }, []);

  const onBoarding = (connectCode) => {
    if (!connectCode) {
      return false;
    } else {
      const payload = {
        code: connectCode,
        id: user.id,
      };
      stripeOnboard(payload);
      toast.success("Account connected! You are ready to start earning!");
    }
  };

  const mobileSearch = false;
  const [showMobileSearch, setMobileSearch] = React.useState(mobileSearch);
  const handleSearch = () => {
    setOpenModal(false);
    setMobileSearch(!showMobileSearch);
  };

  const handleNav = () => {
    setOpenModal(false);
    if (showMobileSearch !== false) {
      setMobileSearch(!showMobileSearch);
    }
  }; // show search field in mobile screen

  // const redirectToHome = () => {
  //   setOpenModal(false);
  //   history.push("/home");
  // };

  const redirectToAccount = () => {
    if (user.userrole === 0) {
      return history.push(`/channel/${user.username}/?tab=myaccount`);
    }

    return history.push("/home");
  };

  const handleUploadVideoModal = (isOpen) => {
    setOpenModal(isOpen);
  };

  const isPngOrJpg = () => {
    const image = !user.avatar ? user.badge : user.avatar;

    if (image && (image.includes(".png") || image.includes(".svg"))) {
      return (
        <img
          className={`${image.includes(".png") ? "png-img" : "avatar-image"}`}
          src={image}
          alt="badge"
        />
      );
    } else {
      return (
        <img
          className="custom-image"
          src={image ? image : avatar_placeholder}
          alt="badge"
        />
      );
    }
  };

  return (
    <Wrapper className="mobile-nav" onMouseLeave={handleNav}>
      <MobileSearch
        hideSearchBox={handleNav}
        mobileSearchInput={setMobileSearch}
      />

      <div className={`${!showMobileSearch ? "navbar" : "navbarClosed"}`}>
        <div className="logo flex-row">
          <Burger
            isOpen={open}
            onClick={handleToggleSidebar}
            style={{ fontSize: "8.5px" }}
            className={`hamburger`}
          />

          <h1 onClick={redirectToAccount} className={`user-badge pointer`}>
            <IsutraIcon />
            <p>
              {user.userrole === 0
                ? "freeloader"
                : user.userrole === 1
                ? "tribe"
                : user.userrole === 2
                ? "warrior"
                : null}
            </p>

            {user.userrole === 0 && (
              <div className="upgrade-account">(upgrade)</div>
            )}
          </h1>
        </div>

        <Search />

        <ul>
          {uploadVideoModal && (
            <UploadFormModal setShowModal={setUploadVideoModal} />
          )}
          {/* display category model icon */}
          {/* <li>
            <Link 
              className="categoriesModelToggler"
              title="Open categories list"
              onClick={() => {
                setHomeCategoryModel(true);
                
              }}
            >
              <img
                src="/assets/icons/dialpad.svg"
                alt="Open categories model"
              />
            </Link>
          </li> */}
          {user.userrole === 2 && (
            <li>
              <UploadVideo
                className="toolTipNav"
                setShowModal={setUploadVideoModal}
              />
            </li>
          )}
          <li>
            <SearchIcon className="search-icon" onClick={handleSearch} />
          </li>
          <li>
            <NotificationBell openUploadVideoModal={handleUploadVideoModal} />
          </li>
          <li>
            {user && user.id && (
              <Link to={`/channel/${user.username}`}>
                <div className="avatar-box">{isPngOrJpg()}</div>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  open: state.sidebar,
  user: state.user,
});

export default connect(mapStateToProps, {
  openSidebar,
  closeSidebar,
  stripeOnboard,
})(Navbar);
