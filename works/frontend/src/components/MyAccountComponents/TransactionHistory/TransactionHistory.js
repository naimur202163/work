import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import BackIcon from "../../../assets/Icons/back.svg";
import FilterIcon from "../../../assets/Icons/filter.svg";
import SortIcon from "../../../assets/Icons/caret-down.svg";
import useOnclickOutside from "react-cool-onclickoutside";
import TransactionSortModel from "./TransactionSortModel";
import TransactionFilterModel from "./TransactionFilterModel";
import TRANSFER_TYPES from '../../../utils/transferTypes';
import { addOrEditKarmaSetting, getKarmaFilterSetting } from "../../../actions";
import { useDispatch } from "react-redux";
import config from "../../../config/config";


const TransactionHistory = ({ close, transactions, isLoading, loadMoreTransactions, karmaFilters, handleFilterUpdate, fetchingFilteredData }) => {
  const dispatch = useDispatch();
  const [showTransactionFilterModel, setShowTransactionFilterModel] =
    useState(false);
  const [showTransactionSortModel, setShowTransactionSortModel] =
    useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const listInnerRef = useRef();
  const [sortBy, setSortBy] = useState('');
  const [sorted, setSorted] = useState([]);
  const [savingFilter, setSavingFilter] = useState(false);

  useEffect(() => {
    const sortArray = type => {
      const types = {
        mostRecent: 'mostRecent',
        lessRecent: 'lessRecent',
        mostExp: 'mostExp',
        lessExp: 'lessExp'
      };
      let sorted;
      if (type === 'mostExp') {
        sorted = [...transactions].sort((a, b) => (b.amount / 100) - (a.amount / 100));
        setSorted(sorted);
        return;
      } if (type === 'lessExp') {
        sorted = [...transactions].sort((a, b) => (a.amount / 100) - (b.amount / 100));
        setSorted(sorted);
      } else if (type === 'mostRecent') {
        sorted = [...transactions].sort((a, b) => b.created - a.created);
        setSorted(sorted);
      }
      else if (type === 'lessRecent') {
        sorted = [...transactions].sort((a, b) => a.created - b.created);
        setSorted(sorted);
      } else {
        setSorted(transactions);
      }
      setShowTransactionSortModel(false);

    };
    sortArray(sortBy);
  }, [sortBy, transactions]);

  const sortRef = useOnclickOutside(() => {
    setShowTransactionSortModel(false);
  });
  const filterRef = useOnclickOutside(() => {
    setShowTransactionFilterModel(false);
  });


  const getUserName = (row) => (row.metadata.transferType === TRANSFER_TYPES.REFERRAL
    ? row.metadata.referred_username
    : row.metadata.sender_username);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setRowsPerPage(rowsPerPage + 10);
        loadMoreTransactions(sortBy)
      }
    }
  };

  const onUpdateFilters = (selectedFilters) => {
    setSavingFilter(true);
    updateKarmaEditSettings(selectedFilters).then((res) => {
      setSavingFilter(false);
      setShowTransactionFilterModel(false);
      return handleFilterUpdate()
    })
  }

  const updateKarmaEditSettings = (selectedFilters) => new Promise((resolve) => {
    // FilterType 1 = transactions , 2 = karma
    const selectedFilterSetting = { ...selectedFilters, filterType: 1 }
    const res = dispatch(addOrEditKarmaSetting(selectedFilterSetting));
    resolve(res)
  });



  const getSortBy = (sortByTerm) => {
    switch (sortByTerm) {
      case 'mostRecent':
        return 'Most Recent';
      case 'lessRecent':
        return 'Less Recent';
      case 'mostExp':
        return 'Most Expensive';
      case 'lessExp':
        return 'Less Expensive';
      default:
        return 'Most Recent'
    }
  }
  return (
    <TransactionHistoryStyled>
      <div className="wrapper">
        <div className="wrapper__header">
          <div onClick={close} className="backIcon">
            <img src={BackIcon} alt="" />
          </div>
          <div className="name">Manage Transaction</div>
        </div>

        <p className="infoText">Check how your karma is flowing</p>

        <div className="wrapper__transactions">
          {showTransactionSortModel && (
            <TransactionSortModel
              doNotClose={sortRef}
              close={() => setShowTransactionSortModel(false)}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          )}
          {showTransactionFilterModel && (
            <TransactionFilterModel
              isFetching={karmaFilters.isFetching}
              filters={karmaFilters.filters}
              error={karmaFilters.error}
              doNotClose={filterRef}
              close={() => setShowTransactionFilterModel(false)}
              onUpdateFilters={onUpdateFilters}
              savingFilter={savingFilter}
            />
          )}

          <div className="wrapper__transactions--filterBox">
            <div className="left">
              <img
                ref={filterRef}
                onClick={() =>
                  setShowTransactionFilterModel(!showTransactionFilterModel)
                }
                src={FilterIcon}
                alt=""
              />
            </div>

            <div
              ref={sortRef}
              onClick={() =>
                setShowTransactionSortModel(!showTransactionSortModel)
              }
              className="right"
            >
              <span>{getSortBy(sortBy)}</span>
              <img src={SortIcon} alt="" />
            </div>
          </div>

          <div className="wrapper__transactions--list" ref={listInnerRef} onScroll={onScroll}>
            {!isLoading && !fetchingFilteredData && sorted?.length == 0 && 'No records found'}
            {
              sorted?.length > 0 && sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction, index) =>
                <div className="item" key={index}>
                  <div className="left">
                    <div className="lightText">{getUserName(transaction)}</div>
                    <div className="title">
                      {transaction.metadata.transferType === TRANSFER_TYPES.TIP
                        ? transaction.video && (
                          <a
                            href={`${config.REACT_APP_BASE_URL}watch/${transaction.video.id}`}
                          >
                            {transaction.video.title}
                          </a>
                        )
                        : transaction.metadata.transferType ===
                          TRANSFER_TYPES.REFERRAL
                          ? "Refferal"
                          : transaction.metadata.transferType ===
                            TRANSFER_TYPES.SERIES
                            ? "Series purchased"
                            : null}
                    </div>
                  </div>

                  <div className="right">
                    <div className="date"> {new Date(transaction?.created * 1000).toDateString()}</div>
                    {
                      transaction.metadata.transferType === TRANSFER_TYPES.REFERRAL ? <div className="amount amountGoing">
                        -$<span>{transaction.amount / 100}</span>
                      </div> : <div className="amount amountComing">
                        +$<span>{transaction.amount / 100}</span>
                      </div>
                    }

                  </div>
                </div>
              )
            }
            {isLoading || fetchingFilteredData && 'Fetching records...'}
          </div>
        </div>
      </div>
    </TransactionHistoryStyled>
  );
};

