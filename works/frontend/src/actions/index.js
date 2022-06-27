import {
  SIGNUP,
  LOGIN,
  LOGOUT,
  GET_FEED,
  GET_VIDEO,
  CLEAR_VIDEO,
  ADD_COMMENT,
  GET_PROFILE,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_NOTIFICATIONS_CATEGORIES,
  GET_NOTIFICATIONS,
  GET_NOTIFICATION_COMMENT_ID,
  SET_FETCHING,
  CLEAR_COMMENT_ID,
  NOTIFICATIONS_READ_COUNT,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  GET_RECOMMENDATIONS,
  GET_FEATURED,
  GET_CHANNEL_RECOMMENDATIONS,
  LIKE,
  DISLIKE,
  CANCEL_LIKE,
  CANCEL_DISLIKE,
  GET_SEARCH_RESULTS,
  CLEAR_SEARCH_RESULTS,
  GET_TRENDING,
  ADD_CHANNEL,
  REMOVE_CHANNEL,
  GET_LIKED_VIDEOS,
  UPDATE_USER,
  ADD_TO_LIKED_VIDEOS,
  REMOVE_FROM_LIKED_VIDEOS,
  ADD_TO_RECOMMENDATIONS,
  GET_HISTORY,
  SHOW_NOT_FOUND,
  CLEAR_NOT_FOUND,
  ADD_TO_HISTORY,
  UPDATE_VIDEO,
  DELETE_VIDEO,
  GET_VIDEO_CATEGORIES,
  GET_HASHTAGS,
  STRIPE_ONBOARD,
  ACCEPT_PAYMENT_SUCCESS,
  TRANSFERS_AMOUNT,
  CREATE_CUSTOMER,
  GET_VIDEO_ACCESS_OVERLAYS,
  GET_LATEST_VIDEOS,
  GET_STAFF_PICK,
  GET_VIDEOS_FEATURED,
  GET_VIDEOS_STAFF_PICK,
  GET_VIDEOS_BY_CATEGORY,
  INCREMENT_NOTIFICATION_COUNT,
  CLEAR_NOTIFICATIONS,
  GET_ALL_STORAGE,
  // GET_ALL_USER_SETTINGS,
  GET_USER_SETTING_BY_USERID,
  // GET_ALL_BADGES,
  LOGIN_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
  SIGNUP_EMAIL_EXIST,
  SIGNUP_USERNAME_EXIST,
  MORE_FROM_USER,
  GET_CATEGORY_BY_ID,
  GET_USER_BY_ID,
  GET_BADGES_BY_USERROLE,
  SET_EMAIL_EXISTS_FALSE,
  GET_SCHEDULE_FAIL,
  GET_SCHEDULE_REQUEST,
  GET_SCHEDULE_SUCCESS,
  UPDATE_SCHEDULE_FAIL,
  UPDATE_SCHEDULE_REQUEST,
  UPDATE_SCHEDULE_SUCCESS,
  DELETE_SCHEDULE_FAIL,
  DELETE_SCHEDULE_REQUEST,
  DELETE_SCHEDULE_SUCCESS,
  VISIT_STRIPE_CUSTOMER_PORTAL_REQUEST,
  VISIT_STRIPE_CUSTOMER_PORTAL_SUCCESS,
  GET_SINGLE_STORAGE,
  UPDATE_USER_SETTING,
  UPDATE_USER_SETTING_REQUEST,
  UNLOCK_WATCH_VIDEO,
  UNLOCK_FEATURED_VIDEO,
  UNLOCK_TRENDING_VIDEO,
  UNLOCK_LATEST_VIDEO,
  UNLOCK_STAFF_PICK_VIDEO,
  UNLOCK_CATEGORY_FEATURED_VIDEO,
  UNLOCK_CATEGORY_VIDEO,
  UNLOCK_CATEGORY_STAFF_PICK_VIDEO,
  UNLOCK_MORE_VIDEO,
  UNLOCK_LIKE_VIDEO,
  UNLOCK_SEARCH_VIDEO,
  UNLOCK_PROFILE_VIDEO,
  GET_USER_TRANSACTIONS,
  GET_USER_TRANSACTIONS_REQ,
  GET_USER_TRANSACTIONS_FAILED,
  GET_WARRIOR_SLIDER,
  GET_FEATURED_WARRIORS,
  SEND_CONTACT_US_EMAIL_FAILED,
  SEND_CONTACT_US_EMAIL_SUCCESS,
  SEND_CONTACT_US_EMAIL_REQ,
  RESET_CONTACT_US,
  GET_LIBRARY_VIDEOS,
  GET_MARKETING_BANNERS,
  UNLOCK_TAT_VIDEO,
  GET_KARMA_SENT_REQ,
  GET_KARMA_SENT_TRANSACTIONS,
  GET_KARMA_SENT_TRANSACTIONS_FAILED,
  REFERRAL_CODE_EXIST,
  CLEAR_MARKETING_BANNERS,

  // CHECK_EXPIRED_PW_RESET_TOKEN,
  PW_RESET_TOKEN_EXPIRED,
  CLEAR_RESET_PASSWORD_ERROR,
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  NEW_CATEGORY_FAIL,
  NEW_CONTENT_FLAG_FAIL,
  NEW_CONTENT_FLAG_REQUEST,
  NEW_CONTENT_FLAG_SUCCESS,
  GET_FLAG_TYPES_FAIL,
  GET_FLAG_TYPES_REQUEST,
  GET_FLAG_TYPES_SUCCESS,

  // playlist
  CREATE_NEW_PLAYLIST_SUCCESS,
  CREATE_NEW_PLAYLIST_FAIL,
  CREATE_NEW_PLAYLIST_REQUEST,
  GET_ALL_PLAYLIST_SUCCESS,
  GET_ALL_PLAYLIST_FAIL,
  GET_ALL_PLAYLIST_REQUEST,
  GET_SINGLE_PLAYLIST_SUCCESS,
  GET_SINGLE_PLAYLIST_FAIL,
  GET_SINGLE_PLAYLIST_REQUEST,
  DELETE_PLAYLIST_SUCCESS,
  DELETE_PLAYLIST_FAIL,
  DELETE_PLAYLIST_REQUEST,
  EDIT_PLAYLIST_SUCCESS,
  EDIT_PLAYLIST_FAIL,
  EDIT_PLAYLIST_REQUEST,
  ADD_VIDEO_TO_PLAYLIST_SUCCESS,
  ADD_VIDEO_TO_PLAYLIST_FAIL,
  ADD_VIDEO_TO_PLAYLIST_REQUEST,
  REMOVE_VIDEO_FROM_PLAYLIST_SUCCESS,
  REMOVE_VIDEO_FROM_PLAYLIST_FAIL,
  REMOVE_VIDEO_FROM_PLAYLIST_REQUEST,

  // series
  CREATE_NEW_SERIES_SUCCESS,
  CREATE_NEW_SERIES_FAIL,
  CREATE_NEW_SERIES_REQUEST,
  GET_ALL_SERIES_OF_USER_SUCCESS,
  GET_ALL_SERIES_OF_USER_FAIL,
  GET_ALL_SERIES_OF_USER_REQUEST,
  GET_SINGLE_SERIES_FAIL,
  GET_SINGLE_SERIES_REQUEST,
  GET_SINGLE_SERIES_SUCCESS,
  DELETE_SERIES_FAIL,
  DELETE_SERIES_REQUEST,
  DELETE_SERIES_SUCCESS,
  EDIT_SERIES_FAIL,
  EDIT_SERIES_REQUEST,
  EDIT_SERIES_SUCCESS,
  ADD_VIDEO_TO_SERIES_FAIL,
  ADD_VIDEO_TO_SERIES_REQUEST,
  ADD_VIDEO_TO_SERIES_SUCCESS,
  REMOVE_VIDEO_FROM_SERIES_FAIL,
  REMOVE_VIDEO_FROM_SERIES_REQUEST,
  REMOVE_VIDEO_FROM_SERIES_SUCCESS,
  DRAG_DROP_SERIES_VIDEOS,
  GET_ALL_SERIES_SUCCESS,
  GET_ALL_SERIES_FAIL,
  GET_ALL_SERIES_REQUEST,
  GET_ALL_PURCHASED_SERIES_REQUEST,
  GET_ALL_PURCHASED_SERIES_FAIL,
  GET_ALL_PURCHASED_SERIES_SUCCESS,
  GET_VIDEOS_SUCCESS,

  // schedule
  CREATE_SCHEDULE_SUCCESS,
  CREATE_SCHEDULE_FAIL,
  CREATE_SCHEDULE_REQUEST,
  GET_CATEGORY_BY_CLASS_ID,

  // connections
  SEND_CONNECTION_REQUEST,
  SEND_CONNECTION_SUCCESS,
  SEND_CONNECTION_FAIL,
  GET_CONNECTIONS_SUCCESS,
  GET_CONNECTIONS_FAIL,
  GET_CONNECTIONS_REQUEST,
  APPROVE_CONNECTION_FAIL,
  APPROVE_CONNECTION_REQUEST,
  APPROVE_CONNECTION_SUCCESS,
  DECLINE_CONNECTION_FAIL,
  DECLINE_CONNECTION_REQUEST,
  DECLINE_CONNECTION_SUCCESS,
  GET_FRIENDS_SUCCESS,
  GET_FRIENDS_FAIL,
  GET_FRIENDS_REQUEST,
  GET_CONNECTION_STATUS_REQUEST,
  GET_CONNECTION_STATUS_SUCCESS,
  GET_CONNECTION_STATUS_FAIL,
  REMOVE_CONNECTION_REQUEST,
  REMOVE_CONNECTION_SUCCESS,
  REMOVE_CONNECTION_FAIL,
  GET_KARMA_FILTER_SETTING_REQUEST,
  GET_KARMA_FILTER_SETTING_SUCCESS,
  GET_KARMA_FILTER_SETTING_FAILED,
  UPLOAD_MOMENT_SUCCESS,
  UPLOAD_MOMENT_REQUEST,
  UPLOAD_MOMENT_FAIL,
  UPDATE_MOMENT_FAIL,
  UPDATE_MOMENT_REQUEST,
  UPDATE_MOMENT_SUCCESS,
  DELETE_MOMENT_FAIL,
  DELETE_MOMENT_REQUEST,
  DELETE_MOMENT_SUCCESS,
  GET_SINGLE_MOMENT_FAIL,
  GET_SINGLE_MOMENT_REQUEST,
  GET_SINGLE_MOMENT_SUCCESS,
  GET_ALL_MOMENT_FAIL,
  GET_ALL_MOMENT_REQUEST,
  GET_ALL_MOMENT_SUCCESS,
  TAG_USER_IN_MOMENT_REQUEST,
  TAG_USER_IN_MOMENT_SUCCESS,
  TAG_USER_IN_MOMENT_FAIL,
  GET_TAGGED_USERS_OF_MOMENT_SUCCESS,
  GET_TAGGED_USERS_OF_MOMENT_REQUEST,
  GET_TAGGED_USERS_OF_MOMENT_FAIL,
} from "./types";
import { toast } from "react-toastify";
// import api, { setAuthHeader, axiosRequest } from "../services/api";
import api, { setAuthHeader } from "../services/api";
import {
  addChannelLocalSt,
  removeChannelLocalSt,
  authenticate,
  whoisme,
} from "../utils";
import config from "../config/config";
// import axios from "axios";
const creatUserSettings = async (payload) => {
  try {
    const { data } = await api.post(
      `${config.REACT_APP_BACKEND_URL}userSettings`,
      payload
    );

    if (data) {
      toast.success("Welcome to iSUTRA! Your signup was successful!");
      // window.location = "/";
    }
  } catch (e) { }
};

