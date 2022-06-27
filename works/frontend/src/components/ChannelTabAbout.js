import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  padding-bottom: 7rem;
  min-height: 100vh;
`;

const ChannelTabAbout = () => {
  const about = useSelector((state) => state.profile.channelDescription);
  return (
    <Wrapper>
      <p>{about ? about : "No description for this channel"}</p>
    </Wrapper>
  );
};

export default ChannelTabAbout;