export default TransactionHistory;

const TransactionHistoryStyled = styled.div`
  .wrapper {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    font-family: ${(props) => props.theme.montserrat};
    background-color: #1c1c1e;
    overflow-y: scroll;
    overflow-x: hidden;
    z-index: 150;

    /* width */
    ::-webkit-scrollbar {
      width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #3a3a3c;
      border-radius: 7px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: rgb(246, 92, 139);
    }

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

    .infoText {
      font-size: 0.85rem;
      font-weight: 300;
      color: #f2f2f7;
      text-align: center;
      padding: 1rem 0;
    }

    &__transactions {
      width: 45%;
      margin: 0 auto 6rem auto;
      min-width: 480px;
      position: relative;

      &--filterBox {
        height: 2.5rem;
        width: 100%;
        background-color: #3a3a3c;
        padding: 0 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(112, 112, 112, 0.25);

        .right {
          display: flex;
          align-items: center;
          cursor: pointer;

          img {
            height: 0.5rem;
            width: auto;
          }
        }

        .left {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          img {
            height: 1.2rem;
            width: auto;
          }
        }

        span {
          padding-right: 0.5rem;
          font-size: 0.85rem;
          color: #c7c7cc;
          font-weight: 500;
        }
      }

      &--list {
        background-color: #2c2c2e;
        padding: 0 3rem 2rem 3rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        max-height: 26rem;
        min-height: 26rem;
        overflow-y: scroll;

            /* width */
    ::-webkit-scrollbar {
      width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #3a3a3c;
      border-radius: 7px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: rgb(246, 92, 139);
    }

        .lightText {
          font-size: 0.8rem;
          color: #f2f2f7;
        }

        .item {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(112, 112, 112, 0.25);
          padding: 0.7rem 0;

          .title {
            font-size: 1rem;
            font-weight: 500;
            color: #f2f2f7;
          }

          .date {
            text-transform: uppercase;
            font-weight: 300;
            font-size: 0.75rem;
            color: #d1d1d6;
          }

          .amount {
            color: #f2f2f7;
            font-size: 0.9rem;
            font-weight: 200;

            span {
              font-weight: 600;
              padding-left: 3px;
            }
          }

          .amountComing {
            color: #f9903d !important;
          }

          .amountGoing {
            color: #f2f2f7;
          }
        }
      }
      .showMoreBtn {
            width:100%;
            display:flex;
            justify-content:'flex-end !important';
            .btn {
              width: 100%;
              padding: 0.7rem 0;
              font-size: 0.9rem;
              color: #fff;
              font-weight: 500;
              border-radius: 4px;
              background: linear-gradient(to right bottom,#f9903d,#f75b8c);
              border: none;
              outline: none;
              font-family: Montserrat;
              text-transform: capitalize;
            }
          }
    }
  }

  @media screen and (max-width: 600px) {
    .wrapper {
      &__header {
        padding: 0.8rem 2rem;
      }

      &__transactions {
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

      &__transactions {
        min-width: 100%;
      }
    }
  }

  @media screen and (max-width: 375px) {
    .wrapper {
      &__transactions {
        &--list {
          padding: 0 1rem 2rem 1rem;

          .lightText {
            font-size: 0.7rem;
          }

          .item {
            padding: 0.5rem 0;

            .title {
              font-size: 0.9rem;
            }

            .date {
              font-size: 0.7rem;
            }

            .amount {
              font-size: 0.9rem;
            }
          }
        }
      }
    }
  }
`;
