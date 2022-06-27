import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const BadgeContainerVariants = {
  hidden: {
    opacity: 0,
    y: "-5rem",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      duration: 0.5,
    },
  },
};

const Badge = ({
  stepper,
  badgeSelected,
  setBadgeSelected,
  handleBadgeSubmit,
  badges,
  badgeLoading,
  choosePackage,
  completeSignup,
  page,
}) => {
  const badge = badges.find((badge) => badge.id === badgeSelected);
  if (badgeSelected && badge) {
    return (
      <SelectedContainer>
        <h2>
          Congrats! You selected <br />
          <span>{badge.name} </span>
        </h2>

        <div
          className="badge"
          onClick={() => {
            handleBadgeSubmit(badge.id);
          }}
        >
          <div className={`badge--img`}>
            <img src={badge.imgPath} alt={badge.name} />
          </div>

          <span className="badge--text">
            <i className="fas fa-check-circle" /> {badge.name}
          </span>
        </div>

        <div className="badgeAction">
          {page !== "updateSubscription" && (
            <button onClick={() => stepper(3)}>Next</button>
          )}
          {page === "updateSubscription" && choosePackage === "PREMIUM" && (
            <button onClick={() => stepper(2)}>Next</button>
          )}
          {page === "updateSubscription" &&
            (choosePackage === "BASIC" || choosePackage === "FREE") && (
              <button onClick={() => completeSignup()}>Next</button>
            )}
          <button onClick={() => setBadgeSelected(null)}>Choose Again</button>
          <button onClick={() => stepper(1)}>Back</button>
        </div>
      </SelectedContainer>
    );
  }

  return (
    <BadgeContainer>
      <h2>Choose Your Badge</h2>

      <h3>
        (This doesn't matter at all, just choose the badge you like! It can be
        changed later.)
      </h3>

      <motion.div
        variants={BadgeContainerVariants}
        initial="hidden"
        animate="visible"
        className="badges"
      >
        {badges && badges.length > 0 && (
          <>
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="badgeBox"
                onClick={() => {
                  handleBadgeSubmit(badge.id);
                }}
              >
                <div
                  className={`badgeBox--img ${
                    badgeSelected === badge.id && "badgeBox--img_Active"
                  }`}
                >
                  <img
                    className={
                      badge.imgPath.includes(".png") ? "png-img" : null
                    }
                    src={badge.imgPath}
                    alt={badge.name}
                  />
                </div>
                <span className={badgeSelected === badge.id && "text_Active"}>
                  {badgeSelected === badge.id && (
                    <i className="fas fa-check-circle" />
                  )}
                  {badge.name}
                </span>
              </div>
            ))}
          </>
        )}

        {badgeLoading && (
          <div className="loadingDiv">
            <span>Loading Badges</span>
          </div>
        )}

        <div className="footer">
          <div className="action">
            <span className="goBack" onClick={() => stepper(1)}>
              Back
            </span>
          </div>
        </div>
      </motion.div>
    </BadgeContainer>
  );
};

export default Badge;

