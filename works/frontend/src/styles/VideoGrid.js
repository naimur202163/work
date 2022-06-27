import styled from "styled-components";

const VideoGrid = styled.div`
  padding: 0 5rem 3rem 5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(242, 242, 247, 0.2);

  @media screen and (max-width: 870px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 0 1rem 3rem 1rem;
  }
`;

export default VideoGrid;
