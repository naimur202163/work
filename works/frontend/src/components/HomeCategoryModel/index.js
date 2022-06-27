/* eslint-disable */
import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import HomeCategoryModelBackdrop from "./HomeCategoryModelBackdrop";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import { Link, useHistory } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import config from "../../config/config";

const ModelContainerVariables = {
  hidden: {
    opacity: 0,
    y: "-15rem",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      duration: 0.5,
    },
  },
};

const HomeCategoryModel = ({ open, closeHandler }) => {
  const history = useHistory();
  const { setUploadVideoModal } = useContext(GlobalContext);
  const { userrole, firstname, lastname } = useSelector((state) => state.user);
  const { loading, data } = useFetch(
    `${config.REACT_APP_BACKEND_URL}videos/categories`
  );

  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage, setCategoriesPerPage] = useState(9);

  const pages = [];
  for (let i = 1; i <= Math.ceil(categories.length / categoriesPerPage); i++) {
    pages.push(i);
  }

  useEffect(() => {
    if (data.categories && data.categories.length > 0) {
      setCategories(data.categories);
    }
  }, [data.categories]);

  // Get current posts
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  // next button
  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);
  };

  // prev button
  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);
  };

  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];

  return (
    <>
      <motion.div
        variants={ModelContainerVariables}
        initial="hidden"
        animate="visible"
        className="homeCategoryModel"
      >
        <ContentWrapper>
          <img
            onClick={closeHandler}
            className="closeModel"
            src="/assets/utils/close.svg"
            alt="close model"
          />
          <div className="header">
            <h1 className="title">
              Welcome {firstname}!<br />
              What do you want to get into today?
            </h1>
          </div>

          <div className="categoryList">
            {currentCategories && currentCategories.length && data.success && (
              <>
                {currentCategories
                  .sort((a, b) => a.featured - b.featured)
                  .map((category, i) => {
                    if (i === 4) {
                      return (
                        <Link
                          onClick={closeHandler}
                          className="categoryRandom"
                          key={category.id}
                          title={"Browser random category to browse"}
                          to={`/categoryid/${randomCategory.id}`}
                        >
                          <div className="circle">
                            <img
                              src="/assets/icons/isutraBrand.png"
                              alt="default icon"
                            />

                            <h2 className="categoryTitle">Get Rando!</h2>
                          </div>
                        </Link>
                      );
                    } else {
                      return (
                        <Link
                          onClick={closeHandler}
                          className="categoryItem"
                          key={category.id}
                          title={category.name}
                          to={`/categoryid/${category.id}`}
                        >
                          <div className="circle">
                            {!category.iconPath ? (
                              <img
                                src="/assets/icons/isutraBrand.png"
                                alt="default icon"
                              />
                            ) : (
                              <img
                                src={category.iconPath}
                                alt={category.name}
                              />
                            )}

                            <h2 className="categoryTitle">
                              {category.name.length > 12
                                ? category.name.substring(0, 12) + "..."
                                : category.name}
                            </h2>
                          </div>
                        </Link>
                      );
                    }
                  })}
              </>
            )}
          </div>

          <div className="pagination">
            {currentPage === pages[0] ? (
              <div
                onClick={() => {
                  closeHandler();
                  history.push("/home");
                }}
                className="prevButton"
              >
                <h1 className="title">Home</h1>
              </div>
            ) : (
              <button
                disabled={currentPage == pages[0] ? true : false}
                onClick={() => handlePrevbtn()}
                className="prevButton"
              >
                <h1 className="title">Go Back!</h1>
              </button>
            )}

            {pages.length > 1 && (
              <button
                disabled={currentPage == pages[pages.length - 1] ? true : false}
                onClick={() => handleNextbtn()}
                className="nextButton"
              >
                <h1 className="title">More Categories!</h1>
              </button>
            )}
          </div>

          <div className="warriorFeature">
            {userrole === 2 && (
              // show upload video button
              <div
                onClick={() => {
                  setUploadVideoModal(true);
                  closeHandler();
                }}
                className="uploadVideo"
              >
                <img src="/assets/icons/video.svg" alt="Upload Video" />
                <h2>Upload Video</h2>
              </div>
            )}
          </div>
        </ContentWrapper>
      </motion.div>

      {/* rendering the backdrop */}
      {open && <HomeCategoryModelBackdrop close={closeHandler} />}
    </>
  );
};

