import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams, useLocation } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import EditProfile from "../components/EditProfile";
import ChannelTabVideo from "../components/ChannelTabVideo";
import ChannelTabAbout from "../components/ChannelTabAbout";
import ChannelTabChannels from "../components/ChannelTabChannels";
import ChannelTabMyAccount from "../components/ChannelTabMyAccount";
import ChannelTabHome from "../components/ChannelTabHome";
import ChannelTabSeries from "../components/ChannelTabSeries";
import NoResults from "../components/NoResults";
import avatar_placeholder from "../assets/avtar_placeholder.png";
import Slider from "react-slick";
import { getUserById } from "../actions/index";
import Button from "../styles/Button";
import {
  clearProfile,
  getProfile,
  subscribeChannel,
  unsubscribeChannel,
  clearNotFound,
  getNotificationCategories,
  getUserSettingByUserId,
  getMarketingBanners,
} from "../actions";
import {
  SUBSCRIBE_FROM_PROFILE,
  UNSUBSCRIBE_FROM_PROFILE,
} from "../actions/types";
import { ScrollToTop } from "../utils/index";
import Skeleton from "../skeletons/ChannelSkeleton";
import MarketingBanner from "../components/MarketingBanner/MarketingBanner";
import { useMediaQuery } from "react-responsive";

function MarketingBannerLayout(props) {
  const banners = useSelector((state) => state.marketingBanner);
  const dispatch = useDispatch();

  let filteredBanner = [];

  const tempFunc = useRef()
const newdataFunc = () =>{
  dispatch(getMarketingBanners());
}
tempFunc.current = newdataFunc
  useEffect(() => {
    tempFunc.current()
  }, []);

  if (banners.length > 0) {
    filteredBanner = banners.filter((banner) => banner.bannerLocation === 4);
  }

  return (
    <>
      <MarketingBanner banners={filteredBanner} />
      {props.children}
    </>
  );
}

// Slider Arrow
function Arrow(props) {
  let classNames = props.type === "next" ? `tabNextArrow` : `tabPrevArrow`;

  const Icon =
    props.type === "next" ? (
      <img src="/assets/utils/next.svg" alt="right" />
    ) : (
      <img src="/assets/utils/prev.svg" alt="left" />
    );

  return (
    <div className={classNames} onClick={props.onClick}>
      {Icon}
    </div>
  );
}

const activeTabStyle = {
  borderBottom: "2px solid white",
  color: "white",
};

const Wrapper = styled.div`
  background: ${(props) => props.theme.black};

  .avatar-container {
    padding: 0.5rem;
    width: 6rem;
    height: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 0.5rem;

    .avatar-image {
      height: 5rem;
      width: auto;
    }

    .png-img {
      width: 5rem !important;
      height: auto;
    }

    .custom-image {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
    }
  }

  .avatar-profile-name {
    font-family: komet, sans-serif;
    font-weight: 500;
    font-style: normal;
    font-size: 22px;
  }

  .cover {
    height: 240px;
  }

  .cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .header-tabs {
    padding: 1.2rem 1rem;
    background: ${(props) => props.theme.bg};
  }

  .header {
    width: 80%;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
  }

  .tabs,
  .tab {
    margin: 0 auto;
    margin-top: 1.5rem;
    width: 80%;
  }

  ul {
    list-style: none;
    display: flex;
    align-items: center;
  }

  li {
    margin-right: 2rem;
    text-transform: uppercase;
    letter-spacing: 1.1px;
  }

  li:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 860px) {
    .header,
    .tabs,
    .tab {
      width: 90%;
    }
  }

  @media screen and (max-width: 470px) {
    .header,
    .tabs {
      width: 100%;
    }
  }

  @media screen and (max-width: 414px) {
    .avatar-container {
      width: 5rem;
      height: 5rem;
    }

    .avatar-profile-name {
      font-size: 20px;
    }
  }

  @media screen and (max-width: 375px) {
    .avatar-container {
      width: 4rem;
      height: 4rem;
    }

    .avatar-profile-name {
      font-size: 18px;
    }
  }

  /* tabs responsive */
  @media screen and (max-width: 480px) {
    .tabs {
      .secondary {
        display: none;
      }
    }
  }

  /* mobile tabs slider styles */
  .slider-tabs {
    height: 100%;
    width: 100%;
    position: relative;

    .slider {
      height: 100%;
      width: 100%;

      .sliderItem {
        width: 100%;
        margin-right: 0.5rem;
        text-align: center;
      }

      li {
        list-style: none;
        padding: 0.5rem 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem;
        font-weight: 300;
        text-transform: uppercase;
        transition: all 0.2s ease;
      }

      .Active {
        border-bottom: 2px solid #fff;
        color: #fff;
      }
    }

    .tabNextArrow {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-60%);
      z-index: 2;
      transition: all 0.2s ease;
      height: 1.3rem;
      width: 1.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      padding: 0.1rem;

      img {
        height: 0.8rem;
        width: 0.8rem;
      }

      &:hover {
        background: ${(props) => props.theme.gradient};
      }
    }

    .tabPrevArrow {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      z-index: 2;
      transition: all 0.2s ease;
      height: 1.2rem;
      width: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;

      img {
        height: 0.8rem;
        width: 0.8rem;
      }

      &:hover {
        background: ${(props) => props.theme.gradient};
      }
    }

    @media screen and (max-width: 414px) {
      .slider {
        li {
          width: 5rem;
          font-size: 0.8rem;
        }
      }
    }
  }
`;

