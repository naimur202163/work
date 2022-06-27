import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
  padding-bottom: 7rem;
  min-height: 100vh;

  img {
    width: 106px;
    height: 106px;
    border-radius: 53px;
    margin-bottom: 0.8rem;
    object-fit: cover;
  }

  .channel {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 500px) {
    width: 90%;
    margin: 0 auto;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ChannelTabChannels = () => {
  const { isFetching, channels } = useSelector((state) => state.profile);

  if (!isFetching && !channels.length) {
    return <p>Not subscribed to any channels yet</p>;
  }

  return (
    <Wrapper>
      {channels?.map((channel) => (
        <Channel channel={channel} />
      ))}
    </Wrapper>
  );
};

const Channel = ({ channel }) => {
  const channelAvatar = channel.avatar
    ? channel.avatar
    : channel.visitorBadge.imgPath;
  return (
    <Link to={`/channel/${channel.username}`} key={channel.id}>
      <div className="channel">
        <img src={channelAvatar} alt="avatar" />
        <h3>{channel.username}</h3>
        <p className="secondary">{channel.subscribersCount} subscribers</p>
      </div>
    </Link>
  );
};

export default ChannelTabChannels;
