import React from "react";
import styled from "styled-components";
import {
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

const SocialShare = [
  { Social: <FaFacebookF />, link: "https://www.facebook.com/eye.sutra/" },
  { Social: <FaInstagram />, link: "https://www.instagram.com/i.sutra.yoga/" },
];

const Footer = () => {
  return (
    <FooterComponent>
      <img
        className="footer--logo"
        src="/assets/footer/iSUTRA_logo_clean_white.png"
        alt="Isutra"
      />

      <ul className="footer--socialList">
        {SocialShare.map((val, i) => (
          <li className="footer--socialItem" key={i}>
            <a target="_blank" rel="noopener noreferrer" href={`${val.link}`}>
              {val.Social}
            </a>
          </li>
        ))}
      </ul>

      <p className="footer--copyright">
        Copyright © 2021 iSUTRA LLC. All Rights Reserved.
      </p>
    </FooterComponent>
  );
};

export default Footer;

const FooterComponent = styled.div`
  width: 100%;
  min-height: 8rem;
  max-height: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5rem;

  &::before {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-image: url("/assets/footer/bg.jpg");
    content: "";
    z-index: 1;
    opacity: 0.5;
  }

  .footer {
    &--socialList {
      display: flex;
      align-items: center;
      z-index: 2;
    }

    &--logo {
      height: 4rem;
      width: auto;
      cursor: pointer;
      transition: all 0.2s ease;
      z-index: 2;
      transform: translateX(-2rem);
    }

    &--socialItem {
      height: 3rem;
      width: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: 2px solid #c6c9d8;
      margin-right: 1rem;
      transition: all 0.3s ease;

      a {
        line-height: 0 !important;
        font-size: 1rem;
        color: #c6c9d8;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &:hover {
        background-color: #ffa200;
        border: 2px solid #ffa200;
        cursor: pointer;
        transform: translateY(-3px);

        a {
          color: #fff;
          transform: scale(1.05);
        }
      }
    }

    &--copyright {
      color: #c6c9d8;
      font-size: 0.9rem;
      z-index: 2;
    }
  }

  @media (max-width: 768px) {
    min-height: 7rem;

    .footer {
      &--logo {
        height: 3rem;
      }

      &--socialItem {
        height: 2.5rem;
        width: 2.5rem;
        margin-right: 0.7rem;

        a {
          font-size: 0.9rem;
        }
      }

      &--copyright {
        font-size: 0.8rem;
      }
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    padding: 1.5rem 0;

    .footer {
      &--logo {
        height: 3.2rem;
        transform: translateX(0);
        margin-bottom: 0.6rem;
      }

      &--socialList {
        margin-bottom: 0.6rem;
      }

      &--socialItem {
        height: 2rem;
        width: 2rem;
        margin-right: 0.5rem;

        a {
          font-size: 0.8rem;
        }
      }

      &--copyright {
        font-size: 0.7rem;
      }
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 4rem;
    padding: 1rem 0;
  }
`;
