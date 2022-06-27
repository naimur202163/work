import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import BackIcon from "../../../assets/Icons/back.svg";
import FilterIcon from "../../../assets/Icons/filter.svg";
import SortIcon from "../../../assets/Icons/caret-down.svg";
import KarmaIcon from "../../../assets/Icons/karma.svg";
import KarmaFilterModel from "./KarmaFilterModel";
import KarmaSortModel from "./KarmaSortModel";
import useOnclickOutside from "react-cool-onclickoutside";
import TRANSFER_TYPES from "../../../utils/transferTypes";
import { addOrEditKarmaSetting } from "../../../actions";
import { useDispatch } from "react-redux";
import config from "../../../config/config";

const KarmaHistory = ({ close, karmaSent, karmaReceived, handleFilterUpdate, isLoading, loadMoreTransactions, karmaFilters, fetchingFilteredData }) => {
  const [activeKarmaTab, setActiveKarmaTab] = useState("RECEIVED"); // RECEIVED, SENT
  const [showKarmaFilterModel, setShowKarmaFilterModel] = useState(false);
  const [showKarmaSortModel, setShowKarmaSortModel] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortBy, setSortBy] = useState('mostRecent');
  const [sorted, setSorted] = useState([]);
  const [savingFilter, setSavingFilter] = useState(false);
  const [karma, setKarma] = useState([]);
  const dispatch = useDispatch();
  const listInnerRef = useRef();




  const sortRef = useOnclickOutside(() => {
    setShowKarmaSortModel(false);
  });
  const filterRef = useOnclickOutside(() => {
    setShowKarmaFilterModel(false);
  });


  useEffect(() => {
    if (activeKarmaTab == 'RECEIVED') {
      setKarma(karmaReceived);

    } else {
      const karmasent = karmaSent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
      setKarma(karmasent);
    }

  }, [activeKarmaTab])
  const getUserName = (row) => (row.metadata.transferType === TRANSFER_TYPES.REFERRAL
    ? row.metadata.referred_username
    : row.metadata.sender_username);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setRowsPerPage(rowsPerPage + 10);
        loadMoreTransactions()
      }
    }
  };

  const onUpdateFilters = (selectedFilters) => {
    setSavingFilter(true);
    updateKarmaEditSettings(selectedFilters).then((res) => {
      setSavingFilter(false);
      setShowKarmaFilterModel(false);
      return handleFilterUpdate()
    })
  }

  const updateKarmaEditSettings = (selectedFilters) => new Promise((resolve) => {
    // FilterType 1 = transactions , 2 = karma
    const selectedFilterSetting = { ...selectedFilters, filterType: 2 }
    const res = dispatch(addOrEditKarmaSetting(selectedFilterSetting));
    resolve(res)
  });

  useEffect(() => {
    const sortArray = type => {
      let sorted;
      if (type === 'mostExp') {
        sorted = [...karma].sort((a, b) => (b.amount / 100) - (a.amount / 100));
        setSorted(sorted);
        return
      } if (type === 'lessExp') {
        sorted = [...karma].sort((a, b) => (a.amount / 100) - (b.amount / 100));
        setSorted(sorted);
      } else if (type === 'mostRecent') {
        sorted = [...karma].sort((a, b) => b.created - a.created);
        setSorted(sorted);
      }
      else if (type === 'lessRecent') {
        sorted = [...karma].sort((a, b) => a.created - b.created);
        setSorted(sorted);
        setShowKarmaSortModel(false);
      } else {
        setShowKarmaSortModel(false);
        setSorted(karma);
      }
      setShowKarmaSortModel(false);
    };
    sortArray(sortBy);
  }, [sortBy, karma]);

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
    <>
      <KarmaHistoryStyled>
        <div className="wrapper">
          <div className="wrapper__header">
            <div onClick={close} className="backIcon">
              <img src={BackIcon} alt="" />
            </div>
            <div className="name">Manage Karma</div>
          </div>

          <p className="infoText">Check how your karma is flowing</p>

          <div className="wrapper__karmaFlow">
            {showKarmaSortModel && (
              <KarmaSortModel
                doNotClose={sortRef}
                close={() => setShowKarmaSortModel(false)}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            )}
            {showKarmaFilterModel && (
              <KarmaFilterModel
                doNotClose={filterRef}
                close={() => setShowKarmaFilterModel(false)}
                isFetching={karmaFilters.isFetching}
                filters={karmaFilters.filters}
                onUpdateFilters={onUpdateFilters}
                savingFilter={savingFilter}
              />
            )}

            <div className="wrapper__karmaFlow--tabs">
              <div
                onClick={() => setActiveKarmaTab("RECEIVED")}
                className={`tab ${activeKarmaTab === "RECEIVED" && "active"}`}
              >
                Received Karma
              </div>

              <div
                onClick={() => setActiveKarmaTab("SENT")}
                className={`tab ${activeKarmaTab === "SENT" && "active"}`}
              >
                Sent Karma
              </div>
            </div>

            <div className="wrapper__karmaFlow--filterBox">
              <div className="left">
                <img
                  ref={filterRef}
                  onClick={() => setShowKarmaFilterModel(!showKarmaFilterModel)}
                  src={FilterIcon}
                  alt=""
                />
              </div>

              <div
                ref={sortRef}
                onClick={() => setShowKarmaSortModel(!showKarmaSortModel)}
                className="right"
              >
                <span>{getSortBy(sortBy)}</span>
                <img src={SortIcon} alt="" />
              </div>
            </div>

            <div className="wrapper__karmaFlow--list">
              <div className="karmaMeter">
                <div className="karmaMeter--total">
                  352 <img src={KarmaIcon} alt="" />
                </div>

                <div className="karmaMeter--bar">
                  <div style={{ width: `70%` }} className="filled"></div>
                </div>

                <div className="lightText">
                  Perform Karma actions to fill up the bar to the next level!
                </div>
              </div>

              <div className="karmas" ref={listInnerRef} onScroll={onScroll}>
                {!isLoading && !fetchingFilteredData && sorted?.length == 0 && 'No records found'}

                {
                  sorted?.length > 0 && sorted.map((transaction, index) => <div className="karmas--item">
                    <div className="left" key={index}>
                      <div className="lightText">{getUserName(transaction)}</div>
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

                    <div className="right">
                      <div className="date"> {new Date(transaction?.created * 1000).toDateString()}</div>
                      <div className="point">
                        {transaction.amount / 100} <img src={KarmaIcon} alt="" />
                      </div>
                    </div>
                  </div>)
                }

                {isLoading || fetchingFilteredData && 'Fetching records...'}

              </div>
            </div>
          </div>
        </div>
      </KarmaHistoryStyled>
    </>
  );
};

