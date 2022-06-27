import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import BackIcon from "../../assets/Icons/back.svg";
import { useDispatch, useSelector } from "react-redux";
import { newCategoryRequestAction } from "../../actions";
import { toast } from "react-toastify";
import { GlobalContext } from "../../context/GlobalContext";

const CategoryRequestModel = ({ close }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const { error } = useSelector((state) => state.newCategoryRequest);
  const { id, email } = user;
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
  const { newCategoryRequestModel } = useContext(GlobalContext);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong. Please try again later!");
    }
  }, [error]);

  const newCategoryRequestHandler = (e) => {
    e.preventDefault();

    if (!categoryName) {
      return toast.error("Please provide category title!");
    }

    if (!user.id) {
      return toast.error("Wait while we fetch your information");
    }

    const Obj = {
      categoryTitle: categoryName,
      categoryDescription: categoryDesc,
      requestedUser: id,
      requestedUserEmail: email,
    };

    dispatch(newCategoryRequestAction(Obj));

    setCategoryName("");
    setCategoryDesc("");
    close();

    toast.success(
      "We received your video category request! Thanks for helping expand this community. Our team will review your submission and notify you if accepted."
    );
  };

  return (
    <>
      <CategoryRequestModelWrapper
        className={`${newCategoryRequestModel && "ShowCategoryRequestForm"}`}
      >
        <div className="header">
          <div onClick={close} className="backIcon">
            <img src={BackIcon} alt="" />
          </div>
          <div className="name">Isutra Category Request Form</div>
        </div>

        <div className="content">
          <form onSubmit={newCategoryRequestHandler} className="content__form">
            <div className="content__form--fieldGroup">
              <label htmlFor="">Category Name</label>
              <input
                name="categoryName"
                type="text"
                placeholder="Enter the Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            <div className="content__form--fieldGroup">
              <label htmlFor="">Category Name</label>
              <textarea
                name="categoryDesc"
                placeholder="Enter a simple description of the category you are requesting"
                value={categoryDesc}
                onChange={(e) => setCategoryDesc(e.target.value)}
              />
            </div>

            <button type="submit" className="content__form--submit">
              Submit Request
            </button>
          </form>
        </div>
      </CategoryRequestModelWrapper>
    </>
  );
};

export default CategoryRequestModel;

const CategoryRequestModelWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #1c1c1e;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  z-index: 902;
  opacity: 0;
  transform: translateX(-100%);
  transition: all 1s ease;
  font-family: ${(props) => props.theme.montserrat};

  .header {
    display: flex;
    align-items: center;
    padding: 1rem 5rem;
    border-bottom: 1px solid rgba(112, 112, 112, 0.4);

    .backIcon {
      margin-right: 1rem;
      cursor: pointer;

      img {
        height: 1rem;
        width: auto;
      }
    }

    .name {
      font-size: 1.2rem;
      font-weight: 400;
      text-transform: capitalize;
    }
  }

  .content {
    width: 90%;
    margin: 2rem auto;

    &__form {
      width: 50%;
      margin: 0 auto;

      &--fieldGroup {
        margin-bottom: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        label {
          padding: 0 0 0.7rem 1rem;
          font-size: 1rem;
          font-weight: 400;
          text-transform: capitalize;
          color: #f2f2f7;
          letter-spacing: 1px;
        }

        input,
        textarea {
          width: 100%;
          padding: 1rem;
          background-color: #3a3a3c;
          color: #f2f2f7;
          border-radius: 0.5rem;
          border: none;
          outline: none;
          font-size: 1rem;
          font-weight: 400;
          color: #f2f2f7;
          font-family: ${(props) => props.theme.montserrat};
          transition: all 0.25s ease;
          border: 3px solid transparent;

          &::placeholder {
            font-weight: 300;
            color: #f2f2f7;
            letter-spacing: 0.3px;
          }

          &:focus {
            border: 3px solid #f88946;
          }
        }

        textarea {
          resize: none;
          height: 15rem;
        }
      }

      &--submit {
        color: #fff;
        border: none;
        outline: none;
        cursor: pointer;
        line-height: 1;
        font-family: ${(props) => props.theme.montserrat};
        padding: 0.8rem 1rem;
        text-transform: uppercase;
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 1rem;
        background: transparent
          linear-gradient(
            130deg,
            var(--profile-icon-bg) 14%,
            #f88946 23%,
            #f8795f 37%,
            #f75e87 55%,
            #f75b8c 57%
          )
          0% 0% no-repeat padding-box;
        background: transparent
          linear-gradient(
            130deg,
            #f9903d 14%,
            #f88946 23%,
            #f8795f 37%,
            #f75e87 55%,
            #f75b8c 57%
          )
          0% 0% no-repeat padding-box;
        border-radius: 0.5rem;
      }
    }
  }

  @media screen and (max-width: 991px) {
    .content {
      &__from {
        width: 70%;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .header {
      padding: 1rem 2.5rem;

      .name {
        font-size: 1.1rem;
      }
    }

    .content {
      &__form {
        width: 90%;
      }
    }
  }

  @media screen and (max-width: 600px) {
    .content {
      &__form {
        width: 100%;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .header {
      padding: 1rem 1.5rem;

      .name {
        font-size: 0.9rem;
      }

      .formState {
        font-size: 0.9rem;
      }
    }

    .content {
      &__form {
        &--fieldGroup {
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          label {
            padding: 0 0 0.7rem 1rem;
            font-size: 1rem;
            font-weight: 400;
            text-transform: capitalize;
            color: #f2f2f7;
            letter-spacing: 1px;
          }

          input,
          textarea {
            padding: 0.8rem 1rem;
            font-size: 0.9rem;
          }
        }

        &--submit {
          padding: 0.7rem 1rem;
          font-size: 0.9rem;
        }
      }
    }
  }
`;
