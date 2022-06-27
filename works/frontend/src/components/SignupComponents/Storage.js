import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-grid-system";
import { useSelector } from "react-redux";

const StorageComponent = styled.div`
  padding: 2rem 1.5rem 3rem 1.5rem;
  background: ${(props) => props.theme.grey};
  border-radius: 4px;
  margin: 5rem auto;

  width: 90%;

  h2 {
    text-transform: capitalize;
    margin-bottom: 1.5rem;
  }

  .container {
    width: 100%;
  }

  .selectedCard {
    background-image: linear-gradient(
      29deg,
      rgb(249, 154, 45),
      rgb(246, 92, 139) 71%
    );
    color: #fff !important;
  }

  .storage {
    height: 20rem;
    background-color: #fff6dc;
    margin-bottom: 1.5rem;
    border-radius: 0.4rem;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-out;
    cursor: pointer;
    position: relative;
    padding: 1.5rem 1rem;

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    color: #000;

    .Selected {
      position: absolute;
      top: 0.7rem;
      left: 0.7rem;
      font-size: 1.6rem;
      color: #fff;
    }

    span {
      text-transform: uppercase;
      font-size: 1.2rem;
      font-weight: 300;
      padding: 1rem 0.5rem;
      margin-bottom: 1rem;
      text-align: center;
      line-height: 1.3;
    }

    .main {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    h2 {
      font-size: 2.2rem;
      font-weight: 500;
      background: linear-gradient(to right, #f81f01, #ee076e);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .icon {
      height: 4rem;
      width: 4rem;
      border-radius: 50%;
      background-image: linear-gradient(
        29deg,
        rgb(249, 154, 45),
        rgb(246, 92, 139) 71%
      );
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;

      i {
        font-size: 2rem;
      }
    }

    .title {
      display: flex;
      align-items: flex-end;

      p {
        padding: 1rem 0;
      }

      h1 {
        font-size: 2.5rem;
        font-weight: 500;
      }
    }

    &:hover {
      background-image: linear-gradient(
        29deg,
        rgb(249, 154, 45),
        rgb(246, 92, 139) 71%
      );
      color: #fff !important;

      h2 {
        background: linear-gradient(to right, #fff, #fff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    &:hover {
      .main {
        .icon {
          background-image: linear-gradient(145deg, #fff 0%, #fff 100%);
          i {
            color: #999;
          }
        }
      }
    }
  }
  .selectedCard {
    .main {
      .icon {
        background-image: linear-gradient(145deg, #fff 0%, #fff 100%);
        i {
          color: #999;
        }
      }
    }

    h2 {
      background: linear-gradient(to right, #fff, #fff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .loadingDiv {
    margin: 2rem auto;
    width: 100%;

    span {
      font-size: 1.6rem;
      color: ${(props) => props.theme.red};
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

const Storage = ({
  stepper,
  storageSelected,
  setStorageSelected,
  page = "signup",
}) => {
  const storage = useSelector((state) => state.storage);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(1);
  };

  const convertSize = (mb) => {
    if (!mb) {
      return alert("Please provide size");
    }

    let size;
    if (mb >= 1000000) {
      size = mb / 1000000;
    } else {
      size = mb / 1000;
    }

    return size;
  };

  return (
    <StorageComponent>
      <h2>Choose your storage</h2>

      <Row className="container">
        {!storage.isFetching &&
          storage.storages &&
          storage.storages.length > 0 &&
          storage.storages.map((item, i) => (
            <Col key={item.id} lg={3} md={4} sm={12}>
              <div
                className={`storage ${
                  storageSelected === item.id ? "selectedCard" : null
                }`}
                onClick={() => setStorageSelected(item.id)}
              >
                <span>{item.name}</span>

                <div className="main">
                  <div className="icon">
                    <i className="fas fa-database" />
                  </div>
                  <h2>
                    {addDecimals(convertSize(item.size))}{" "}
                    {item.size >= 1000000 ? "TB" : "GB"}
                  </h2>
                  <div className="title">
                    <h1>{item.cost}$/</h1>
                    <p>{item.period}</p>
                  </div>
                </div>

                {storageSelected === item.id ? (
                  <i className="Selected fas fa-check-circle" />
                ) : null}
              </div>
            </Col>
          ))}

        {storage.isFetching ? (
          <div className="loadingDiv">
            <span>Loading Storages</span>
          </div>
        ) : null}
      </Row>

      {storageSelected && (
        <div className="footer">
          <div className="action">
            {page === "signup" && (
              <span className="pointer" onClick={() => stepper(3)}>
                Go Back!
              </span>
            )}
            {page === "updateSubscription" && (
              <span className="pointer" onClick={() => stepper(1)}>
                Go Back!
              </span>
            )}
            {page === "signup" && (
              <button onClick={() => stepper(5)}>Next</button>
            )}
            {page === "updateSubscription" && (
              <button onClick={() => stepper(3)}>Next</button>
            )}
          </div>
        </div>
      )}
    </StorageComponent>
  );
};

export default Storage;
