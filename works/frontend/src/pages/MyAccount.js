// This is new (my account) page
import React, { useState, useContext, useEffect, useMemo } from "react";
import styled from "styled-components";
import BackIcon from "../assets/Icons/back.svg";
import CaretRightIcon from "../assets/Icons/caret-right.svg";
import ManageSubscription from "../components/MyAccountComponents/ManageSubscription/ManageSubscription";
import KarmaHistory from "../components/MyAccountComponents/KarmaHistory/KarmaHistory";
import TransactionHistory from "../components/MyAccountComponents/TransactionHistory/TransactionHistory";
import { GlobalContext } from "../context/GlobalContext";
import { useDispatch, useSelector } from "react-redux";
import { getKarmaFilterSetting, getKarmaSentByUserTransactions, getUserTransactions } from "../actions";
import api from "../services/api";
import { SET_FILTERED_DATA } from "../actions/types";

const MyAccount = ({ close }) => {
  const [showManageSubscription, setShowManageSubscription] = useState(false);
  const [showKarmaHistory, setShowKarmaHistory] = useState(false);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const [fetchingFilteredData, setFetchingData] = useState(false);
  const { showMyAccount } = useContext(GlobalContext);


  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, isLoading, karmaSent } = useSelector((state) => state.userTransactions);
  const { id: userId } = useSelector(state => state.user)
  const karmaFilters = useSelector((state) => state.KarmaFilterSetting);

  const dispatch = useDispatch();

  const allTransactions = data ? data.concat(karmaSent) : [];
  let transactionsData = allTransactions
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)


  useEffect(() => {
    dispatch(getUserTransactions(userId, null, rowsPerPage));
    dispatch(getKarmaSentByUserTransactions(userId));
  }, []);
  useEffect(() => {
    const filterType = showKarmaHistory ? 2 : 1; // 1. Transaction filters 2. Karam Filters
    dispatch(getKarmaFilterSetting(filterType));

  }, [showKarmaHistory])

  const handleFilterUpdate = async () => {
    try {
      setFetchingData(true)
      const res = await api.post(`users/userTransactions`, {
        userId: userId,
        starting_after: null,
        limit: rowsPerPage,
      });
      const karmaSent = await api.post(`users/karmaSentByUser`, {
        userId: userId,
        starting_after: null,
        limit: 10
      });
      dispatch({
        type: SET_FILTERED_DATA,
        payload: {
          data: res.data,
          karmaSent: karmaSent.data,
        },
      });
      setFetchingData(false)
    } catch (err) {
    }

  }

  const loadMoreTransactions = () => {
    try {
      const lastObject = data[data.length - 1];
      const starting_after = lastObject.id;
      dispatch(getUserTransactions(userId, starting_after, rowsPerPage));
    } catch (err) {
    }
  };

  if (showManageSubscription) {
    return (
      <ManageSubscription close={() => setShowManageSubscription(false)} />
    );
  }

  if (showKarmaHistory) {
    return <KarmaHistory
      close={() => setShowKarmaHistory(false)}
      karmaSent={karmaSent}
      karmaReceived={data}
      isLoading={isLoading}
      loadMoreTransactions={loadMoreTransactions}
      karmaFilters={karmaFilters}
      handleFilterUpdate={handleFilterUpdate}
      fetchingFilteredData={fetchingFilteredData}
    />;
  }

  if (showTransactionHistory) {
    return (
      <TransactionHistory
        close={() => setShowTransactionHistory(false)}
        transactions={transactionsData}
        isLoading={isLoading}
        loadMoreTransactions={loadMoreTransactions}
        karmaFilters={karmaFilters}
        handleFilterUpdate={handleFilterUpdate}
        fetchingFilteredData={fetchingFilteredData}

      />
    );
  }

  return (
    <MyAccountStyled>
      <div className={`wrapper ${showMyAccount && "ShowMyAccountPage"}`}>
        <div className="wrapper__header">
          <div onClick={close} className="backIcon">
            <img src={BackIcon} alt="" />
          </div>
          <div className="name">My Account</div>
        </div>

        <div className="wrapper__list">
          <div
            onClick={() => setShowManageSubscription(true)}
            className="wrapper__list--item"
          >
            <div className="left">
              <p className="title">Manage Subscription</p>
              <p className="infoText">Your Isutra subscription</p>
            </div>

            <div className="right">
              <img src={CaretRightIcon} alt="" />
            </div>
          </div>

          <div
            onClick={() => setShowKarmaHistory(true)}
            className="wrapper__list--item"
          >
            <div className="left">
              <p className="title">Karma History</p>
              <p className="infoText">
                Check all the karma you sent and received
              </p>
            </div>

            <div className="right">
              <img src={CaretRightIcon} alt="" />
            </div>
          </div>

          <div
            onClick={() => setShowTransactionHistory(true)}
            className="wrapper__list--item"
          >
            <div className="left">
              <p className="title">Transaction History</p>
              <p className="infoText">
                Check all your transaction on the platform
              </p>
            </div>

            <div className="right">
              <img src={CaretRightIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
    </MyAccountStyled>
  );
};

export default MyAccount;

const MyAccountStyled = styled.div`
  .wrapper {
    min-height: 100vh;
    height: auto;
    width: 100%;
    background-color: #1c1c1e;
    position: fixed;
    top: 0;
    left: 0;
    overflow-y: auto;
    z-index: 150;
    opacity: 0;
    transform: translateX(-100%);
    transition: all 1s ease;

    &__header {
      display: flex;
      align-items: center;
      padding: 1rem 5rem;
      border-bottom: 1px solid rgba(112, 112, 112, 0.4);

      .backIcon {
        margin-right: 1rem;
        cursor: pointer;

        img {
          height: 1rem;
          width: auto;
        }
      }

      .name {
        font-size: 1.2rem;
        font-weight: 400;
        text-transform: capitalize;
      }
    }

    &__list {
      width: 45%;
      margin: 2rem auto;
      min-width: 480px;

      &--item {
        margin-bottom: 1rem;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        background-color: #2c2c2e;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;

        p {
          font-family: ${(props) => props.theme.montserrat};
        }

        .title {
          color: #f2f2f7;
          font-size: 1.2rem;
          font-weight: 600;
          line-height: 1.3;
        }

        .infoText {
          font-size: 0.8rem;
          font-weight: 300;
          color: #d1d1d6;
        }

        .right {
          img {
            height: 0.8rem;
            width: auto;
          }
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    .wrapper {
      &__header {
        padding: 0.8rem 2rem;
      }

      &__list {
        width: 90%;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .wrapper {
      &__header {
        padding: 0.5rem 1.5rem;

        .name {
          font-size: 1rem;
        }
      }

      &__list {
        &--item {
          .title {
            font-size: 1rem;
          }

          .infoText {
            font-size: 0.7rem;
          }
        }
      }
    }
  }
`;