export const isEmailExist = (email) => async (dispatch) => {
  const res = await api.get(`auth/isEmailExist?email=${email}`);
  dispatch({ type: SIGNUP_EMAIL_EXIST, isEmailExist: res });
  return res;
};

export const isUserNameExist = (userName) => async (dispatch) => {
  const res = await api.get(`auth/isUserNameExist?userName=${userName}`);
  dispatch({ type: SIGNUP_USERNAME_EXIST, isEmailExist: res });
  return res;
};

export const isReferralCodeExist = (referralCode) => async (dispatch) => {
  const res = await api.get(
    `auth/isReferralCodeExist?referralCode=${referralCode}`
  );
  dispatch({ type: REFERRAL_CODE_EXIST, referralCode: res });
  return res;
};

export const signupUser =
  (payload, userSettingPayload, clearForm, history) => async (dispatch) => {
    const user = await authenticate("signup", payload);

    if (user && payload.code) {
      let refAmt = 0;
      if (user.userrole === 2) refAmt = 2.5;
      if (user.userrole === 1) refAmt = 2.5;
      if (user.userrole) {
        toast.success(
          `$${refAmt} of your Membership was just sent to ${payload.code}. Thank you so much! 🙏`
        );
      }
    }

    // create user settings here

    userSettingPayload.userId = user?.id;
    await creatUserSettings(userSettingPayload, history);
    // const { data } = await api.get(`userSettings/userId/${user.id}`);

    if (user) {
      userSettingPayload.userId = user.id;
      const { data } = await api.get(`userSettings/userId/${user.id}`);
      const badge = data.userSetting[0].VisitorBadge.imgPath;
      user["badge"] = badge;

      clearForm();
      dispatch({ type: SIGNUP, payload: user });
    }
    history.push("/");
  };

