import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import Button from "../styles/Button";
import {
  subscribeChannel,
  unsubscribeChannel,
} from "../actions";
import {
  SUBSCRIBE_FROM_CHANNEL_RECOMMENDATIONS,
  UNSUBSCRIBE_FROM_CHANNEL_RECOMMENDATIONS,
  SUBSCRIBE_FROM_SEARCH_RESULTS,
  UNSUBSCRIBE_FROM_SEARCH_RESULTS,
} from "../actions/types";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2rem 0;

  .avatar-channel {
    display: flex;
    align-items: center;
  }

  .subscribe-channel {
    display: flex;
    align-items: center;
  }

  .description {
    width: 90%;
  }

  .avatar-box {
    height: 7rem;
    width: 7rem;
    border-radius: 50%;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    margin-right: 0.3rem;

    .avatar-image {
      height: 100%;
      width: 100%;
    }

    .png-img {
      height: 100%;
      width: 100%;
    }

    .custom-image {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
    }
  }

  p span:first {
    padding-right: 0.6rem;
  }

  @media screen and (max-width: 580px) {
    font-size: 0.9rem;

    button {
      font-size: 0.9rem;
    }

    img {
      width: 100px;
      height: 100px;
      border-radius: 50px;
    }
  }

  @media screen and (max-width: 510px) {
    p.description {
      display: none;
    }
  }

  @media screen and (max-width: 450px) {
    img {
      width: 50px;
      height: 50px;
      border-radius: 25px;
    }
    .avatar-box{
      height: 4rem;
      width: 4rem;
    }

  }

  @media screen and (max-width: 420px) {
    .to-hide {
      display: none;
    }
  }
`;

const ChannelInfo = ({
  search,
  channel,
  unsubscribeChannel,
  subscribeChannel,
}) => {
  const handleSubscribe = () => {
    subscribeChannel({
      channel: {
        avatar: channel.avatar,
        id: channel.id,
        username: channel.username,
        visitorBadge: {
          'imgPath': channel.badge
        }
      },
      type: !search
        ? SUBSCRIBE_FROM_CHANNEL_RECOMMENDATIONS
        : SUBSCRIBE_FROM_SEARCH_RESULTS,
    });
  };

  const handleUnsubscribe = () => {
    unsubscribeChannel({
      type: !search
        ? UNSUBSCRIBE_FROM_CHANNEL_RECOMMENDATIONS
        : UNSUBSCRIBE_FROM_SEARCH_RESULTS,
      channelId: channel.id,
    });
  };

  let visitorBadge = channel.badge;

  const isPngOrJpg = () => {
    const image =
      channel.avatar === null
        ? visitorBadge && visitorBadge
        : channel.avatar;

    if (image && (image.includes(".png") || image.includes(".svg"))) {
      return (
        <img
          className={`${image.includes(".png") ? "png-img" : "avatar-image"}`}
          src={image}
          alt="badge"
        />
      );
    } else {
      return <img className="custom-image" src={image} alt="badge" />;
    }
  };

  return (
    <Wrapper>
      <Link to={`/channel/${channel.username}`} className="avatar-channel">
        <div className="avatar-box">{isPngOrJpg()}</div>
        <div className="channel-info-meta">
          <h3>{channel.username}</h3>
          <p className="secondary">
            <span className="to-hide">{channel.videosCount} videos</span>
          </p>
          {channel.channelDescription && (
            <p className="description secondary">
              {channel.channelDescription?.length < 65
                ? channel.channelDescription
                : channel.channelDescription?.substr(0, 65)}
            </p>
          )}
        </div>
      </Link>

      {!channel.isMe && channel.userrole === 2 && !channel.isSubscribed && (
        <Button onClick={handleSubscribe}>Add to Streams</Button>
      )}

      {!channel.isMe && channel.isSubscribed && (
        <Button grey onClick={handleUnsubscribe}>
          Remove Stream
        </Button>
      )}
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  badges: state.badges,
  userSettings: state.userSettings,
});

export default connect(mapStateToProps, {
  subscribeChannel,
  unsubscribeChannel,
})(ChannelInfo);
