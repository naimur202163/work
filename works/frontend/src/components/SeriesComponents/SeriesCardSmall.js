import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SeriesCardSmall = ({ item, show }) => {
  let value = 3.5;
  const {
    id,
    title,
    thumbnail,
    price,
    userInfo: { firstname, lastname, username },
  } = item;

  return (
    // <Link to={`/series/details/${id}`}>
    <ComponentWrapper>
      <div className="course_image">
        <Link to={`/series/details/${id}`}>
          <img src={thumbnail} alt={title} className="course__thumbnail" />
        </Link>
      </div>

      <div className="course__metaInfo">
        <h5 className="course__metaInfo--title"><Link to={`/series/details/${id}`}>{title}</Link></h5>
        <span className="course__metaInfo--author">
          <Link to={`/channel/${username}`}>{firstname + lastname}</Link>
        </span>
        <Link to={`/series/details/${id}`}>
          <div className="course__metaInfo--rated">
            {show ? (
              <div className="rating">
                <p className="rating__num">4.6</p>
                <div className="rating__stars">
                  <i
                    className={
                      value >= 1
                        ? "fas fa-star"
                        : value >= 0.5
                          ? "fas fa-star-half-alt"
                          : "far fa-star"
                    }
                  />
                  <i
                    className={
                      value >= 2
                        ? "fas fa-star"
                        : value >= 1.5
                          ? "fas fa-star-half-alt"
                          : "far fa-star"
                    }
                  />
                  <i
                    className={
                      value >= 3
                        ? "fas fa-star"
                        : value >= 2.5
                          ? "fas fa-star-half-alt"
                          : "far fa-star"
                    }
                  />
                  <i
                    className={
                      value >= 4
                        ? "fas fa-star"
                        : value >= 3.5
                          ? "fas fa-star-half-alt"
                          : "far fa-star"
                    }
                  />
                  <i
                    className={
                      value >= 5
                        ? "fas fa-star"
                        : value >= 4.5
                          ? "fas fa-star-half-alt"
                          : "far fa-star"
                    }
                  />
                </div>

                <p className="rating__people">(458)</p>
              </div>
            ) : (
              <span>Not rated</span>
            )}
          </div>
          {price ? (
            <span className="course__metaInfo--price">
              ${parseFloat(price).toFixed(2)}
            </span>
          ) : (
            <span className="course__metaInfo--price">FREE</span>
          )}
        </Link>
      </div>
    </ComponentWrapper>
    // </Link>
  );
};

export default SeriesCardSmall;

const ComponentWrapper = styled.div`
  padding: 5px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 1rem;

  .course {
    &__thumbnail {
      width: 100%;
      height: 10rem;
      background-size: cover;
      background-position: center;
      object-fit: cover;
    }

    &__metaInfo {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      &--title {
        font-size: 1rem;
        line-height: 1.4;
        font-weight: 300;
      }

      &--author {
        color: rgba(255, 225, 225, 0.5);
        font-weight: 200;
        font-size: 0.85rem;
      }

      &--rated {
        span {
          background: -webkit-linear-gradient(#ff4883, #fdb769);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: uppercase;
        }
      }

      &--price {
        font-size: 1.1rem;
        color: #fff;
        font-weight: 500;
      }
    }
  }

  .rating {
    display: flex;
    align-items: center;

    &__num {
      font-size: 1rem;
      font-weight: 600;
      background: -webkit-linear-gradient(#ff4883, #fdb769);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-right: 0.5rem;
    }

    &__stars {
      i {
        font-size: 0.8rem;
        margin-right: 0.1rem;
        background: -webkit-linear-gradient(#ff4883, #fdb769);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    &__people {
      font-size: 0.8rem;
      color: rgba(255, 225, 225, 0.4);
      font-weight: 200;
      padding: 0 0.2rem;
    }
  }
`;
