import styled from "styled-components";

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 13px;
  object-fit: fill;
  padding: 2px;
  background-color: transparent;

  @media screen and (max-width: 500px) {
    width: 26px;
    height: 26px;
    border-radius: 13px;
  }
`;

export const VideoAvatar = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  object-fit: fill;
  padding: 2px;
  background-color: transparent;

  @media screen and (max-width: 500px) {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
`;

export default Avatar;
