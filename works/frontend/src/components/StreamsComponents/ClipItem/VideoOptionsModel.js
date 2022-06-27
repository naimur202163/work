import React from "react";
import styled, { keyframes } from "styled-components";
import { useMediaQuery } from "react-responsive";

const DesktopStyles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "0.3rem",
};

const MobileStyles = {
  position: "fixed",
  bottom: "0",
  left: "0",
};

const VideoOptionsModel = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 481px)",
  });

  // const isMobile = useMediaQuery({
  //   query: "(max-width: 480px)",
  // });

  return (
    <VideoOptionsModelStyled
      style={isDesktopOrLaptop ? DesktopStyles : MobileStyles}
    >
      <div className="options">
        <div className="options__item">
          <span className="text">Someone to share</span>
          <i className="icon fas fa-share-alt" />
        </div>

        <div className="options__item">
          <span className="text">Add to your library</span>
          <i className="icon fas fa-book-medical" />
        </div>
      </div>
    </VideoOptionsModelStyled>
  );
};

export default VideoOptionsModel;

const openModel = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const VideoOptionsModelStyled = styled.div`
  height: auto;
  background: #2c2c2e;
  overflow-x: hidden;
  overflow-y: auto;
  transition: all 0.3s;
  z-index: 1000;
  font-family: ${(props) => props.theme.montserrat};
  transition: all 1s ease;
  animation: ${openModel} 0.2s ease;
  padding: 1rem;
  width: 40%;

  .options {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &__item:not(:last-child) {
      margin-bottom: 0.5rem;
      padding-bottom: 0.5rem;
    }

    &__item {
      display: flex;
      align-items: center;
      cursor: pointer;

      .text {
        padding-right: 1rem;
        font-weight: 400;
        font-size: 0.9rem;
      }

      .icon {
        font-size: 1.2rem;
      }
    }
  }

  @media screen and (max-width: 768px) {
    width: 60%;
  }

  @media screen and (max-width: 480px) {
    width: 100%;

    .options {
      &__item {
        display: flex;
        align-items: center;
        cursor: pointer;

        .text {
          font-weight: 500;
          font-size: 0.8rem;
        }

        .icon {
          font-size: 1rem;
        }
      }
    }
  }
`;
