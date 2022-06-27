import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showEditProfileModel, setShowEditProfileModel] = useState(false);
  const [showTipPopups, setShowTipPopups] = useState(false);
  const [homeCategoryModel, setHomeCategoryModel] = useState(false);
  const [uploadVideoModal, setUploadVideoModal] = useState(false);
  const [newCategoryRequestModel, setNewCategoryRequestModel] = useState(false);
  const [showVideoReportModel, setShowVideoReportModel] = useState(false);
  const [singleVideoFormattedTimestamp, setSingleVideoFormattedTimestamp] =
    useState(null);
  const [pauseVideoForReport, setPauseVideoForReport] = useState(false);
  const [showPlaylistModel, setShowPlaylistModel] = useState(false);
  const [playlistModelType, setPlaylistModelType] = useState("create"); // create or save
  const [deletePlaylistConfirmationModel, setDeletePlaylistConfirmationModel] =
    useState(false);
  const [editPlaylistModel, setEditPlaylistModel] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [createCourseModel, setCreateCourseModel] = useState(false);
  const [deleteSeriesConfirmationModel, setDeleteSeriesConfirmationModel] =
    useState(false);
  const [editSeriesModel, setEditSeriesModel] = useState(false);
  const [addVideosToSeriesModel, setAddVideosToSeriesModel] = useState(false);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [showMyAccount, setShowMyAccount] = useState(false);
  const [showMyPortal, setShowMyPortal] = useState(false);
  const [portalUsername, setPortalUsername] = useState(null);
  const [showPlaylistModelV2, setShowPlaylistModelV2] = useState(false);
  const [showCreateSeriesModel, setShowCreateSeriesModel] = useState(false);
  const [showUploadMomentModel, setShowUploadMomentModel] = useState(false);
  const [showUploadClipModel, setShowUploadClipModel] = useState(false);
  const [showEditClipModel, setShowEditClipModel] = useState(false);
  const [showUploadModel, setShowUploadModel] = useState(false);
  const [showChatList,setShowChatList] = useState(false);
  const [showChatDetails,setShowChatDetails] = useState(false);
  const [showEditProfile,setShowEditProfile] = useState(false);
  const [showEditMomentModel, setShowEditMomentModel] = useState(false);


  return (
    <GlobalContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        showEditProfileModel,
        setShowEditProfileModel,
        showTipPopups,
        setShowTipPopups,
        homeCategoryModel,
        setHomeCategoryModel,
        uploadVideoModal,
        setUploadVideoModal,
        newCategoryRequestModel,
        setNewCategoryRequestModel,
        showVideoReportModel,
        setShowVideoReportModel,
        singleVideoFormattedTimestamp,
        setSingleVideoFormattedTimestamp,
        pauseVideoForReport,
        setPauseVideoForReport,
        showPlaylistModel,
        setShowPlaylistModel,
        playlistModelType,
        setPlaylistModelType,
        deletePlaylistConfirmationModel,
        setDeletePlaylistConfirmationModel,
        editPlaylistModel,
        setEditPlaylistModel,
        selectedVideoId,
        setSelectedVideoId,
        createCourseModel,
        setCreateCourseModel,
        deleteSeriesConfirmationModel,
        setDeleteSeriesConfirmationModel,
        editSeriesModel,
        setEditSeriesModel,
        addVideosToSeriesModel,
        setAddVideosToSeriesModel,
        selectedSeries,
        setSelectedSeries,
        showMyAccount,
        setShowMyAccount,
        showMyPortal,
        setShowMyPortal,
        showPlaylistModelV2,
        setShowPlaylistModelV2,
        showCreateSeriesModel,
        setShowCreateSeriesModel,
        showUploadMomentModel,
        setShowUploadMomentModel,
        portalUsername,
        setPortalUsername,
        showUploadClipModel,
        setShowUploadClipModel,
        showEditClipModel,
        setShowEditClipModel,
        showUploadModel,
        setShowUploadModel,
        showChatList,
        setShowChatList,
        showChatDetails,
        setShowChatDetails,
        showEditProfile,
        setShowEditProfile,
        showEditMomentModel,
        setShowEditMomentModel
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
