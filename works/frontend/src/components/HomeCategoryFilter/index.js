import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
import FilterButton from "../../styles/FilterButton";
import SubFilter from "./SubFilter";
import { useFetch } from "../../hooks/useFetch";
import { GlobalContext } from "../../context/GlobalContext";
import {
  Container,
  FilterContainer,
  LinkContainer,
  StyledParagraph,
  SubFilterContainer,
} from "./styles";
import { STATIC_CATEGORIES } from "../../utils/common";
import config from "../../config/config";

const HomeCategoryFilter = ({
  selectedCategory,
  setSelectedCategory,
  currentMainCategory,
  handleCategory,
  getFeaturedVideos,
  currentStaticFilterId,
  getTrendingVideos,
  getAllVideos,
  clearSubFilters,
  getStaffPicks,
}) => {
  const [mainCategories, setMainCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentActiveItemId, setCurrentActiveItemId] = useState(null);
  const { setHomeCategoryModel } = useContext(GlobalContext);

  const { loading, data } = useFetch(
    `${config.REACT_APP_BACKEND_URL}videos/category`
  );
  let videoCategories = data.data;

  useEffect(() => {
    if (videoCategories && videoCategories.length) {
      let categs = videoCategories;
      categs.forEach((vc) => {
        vc["isSelected"] = false;
        vc.subCategOne.forEach((sco) => {
          sco.subCategTwo.forEach((sct) => {
            sct["isSelected"] = false;
          });
        });
      });
      setMainCategories(categs);
    }
  }, [videoCategories, clearSubFilters]);

  const toggleSubFilter = (item) => {
    if (currentMainCategory.id === item.id) {
      const selectedCategs = selectedCategory;
      setSelectedCategory(
        selectedCategs.filter((sc) => sc.videoCategoryId !== item.id)
      );
    } else handleCategory(item);
  };

  const handleCheck = (
    checked,
    mainCat,
    sbCatOne,
    subCatTwo,
    allowOnlyOneSubCat
  ) => {
    try {
      let updatedMainCat = [...mainCategories];
      updatedMainCat.forEach((mc) => {
        mc.subCategOne.forEach((sbo) => {
          sbo.subCategTwo.forEach((sbc) => {
            if (sbc.id === subCatTwo.id) {
              sbc.isSelected = checked;
            }
          });
        });
      });
      setMainCategories(updatedMainCat);

      if (checked) {
        if (allowOnlyOneSubCat) {
          setCurrentActiveItemId(subCatTwo.id);
        }
        let updatedCategory = [...categories];
        updatedCategory.push(subCatTwo.name);
        setCategories(updatedCategory);
        const filtered = selectedCategory.filter(
          (selectedCat) =>
            selectedCat.videoCategoryId === mainCat.id &&
            selectedCat.subCategOneId !== null &&
            selectedCat.subCategTwoId !== null
        );
        setSelectedCategory([
          ...filtered,
          {
            videoCategoryId: mainCat.id,
            subCategOneId: sbCatOne.id,
            subCategTwoId: subCatTwo.id,
          },
        ]);
      } else {
        if (allowOnlyOneSubCat) {
          setCurrentActiveItemId(null);
        }
        let updatedCategory = [...categories];
        updatedCategory = categories.filter((item) => item !== subCatTwo.name);
        setCategories(updatedCategory);

        let selectedCateg =
          selectedCategory.length &&
          selectedCategory.filter((sc) => {
            return sc.subCategTwoId !== subCatTwo.id;
          });

        if (selectedCateg.length === 0) {
          setSelectedCategory([
            {
              videoCategoryId: mainCat.id,
              subCategOneId: null,
              subCategTwoId: null,
            },
          ]);
        } else setSelectedCategory(selectedCateg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <FilterContainer>
        <LinkContainer>
          <span
            className="categoriesModelToggler"
            title="Open categories list"
            onClick={() => {
              setHomeCategoryModel(true);
            }}
          >
            <img src="/assets/icons/dialpad.svg" alt="Open categories model" />
          </span>
        </LinkContainer>

        <FilterButton
          grey
          isActive={currentStaticFilterId === STATIC_CATEGORIES.ALL}
          onClick={() => getAllVideos()}
        >
          All
        </FilterButton>
        <FilterButton
          grey
          isActive={currentStaticFilterId === STATIC_CATEGORIES.FEATURED}
          onClick={() => getFeaturedVideos()}
        >
          Featured
        </FilterButton>

        <FilterButton
          grey
          isActive={currentStaticFilterId === STATIC_CATEGORIES.TRENDING}
          onClick={getTrendingVideos}
        >
          Trending
        </FilterButton>
        {loading && <StyledParagraph>Loading...</StyledParagraph>}

        {videoCategories &&
          videoCategories.length &&
          data.success &&
          videoCategories.map((item, index) => (
            <FilterButton
              key={index}
              grey
              isActive={
                currentMainCategory !== null &&
                item.id === currentMainCategory.id
              }
              onClick={() => toggleSubFilter(item)}
            >
              {item.name}
            </FilterButton>
          ))}
        <FilterButton
          grey
          isActive={currentStaticFilterId === STATIC_CATEGORIES.STAFF_PICKS}
          onClick={getStaffPicks}
        >
          Staff Picks
        </FilterButton>
      </FilterContainer>
      {currentMainCategory && currentMainCategory.id !== -1 && (
        <SubFilterContainer>
          <SubFilter
            mainCategory={currentMainCategory}
            handleCheck={handleCheck}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            currentActiveItemId={currentActiveItemId}
          />
        </SubFilterContainer>
      )}
    </Container>
  );
};

export default HomeCategoryFilter;