export const whoismeaction = () => async (dispatch) => {
  const user = await whoisme();

  if (user) {
    dispatch({ type: LOGIN, payload: user });
  }
};

export const loginUserErrorMsgRefresh = () => async (dispatch) => {
  dispatch({
    type: LOGIN_FAILED,
    payload: {
      isLogin: true,
    },
  });
};

export const loginUser = (payload) => async (dispatch) => {
  const user = await authenticate("login", payload);
  setAuthHeader();
  if (user) {
    dispatch({ type: LOGIN, payload: user });
  } else {
    toast.error("email/username or password invalid.");
    dispatch({
      type: LOGIN_FAILED,
      payload: {
        isLogin: false,
      },
    });
  }
  return user;
};
export const loginWithGoogle = (payload) => async (dispatch) => {
  const user = await authenticate("login/google", payload);
  setAuthHeader();
  if (user) {
    dispatch({ type: LOGIN, payload: user });
  } else {
    dispatch({
      type: LOGIN_FAILED,
      payload: {
        isLogin: false,
      },
    });
  }
  return user;
};

export const loginWithFacebook = (payload) => async (dispatch) => {
  const user = await authenticate("login/facebook", payload);
  setAuthHeader();
  if (user) {
    dispatch({ type: LOGIN, payload: user });
  } else {
    dispatch({
      type: LOGIN_FAILED,
      payload: {
        isLogin: false,
      },
    });
  }
  return user;
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("user");
  localStorage.removeItem("lastUserRole");
  dispatch({
    type: LOGOUT,
  });
};

export const getRecommendations = () => async (dispatch) => {
  const res = await api.get("videos");

  dispatch({
    type: GET_RECOMMENDATIONS,
    payload: {
      isFetching: false,
      videos: res.data.data,
    },
  });
};

export const getFeatured = () => async (dispatch) => {
  const res = await api.get("videos?featured=true");
  dispatch({
    type: GET_VIDEOS_SUCCESS,
    payload: res.data.data,
  });
};

export const getStaffPick = () => async (dispatch) => {
  const res = await api.get("videos/staffPick");
  const videos = res.data.data;

  dispatch({
    type: GET_STAFF_PICK,
    payload: {
      isFetching: false,
      videos,
      success: res.data.success,
    },
  });
};

export const getTrending = () => async (dispatch) => {
  const res = await api.get("videos");

  const videos = res.data.data;
  videos.sort((a, b) => b.views - a.views);

  dispatch({
    type: GET_TRENDING,
    payload: {
      isFetching: false,
      videos,
    },
  });
};

export const getLatest = () => async (dispatch) => {
  const res = await api.get("videos");

  const videos = res.data.data;
  videos.sort((a, b) => b.createdAt - a.createdAt);

  dispatch({
    type: GET_LATEST_VIDEOS,
    payload: {
      isFetching: false,
      videos,
    },
  });
};
export const getVideos = () => async (dispatch) => {
  // featured Videos
  await api
    .get("videos?featured=true")
    .then((res) => {
      dispatch({
        type: GET_FEATURED,
        payload: {
          featuredFetching: false,
          featuredVideos: res.data.data,
        },
      });
    })
    .then(async () => {
      //fetch trending
      await api.get("videos").then((res) => {
        const trendingVideos = res.data.data;
        trendingVideos.sort((a, b) => b.views - a.views);

        dispatch({
          type: GET_TRENDING,
          payload: {
            isFetching: false,
            videos: trendingVideos,
          },
        });
      });
    })
    .then(async () => {
      // fetch latest
      await api
        .get("videos")
        .then((res) => {
          const latestVideos = res.data.data;
          latestVideos.sort((a, b) => b.createdAt - a.createdAt);

          dispatch({
            type: GET_LATEST_VIDEOS,
            payload: {
              isFetching: false,
              videos: latestVideos,
            },
          });
        })
        .then(async () => {
          //staff picks
          await api.get("videos/staffPick").then((res) => {
            const videos = res.data.data;
            dispatch({
              type: GET_STAFF_PICK,
              payload: {
                isFetching: false,
                videos,
                success: res.data.success,
              },
            });
          });
        });
    })
    .catch((err) => { });
};

