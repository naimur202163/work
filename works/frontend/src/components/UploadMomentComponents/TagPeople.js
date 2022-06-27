import React, { useEffect } from "react";
import styled from "styled-components";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import { tagUserInMoment } from "../../actions";
import { toast } from "react-toastify";
import { TAG_USER_IN_MOMENT_RESET } from "../../actions/types";

const TagPeople = ({ momentId }) => {
  const dispatch = useDispatch();
  const { friends, friendsLoading, friendsError } = useSelector(
    (state) => state.connection
  );
  const { taggedUsers } = useSelector((state) => state.getMomentTags);
  const {
    loading: tagLoading,
    error: tagError,
    message: tagMessage,
  } = useSelector((state) => state.momentTag);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (tagMessage) {
      toast.success(tagMessage);
      dispatch({
        type: TAG_USER_IN_MOMENT_RESET,
      });
      return;
    }

    if (tagError) {
      toast.error(tagError);
      dispatch({
        type: TAG_USER_IN_MOMENT_RESET,
      });
      return;
    }
  }, [tagMessage, tagError]);

  const isBadgeOrAvatar = (user) => {
    const image = !user.avatar
      ? user.userSettings.VisitorBadge.imgPath
      : user.avatar;

    if (image && (image.includes(".png") || image.includes(".svg"))) {
      return (
        <div className="imageBadge">
          <img className="badge" src={image} alt="" />
        </div>
      );
    } else {
      return <img className="imageAvatar" src={image} alt="" />;
    }
  };

  return (
    <TagPeopleStyled>
      <div className="container">
        <div className="container__searchBox">
          <input type="text" placeholder="Search People To Tag" />
        </div>

        <div className="container__list">
          {friendsLoading && (
            <div className="loading">
              Getting your connections, Please wait...
            </div>
          )}

          {friendsError && <div className="error">{friendsError}</div>}

          {!friendsLoading &&
            !friendsError &&
            friends &&
            friends.length > 0 &&
            friends.map((item, i) => {
              return (
                <div key={i} className="container__list--item">
                  <div className="left">
                    <div className="avatar">
                      {user.id === item.warrior.id && (
                        <>{isBadgeOrAvatar(item.collaborator)}</>
                      )}

                      {user.id === item.collaborator.id && (
                        <>{isBadgeOrAvatar(item.warrior)}</>
                      )}
                    </div>

                    <div className="stats">
                      <div className="stats__username">
                        {user.id === item.warrior.id && (
                          <>{item.collaborator.username}</>
                        )}

                        {user.id === item.collaborator.id && (
                          <>{item.warrior.username}</>
                        )}
                      </div>
                      <div className="stats__joindate">
                        Connected since{" "}
                        {user.id === item.warrior.id && (
                          <>
                            <Moment fromNow>
                              {item.collaborator.createdAt}
                            </Moment>
                          </>
                        )}
                        {user.id === item.collaborator.id && (
                          <>
                            <Moment fromNow>
                              {item.collaborator.createdAt}
                            </Moment>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="right">
                    {taggedUsers &&
                      taggedUsers.map((tagUser, i) => {
                        if (
                          tagUser.momentId === momentId &&
                          (tagUser.TaggedUserId === item.collaborator.id ||
                            tagUser.TaggedUserId === item.warrior.id)
                        ) {
                          return (
                            <div className="tagButton">
                              <i class="fas fa-user-tag"></i>{" "}
                              <span>Tagged</span>
                            </div>
                          );
                        }
                      })}

                    {!taggedUsers && (
                      <div
                        onClick={() => {
                          if (user.id === item.warrior.id) {
                            return dispatch(
                              tagUserInMoment(momentId, item.collaborator.id)
                            );
                          }

                          if (user.id === item.collaborator.id) {
                            return dispatch(
                              tagUserInMoment(momentId, item.warrior.id)
                            );
                          }
                        }}
                        className="tagButton"
                      >
                        <i class="fas fa-user-tag"></i>{" "}
                        <span>{tagLoading ? "Tagging..." : "Tag User"}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </TagPeopleStyled>
  );
};

export default TagPeople;

const TagPeopleStyled = styled.div`
  width: 50%;
  margin: 0 auto 5rem auto;

  .container {
    &__searchBox {
      position: relative;
      margin-bottom: 2rem;

      input {
        width: 100%;
        padding: 1rem 2rem;
        background-color: #3a3a3c;
        color: #f2f2f7;
        border-radius: 10rem;
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
    }

    &__list {
      &--item {
        margin-bottom: 2rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;

        .left {
          display: flex;
          align-items: center;

          .avatar {
            cursor: pointer;
            height: 3.5rem;
            width: 3.5rem;
            border-radius: 50%;
            position: relative;
            margin-right: 1.5rem;

            .imageBadge {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;

              .badge {
                height: 5rem;
                width: auto;
              }
            }

            .imageAvatar {
              position: absolute;
              top: 0;
              left: 0;
              border-radius: 50%;
              background-size: cover;
              background-position: center;
              object-fit: cover;
              height: 100%;
              width: 100%;
            }
          }

          .stats {
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            &__username {
              font-size: 1.2rem;
              font-weight: 500;
              color: #f2f2f7;
            }

            &__joindate {
              font-size: 0.85rem;
              font-weight: 300;
              color: #aeaeb2;
            }
          }
        }

        .right {
          .tagButton {
            font-family: ${(props) => props.theme.montserrat};
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: uppercase;
            padding: 0.3rem 0.8rem;
            border-radius: 0.3rem;
            letter-spacing: 1px;
            cursor: pointer;
            border: none;
            outline: none;
            color: #f2f2f7;
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
          }
        }
      }
    }
  }

  @media screen and (max-width: 991px) {
    width: 70%;
  }

  @media screen and (max-width: 768px) {
    width: 80%;
  }

  @media screen and (max-width: 480px) {
    width: 90%;

    .container {
      &__searchBox {
        margin-bottom: 2rem;

        input {
          padding: 0.7rem 1.5rem;
          font-size: 0.85rem;
        }
      }

      &__list {
        &--item {
          margin-bottom: 2rem;

          .left {
            .avatar {
              height: 3rem;
              width: 3rem;
              margin-right: 0.5rem;
            }

            .stats {
              &__username {
                font-size: 1rem;
              }

              &__joindate {
                font-size: 0.7rem;
              }
            }
          }

          .right {
            .tagButton {
              font-size: 0.75rem;
              padding: 0.2rem 0.8rem;
            }
          }
        }
      }
    }
  }
`;
