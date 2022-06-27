import React, { useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TablePagination,
  makeStyles,
} from "@material-ui/core";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getUserTransactions } from "../actions";
import TRANSFER_TYPES from "../utils/transferTypes";
import { darkTheme } from "../styles/theme.js";
import config from "../config/config";

const Wrapper = styled.div`
  margin-top: 20px;
  .text-color {
    color: ${(props) => props.theme.white};
  }
  .loadmore_button {
    float:right;
    margin-top:5px;
  }
`;
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: darkTheme.white,
    display: "flex",
  },
  selectIcon: {
    color: darkTheme.white,
  },
  loadMoreButton: {
    float: "right",
    marginTop: "10px",
    marginBottom: "10px"

  },
  paginataionStyles: {
    color: darkTheme.white,
  },
  selectIconStyles: {
    color: darkTheme.white,
  },
  toolbarStyles: {
    ['@media (max-width:540px)']: { // eslint-disable-line no-useless-computed-key
      display: "flex",
      flexWrap: "wrap"
    }
  }
}));
const TransactionHistoryTable = ({ userId }) => {
  const userTransactions = useSelector((state) => state.userTransactions);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const tempFunction = useRef()
  const imgFunction = () => {
    dispatch(getUserTransactions(userId, null, rowsPerPage));
  }
  tempFunction.current = imgFunction
  useEffect(() => {
    tempFunction.current()
  }, [rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    try {

      setPage(newPage);
      const lastObject = userTransactions.data[userTransactions.data.length - 1];
      const starting_after = lastObject.id;
      dispatch(getUserTransactions(userId, starting_after, rowsPerPage));
    } catch (err) {
      console.log("Error:", err.message)
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const getUserName = (row) => (row.metadata.transferType === TRANSFER_TYPES.REFERRAL
    ? row.metadata.referred_username
    : row.metadata.sender_username)

  if (userTransactions.isLoading) {
    return "Loading transactions...";
  }
  if (userTransactions.data.length === 0) {
    return "No payment history yet… Upload some videos and start receiving Karma!";
  }
  const transactions = userTransactions.data;

  return (
    <Wrapper>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell className="text-color" align="center">
                Video Karma Tip/Referral
              </TableCell>
              <TableCell className="text-color" align="center">
                Amount
              </TableCell>
              <TableCell className="text-color" align="center">
                Username
              </TableCell>
              <TableCell className="text-color" align="center">
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions &&
              transactions.length &&
              transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow key={index + 1}>
                  <TableCell className="text-color" align="center">
                    {row.video && (
                      <a
                        href={`${config.REACT_APP_BASE_URL}watch/${row.video.id}`}
                      >
                        {row.video.title}
                      </a>
                    )}

                    {row.metadata.transferType === TRANSFER_TYPES.REFERRAL &&
                      "Referral"}
                  </TableCell>
                  <TableCell className="text-color" align="center">
                    {`$` + row.amount / 100}
                  </TableCell>

                  <TableCell className="text-color" align="center">
                    <a
                      href={`${config.REACT_APP_BASE_URL}channel/${getUserName(row)}`}
                    >
                      {getUserName(row)}
                    </a>
                  </TableCell>
                  <TableCell className="text-color" align="center">
                    {new Date(row.created * 1000).toDateString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        className={classes.pagination}
        count={-1}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        classes={{
          root: classes.paginataionStyles,
          selectIcon: classes.selectIconStyles,
          toolbar: classes.toolbarStyles
        }}
      />
    </Wrapper>
  );
};

export default TransactionHistoryTable;
