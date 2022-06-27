import React from "react";
import { Row, Col } from "react-grid-system";
import styled from "styled-components";
import { motion } from "framer-motion";

const packageVariants1 = {
  hidden: {
    opacity: 0,
    x: "-100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      duration: 0.5,
    },
  },
};

const packageVariants2 = {
  hidden: {
    opacity: 0,
    y: "-100vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      duration: 0.5,
      delay: 0.5,
    },
  },
};

const packageVariants3 = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      duration: 0.5,
      delay: 1,
    },
  },
};

const SubscriptionCard = ({
  title,
  description,
  packageType,
  userrole,
  manageSubscription,
}) => {
  const isSelected = (currentRole) => (userrole === currentRole ? true : false);
  return (
    <SubscriptionComponent>
      <Row>
        <Col lg={4} md={6} sm={12}>
          <motion.div
            variants={packageVariants1}
            initial="hidden"
            animate="visible"
            className={`rn-subscription rn-subscription-1 ${
              userrole === 0 && "PackageActive"
            }`}
          >
            <div
              className="subscription-table-inner"
              onClick={manageSubscription}
            >
              <div className="subscription-header">
                <div className="subscription">
                  <h2 style={{ marginBottom: "0px" }}>Freeloader</h2>
                  <div>(Community)</div>
                </div>
                <img src="/assets/logo/logo-1.png" alt="Digital Agency" />
              </div>
              <div
                className="subscription-body"
                style={{ textAlign: "center", marginBottom: "1.5rem" }}
              >
                <ul className="list-style--1">
                  <li>Watch & Learn.</li>
                  <li>Tip Content Creators.</li>
                  <li>Explore our platform.</li>
                  <li>Eventually join the Co-Op!</li>
                </ul>
              </div>
              <div className="pricing-footer">
                {isSelected(0) && (
                  <>
                    <a href="/"className="rn-btn">
                      <i className="fas fa-check-circle" /> CURRENT MEMBERSHIP
                    </a>
                  </>
                )}
              </div>
              {!isSelected(0) && (
                <div className="subscription-footer">
                  <a href="/" className="rn-btn" onClick={manageSubscription}>
                    {" "}
                    Try it!{" "}
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </Col>

        <Col lg={4} md={6} sm={12}>
          <motion.div
            variants={packageVariants2}
            initial="hidden"
            animate="visible"
            className={`rn-subscription rn-subscription-2 ${
              userrole === 1 && "PackageActive"
            }`}
          >
            <div
              className="subscription-table-inner"
              onClick={manageSubscription}
            >
              <div className="subscription-header">
                <div className="subscription">
                  <h2 style={{ marginBottom: "0px" }}>Co-Op Members</h2>
                  <div>(Socialites)</div>
                </div>
                <img src="/assets/logo/logo-2.png" alt="Digital Agency" />
              </div>
              <div
                className="subscription-body"
                style={{ textAlign: "center", marginBottom: "1.5rem" }}
              >
                <ul className="list-style--1">
                  <li>Build Community.</li>
                  <li>Watch unlimited content.</li>
                  <li>Share content with friends.</li>
                  <li>Create a library of lessons.</li>
                </ul>
              </div>
              <div className="pricing-footer">
                {isSelected(1) && (
                  <>
                    <a href="/"className="rn-btn">
                      <i className="fas fa-check-circle" /> SELECTED
                    </a>
                  </>
                )}
              </div>
              {!isSelected(1) && (
                <div className="subscription-footer">
                  <a href="/"className="rn-btn" onClick={manageSubscription}>
                    {" "}
                    Let's Go!{" "}
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </Col>

        <Col lg={4} md={6} sm={12}>
          <motion.div
            variants={packageVariants3}
            initial="hidden"
            animate="visible"
            className={`rn-subscription rn-subscription-3 ${
              userrole === 2 && "PackageActive"
            }`}
          >
            <div
              className="subscription-table-inner"
              onClick={manageSubscription}
            >
              <div className="subscription-header">
                <div className="subscription">
                  <h2 style={{ marginBottom: "0px" }}>WARRIORS</h2>
                  <div>(The Creators)</div>
                </div>
                <img src="/assets/logo/logo-3.png" alt="Digital Agency" />
              </div>
              <div
                className="subscription-body"
                style={{ textAlign: "center", marginBottom: "1.5rem" }}
              >
                <ul className="list-style--1">
                  <li>Create Content.</li>
                  <li>Recieve Community Support.</li>
                  <li>Build a National Following.</li>
                  <li>Generate Income.</li>
                </ul>
              </div>
              <div className="pricing-footer">
                {isSelected(2) && (
                  <>
                    <a href="/"className="rn-btn">
                      <i className="fas fa-check-circle" /> CURRENT SUBSCRIPTION
                    </a>
                  </>
                )}
              </div>
              {!isSelected(2) && (
                <div className="subscription-footer">
                  <a href="/"className="rn-btn" onClick={manageSubscription}>
                    {" "}
                    Let's Go!{" "}
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </Col>
      </Row>
    </SubscriptionComponent>
  );
};

export default SubscriptionCard;

const SubscriptionComponent = styled.div`
  padding-top: 2rem;
  border-radius: 4px;
  overflow-x: hidden;

  h2 {
    margin-bottom: 1.5rem;
  }

  .subscription {
    color: #000;
    font-size: 1rem !important;

    h4 {
      color: #000;
      font-size: 1rem !important;
    }
  }

  .rn-btn {
    padding: 0.5rem 1rem;
    background-color: #fff;
    color: #333;
    font-weight: 300;
    font-size: 1rem;
    border-radius: 0.2rem;
    border: none;
    outline: none;
    text-decoration: none;
    box-shadow: 2px 2px 5px rgba(#999, 0.1);

    i {
      font-size: 1.2rem;
      color: #333;
      margin-right: 0.5rem;
    }
  }

  /* package overall styling */
  .PackageActive {
    background-image: linear-gradient(
      29deg,
      rgb(249, 154, 45),
      rgb(246, 92, 139) 71%
    );
  }
  .PackageActive {
    .subscription {
      color: #fff;
      h4 {
        color: #fff;
      }
    }
    .pricing {
      color: #fff;

      h4 {
        color: #fff;
      }
    }
    .list-style--1 {
      color: #fff;
    }
  }

  .list-style--1 {
    list-style: none;
    color: #000;
    font-size: 1rem;
    margin-top: 15px;
    flex-direction: column;

    li {
      margin-right: 0;
    }
  }
  img {
    width: 100%;
  }
  .rn-subscription {
    padding: 25px;
    margin-bottom: 1.5rem;
    cursor: pointer;
  }
  .subscription-table-inner {
    text-align: center;
  }
  .rn-subscription-1 {
    background-color: #fff6dc;
    border: none !important;
  }

  .rn-subscription-2 {
    background-color: #ffe59e;
    border: none !important;
  }

  .rn-subscription-3 {
    background-color: #ffcc42;
    border: none !important;
  }

  .rn-subscription {
    border: 2px solid #f42958;
    border-radius: 5px;
    transition: all 0.6s cubic-bezier(0.33, 0.84, 0.31, 0.98);
    transform-style: preserve-3d;
    position: relative;
    z-index: 2;

    &::before {
      z-index: -1;
      display: inline-block;
      content: "";
      -webkit-transition: all 0.6s cubic-bezier(0.33, 0.84, 0.31, 0.98);
      transition: all 0.6s cubic-bezier(0.33, 0.84, 0.31, 0.98);
      opacity: 0;
      border-radius: 5px;
      background-color: linear-gradient(
        29deg,
        rgb(249, 154, 45),
        rgb(246, 92, 139) 71%
      );
      background-image: linear-gradient(
        29deg,
        rgb(249, 154, 45),
        rgb(246, 92, 139) 71%
      );
      position: absolute;
      top: -2px;
      right: -2px;
      bottom: -2px;
      left: -2px;
    }

    &:hover,
    &.active {
      &::before {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1;
      }
    }
  }

  .rn-subscription:hover {
    .subscription {
      color: #fff;

      h4 {
        color: #fff;
      }
    }
    .list-style--1 {
      color: #fff;
    }
  }
`;
