import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { closeSidebar } from "../actions";

const Wrapper = styled.div`
  max-height: 16rem;
  overflow-y: auto;
  overflow-x: hidden;
  width: auto;

  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #666;
    border-radius: 10px;
    cursor: pointer;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #444;
  }

  h4 {
    text-transform: uppercase;
    margin-bottom: 0.5rem;
    letter-spacing: 1.2px;
    color: ${(props) => props.theme.secondaryColor};
    padding-left: 1.5rem;
  }

  .avatar-box {
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px;
    background-color: transparent;
    margin-right: 0.5rem;

    .avatar-image {
      height: 1.8rem;
      width: auto;
    }

    .png-img {
      height: 2.5rem;
      width: auto;
    }

    .custom-image {
      height: 2.3rem;
      width: auto;
      object-fit: cover;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
    }
  }

  .channel {
    display: flex;
    align-items: center;
    padding: 0.2rem 0;
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
  }

  .channel:hover {
    cursor: pointer;
    background: ${(props) => props.theme.darkGrey};
  }
`;

const Subscriptions = ({ channels, closeSidebar }) => {
  return (
    <Wrapper>
      {channels && channels.length > 0 && <h4>My Streams</h4>}
      {channels?.map((channel) => {
        const { visitorBadge } = channel;
        const isPngOrJpg = () => {
          const image =
            channel.avatar === null ? visitorBadge?.imgPath : channel.avatar;

          if (image && (image.includes(".png") || image.includes(".svg"))) {
            return (
              <img
                className={`${image.includes(".png") ? "png-img" : "avatar-image"
                  }`}
                src={image}
                alt="badge"
              />
            );
          } else {
            return <img className="custom-image" src={image} alt="badge" />;
          }
        };

        return (
          <Link
            key={channel.id}
            onClick={() => closeSidebar()}
            to={`/channel/${channel.username}`}
          >
            <div className="channel">
              <div className="avatar-box">{isPngOrJpg()}</div>
              <span>{channel.username}</span>
            </div>
          </Link>
        );
      })}
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  channels: state.user.channels,
});

export default connect(mapStateToProps, {
  closeSidebar,
})(Subscriptions);
