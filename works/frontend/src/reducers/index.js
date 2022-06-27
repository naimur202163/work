import { combineReducers } from "redux";
import user from "./user";
import feed from "./feed";
import video from "./video";
import profile from "./profile";
import sidebar from "./sidebar";
import recommendation from "./recommendation";
import channelRecommendation from "./channelRecommendation";
import searchResult from "./searchResult";
import trending from "./trending";
import likedVideo from "./likedVideo";
import latest from "./latest";
import staffPick from "./staffPick";
import categoryFeatured from "./categoryFeatured";
import categoryStaffpick from "./categoryStaffpick";
import categoryVideos from "./categoryVideos";
import storage from "./storage";
import history from "./history";
import userById from "./userByID";
import moreFromUser from "./moreFromUser";
import notfound from "./notfound";
import stripePayment from "./stripePayment";
import transfers from "./transfers";
import notificationCategory from "./notificationCategory";
import notification from "./notification";
import featured from "./recommendationFeatured";
import { LOGOUT } from "../actions/types";
import singleStorage from "./singleStorage";
import badgesUserrole from "./badgesUserrole";
import resetPW from "./resetPW";
import categoryById from "./categoryById";
import customer_portal from "./customerPortal";
import userSettingByUserId from "./userSettingByUserId";
import updateUserSetting from "./updateUserSetting";
import userTransactions from "./userTransactions";
import slider from "./slider";
import featuredWarriors from "./featuredWarriors";
import contactUs from "./contactUs";
import library from "./library";
import marketingBanner from "./marketingBanner";
import newCategoryRequest from "./newCategoryRequest";
import contentFlag from "./contentFlag";
import getFlagTypes from "./getFlagTypes";
import createPlaylist from "./createPlaylist";
import getPlaylists from "./getPlaylists";
import singlePlaylist from "./singlePlaylist";
import deletePlaylist from "./deletePlaylist";
import editPlaylist from "./editPlaylist";
import addVideoToPlaylist from "./addVideoToPlaylist";
import removeVideoFromPlaylist from "./removeVideoFromPlaylist";
import createSeries from "./createSeries";
import getAllSeries from "./getAllSeries";
import singleSeries from "./singleSeries";
import deleteSeries from "./deleteSeries";
import editSeries from "./editSeries";
import addVideoToSeries from "./addVideoToSeries";
import removeVideoFromSeries from "./removeVideoFromSeries";
import dragDropSeriesVideos from "./dragDropSeriesVideos";
import getAllSeriesOfUser from "./getAllSeriesOfUser";
import getPurchasedSeries from "./getPurchasedSeries";
import videos from "./videos";
import createLiveSchedule from "./createLiveSchedule";
import getLiveSchedule from "./getLiveSchedule";
import connection from "./connection";
import connectionStatus from "./connectionStatus";
import moment from "./moment";
import moments from "./moments";
import momentTag from "./momentTag";
import getMomentTags from "./getMomentTags";
import liveClassCategory from "./liveClassCategory";

const rootReducer = combineReducers({
  user,
  feed,
  video,
  profile,
  sidebar,
  recommendation,
  featured,
  channelRecommendation,
  searchResult,
  trending,
  latest,
  storage,
  staffPick,
  categoryFeatured,
  categoryStaffpick,
  categoryVideos,
  likedVideo,
  history,
  notfound,
  moreVideos: moreFromUser,
  userById,
  stripePayment,
  transfers,
  singleStorage,
  categoryById,
  notificationCategory,
  notification,
  badgesUserrole,
  resetPW,
  customer_portal,
  userSettingByUserId,
  updateUserSetting,
  userTransactions,
  slider,
  featuredWarriors,
  contactUs,
  library,
  marketingBanner,
  newCategoryRequest,
  contentFlag,
  getFlagTypes,
  createPlaylist,
  getPlaylists,
  liveClassCategory,
  singlePlaylist,
  deletePlaylist,
  editPlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  createSeries,
  getAllSeries,
  singleSeries,
  deleteSeries,
  editSeries,
  addVideoToSeries,
  removeVideoFromSeries,
  dragDropSeriesVideos,
  getAllSeriesOfUser,
  PurchasedSeries: getPurchasedSeries,
  videos: videos,
  createLiveSchedule,
  liveSchedules: getLiveSchedule,
  connection,
  connectionStatus,
  moment,
  moments,
  momentTag,
  getMomentTags
});

export default (state, action) =>
  rootReducer(action.type === LOGOUT ? undefined : state, action);
