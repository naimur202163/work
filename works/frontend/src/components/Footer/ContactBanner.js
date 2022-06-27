import React, { useState } from "react";
import styled from "styled-components";
import Backdrop from "../Backdrop";
import ContactForm from "./ContactForm";

const ContactBanner = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <BannerComponent>
        <p>We're a Grassroots Co-op</p>
        <p>Together - We can do better</p>
        <h1>
          GIVE US FEEDBACK ON HOW TO
          <br />
          IMPROVE OUR COMMUNITY
        </h1>

        <button onClick={() => setIsContactOpen(true)}>Contact Us</button>
      </BannerComponent>
      {/* render contact banner */}
      {isContactOpen ? (
        <>
          <ContactForm close={() => setIsContactOpen(false)} />
          <Backdrop close={() => setIsContactOpen(false)} />
        </>
      ) : null}
    </>
  );
};

export default ContactBanner;

const BannerComponent = styled.div`
  background: linear-gradient(29deg, rgb(249, 154, 45), rgb(246, 92, 139) 71%);
  padding: 70px 120px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    text-transform: uppercase;
    font-size: 0.8rem;
    color: #fff;
  }

  h1 {
    text-transform: uppercase;
    font-size: 4.5rem;
    color: #fff;
    font-weight: 300;
    line-height: 1.2;
    text-align: center;
    margin-bottom: 3rem;
  }

  button {
    font-size: 0.8rem;
    text-transform: uppercase;
    font-weight: 300;
    padding: 1rem 3rem;
    border-radius: 0.4rem;
    border: 2px solid #fff;
    background-color: transparent;
    color: #fff;
    transition: all 0.2s ease;

    &:hover {
      background-color: #fff;
      border: 2px solid #fff;
      color: rgb(249, 154, 45);
    }
  }

  @media (max-width: 600px) {
    padding: 70px;
  }

  @media (max-width: 480px) {
    padding: 50px;

    h1 {
      margin-bottom: 1.5rem;
    }
  }

  @media (max-width: 414px) {
    padding: 50px 30px;
    h1 {
      font-size: 2.8rem;
    }
  }
`;