const Channel = ({
  isFetching,
  clearProfile,
  getProfile,
  profile,
  loggedInUserId,
  subscribeChannel,
  unsubscribeChannel,
  notfound,
  user,
  clearNotFound,
  getNotificationCategories,
  getUserById,
  getUserSettingByUserId,
  userById,
  history,
  updateUserSetting,
}) => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const { pathname } = useLocation();
  const query = useQuery();
  const { userIdOrUserName } = useParams();
  const isWarrior = profile.userrole === 2;
  const [isSubscribeVisible, setIsSubscribeVisible] = useState(
    user.userrole === 2 ? true : isWarrior
  );
  const [tab, setTab] = useState(isWarrior ? "VIDEOS" : "ABOUT");

  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });

  // slider settings
  const SETTINGS = {
    nextArrow: <Arrow type="next" />,
    prevArrow: <Arrow type="prev" />,
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    responsive: [
      {
        breakpoint: 376,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const tempFunc = useRef()
  const newFunc = () =>{
    if (pathname === "/feed/my_videos") {
      setTab("VIDEOS");
    } else if (query.get("tab") === "myaccount") {
      if (!user.id) history.push("/login");
      setTab("MY_ACCOUNT");
    } else if (localStorage.getItem("notif_settings") === "myaccount") {
      localStorage.setItem("notif_settings", "");
      setTab("MY_ACCOUNT");
    } else if (isWarrior) {
      setTab("HOME");
    } else {
      setTab("ABOUT");
    }
    setIsSubscribeVisible(user.userrole === 2 ? true : isWarrior);

  }
  tempFunc.current = newFunc

  useEffect(() => {
    tempFunc.current()
  }, [profile]);

  const tempFunction = useRef()
  const newFunction = () =>  {
    if (profile && profile.id) {
      getUserSettingByUserId(profile.id);
    }
  }
  tempFunction.current = newFunction
  useEffect(() => {
    tempFunction.current()
  }, [profile, updateUserSetting]);

  const tempdataFunction = useRef()
  const newdataFunction = () =>{
    getUserById(userIdOrUserName);
  }
  tempdataFunction.current = newdataFunction
  useEffect(() => {
    tempdataFunction.current()
  }, [history]);

  const tempNewdataFunction = useRef()
  const newdataFunc = () =>{
    getProfile(userIdOrUserName || loggedInUserId);
    if (user && (user.userrole || user.userrole === 0)) {
      getNotificationCategories(user.userrole);
    }
    return () => {
      clearProfile();
      clearNotFound();
    };
  }
  tempNewdataFunction.current = newdataFunc
  useEffect(() => {
    tempNewdataFunction.current()
  }, [
    user.avatar,
    userIdOrUserName,
    loggedInUserId,
    clearProfile,
    getProfile,
    clearNotFound,
    getNotificationCategories,
  ]);

  if (notfound) {
    return (
      <NoResults
        title="Page not found"
        text="The page you are looking for is not found or it may have been removed"
      />
    );
  }

  if (isFetching) {
    return <Skeleton />;
  }

  

  const badge = !profile.avatar ? profile.badge : profile.avatar;
  const isPngOrJpg = () => {
    const image = badge;
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

  if (isWarrior) {
    return (
      <>
        <ScrollToTop />
        <MarketingBannerLayout>
          {user && user.id && (
            <Wrapper editProfile={profile.isMe}>
              <div className="header-tabs">
                <div className="header">
                  <div className="flex-row">
                    <div className="avatar-container">{isPngOrJpg()}</div>
                    <div>
                      <h3 className="avatar-profile-name">
                        {profile.username}
                      </h3>
                    </div>
                  </div>

                  {profile.isMe && <EditProfile />}

                  {!profile.isMe && isSubscribeVisible && profile.isSubscribed && (
                    <Button
                      grey
                      onClick={() =>
                        unsubscribeChannel({
                          type: UNSUBSCRIBE_FROM_PROFILE,
                          channelId: profile.id,
                        })
                      }
                    >
                      Remove Stream
                    </Button>
                  )}

                  {!profile.isMe &&
                    isSubscribeVisible &&
                    profile.userrole === 2 &&
                    !profile.isSubscribed && (
                      <Button
                        onClick={() =>
                          subscribeChannel({
                            channel: {
                              id: profile.id,
                              avatar: profile.avatar,
                              username: profile.username,
                              visitorBadge: {
                                imgPath: profile.badge,
                              },
                            },
                            type: SUBSCRIBE_FROM_PROFILE,
                          })
                        }
                      >
                        Add to Streams
                      </Button>
                    )}
                </div>

                <div className="tabs">
                  <ul className="secondary">
                    {isWarrior && (
                      <li
                        style={tab === "HOME" ? activeTabStyle : {}}
                        onClick={() => setTab("HOME")}
                      >
                        Home
                      </li>
                    )}
                    {isWarrior && (
                      <li
                        style={tab === "VIDEOS" ? activeTabStyle : {}}
                        onClick={() => setTab("VIDEOS")}
                      >
                        Videos
                      </li>
                    )}
                    {isWarrior && (
                      <li
                        style={tab === "SERIES" ? activeTabStyle : {}}
                        onClick={() => setTab("SERIES")}
                      >
                        Series
                      </li>
                    )}
                    <li
                      style={tab === "CHANNELS" ? activeTabStyle : {}}
                      onClick={() => setTab("CHANNELS")}
                    >
                      Channels
                    </li>
                    <li
                      style={tab === "ABOUT" ? activeTabStyle : {}}
                      onClick={() => setTab("ABOUT")}
                    >
                      About
                    </li>
                    {profile.isMe && (
                      <li
                        style={tab === "MY_ACCOUNT" ? activeTabStyle : {}}
                        onClick={() => setTab("MY_ACCOUNT")}
                      >
                        Account
                      </li>
                    )}
                  </ul>
                </div>

                <div className="slider-tabs">
                  {isMobile && (
                    <Slider {...SETTINGS} className="slider">
                      <div
                        className="sliderItem"
                        onClick={() => setTab("HOME")}
                      >
                        <li className={`${tab === "HOME" ? "Active" : null}`}>
                          Home
                        </li>
                      </div>

                      <div
                        className={`sliderItem`}
                        onClick={() => setTab("VIDEOS")}
                      >
                        <li className={`${tab === "VIDEOS" ? "Active" : null}`}>
                          Videos
                        </li>
                      </div>

                      <div
                        className={`sliderItem`}
                        onClick={() => setTab("CHANNELS")}
                      >
                        <li
                          className={`${tab === "CHANNELS" ? "Active" : null}`}
                        >
                          Channels
                        </li>
                      </div>

                      <div
                        className={`sliderItem`}
                        onClick={() => setTab("SERIES")}
                      >
                        <li className={`${tab === "SERIES" ? "Active" : null}`}>
                          Series
                        </li>
                      </div>

                      <div
                        className={`sliderItem`}
                        onClick={() => setTab("ABOUT")}
                      >
                        <li className={`${tab === "ABOUT" ? "Active" : null}`}>
                          About
                        </li>
                      </div>

                      <div
                        className={`sliderItem`}
                        onClick={() => setTab("MY_ACCOUNT")}
                      >
                        <li
                          className={`${
                            tab === "MY_ACCOUNT" ? "Active" : null
                          }`}
                        >
                          Account
                        </li>
                      </div>
                    </Slider>
                  )}
                </div>
              </div>
              <div className="tab">
                {tab === "VIDEOS" && isWarrior && <ChannelTabVideo />}
                {tab === "ABOUT" && <ChannelTabAbout />}
                {tab === "CHANNELS" && <ChannelTabChannels />}
                {tab === "MY_ACCOUNT" && profile.isMe && (
                  <ChannelTabMyAccount />
                )}
                {tab === "SERIES" && <ChannelTabSeries />}
              </div>
            </Wrapper>
          )}
          {tab === "HOME" && isWarrior && (
            <ChannelTabHome
              userById={userById}
              visitorBadge={badge}
              profile={profile}
            />
          )}
        </MarketingBannerLayout>
      </>
    );
  } else {
    return (
      <>
        <ScrollToTop />
        {user && user.id && (
          <Wrapper editProfile={profile.isMe}>
            <div className="header-tabs">
              <div className="header">
                <div className="flex-row">
                  <div className="avatar-container">{isPngOrJpg()}</div>
                  <div>
                    <h3 className="avatar-profile-name">{profile.username}</h3>
                  </div>
                </div>

                {profile.isMe && <EditProfile />}

                {!profile.isMe && isSubscribeVisible && profile.isSubscribed && (
                  <Button
                    grey
                    onClick={() =>
                      unsubscribeChannel({
                        type: UNSUBSCRIBE_FROM_PROFILE,
                        channelId: profile.id,
                      })
                    }
                  >
                    Subscribed
                  </Button>
                )}

                {!profile.isMe &&
                  isSubscribeVisible &&
                  profile.userrole === 2 &&
                  !profile.isSubscribed && (
                    <Button
                      onClick={() =>
                        subscribeChannel({
                          channel: {
                            id: profile.id,
                            avatar: profile.avatar,
                            username: profile.username,
                          },
                          type: SUBSCRIBE_FROM_PROFILE,
                        })
                      }
                    >
                      Subscribe
                    </Button>
                  )}
              </div>

              <div className="tabs">
                <ul className="secondary">
                  {isWarrior && (
                    <li
                      style={tab === "HOME" ? activeTabStyle : {}}
                      onClick={() => setTab("HOME")}
                    >
                      Home
                    </li>
                  )}
                  {isWarrior && (
                    <li
                      style={tab === "VIDEOS" ? activeTabStyle : {}}
                      onClick={() => setTab("VIDEOS")}
                    >
                      Videos
                    </li>
                  )}
                  <li
                    style={tab === "CHANNELS" ? activeTabStyle : {}}
                    onClick={() => setTab("CHANNELS")}
                  >
                    Channels
                  </li>
                  <li
                    style={tab === "SERIES" ? activeTabStyle : {}}
                    onClick={() => setTab("SERIES")}
                  >
                    Series
                  </li>
                  <li
                    style={tab === "ABOUT" ? activeTabStyle : {}}
                    onClick={() => setTab("ABOUT")}
                  >
                    About
                  </li>
                  {profile.isMe && (
                    <li
                      style={tab === "MY_ACCOUNT" ? activeTabStyle : {}}
                      onClick={() => setTab("MY_ACCOUNT")}
                    >
                      Account
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="tab">
              {tab === "VIDEOS" && isWarrior && <ChannelTabVideo />}
              {tab === "ABOUT" && <ChannelTabAbout />}
              {tab === "CHANNELS" && <ChannelTabChannels />}
              {tab === "MY_ACCOUNT" && profile.isMe && <ChannelTabMyAccount />}
              {tab === "SERIES" && <ChannelTabSeries />}
            </div>
          </Wrapper>
        )}
        {tab === "HOME" && isWarrior && (
          <ChannelTabHome
            userById={userById}
            visitorBadge={badge}
            profile={profile}
          />
        )}
      </>
    );
  }
};

const mapStateToProps =
  (state) =>
  ({ notfound, profile, notification, userById, updateUserSetting }) => ({
    isFetching: profile.isFetching,
    profile,
    notfound,
    userById,
    user: state.user,
    updateUserSetting,
  });

export default connect(mapStateToProps, {
  clearProfile,
  getProfile,
  subscribeChannel,
  unsubscribeChannel,
  clearNotFound,
  getNotificationCategories,
  getUserSettingByUserId,
  getUserById,
})(Channel);
