import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import MarketingBanner from "../components/NewHomeComponents/MarketingBanner/MarketingBanner";
import HomeCategoryFilter from "../components/HomeCategoryFilter";
import Skeleton from "../skeletons/HomeSkeleton";
import Moments from "../components/NewHomeComponents/Moments/Moments";
import Clips from "../components/NewHomeComponents/Clips/Clips";
import LiveClasses from "../components/LiveClasses";
import { useDispatch, useSelector } from "react-redux";
import { setAuthHeader } from "../services/api";
import { STATIC_CATEGORIES } from "../utils/common";
import {
  getMarketingBanners,
  getVideos,
  filterVideos,
  getFeatured,
  getTrendingVideos,
  getStaffPickVideos,
  getAllMoments,
} from "../actions";
import { toast } from "react-toastify";
import { GlobalContext } from "../context/GlobalContext";

const NewHome = () => {
  const dispatch = useDispatch();
  const {
    moments,
    loading: momentsLoading,
    error: momentsError,

  } = useSelector((state) => state.moments);
  const {
    moment: uploadMoment,
    deleteMessage,
    deleteError,
    updateMessage,
    updateError
  } = useSelector((state) => state.moment);
  const { setShowEditMomentModel, setShowUploadModel } =
    useContext(GlobalContext);

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [currentMainCategory, setCurrentMainCategory] = useState({
    id: -1,
    name: "ALL",
  });
  const [currentStaticFilterId, setCurrentStaticFilterId] = useState(
    STATIC_CATEGORIES.ALL
  );
  const [clearSubFilters, setClearSubFilters] = useState(false);
  const banners = useSelector((state) => state.marketingBanner);
  const videosData = useSelector((state) => state.videos);
  const handleCategory = (mainCategory) => {
    setCurrentStaticFilterId(null); // set static filter to inactive state
    setCurrentMainCategory(mainCategory);
    const filtered = selectedCategory.filter(
      (sc) => sc.videoCategoryId === mainCategory.id
    );
    setSelectedCategory([
      ...filtered,
      {
        videoCategoryId: mainCategory.id,
        subCategOneId: null,
        subCategTwoId: null,
      },
    ]);
  };

  useEffect(() => {
    setAuthHeader();
    dispatch(filterVideos(selectedCategory));
  }, [dispatch, selectedCategory]);

  useEffect(() => {
    dispatch(getMarketingBanners());
    dispatch(getVideos());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllMoments());
  }, [dispatch, uploadMoment, deleteMessage, updateMessage]);

  useEffect(() => {
    if (deleteMessage) {
      toast.success("Moment deleted successfully");
    }

    if (deleteError) {
      toast.error(deleteError);
    }

    if (updateError) {
      toast.error(updateError);
    }

    if (updateMessage) {
      toast.success("Congrats Moment edited successfully");

      setShowEditMomentModel(false);
      setShowUploadModel(false);
    }
  }, [deleteMessage, deleteError, updateError, updateMessage]);

  if (videosData.isFetching) {
    return (
      <>
        <Skeleton title={true} />
      </>
    );
  }
  const getAllVideos = () => {
    setCurrentStaticFilterId(STATIC_CATEGORIES.ALL);
    setSelectedCategory([]); //clear all filters
    dispatch(filterVideos([]));
    setCurrentMainCategory([]);
    setClearSubFilters(true);
  };

  const getFeaturedVideos = () => {
    setCurrentStaticFilterId(STATIC_CATEGORIES.FEATURED);
    dispatch(getFeatured());
    setCurrentMainCategory([]);
    setClearSubFilters(true);
  };

  const getTrending = () => {
    setCurrentStaticFilterId(STATIC_CATEGORIES.TRENDING);
    dispatch(getTrendingVideos());
    setCurrentMainCategory([]);
    setClearSubFilters(true);
  };

  const getStaffPicks = () => {
    setCurrentStaticFilterId(STATIC_CATEGORIES.STAFF_PICKS);
    dispatch(getStaffPickVideos());
    setCurrentMainCategory([]);
    setClearSubFilters(true);
  };

  return (
    <NewHomeWrapper>
      <HomeCategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        currentMainCategory={currentMainCategory}
        handleCategory={handleCategory}
        getFeaturedVideos={getFeaturedVideos}
        currentStaticFilterId={currentStaticFilterId}
        getTrendingVideos={getTrending}
        getAllVideos={getAllVideos}
        clearSubFilters={clearSubFilters}
        getStaffPicks={getStaffPicks}
      />
      <MarketingBanner banners={banners} />
      <LiveClasses />

      {!momentsLoading && !momentsError && <Moments moments={moments} />}

      {videosData && videosData.videos && videosData.videos.length && (
        <Clips clipVideos={videosData} />
      )}
    </NewHomeWrapper>
  );
};

export default NewHome;

const NewHomeWrapper = styled.div`
  margin-bottom: 7rem;
`;

const VideosNotFound = styled.p`
  display: flex;
  justify-content: center;
`;
