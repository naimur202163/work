import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import HomeCategoryFilter from '../components/HomeCategoryFilter'
import {
    getMarketingBanners,
    getVideos,
    filterVideos,
    getFeatured,
    getTrendingVideos,
    getStaffPickVideos,
} from "../actions";
import { STATIC_CATEGORIES } from "../utils/common";
import Skeleton from "../skeletons/HomeSkeleton";
import { setAuthHeader } from "../services/api";
import { CheckedIcon, PlayIcon, UnCheckedIcon, UploadFeaturedIcon } from "../components/Icons";
import OptionMenu from "./OptionMenu";

const NewFeaturedVideoStyled = styled.div`
    .upload-section {
        justify-content : center;
        display : flex;
        font-family : Montserrat;
        align-items : center;
        margin: 2%;
    }
    .upload-text {
        margin-left: 30px;
        background: #3A3A3C;
        padding: 10px;
        border-radius: 5px;
        display : flex;
        align-items : center;
        font-size : 14px;
    }
    .play-icon {
      margin-left : 30px;
    }
    .text {
      margin-left: 10px;
      display : flex;
    }
    .upload {
      font-weight : 700;
    }
    .other-text {
      margin-left: 5px;
      font-weight: 300;
    }
    .select-option {
      justify-content : center;
      display : flex;
      font-family : Montserrat;
      font-size : 14px;
    }
    .select-text {
      font-weight : 300;
    }
    .video-list-text {
      margin-left :5px;
      font-weight : 500;
    }
    .video-section {
      justify-content : center;
      display : flex;
      margin: 2%;
      flex-wrap : wrap;
    }
    .video {
      width : 22%;
      background : #2C2C2E;
      border-radius : 15px;
      margin-left: 15px;
      margin-bottom : 9%;
      margin-right : 10px;
    }
    .check-uncheck-icon {
      justify-content: end;
      display: flex;
      margin: 10px;
    }
    .time-label {
      position : relative;
      height : 65%;
    }
    .duration {
      padding: 3px 15px;
      position: absolute;
      bottom: 0;
      right: 5px;
      font-family: Montserrat;
      font-size: 12px;
      background: #1C1C1E;
      border-radius: 10px;
    }
    .video-description-section {
      display : flex;
      margin: 35px 15px;
    }
    .video-description {
      font-size : 12px;
      font-family : Montserrat;
    }
    .video-option-menu {
      margin-left : auto;
    }
    .video-title {
      font-weight : 500;
    }
    .category-text {
      font-weight : 200;
    }
    .location-text {
      font-weight : 200;
    }
    @media screen and (max-width: 1024px) {
      .video {
        margin-bottom : 10%;
      }
    }
    @media screen and (max-width: 768px) {
      .upload-section {
        margin : 5%;
      }
      .video {
        width : 40%;
        margin-bottom : 15%;
      }
    }
    @media screen and (max-width: 550px){
      .video {
        margin-bottom : 17%;
      }
    }
    @media screen and (max-width: 425px) {
      .video {
        margin-bottom : 21%;
      }
    }
    @media screen and (max-width: 375px) {
      .video {
        margin-bottom : 25%;
      }
    }
    @media screen and (max-width: 320px){
      .video {
        margin-bottom : 33%;
      }
    }

`