export const filterVideos = (categoryArray) => async (dispatch) => {
  await api
    .post("videos/filterVideos", {
      data: categoryArray,
    })
    .then((res) => {
      dispatch({
        type: GET_VIDEOS_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch((err) => { });
};

export const getTrendingVideos = () => async (dispatch) => {
  const res = await api.get("videos");

  const videos = res.data.data;
  videos.sort((a, b) => b.views - a.views);

  dispatch({
    type: GET_VIDEOS_SUCCESS,
    payload: res.data.data,
  });
};

export const getStaffPickVideos = () => async (dispatch) => {
  const res = await api.get("videos/staffPick");

  const videos = res.data.data;
  videos.sort((a, b) => b.views - a.views);

  dispatch({
    type: GET_VIDEOS_SUCCESS,
    payload: res.data.data,
  });
};

export const getFeaturedByCategory = (id) => async (dispatch) => {
  const res = await api.get(`videos/featured/${id}`);
  dispatch({
    type: GET_VIDEOS_FEATURED,
    payload: {
      isFetching: false,
      featuredVideos: res.data.data,
    },
  });
};

export const getStaffPickByCategory = (id) => async (dispatch) => {
  const res = await api.get(`videos/staffPick/${id}`);
  dispatch({
    type: GET_VIDEOS_STAFF_PICK,
    payload: {
      isFetching: false,
      staffPick: res.data.data,
    },
  });
};

export const getVideosByCategory = (id) => async (dispatch) => {
  const res = await api.get(`videos/getVideosByCategory/${id}`);
  dispatch({
    type: GET_VIDEOS_BY_CATEGORY,
    payload: {
      isFetching: false,
      videos: res.data.data,
    },
  });
};

export const getChannelRecommendations = (data) => async (dispatch) => {
  const res = await api.get("users", data);

  dispatch({
    type: GET_CHANNEL_RECOMMENDATIONS,
    payload: {
      isFetching: false,
      channels: res.data.data,
    },
  });
};

export const getFeed = () => async (dispatch) => {
  const res = await api.get("users/feed");

  dispatch({
    type: GET_FEED,
    payload: {
      isFetching: false,
      videos: res.data.data,
    },
  });
};

export const getVideo = (videoId) => async (dispatch) => {
  try {
    const res = await api.get(`videos/${videoId}`);

    dispatch({
      type: GET_VIDEO,
      payload: {
        isFetching: false,
        ...res.data.data,
      },
    });
  } catch (err) {
    dispatch({
      type: SHOW_NOT_FOUND,
    });
  }
};

export const clearVideo = () => ({ type: CLEAR_VIDEO });

export const addComment =
  ({ videoId, text, parentId }) =>
    async (dispatch) => {
      await api.post(`videos/${videoId}/comment`, {
        text: text ? text.trim() : "",
        parentId: parentId !== "" ? parentId : null,
      });
    };

export const addCommentToStore = (data) => (dispatch) => {
  return dispatch({
    type: ADD_COMMENT,
    payload: data,
  });
};

export const getProfile = (userId) => async (dispatch) => {
  try {
    setAuthHeader();
    const res = await api.get(`users/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: {
        isFetching: false,
        ...res.data.data,
      },
    });
  } catch (err) {
    if (err && err.response && err.response.status === 404) {
      dispatch({
        type: LOGOUT,
      });
    } else {
      dispatch({
        type: SHOW_NOT_FOUND,
      });
    }
  }
};

export const clearProfile = () => ({ type: CLEAR_PROFILE });

export const updateProfile = (data) => async (dispatch) => {
  dispatch({
    type: UPDATE_PROFILE,
    payload: data,
  });

  await api.put("users", data);
};

export const getNotificationCategories = (userRole) => async (dispatch) => {
  const res = await api.get(`notifications/categories/${userRole}`);
  dispatch({
    type: GET_NOTIFICATIONS_CATEGORIES,
    payload: {
      isFetching: false,
      notificationData: res.data.data,
    },
  });
};

export const updateNotificationStatus =
  ({ categoryId, data, profileState }) =>
    async (dispatch) => {
      dispatch({
        type: UPDATE_PROFILE,
        payload: profileState,
      });

      await api.put(`users/update-notification/${categoryId}`, data);
    };

export const getNotificationData = (limit) => async (dispatch) => {
  dispatch({
    type: SET_FETCHING,
  });

  const res = await api.get(`notifications?limit=${limit}`);

  dispatch({
    type: GET_NOTIFICATIONS,
    payload: {
      isFetching: false,
      ...res.data.data,
    },
  });
};

export const readNotification =
  ({ index, notificationId, data }) =>
    async (dispatch) => {
      dispatch({
        type: NOTIFICATIONS_READ_COUNT,
        payload: index,
      });
      await api.put(`notifications/mark-read/${notificationId}`, data);
    };

export const markAllReadNotification = (notification) => async (dispatch) => {
  try {
    notification.notifications.rows.forEach((element) => {
      if (!element.readstatus) {
        element.readstatus = true;
      }
    });
    notification["counter"] = 0;

    await api.get("notifications/mark-all-read");

    dispatch({
      type: GET_NOTIFICATIONS,
      payload: {
        isFetching: false,
        ...notification,
      },
    });
  } catch (err) { }
};

export const getNotificationCommentId = (index) => async (dispatch) => {
  dispatch({
    type: GET_NOTIFICATION_COMMENT_ID,
    payload: index,
  });
};

export const clearCommentId = () => async (dispatch) => {
  dispatch({
    type: CLEAR_COMMENT_ID,
  });
};

export const updateCoverPhoto = (data) => async (dispatch) => {
  const res = await api.put("users/editCoverPhoto", data);

  dispatch({
    type: UPDATE_PROFILE,
    payload: res.data.data,
  });
};

export const updateAvatar = (data) => async (dispatch) => {
  const res = await api.put("users/editAvatar", data);

  dispatch({
    type: UPDATE_PROFILE,
    payload: res.data.data,
  });
};

export const updateVideo = (videoId, data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_VIDEO,
      payload: data,
    });

    await api.put(`videos/${videoId}`, data);
  } catch (err) { }
};

export const deleteVideo = (videoId) => async (dispatch) => {
  try {
    console.log(videoId);
    const { data } = await api.delete(`videos/${videoId}`);

    dispatch({
      type: DELETE_VIDEO,
      payload: data,
    });
  } catch (err) { }
};

export const getSearchResults = (searchterm) => async (dispatch) => {
  const userRes = await api.get(`users/search?searchterm=${searchterm}`);
  const videoRes = await api.get(`videos/search?searchterm=${searchterm}`);

  dispatch({
    type: GET_SEARCH_RESULTS,
    payload: {
      isFetching: false,
      users: userRes.data.data,
      videos: videoRes.data.data,
    },
  });
};

export const clearSearchResults = () => ({ type: CLEAR_SEARCH_RESULTS });
export const subscribeChannel =
  ({ channel, type }) =>
    async (dispatch) => {
      dispatch({
        type,
        payload: channel,
      });

      addChannelLocalSt(channel);

      dispatch({
        type: ADD_CHANNEL,
        payload: channel,
      });

      await api.get(`users/${channel.id}/togglesubscribe`);
    };

export const unsubscribeChannel =
  ({ channelId, type }) =>
    async (dispatch) => {
      dispatch({
        type,
        payload: channelId,
      });

      removeChannelLocalSt(channelId);

      dispatch({
        type: REMOVE_CHANNEL,
        payload: channelId,
      });

      await api.get(`users/${channelId}/togglesubscribe`);
    };

export const likeVideo = (video) => async (dispatch) => {
  dispatch({
    type: LIKE,
  });

  dispatch({
    type: ADD_TO_LIKED_VIDEOS,
    payload: video,
  });

  await api.get(`videos/${video.id}/like`);
};

export const cancelLike = (videoId) => async (dispatch) => {
  dispatch({
    type: CANCEL_LIKE,
  });

  dispatch({
    type: REMOVE_FROM_LIKED_VIDEOS,
    payload: videoId,
  });

  await api.get(`videos/${videoId}/like`);
};

export const dislikeVideo = (videoId) => async (dispatch) => {
  dispatch({
    type: DISLIKE,
  });

  await api.get(`videos/${videoId}/dislike`);
};

export const cancelDislike = (videoId) => async (dispatch) => {
  dispatch({
    type: CANCEL_DISLIKE,
  });

  await api.get(`videos/${videoId}/dislike`);
};

export const getLikedVideos = () => async (dispatch) => {
  const res = await api.get("users/likedVideos");

  dispatch({
    type: GET_LIKED_VIDEOS,
    payload: {
      isFetching: false,
      videos: res.data.data,
    },
  });
};

export const updateUser = (data) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const updatedUser = { ...user, ...data };

  localStorage.setItem("user", JSON.stringify(updatedUser));

  dispatch({
    type: UPDATE_USER,
    payload: data,
  });
};

export const uploadVideo = (video) => async (dispatch) => {
  const res = await api.post("videos", video);
  const { id, avatar, username } = JSON.parse(localStorage.getItem("user"));
  const newVideo = res.data.data;
  newVideo.views = 0;
  newVideo.User = { id, avatar, username };
  dispatch({ type: ADD_TO_RECOMMENDATIONS, payload: newVideo });
};

export const getHistory = () => async (dispatch) => {
  const res = await api.get("users/history");

  dispatch({
    type: GET_HISTORY,
    payload: {
      isFetching: false,
      videos: res.data.data,
    },
  });
};

export const addToHistory = (video) => async (dispatch) => {
  dispatch({
    type: ADD_TO_HISTORY,
    payload: video,
  });

  await api.get(`videos/${video.id}/view`);
};

export const clearNotFound = () => ({ type: CLEAR_NOT_FOUND });
export const openSidebar = () => ({ type: OPEN_SIDEBAR });
export const closeSidebar = () => ({ type: CLOSE_SIDEBAR });

export const getVideoCategories = () => async (dispatch) => {
  const res = await api.get("videos/category");
  dispatch({
    type: GET_VIDEO_CATEGORIES,
    payload: {
      videoCategories: res.data.data,
    },
  });
};

export const getHashtags = () => async (dispatch) => {
  const res = await api.get("videos/hashtag");
  dispatch({
    type: GET_HASHTAGS,
    payload: {
      videoHashtags: res.data.data,
    },
  });
};

export const stripeOnboard = (payload) => async (dispatch) => {
  const res = await api.post(`stripe/stripeOnboarding`, { payload });

  if (res) {
    dispatch({
      type: STRIPE_ONBOARD,
      payload: res.data.data.payload,
    });
    window.location = "/";
  }
};

export const acceptPay = (payload) => async (dispatch) => {
  const res = await api.post(`stripe/secret`, { payload });

  dispatch({
    type: ACCEPT_PAYMENT_SUCCESS,
    payload: res.data.data,
  });
  return res;
};
export const transfers = (payload) => async (dispatch) => {
  const res = await api.post(`stripe/transfers`, { payload });

  dispatch({
    type: TRANSFERS_AMOUNT,
    payload: res.data.data.amount,
  });
};

export const seriesTransfers = (payload) => async (dispatch) => {
  const res = await api.post(`stripe/seriesTransfers`, { payload });

  dispatch({
    type: TRANSFERS_AMOUNT,
    payload: res.data.data.amount,
  });
};

export const createCustomer = (payload) => async (dispatch) => {
  const res = await api.post(`subscriptionPay`, { payload });

  dispatch({
    type: CREATE_CUSTOMER,
    payload: res,
  });
};

export const createLiveSchedule = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_SCHEDULE_REQUEST,
    })
    const res = await api.post(`liveClassSchedule`, payload);

    if (res.status == 200) toast.success('Live class schedule added successfully')
    dispatch({
      type: CREATE_SCHEDULE_SUCCESS,
      payload: res.data,
    })
    dispatch(getLiveScheduleByMonth(payload.month));
  } catch (error) {
    toast.error('failed to add schedule')
    dispatch({
      type: CREATE_SCHEDULE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const getLiveScheduleByMonth = (month) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SCHEDULE_REQUEST,
    })
    const res = await api.get(`liveClassSchedule/${month}`);

    if (res.status == 200) toast.success('Live class schedules fetched successfully')
    dispatch({
      type: GET_SCHEDULE_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: GET_SCHEDULE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const updateScheduleById = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_SCHEDULE_REQUEST,
    })
    const res = await api.patch(`liveClassSchedule/${id}`, data);

    if (res.status == 200) toast.success('Live class schedule updated successfully')
    dispatch({
      type: UPDATE_SCHEDULE_SUCCESS,
      payload: res.data,
    })
    dispatch(getLiveScheduleByMonth(data.month));
  } catch (error) {
    dispatch({
      type: UPDATE_SCHEDULE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const deleteScheduleById = (id, month) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_SCHEDULE_REQUEST,
    })
    const res = await api.delete(`liveClassSchedule/${id}`);

    if (res.status == 200) toast.success('Live class schedule deleted successfully')
    dispatch({
      type: DELETE_SCHEDULE_SUCCESS,
      payload: res.data,
    })
    dispatch(getLiveScheduleByMonth(month))
  } catch (error) {
    dispatch({
      type: DELETE_SCHEDULE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const getVideoAccessOverlays = () => async (dispatch) => {
  const res = await api.get("videos/videoAccessOverlays");
  dispatch({
    type: GET_VIDEO_ACCESS_OVERLAYS,
    payload: {
      videoAccessOverlays: res.data.data,
    },
  });
};

export const incrementNotificationCount = () => async (dispatch) => {
  dispatch({
    type: INCREMENT_NOTIFICATION_COUNT,
  });
};

export const clearNotifications = () => async (dispatch) => {
  dispatch({
    type: CLEAR_NOTIFICATIONS,
  });
};

export const getAllStorage = () => async (dispatch) => {
  const res = await api.get("storage/get-all");
  const storages = res.data.data;

  dispatch({
    type: GET_ALL_STORAGE,
    payload: {
      isFetching: false,
      storages,
    },
  });
};

export const getSingleStorage = (id) => async (dispatch) => {
  if (!id) {
    return null;
  }
  const res = await api.get(`storage/${id}`);
  const storage = res.data.storage;

  dispatch({
    type: GET_SINGLE_STORAGE,
    payload: storage,
  });
};

export const getUserSettingByUserId = (userId) => async (dispatch) => {
  const res = await api.get(`userSettings/userId/${userId}`);
  dispatch({
    type: GET_USER_SETTING_BY_USERID,
    payload: res.data.userSetting[0],
  });
};

export const updateUserSettingById = (id, data) => async (dispatch) => {
  dispatch({
    type: UPDATE_USER_SETTING_REQUEST,
  });

  const res = await api.patch(`userSettings/${id}`, data);
  dispatch({
    type: UPDATE_USER_SETTING,
    payload: res.data,
  });
};

export const moreFromUser = (id) => async (dispatch) => {
  const res = await api.get(`users/userVideos/${id}`);
  dispatch({
    type: MORE_FROM_USER,
    payload: res.data.data,
  });
};

export const verifyEmail = (email_verify_token) => async (dispatch) => {
  const user = await api.post("users/verifyEmail", { email_verify_token });
  if (user.data.success) {
    await localStorage.setItem("user", JSON.stringify(user.data.data));
    dispatch({
      type: UPDATE_USER,
      payload: user.data.data,
    });
  }
};

export const resetPasswordRequest = (email) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    const res = await api.post("users/forgot_password", { email });
    if (res.data.success) {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: {
          emailExists: true,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: RESET_PASSWORD_FAILED,
      payload: {
        error: "This Email does not exists",
      },
    });
  }
};

export const changePasswordRequest =
  (email, password, password_reset_token) => async (dispatch) => {
    try {
      dispatch({
        type: CHANGE_PASSWORD_REQUEST,
      });
      const res = await api.post("users/reset_password", {
        email,
        password,
        password_reset_token,
      });
      if (res.data.success) {
        dispatch({
          type: CHANGE_PASSWORD_SUCCESS,
          payload: {
            isPasswordChanged: true,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: CHANGE_PASSWORD_FAILED,
        payload: {
          error: "This Email does not exists",
        },
      });
    }
  };
export const getCategoryByID = (id) => async (dispatch) => {
  const res = await api.get(`videos/category/${id}`);
  dispatch({
    type: GET_CATEGORY_BY_ID,
    payload: res.data.category,
  });
};

export const getCategoryByClassId = (id) => async (dispatch) => {
  const res = await api.get(`liveClassSchedule/getCategoryById/${id}`)
  dispatch({
    type: GET_CATEGORY_BY_CLASS_ID,
    payload: res.data.videoSubCategories
  })
}

export const getUserById = (id) => async (dispatch) => {
  const res = await api.get(`users/${id}`);
  dispatch({
    type: GET_USER_BY_ID,
    payload: res.data.data,
  });
};

export const getBadgesByUserrole = (type) => async (dispatch) => {
  const res = await api.get(`badge/${type}`);
  dispatch({
    type: GET_BADGES_BY_USERROLE,
    payload: res.data.badges,
  });
};

export const setEmailExistsFalse = () => async (dispatch) => {
  dispatch({
    type: SET_EMAIL_EXISTS_FALSE,
  });
};
export const visitStripeCustomerPortal =
  (userId, stripe_customer_id) => async (dispatch) => {
    try {
      dispatch({
        type: VISIT_STRIPE_CUSTOMER_PORTAL_REQUEST,
      });
      const res = await api.post("stripe/customerPortal", {
        stripe_customer_id,
        userId,
      });
      if (res.status === 200) {
        dispatch({
          type: VISIT_STRIPE_CUSTOMER_PORTAL_SUCCESS,
          payload: {
            portal_url: res.data.data.url,
          },
        });
      }
    } catch (err) { }
  };

export const savePPVUnlockInformation = (payload) => async (dispatch) => {
  try {
    await api.post(`videos/savePPVUnlockInformation`, payload);
  } catch (err) { }
};

export const unlockWatchVideo = (videoId) => (dispatch) => {
  try {
    dispatch({
      type: UNLOCK_WATCH_VIDEO,
      payload: { videoId },
    });
  } catch (err) { }
};

export const saveTATVUnlockInfo = (payload) => async (dispatch) => {
  try {
    await api.post(`videos/saveTipAfterTwoInfo`, payload);
  } catch (err) { }
};

export const unlockTATVideo = (videoId) => (dispatch) => {
  try {
    dispatch({
      type: UNLOCK_TAT_VIDEO,
      payload: {
        videoId,
      },
    });
  } catch (err) { }
};

export const unlockFeaturedVideo = (videoId) => (dispatch) => {
  try {
    dispatch({
      type: UNLOCK_FEATURED_VIDEO,
      payload: { videoId },
    });
  } catch (err) { }
};

export const unlockCategoryFeaturedVideo = (videoId) => (dispatch) => {
  try {
    dispatch({
      type: UNLOCK_CATEGORY_FEATURED_VIDEO,
      payload: { videoId },
    });
  } catch (err) { }
};

export const unlockTrendingVideo = (videoId) => (dispatch) => {
  try {
    dispatch({
      type: UNLOCK_TRENDING_VIDEO,
      payload: { videoId },
    });
  } catch (err) { }
};

export const unlockLatestVideo = (videoId) => (dispatch) => {
  try {
    dispatch({
      type: UNLOCK_LATEST_VIDEO,
      payload: { videoId },
    });
  } catch (err) { }
};

export const unlockStaffPickVideo = (videoId) => (dispatch) => {
  try {
    dispatch({
      type: UNLOCK_STAFF_PICK_VIDEO,
      payload: { videoId },
    });
  } catch (err) { }
};

export const unlockCategoryVideo = (videoId) => (dispatch) => {
  try {
    dispatch({
      type: UNLOCK_CATEGORY_VIDEO,
      payload: { videoId },
    });
  } catch (err) { }
};

export const unlockCategoryStaffPickVideo = (videoId) => (dispatch) => {
  try {
    dispatch({
      type: UNLOCK_CATEGORY_STAFF_PICK_VIDEO,
      payload: { videoId },
    });
  } catch (err) { }
};

export const unlockMoreVideo = (videoId) => (dispatch) => {
  try {
    dispatch({
      type: UNLOCK_MORE_VIDEO,
      payload: { videoId },
    });
  } catch (err) { }
};

export const unlockLikeVideo = (videoId) => (dispatch) => {
  try {
    dispatch({
      type: UNLOCK_LIKE_VIDEO,
      payload: { videoId },
    });
  } catch (err) { }
};

export const unlockSearchVideo = (videoId) => (dispatch) => {
  try {
    dispatch({
      type: UNLOCK_SEARCH_VIDEO,
      payload: { videoId },
    });
  } catch (err) { }
};

export const unlockProfileVideo = (videoId) => (dispatch) => {
  try {
    dispatch({
      type: UNLOCK_PROFILE_VIDEO,
      payload: { videoId },
    });
  } catch (err) { }
};

export const getUserTransactions =
  (userId, starting_after, rowsPerPage) => async (dispatch) => {
    try {
      dispatch({
        type: GET_USER_TRANSACTIONS_REQ,
      });
      const res = await api.post(`users/userTransactions`, {
        userId: userId,
        starting_after: starting_after,
        limit: rowsPerPage,
      });
      dispatch({
        type: GET_USER_TRANSACTIONS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_USER_TRANSACTIONS_FAILED,
      });
    }
  };

export const getKarmaSentByUserTransactions =
  (userId, starting_after) => async (dispatch) => {
    try {
      dispatch({
        type: GET_KARMA_SENT_REQ,
      });
      const res = await api.post(`users/karmaSentByUser`, {
        userId: userId,
        starting_after: starting_after,
      });
      dispatch({
        type: GET_KARMA_SENT_TRANSACTIONS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_KARMA_SENT_TRANSACTIONS_FAILED,
      });
    }
  };

export const getWarriorSlider = () => async (dispatch) => {
  const res = await api.get(`users/warrior_banner`);

  dispatch({
    type: GET_WARRIOR_SLIDER,
    payload: res.data.data,
  });
};

export const getMarketingBanners = () => async (dispatch) => {
  const res = await api.get(`users/marketing_banner`);

  dispatch({
    type: GET_MARKETING_BANNERS,
    payload: res.data.data,
  });
};

export const getFeaturedWarriors = () => async (dispatch) => {
  const res = await api.get(`users/featured_warrior`);

  dispatch({
    type: GET_FEATURED_WARRIORS,
    payload: res.data.data,
  });
};

export const contactIsutra =
  (Name, Email, Subject, Message) => async (dispatch) => {
    try {
      dispatch({
        type: SEND_CONTACT_US_EMAIL_REQ,
      });
      let url = config.REACT_APP_BACKEND_URL + "users/contact_us";
      let res = await api.post(url, {
        name: Name,
        email: Email,
        subject: Subject,
        message: Message,
      });
      if (res.status === 200) {
        dispatch({
          type: SEND_CONTACT_US_EMAIL_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: SEND_CONTACT_US_EMAIL_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: SEND_CONTACT_US_EMAIL_FAILED,
      });
    }
  };

export const resetContactUs = () => (dispatch) => {
  dispatch({
    type: RESET_CONTACT_US,
  });
};

export const getLibraryVideos = (userId, offset) => async (dispatch) => {
  const res = await api.get("users/libraryVideos", {
    params: {
      userId,
      offset,
    },
  });
  dispatch({
    type: GET_LIBRARY_VIDEOS,
    payload: {
      isFetching: false,
      videos: res.data.videos,
      hasMore: res.data.hasMore,
    },
  });
};

export const saveTipAfterTwoInfo = (payload) => async (dispatch) => {
  try {
    await api.post(`videos/saveTipAfterTwoInfo`, payload);
  } catch (err) { }
};
export const deleteUser = (currentLoggedInUser) => async (dispatch) => {
  const userId = currentLoggedInUser.id;
  try {
    let url = config.REACT_APP_BACKEND_URL + "users/delete_user";
    let res = await api.post(url, {
      user_id: userId,
    });
    if (res.status === 200) {
      toast.success("Account deleted successfully");
      dispatch(logoutUser());
    }
  } catch (e) { }
};
export const clearMarketingBanner = () => ({ type: CLEAR_MARKETING_BANNERS });
export const checkPWResetTokenExpiry = (pwResetToken) => async (dispatch) => {
  api
    .post(`users/checkResetPWTokenExpiry`, {
      reset_pw_token: pwResetToken,
    })
    .then((res) => { })
    .catch((err) => {
      toast.error(err.response.data);
      dispatch({
        type: PW_RESET_TOKEN_EXPIRED,
        payload: err.response.data,
      });
    });
};

export const clearResetPasswordError = () => (dispatch) => {
  dispatch({
    type: CLEAR_RESET_PASSWORD_ERROR,
  });
};

export const newCategoryRequestAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_CATEGORY_REQUEST,
    });

    const res = await api.post("users/newCategoryRequest", data);

    dispatch({
      type: NEW_CATEGORY_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NEW_CATEGORY_FAIL,
      payload: "Internal server error occurred!",
    });
  }
};

export const videoReportAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_CONTENT_FLAG_REQUEST,
    });

    const res = await api.post("users/videoReportByUser", data);

    dispatch({
      type: NEW_CONTENT_FLAG_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: NEW_CONTENT_FLAG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getFlagTypesAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GET_FLAG_TYPES_REQUEST,
    });

    const res = await api.get("users/getFlagTypes", data);

    dispatch({
      type: GET_FLAG_TYPES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_FLAG_TYPES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// playlist work
export const createNewPlaylist = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_NEW_PLAYLIST_REQUEST,
    });

    const res = await api.post("playlist", data);

    dispatch({
      type: CREATE_NEW_PLAYLIST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_NEW_PLAYLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllPlaylists = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_PLAYLIST_REQUEST,
    });

    const res = await api.get("playlist");

    dispatch({
      type: GET_ALL_PLAYLIST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PLAYLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSinglePlaylist =
  (id, sortDate, sortPopularity) => async (dispatch) => {
    try {
      dispatch({
        type: GET_SINGLE_PLAYLIST_REQUEST,
      });

      const res = await api.get(
        `playlist/${id}?sort=${sortDate}&popularity=${sortPopularity}`
      );

      dispatch({
        type: GET_SINGLE_PLAYLIST_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_PLAYLIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deletePlaylistById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PLAYLIST_REQUEST,
    });

    const res = await api.delete(`playlist/${id}`);

    dispatch({
      type: DELETE_PLAYLIST_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PLAYLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editPlaylistById = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_PLAYLIST_REQUEST,
    });

    const res = await api.patch(`playlist/${id}`, data);

    dispatch({
      type: EDIT_PLAYLIST_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: EDIT_PLAYLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addVideoToPlaylist = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_VIDEO_TO_PLAYLIST_REQUEST,
    });

    const res = await api.post(`playlist/${id}/addVideo`, data);

    dispatch({
      type: ADD_VIDEO_TO_PLAYLIST_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: ADD_VIDEO_TO_PLAYLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeVideoFromPlaylist = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_VIDEO_FROM_PLAYLIST_REQUEST,
    });

    const res = await api.post(`playlist/${id}/removeVideo`, data);

    dispatch({
      type: REMOVE_VIDEO_FROM_PLAYLIST_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    console.log(error, "sjkljl");
    dispatch({
      type: REMOVE_VIDEO_FROM_PLAYLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// series work
export const createNewSeries = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_NEW_SERIES_REQUEST,
    });

    const res = await api.post("series", data);

    dispatch({
      type: CREATE_NEW_SERIES_SUCCESS,
      payload: res.data.result,
    });
  } catch (error) {
    dispatch({
      type: CREATE_NEW_SERIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllSeriesOfUser = (username) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_SERIES_OF_USER_REQUEST,
    });

    const res = await api.get(`series/getUserSeries/${username}`);

    dispatch({
      type: GET_ALL_SERIES_OF_USER_SUCCESS,
      payload: res.data.series,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_SERIES_OF_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSingleSeries = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_SERIES_REQUEST,
    });

    const res = await api.get(`series/${id}`);

    dispatch({
      type: GET_SINGLE_SERIES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_SERIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSeriesById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_SERIES_REQUEST,
    });

    const res = await api.delete(`series/${id}`);

    dispatch({
      type: DELETE_SERIES_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SERIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editSeriesById = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_SERIES_REQUEST,
    });

    const res = await api.patch(`series/${id}`, data);

    dispatch({
      type: EDIT_SERIES_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: EDIT_SERIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addVideoToSeries = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_VIDEO_TO_SERIES_REQUEST,
    });

    const res = await api.post(`series/${id}/addVideo`, data);

    dispatch({
      type: ADD_VIDEO_TO_SERIES_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: ADD_VIDEO_TO_SERIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeVideoFromSeries = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_VIDEO_FROM_SERIES_REQUEST,
    });

    const res = await api.post(`series/${id}/removeVideo`, data);

    dispatch({
      type: REMOVE_VIDEO_FROM_SERIES_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_VIDEO_FROM_SERIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const dragDropSeriesVideos = (id, data) => async (dispatch) => {
  const res = await api.post(`series/${id}/dragDrop`, data);

  dispatch({
    type: DRAG_DROP_SERIES_VIDEOS,
    payload: res.data.message,
  });
};

export const getAllSeries = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_SERIES_REQUEST,
    });

    const res = await api.get("series/get-series");

    dispatch({
      type: GET_ALL_SERIES_SUCCESS,
      payload: res.data.series,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_SERIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllPurchasedSeries = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_PURCHASED_SERIES_REQUEST,
    });

    const res = await api.get("series/purchasedSeries");

    dispatch({
      type: GET_ALL_PURCHASED_SERIES_SUCCESS,
      payload: res.data.allSeries,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PURCHASED_SERIES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSeriesProgress = (seriesId) => async (dispatch) => {
  try {
    await api.post(`series/seriesProgress/${seriesId}`);
  } catch (err) { }
};

export const updateSeriesProgress = (seriesId, videoId) => async (dispatch) => {
  try {
    await api.patch(`series/seriesProgress/${seriesId}/${videoId}`);
  } catch (err) { }
};

export const sendConnectionRequest = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SEND_CONNECTION_REQUEST,
    });

    const res = await api.post("connection", data);

    dispatch({
      type: SEND_CONNECTION_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: SEND_CONNECTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllConnectionRequests = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_CONNECTIONS_REQUEST,
    });

    const res = await api.get("connection");

    dispatch({
      type: GET_CONNECTIONS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_CONNECTIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const approveConnectionRequest = (data) => async (dispatch) => {
  try {
    dispatch({
      type: APPROVE_CONNECTION_REQUEST,
    });

    const res = await api.post("connection/approved", data);

    dispatch({
      type: APPROVE_CONNECTION_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: APPROVE_CONNECTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const declineConnectionRequest = (data) => async (dispatch) => {
  try {
    dispatch({
      type: DECLINE_CONNECTION_REQUEST,
    });

    const res = await api.post("connection/declined", data);

    dispatch({
      type: DECLINE_CONNECTION_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: DECLINE_CONNECTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllFriends = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_FRIENDS_REQUEST,
    });

    const res = await api.get("connection/friends");

    dispatch({
      type: GET_FRIENDS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_CONNECTIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getConnectionStatus = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CONNECTION_STATUS_REQUEST,
    });

    const res = await api.post("connection/status", data);

    dispatch({
      type: GET_CONNECTION_STATUS_SUCCESS,
      payload: res.data.buttonText,
    });
  } catch (error) {
    dispatch({
      type: GET_CONNECTION_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeConnection = (data) => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_CONNECTION_REQUEST,
    });

    const res = await api.post("connection/remove", data);

    dispatch({
      type: REMOVE_CONNECTION_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_CONNECTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addOrEditKarmaSetting = (filters) => async (dispatch) => {
  try {
    dispatch({
      type: GET_KARMA_FILTER_SETTING_REQUEST,
    });
    const res = await api.post("users/createOrEditKarmaFilterSetting", filters);
    dispatch({
      type: GET_KARMA_FILTER_SETTING_SUCCESS,
      payload: res.data,
    });

    toast.success("Karma filter settings updated successfully");
  } catch (err) {}
};

export const getKarmaFilterSetting = (filterType) => async (dispatch) => {
  try {
    dispatch({
      type: GET_KARMA_FILTER_SETTING_REQUEST,
    });
    const res = await api.get(
      `users/getKarmaFilterSettingByUserId/${filterType}`
    );
    dispatch({
      type: GET_KARMA_FILTER_SETTING_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_KARMA_FILTER_SETTING_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const uploadMoment = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPLOAD_MOMENT_REQUEST,
    });

    const res = await api.post("moment", data);

    dispatch({
      type: UPLOAD_MOMENT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_MOMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateMoment = (momentId, data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_MOMENT_REQUEST,
    });

    const res = await api.patch(`moment/${momentId}`, data);

    dispatch({
      type: UPDATE_MOMENT_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_MOMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteMoment = (momentId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_MOMENT_REQUEST,
    });

    const res = await api.delete(`moment/${momentId}`);

    dispatch({
      type: DELETE_MOMENT_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_MOMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSingleMoment = (momentId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_MOMENT_REQUEST,
    });

    const res = await api.get(`moment/${momentId}`);

    dispatch({
      type: GET_SINGLE_MOMENT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_MOMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllMoments = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_MOMENT_REQUEST,
    });

    const res = await api.get(`moment`);

    dispatch({
      type: GET_ALL_MOMENT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_MOMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const tagUserInMoment = (momentId, tagUserId) => async (dispatch) => {
  try {
    dispatch({
      type: TAG_USER_IN_MOMENT_REQUEST,
    });

    const res = await api.put(`moment/${momentId}/tagUser`, {
      tagUser: tagUserId,
    });

    dispatch({
      type: TAG_USER_IN_MOMENT_SUCCESS,
      payload: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: TAG_USER_IN_MOMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTaggedUsersInMoment = (momentId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_TAGGED_USERS_OF_MOMENT_REQUEST,
    });

    const res = await api.get(`moment/${momentId}/tagUsers`);

    dispatch({
      type: GET_TAGGED_USERS_OF_MOMENT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_TAGGED_USERS_OF_MOMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
