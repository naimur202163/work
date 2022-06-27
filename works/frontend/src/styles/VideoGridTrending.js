import styled from "styled-components";

const VideoGridTrending = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;

  @media screen and (max-width: 870px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export default VideoGridTrending;