export default HomeCategoryModel;

const ContentWrapper = styled.div`
  position: relative;

  .pagination {
    width: 100%;
    margin: 0 auto 3rem auto;
    display: flex;
    align-items: center;
    justify-content: center;

    .nextButton,
    .prevButton {
      margin: 0 1rem;
    }

    .prevButton,
    .nextButton {
      background: ${(props) => props.theme.gradient};
      height: 7.5rem;
      width: 7.5rem;
      border-radius: 50%;
      position: relative;
      cursor: pointer;
      border: none;
      outline: none;

      .title {
        font-family: "Noto Sans Display", sans-serif !important;
        font-size: 1rem;
        font-weight: 300;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        line-height: 1.2;
        text-transform: uppercase;
        text-align: center;
      }
    }
  }

  .closeModel {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    height: 1rem;
    width: 1rem;
    cursor: pointer;
  }

  .header {
    padding: 1.5rem 2rem;
  }

  .title {
    font-family: "Noto Sans Display", sans-serif;
    font-weight: 300;
    font-size: 1.2rem;
    line-height: 1.5;
    color: #fff;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .uploadVideo {
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 2rem;
      width: auto;
      margin-right: 0.5rem;
    }

    h2 {
      font-family: "Noto Sans Display", sans-serif;
      font-weight: 300;
      font-size: 1rem;
      text-transform: uppercase;
      transition: all 0.2s ease;
    }

    &:hover {
      cursor: pointer;

      h2 {
        letter-spacing: 0.5px;
        color: rgb(246, 92, 139);
        font-weight: 500;
      }
    }
  }

  .warriorFeature {
    width: 100%;
    text-align: center;
  }

  .categoryList {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
  }

  .categoryRandom,
  .categoryItem {
    flex-basis: 33.333%;
    text-align: center;
    position: relative;
    margin-bottom: 2rem;
    height: 7.5rem;

    .circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: ${(props) => props.theme.gradient};
      height: 100%;
      width: 7.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    .icon {
      font-size: 1.7rem;
      color: #fff;
      transition: all 0.4s ease;
    }

    img {
      height: 2rem;
      width: auto;
      transition: all 0.2s ease;
      margin-bottom: 0.25rem;
    }

    .categoryTitle {
      width: 100%;
      line-height: 1;
      font-size: 0.8rem;
      font-family: "Noto Sans Display", sans-serif !important;
      font-weight: 200;
      transition: all 0.2s ease;
    }

    &:hover {
      cursor: pointer;

      img {
        height: 2.5rem;
      }

      .categoryTitle {
        font-weight: 400;
        letter-spacing: 0.5px;
      }
    }
  }

  @media (max-width: 1333px) {
    .categoryItem,
    .categoryRandom {
      flex-basis: 33.33%;
    }
  }

  @media (max-width: 1073px) {
    .categoryItem,
    .categoryRandom {
      flex-basis: 33.33%;
    }
  }

  @media (max-width: 480px) {
    .categoryRandom,
    .categoryItem {
      height: 5rem;

      .circle {
        width: 5rem;
        padding: 3px;
        overflow: hidden;
      }

      .icon {
        font-size: 1.4rem;
      }

      img {
        height: 1.7rem;
      }

      .categoryTitle {
        font-size: 0.7rem;
      }
    }

    .pagination {
      .prevButton,
      .nextButton {
        height: 5rem;
        width: 5rem;

        .title {
          font-size: 0.7rem;
        }
      }
    }

    .uploadVideo {
      img {
        height: 1.5rem;
      }

      h2 {
        font-size: 0.8rem;
      }
    }
  }
`;
