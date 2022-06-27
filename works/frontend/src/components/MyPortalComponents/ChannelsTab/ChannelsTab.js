import React from "react";
import styled from "styled-components";
import ChannelOptions from "./ChannelOptions";
import UserRoleButton from "../SmallComponents/UserRoleButton";
import Moment from "react-moment";
import Skeleton from "../../../skeletons/ChannelSkeleton";

const ChannelsTab = ({ channels, loading }) => {
  const options = [
    {
      icon: <i className="far fa-trash-alt" />,
      text: "Remove Channel",
    },

    {
      icon: <i className="far fa-flag"></i>,
      text: "Report Channel",
    },
  ];

  const isBadgeOrAvatar = (item) => {
    const image = !item.avatar ? item.visitorBadge.imgPath : item.avatar;

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

  const getUserRole = (userrole) => {
    switch (userrole) {
      case 0:
        return "Freeloader";
      case 1:
        return "Tribe";
      case 2:
        return "Warrior";
      default:
        return "Freeloader";
    }
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <ChannelsTabStyled>
      <div className="container">
        {!channels?.length && (
          <div className="notFound">Not subscribed to any channels yet!</div>
        )}

        {channels &&
          channels.length > 0 &&
          channels.map((item, i) => (
            <div key={i} className="container__item">
              <div className="container__item--left">
                <div className="avatar">{isBadgeOrAvatar(item)}</div>

                <div className="stats">
                  <div className="stats__username">{item.username}</div>
                  <div className="stats__joindate">
                    Connected since <Moment fromNow>{item.createdAt}</Moment>
                  </div>
                </div>
              </div>

              <div className="container__item--right">
                <div className="button">
                  <UserRoleButton type={item.userrole}>
                    {getUserRole(item.userrole)}
                  </UserRoleButton>
                </div>

                <ChannelOptions options={options} />
              </div>
            </div>
          ))}
      </div>
    </ChannelsTabStyled>
  );
};

export default ChannelsTab;

const ChannelsTabStyled = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 2.5rem 0;
  font-family: ${(props) => props.theme.montserrat};

  .container {
    width: 50%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &__item {
      margin-bottom: 2rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;

      &--left {
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

      &--right {
        display: flex;
        align-items: center;

        .button {
          margin-right: 0.5rem;
        }

        .options {
          position: relative;

          &__icon {
            i {
              font-size: 1.1rem;
              color: #f2f2f7;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .container {
      width: 90%;
    }
  }

  @media screen and (max-width: 480px) {
    .container {
      &__item {
        &--left {
          .avatar {
            height: 3rem;
            width: 3rem;
            margin-right: 1rem;

            .imageBadge {
              .badge {
                height: 4rem;
              }
            }
          }

          .stats {
            &__username {
              font-size: 1rem;
            }

            &__joindate {
              font-size: 0.8rem;
            }
          }
        }

        &--right {
          .button {
            margin-right: 0.25rem;
          }
        }
      }
    }
  }

  @media screen and (max-width: 390px) {
    .container {
      &__item {
        &--left {
          .avatar {
            .imageBadge {
              .badge {
                height: 3rem;
              }
            }
          }

          .stats {
            &__username {
              font-size: 0.9rem;
            }

            &__joindate {
              font-size: 0.7rem;
            }
          }
        }
      }
    }
  }
`;