const BadgeContainer = styled.div`
  padding: 2rem 1rem;
  background: ${(props) => props.theme.grey};
  border-radius: 4px;
  margin: 5rem auto;
  width: 90%;

  h2 {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }

  h3 {
    width: 90%;
    margin: 0.5rem auto 1rem auto;
    font-size: 0.9rem;
    color: #a6a6a6;
  }

  .emptyDiv,
  .loadingDiv {
    margin: 2rem auto;
    width: 90%;

    span {
      font-size: 1.6rem;
      color: ${(props) => props.theme.red};
    }
  }

  .badges {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
  }

  .badgeBox {
    height: 200px;
    flex-basis: 20%;
    -ms-flex: auto;
    width: 200px;
    position: relative;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .text_Active {
    color: ${(props) => props.theme.red};

    i {
      font-size: 1.2rem;
      padding: 0 0.5rem;
      color: ${(props) => props.theme.red};
    }
  }

  .goBack {
    font-size: 1rem;
    font-weight: 300;
    padding: 0.4rem 1.5rem;
    margin-right: 0.6rem;
    border: none;
    outline: none;
    background: #333;
    color: #fff;
    border-radius: 0.25rem;
    transition: all 0.2s ease;
    margin-bottom: 0.6rem;

    &:hover {
      background: ${(props) => props.theme.gradient};
      color: #fff !important;
      cursor: pointer;
      font-weight: 400;
    }
  }

  @media (max-width: 1333px) {
    .badgeBox {
      flex-basis: 33.33%;
    }
  }

  @media (max-width: 1073px) {
    .badgeBox {
      flex-basis: 33.33%;
    }
  }

  @media (max-width: 815px) {
    .badgeBox {
      flex-basis: 50%;
    }
  }

  @media (max-width: 555px) {
    .badgeBox {
      flex-basis: 100%;
    }
  }

  .badgeBox--img {
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    /* background: #fff; */
    box-shadow: 2px 2px 7px rgba(#999, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
  }

  .png-img {
    width: 7rem !important;
    height: auto;
    padding: 8px;
    margin-bottom: 8px;
  }

  .Active {
    border: 2px solid ${(props) => props.theme.red};
  }

  span {
    letter-spacing: 0.8px;
    color: ${(props) => props.theme.secondaryColor};
  }

  img {
    height: 3rem;
  }

  .footer {
    width: 100%;
    margin-top: 2rem;

    .action {
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        padding: 0.4rem 1rem;
        background: ${(props) => props.theme.gradient};
        color: ${(props) => props.theme.white};
        border: 1px solid ${(props) => props.theme.orange};
        border-radius: 3px;
        text-transform: uppercase;
        letter-spacing: 1.1px;
        margin: 0 1rem;
      }

      span {
        letter-spacing: 0.8px;
        color: ${(props) => props.theme.secondaryColor};
        margin: 0 1rem;
      }
    }
  }
`;

const SelectedContainer = styled.div`
  padding: 2rem;
  background: ${(props) => props.theme.grey};
  border-radius: 4px;
  margin: 5rem auto;
  width: 450px;

  h2 {
    font-size: 1.4rem;
    font-weight: 400;
    color: #fff;
    margin-bottom: 2rem;
    width: 100%;
    text-align: center;

    span {
      color: ${(props) => props.theme.red};
      font-weight: 300;
    }
  }

  .badge {
    min-height: 200;
    max-height: auto;
    width: 90%;
    padding: 1rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 0.5rem;
    margin: 0 auto 2rem auto;
    transition: all 0.2s ease;

    &:hover {
      cursor: pointer;
      background: ${(props) => props.theme.gradient};
    }

    &--img {
      img {
        width: 7rem !important;
        height: auto;
      }
    }

    &--text {
      font-size: 1rem;
      font-weight: 300;
    }
  }

  .badgeAction {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;

    button {
      flex-direction: column;
      width: 90%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      font-weight: 300;
      padding: 0.4rem 1.5rem;
      border: none;
      outline: none;
      background: #333;
      color: #fff;
      border-radius: 0.25rem;
      transition: all 0.2s ease;
      margin-bottom: 0.6rem;

      &:hover {
        background: ${(props) => props.theme.gradient};
        color: #fff;
        font-weight: 400;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .badge {
      width: 100%;
    }

    h2 {
      font-size: 1rem;
    }

    button {
      font-size: 0.9rem;
    }
  }

  @media screen and (max-width: 480px) {
    .badgeAction {
      button {
        width: 80%;
      }
    }
  }

  @media screen and (max-width: 414px) {
    padding: 1rem;
    width: 95%;
  }

  @media screen and (max-width: 375px) {
    .badgeAction {
      button {
        font-size: 0.8rem;
      }
    }
  }
`;