export default KarmaHistory;

const activeTabBar = keyframes`
	from {
		opacity: 0;
    transform: translateX(-100%);
	}
	to {
		opacity: 1;
    transform: translateX(0);
	}
`;


const KarmaHistoryStyled = styled.div`
  .wrapper {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    font-family: ${(props) => props.theme.montserrat};
    background-color: #1c1c1e;
    overflow-y: scroll;
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

    &__karmaFlow {
      width: 45%;
      margin: 0 auto 6rem auto;
      min-height: 480px;
      position: relative;

      &--tabs {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #2c2c2e;
        width: 100%;
        height: 2rem;
        border-top-right-radius: 0.5rem;
        border-top-left-radius: 0.5rem;
        overflow: hidden;

        .tab {
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-direction: column;
          line-height: 1;
          text-transform: capitalize;
          font-size: 0.9rem;
          color: #8e8e93;
          font-weight: 500;
          position: relative;
          height: 100%;
          padding-bottom: 0.35rem;
          cursor: pointer;
        }

        .active {
          color: #fff;

          &:before {
            position: absolute;
            content: "";
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #fff;
            transition: all 0.5s ease;
            animation: ${activeTabBar} 0.5s ease;
          }
        }
      }

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
        padding: 1rem 3rem;

        .lightText {
          font-size: 0.8rem;
          color: #f2f2f7;
        }

        .karmaMeter {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;

          &--total {
            display: flex;
            align-items: center;
            font-size: 2.5rem;
            text-transform: uppercase;
            color: #fff;
            font-weight: 500;

            img {
              padding: 0 0.5rem;
              height: 1.6rem;
              width: auto;
            }
          }

          &--bar {
            width: 90%;
            margin: 0 auto;
            border-radius: 10rem;
            height: 0.6rem;
            background-color: black;
            position: relative;
            margin-bottom: 0.7rem;

            .filled {
              position: absolute;
              top: 0;
              left: 0;
              border-radius: 10rem;
              height: 100%;
              background-color: white;
            }
          }
        }

        .karmas {
          display: flex;
          align-items: center;
          flex-direction: column;
          max-height: 26rem;
          overflow-y: scroll;
          padding-right: 6px;


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

          &--item {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid rgba(112, 112, 112, 0.25);
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

            .point {
              display: flex;
              align-items: center;
              color: #f2f2f7;
              font-size: 0.9rem;
              font-weight: 600;

              img {
                padding: 0 10px;
              }
            }
          }

          &--item:last-child {
            border-bottom: 1px solid rgba(112, 112, 112, 0.25);
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
    }
  }

  @media screen and (max-width: 600px) {
    .wrapper {
      &__header {
        padding: 0.8rem 2rem;
      }

      &__karmaFlow {
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

      &__karmaFlow {
        min-width: 100%;
      }
    }
  }

  @media screen and (max-width: 375px) {
    .wrapper {
      &__karmaFlow {
        &--list {
          padding: 1rem;

          .lightText {
            font-size: 0.7rem;
          }

          .karmaMeter {
            &--total {
              font-size: 2rem;

              img {
                height: 1.4rem;
              }
            }
          }

          .karmas {
            &--item {
              padding: 0.5rem 0;

              .title {
                font-size: 0.9rem;
              }

              .date {
                font-size: 0.7rem;
              }

              .point {
                font-size: 0.8rem;
              }
            }
          }
        }
      }
    }
  }
`;