const NewFeaturedVideo = () => {
    const dispatch = useDispatch();
    const [checked,setChecked] = useState(false)
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
    const trending = useSelector((state) => state.trending);
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
    const handleCheckEvent = () => {
      setChecked(!checked)
    }
    return (
        <NewFeaturedVideoStyled>
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
          <div className="upload-section">
            <UploadFeaturedIcon width={30} />
            <div className="upload-text">
              <div className="text">
                <p className="upload">Upload</p>
                <p className="other-text"> some videos for your series </p>
              </div>
              <div className="play-icon">
                <PlayIcon width={10} />
              </div>
            </div>
          </div>
          <div className="select-option">
              <p className="select-text">or select from the</p>
              <p className="video-list-text">Video List</p>
          </div>
          <div className="video-section">
            <div className="video">
                <div className="check-uncheck-icon" onClick={handleCheckEvent}>
                  {checked ? <UnCheckedIcon width={20} /> : <CheckedIcon width={20} />}
                </div>
                <div className="time-label">
                  <div className="duration">39:12</div>
                </div>
                <div className="video-description-section">
                  <div className="video-description">
                    <div className="video-title">Title of the clip</div>
                    <div className="category-text">Category</div>
                    <div className="location-text">Location,date</div>
                  </div>
                  <div className="video-option-menu">
                    <OptionMenu />
                  </div>
                </div>
              </div>
              <div className="video">
                <div className="check-uncheck-icon" onClick={handleCheckEvent}>
                  {checked ? <UnCheckedIcon width={20} /> : <CheckedIcon width={20} />}
                </div>
                <div className="time-label">
                  <div className="duration">39:12</div>
                </div>
                <div className="video-description-section">
                  <div className="video-description">
                    <div className="video-title">Title of the clip</div>
                    <div className="category-text">Category</div>
                    <div className="location-text">Location,date</div>
                  </div>
                  <div className="video-option-menu">
                    <OptionMenu />
                  </div>
                </div>
              </div>
              <div className="video">
                <div className="check-uncheck-icon" onClick={handleCheckEvent}>
                  {checked ? <UnCheckedIcon width={20} /> : <CheckedIcon width={20} />}
                </div>
                <div className="time-label">
                  <div className="duration">39:12</div>
                </div>
                <div className="video-description-section">
                  <div className="video-description">
                    <div className="video-title">Title of the clip</div>
                    <div className="category-text">Category</div>
                    <div className="location-text">Location,date</div>
                  </div>
                  <div className="video-option-menu">
                    <OptionMenu />
                  </div>
                </div>
              </div>
              <div className="video">
                <div className="check-uncheck-icon" onClick={handleCheckEvent}>
                  {checked ? <UnCheckedIcon width={20} /> : <CheckedIcon width={20} />}
                </div>
                <div className="time-label">
                  <div className="duration">39:12</div>
                </div>
                <div className="video-description-section">
                  <div className="video-description">
                    <div className="video-title">Title of the clip</div>
                    <div className="category-text">Category</div>
                    <div className="location-text">Location,date</div>
                  </div>
                  <div className="video-option-menu">
                    <OptionMenu />
                  </div>
                </div>
              </div>
              <div className="video">
                <div className="check-uncheck-icon" onClick={handleCheckEvent}>
                  {checked ? <UnCheckedIcon width={20} /> : <CheckedIcon width={20} />}
                </div>
                <div className="time-label">
                  <div className="duration">39:12</div>
                </div>
                <div className="video-description-section">
                  <div className="video-description">
                    <div className="video-title">Title of the clip</div>
                    <div className="category-text">Category</div>
                    <div className="location-text">Location,date</div>
                  </div>
                  <div className="video-option-menu">
                    <OptionMenu />
                  </div>
                </div>
              </div>
              <div className="video">
                <div className="check-uncheck-icon" onClick={handleCheckEvent}>
                  {checked ? <UnCheckedIcon width={20} /> : <CheckedIcon width={20} />}
                </div>
                <div className="time-label">
                  <div className="duration">39:12</div>
                </div>
                <div className="video-description-section">
                  <div className="video-description">
                    <div className="video-title">Title of the clip</div>
                    <div className="category-text">Category</div>
                    <div className="location-text">Location,date</div>
                  </div>
                  <div className="video-option-menu">
                    <OptionMenu />
                  </div>
                </div>
              </div>
              <div className="video">
                <div className="check-uncheck-icon" onClick={handleCheckEvent}>
                  {checked ? <UnCheckedIcon width={20} /> : <CheckedIcon width={20} />}
                </div>
                <div className="time-label">
                  <div className="duration">39:12</div>
                </div>
                <div className="video-description-section">
                  <div className="video-description">
                    <div className="video-title">Title of the clip</div>
                    <div className="category-text">Category</div>
                    <div className="location-text">Location,date</div>
                  </div>
                  <div className="video-option-menu">
                    <OptionMenu />
                  </div>
                </div>
              </div>
              <div className="video">
                <div className="check-uncheck-icon" onClick={handleCheckEvent}>
                  {checked ? <UnCheckedIcon width={20} /> : <CheckedIcon width={20} />}
                </div>
                <div className="time-label">
                  <div className="duration">39:12</div>
                </div>
                <div className="video-description-section">
                  <div className="video-description">
                    <div className="video-title">Title of the clip</div>
                    <div className="category-text">Category</div>
                    <div className="location-text">Location,date</div>
                  </div>
                  <div className="video-option-menu">
                    <OptionMenu />
                  </div>
                </div>
              </div>             
          </div>
          </NewFeaturedVideoStyled>
    )
}

export default NewFeaturedVideo