import React from "react";
import { Row, Col } from "react-grid-system";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// package 1 animation
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

// package 2 animation
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

// package 3 animation
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

const Package = ({ stepper, choosePackage, setChoosePackage }) => {
  return (
    <PackageComponent>
      <h2>Choose Your Package</h2>

      <Row>
        <Col lg={4} md={6} sm={12}>
          <motion.div
            variants={packageVariants1}
            initial="hidden"
            animate="visible"
            className={`rn-pricing rn-pricing-1 ${
              choosePackage === "FREE" && "PackageActive"
            }`}
          >
            <div
              className="pricing-table-inner"
              onClick={() => setChoosePackage("FREE")}
            >
              <div className="pricing-header">
                <h4 className="title" style={{ marginBottom: "40px" }}>
                  FREE
                </h4>
                <div className="pricing">
                  {/* <span className="price"></span> */}
                  <h4 className="" style={{ marginBottom: "0px" }}>
                    Freeloader
                  </h4>
                  <div>(Community)</div>
                </div>
                <img src="/assets/logo/logo-1.png" alt="Digital Agency" />
              </div>
              <div
                className="pricing-body"
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
                <span className="rn-btn">
                  {choosePackage === "FREE" ? (
                    <>
                      <i className="fas fa-check-circle" /> SELECTED
                    </>
                  ) : (
                    "Try It!"
                  )}
                </span>
              </div>
            </div>
          </motion.div>
        </Col>

        <Col lg={4} md={6} sm={12}>
          <motion.div
            variants={packageVariants2}
            initial="hidden"
            animate="visible"
            className={`rn-pricing rn-pricing-2 ${
              choosePackage === "BASIC" && "PackageActive"
            }`}
          >
            <div
              className="pricing-table-inner"
              onClick={() => setChoosePackage("BASIC")}
            >
              <div className="pricing-header">
                <h4 className="title" style={{ marginBottom: "40px" }}>
                  ALMOST FREE ($5/year)
                </h4>
                <div className="pricing">
                  {/* <span className="price"></span> */}
                  <h4 className="" style={{ marginBottom: "0px" }}>
                    Co-Op Members
                  </h4>
                  <div>(Socialites)</div>
                </div>
                <img src="/assets/logo/logo-2.png" alt="Digital Agency" />
              </div>
              <div
                className="pricing-body"
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
                <span className="rn-btn">
                  {choosePackage === "BASIC" ? (
                    <>
                      <i className="fas fa-check-circle" /> SELECTED
                    </>
                  ) : (
                    "Let's Go!"
                  )}
                </span>
              </div>
            </div>
          </motion.div>
        </Col>

        <Col lg={4} md={6} sm={12}>
          <motion.div
            variants={packageVariants3}
            initial="hidden"
            animate="visible"
            className={`rn-pricing rn-pricing-3 ${
              choosePackage === "PREMIUM" && "PackageActive"
            }`}
          >
            <div
              className="pricing-table-inner"
              onClick={() => setChoosePackage("PREMIUM")}
            >
              <div className="pricing-header">
                <h4 className="title" style={{ marginBottom: "40px" }}>
                  Starting at $10/Year
                </h4>
                <div className="pricing">
                  {/* <span className="price"></span> */}
                  <h4 className="" style={{ marginBottom: "0px" }}>
                    WARRIORS
                  </h4>
                  <div>(The Creators)</div>
                </div>
                <img src="/assets/logo/logo-3.png" alt="Digital Agency" />
              </div>
              <div
                className="pricing-body"
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
                <span className="rn-btn">
                  {choosePackage === "PREMIUM" ? (
                    <>
                      <i className="fas fa-check-circle" /> SELECTED
                    </>
                  ) : (
                    "Let's Go!"
                  )}
                </span>
              </div>
            </div>
          </motion.div>
        </Col>

        <div className="footer">
          <div className="action">
            <span className="pointer">
              <Link to="/login">Login Instead!</Link>
            </span>
            {choosePackage && <button onClick={() => stepper(2)}>Next</button>}
          </div>
        </div>
      </Row>
    </PackageComponent>
  );
};

export default Package;

const PackageComponent = styled.div`
  padding: 2rem 1.5rem 3rem 1.5rem;
  background: ${(props) => props.theme.grey};
  border-radius: 4px;
  margin: 5rem auto;
  width: 90%;
  overflow-x: hidden;

  h2 {
    margin-bottom: 1.5rem;
  }

  /* package title */
  .title {
    color: #000;
    font-size: 1.7rem;
    font-weight: 400;
  }
  .pricing {
    color: #000;
    font-size: 1rem !important;

    h4 {
      color: #000;
      font-size: 1rem !important;
    }
  }

  /* package btn */
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
  .list-style--1 {
    list-style: none;
    color: #000;
    font-size: 1rem;
    margin-top: 15px;

    li {
      padding: 0.2rem 0;
      margin-right: 0rem;
    }
  }
  img {
    width: 100%;
  }
  .rn-pricing {
    padding: 25px;
    margin-bottom: 1.5rem;
    cursor: pointer;
  }
  .pricing-table-inner {
    text-align: center;
  }
  .rn-pricing-1 {
    background-color: #fff6dc;
    border: none !important;
  }

  .rn-pricing-2 {
    background-color: #ffe59e;
    border: none !important;
  }

  .rn-pricing-3 {
    background-color: #ffcc42;
    border: none !important;
  }

  .rn-pricing {
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

  .rn-pricing:hover {
    .title {
      color: #fff;
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

  .PackageActive {
    .title {
      color: #fff;
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
