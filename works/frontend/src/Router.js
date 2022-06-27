import React, { useEffect, useState, useContext, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import BottomBar from "./components/BottomBar";
import Sidebar from "./components/Sidebar";
import { GlobalContext } from "./context/GlobalContext";
import Container from "./styles/Container";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Subscriptions from "./pages/Subscriptions";
import Channel from "./pages/Channel";
import WatchVideo from "./pages/WatchVideo";
import SearchResults from "./pages/SearchResults";
import Library from "./pages/Library";
import History from "./pages/History";
import YourVideos from "./pages/YourVideos";
import LikedVideos from "./pages/LikedVideos";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Category from "./pages/Category";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UpdateSubscription from "./pages/UpdateSubscription";
import { initiateSocket } from "./socket";
import { getNotificationData } from "./actions";
import HomeCategoryModel from "./components/HomeCategoryModel";
import CategoryRequestModel from "./components/CategoryRequestModel";
import Playlist from "./pages/Playlist";
import PlaylistModel from "./components/PlaylistModel";
import Series from "./pages/Series";
import SeriesDetails from "./pages/SeriesDetails";
import SeriesWatch from "./pages/SeriesWatch";
import CreateSeriesModel from "./components/SeriesComponents/CreateSeriesModel";
import AddMoreVideosModel from "./components/SeriesComponents/AddMoreVideosModel";
import NewHome from "./pages/NewHome";
import NewNavbar from "./components/NewHomeComponents/Navbar/Navbar";
import AttendClass from "./pages/AttendClasses";
import NewSidebar from "./components/NewHomeComponents/Sidebar/Sidebar";
import BackdropV2 from "./components/BackdropV2";
import ChatList from "./components/NewHomeComponents/ChatMessanger/ChatList";
import Message from "./components/NewHomeComponents/ChatMessanger/Message";
import Streams from "./pages/streams";
import LiveStream from "./pages/LiveStream";
import StreamPage from "./pages/StreamPage";
import ReviewStream from "./pages/ReviewStream";
import NewBottomBar from "./components/NewHomeComponents/BottomBar/BottomBar";
import MyAccount from "./pages/MyAccount";
import VideoClip from "./components/VideoClip";
import MyPortalPage from "./pages/MyPortalPage";
import CreateSeriesModelV2 from "./components/MyPortalComponents/Models/CreateSeriesModel";
import CreatePlaylistModel from "./components/MyPortalComponents/Models/CreatePlaylistModel";
import UploadMomentForm from "./components/UploadMomentComponents/UploadMomentForm";
import UploadClipForm from "./components/UploadClipComponent/UploadClipForm";
import ChatMessagerModal from "./components/NewHomeComponents/ChatMessanger/ChatMessagerModal";
import ChatDetailsModal from "./components/NewHomeComponents/ChatMessanger/ChatDetailModal";
import UserEditProfileModal from "./components/MyPortalComponents/UserEditProfileModal";

const AppRouter = () => {
  const {
    homeCategoryModel,
    setHomeCategoryModel,
    setNewCategoryRequestModel,
    setShowPlaylistModel,
    showPlaylistModel,
    playlistModelType,
    selectedVideoId,
    setSelectedVideoId,
    createCourseModel,
    setCreateCourseModel,
    addVideosToSeriesModel,
    setAddVideosToSeriesModel,
    selectedSeries,
    showSidebar,
    setShowSidebar,
    setShowMyAccount,
    setShowMyPortal,
    setShowUploadMomentModel,
    setShowUploadClipModel,
    showChatList,
    setShowChatList,
    showChatDetails,
    setShowChatDetails,
    showEditProfile,
    setShowEditProfile,
  } = useContext(GlobalContext);

  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const history = useHistory();
  const { token } = useSelector((state) => state.user);
  const sidebar = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  const urls = {
    updateSubscription: "/update_subscription/:userId",
    emailVerification: "/emailverification/:token",
    categoryById: "/categoryid/:id",
    watchVideo: "/watch/:videoId",
    channelByUserIdOrUserName: "/channel/:userIdOrUserName",
    search: "/results/:searchterm",
    trending: "/feed/trending",
    subscriptions: "/feed/subscriptions",
    library: "/feed/library",
    history: "/feed/history",
    myVideos: "/feed/my_videos",
    likeVideos: "/feed/liked_videos",
    home: "/home",
    oldHome: "/old-home",
    login: "/login",
    signup: "/signup",
    forgotPassword: "/forgot_password",
    resetPassword: "/resetPassword/:token",
    playlist: "/playlist/:playlistName",
    series: "/series",
    seriesDetails: "/series/details/:seriesId",
    seriesWatch: "/series/watch/:seriesId/:videoId",
    meeting: "/meeting",
    streams: "/streams",
    livestream: "/livestream",
    streampage: "/livestream/stream",
    chatlist: "/home/chatlist",
    message: "/home/message/:id",
    streams: "/streams",
    videoclip: "/videoclip",
  };

  const _loginAndWithoutLoginRoutes = [
    { path: urls.channelByUserIdOrUserName, component: Channel },
  ];

  const _protectedRoutes = [
    { path: urls.updateSubscription, component: UpdateSubscription },
    { path: urls.categoryById, component: Category },
    { path: urls.watchVideo, component: WatchVideo },
    { path: urls.search, component: SearchResults },
    { path: urls.trending, component: Trending },
    { path: urls.subscriptions, component: Subscriptions },
    { path: urls.library, component: Library },
    { path: urls.history, component: History },
    { path: urls.myVideos, component: YourVideos },
    { path: urls.likeVideos, component: LikedVideos },
    { path: urls.playlist, component: Playlist },
    { path: urls.series, component: Series },
    { path: urls.seriesDetails, component: SeriesDetails },
    { path: urls.seriesWatch, component: SeriesWatch },
    { path: urls.meeting, component: AttendClass },
    { path: urls.livestream, component: LiveStream },
    { path: urls.streampage, component: StreamPage },
    { path: urls.chatlist, component: ChatList },
    { path: urls.message, component: Message },
    { path: urls.videoclip, component: VideoClip },
    { path: urls.oldHome, component: Home },
    { path: urls.streams, component: Streams },
    { path: urls.home, component: NewHome },
    { path: "/", component: NewHome },
  ];

  const _routes = [
    { path: urls.login, component: Login },
    { path: urls.signup, component: Signup },
    { path: urls.forgotPassword, component: ForgotPassword },
    { path: urls.resetPassword, component: ResetPassword },
    { path: urls.emailVerification, component: VerifyEmail },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      setIsLoggedIn(true);
    } else {
      token ? setIsLoggedIn(true) : setIsLoggedIn(false);
    }
  }, [token]);
  const tempFunction = useRef();
  const newFunction = () => {
    if (isLoggedIn) {
      initiateSocket();
      dispatch(getNotificationData(5));
    }
  };
  tempFunction.current = newFunction;

  useEffect(() => {
    tempFunction.current();
  }, [isLoggedIn]);

  const afterLoginComponents = () => {
    const closeHandlerForCategoryModel = () => {
      setHomeCategoryModel(false);
    };

    return (
      <>
        {showPlaylistModel && (
          <PlaylistModel
            open={showPlaylistModel}
            closeHandler={() => {
              setShowPlaylistModel(false);
              setSelectedVideoId(null);
            }}
            type={playlistModelType}
            videoId={selectedVideoId}
          />
        )}

        {createCourseModel && (
          <CreateSeriesModel
            open={createCourseModel}
            closeHandler={() => {
              setCreateCourseModel(false);
            }}
          />
        )}

        {addVideosToSeriesModel && (
          <AddMoreVideosModel
            open={addVideosToSeriesModel}
            closeHandler={() => setAddVideosToSeriesModel(false)}
            seriesId={selectedSeries?.id}
          />
        )}

        {homeCategoryModel && (
          <HomeCategoryModel
            open={homeCategoryModel}
            closeHandler={closeHandlerForCategoryModel}
          />
        )}

        {history.location.pathname === "/old-home" ? (
          <>
            <Navbar />
            <Sidebar />
            <BottomBar />
          </>
        ) : (
          <>
            <MyAccount close={() => setShowMyAccount(false)} />
            <MyPortalPage close={() => setShowMyPortal(false)} />
            <UserEditProfileModal close={() => setShowEditProfile(false)} />
            <NewNavbar />
            <NewBottomBar />
            <ChatMessagerModal close={() => setShowChatList(false)} />
            <ChatDetailsModal close={() => setShowChatDetails(false)} />
            <NewSidebar close={() => setShowSidebar(false)} />
            <UploadMomentForm close={() => setShowUploadMomentModel(false)} />
            <UploadClipForm close={() => setShowUploadClipModel(false)} />
            <CategoryRequestModel
              close={() => setNewCategoryRequestModel(false)}
            />
            {showSidebar && (
              <>
                <BackdropV2 close={() => setShowSidebar(false)} />
              </>
            )}

            {/* create playlist & series model */}
            <CreatePlaylistModel />
            <CreateSeriesModelV2 />
          </>
        )}
      </>
    );
  };

  const protectedRoutes = () => {
    return (
      <Container style={{ marginLeft: sidebar ? "240px" : "0px" }}>
        <Switch>
          {[..._loginAndWithoutLoginRoutes, ..._protectedRoutes].map(
            (route, index) => (
              <Route
                key={`route-${route.path}-${index}`}
                path={route.path}
                component={route.component}
                exact={true}
              />
            )
          )}
        </Switch>
      </Container>
    );
  };

  const routes = () => {
    return (
      <Switch>
        {[..._loginAndWithoutLoginRoutes, ..._routes].map((route, index) => (
          <Route
            key={`route-${route.path}-${index}`}
            path={route.path}
            component={route.component}
          />
        ))}
      </Switch>
    );
  };

  const redirectUser = () => {
    if (typeof isLoggedIn === "boolean") {
      if (!isLoggedIn) {
        if (
          location.pathname.indexOf("/signup") !== -1 ||
          location.pathname.indexOf("/forgot_password") !== -1 ||
          location.pathname.indexOf("/resetPassword") !== -1 ||
          location.pathname.includes("/emailverification") ||
          location.pathname.indexOf("/channel") !== -1
        ) {
          return null;
        }
        return <Redirect to="/login" />;
      }
    }
  };

  return (
    <Router>
      {isLoggedIn ? afterLoginComponents() : null}
      {isLoggedIn ? protectedRoutes() : null}
      {!isLoggedIn ? routes() : null}
      {redirectUser()}
    </Router>
  );
};

export default AppRouter;

