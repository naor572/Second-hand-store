import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { userDetails } from "../../api/index";
import { useEffect } from "react";
import { useState } from "react";
import useStyles from "./styles";
import { Box, Typography } from "@material-ui/core";
import LinearProgress from "@mui/material/LinearProgress";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import { TablePagination } from "@material-ui/core";
import { Fragment } from "react";
const MyItems = () => {
  const classes = useStyles();
  const userId = JSON.parse(localStorage.getItem("token"))?.userDetails.id;
  const [myItems, setMyItems] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };
  useEffect(async () => {
    if (userId) {
      try {
        const { data } = await userDetails(userId);
        console.log("ss");
        setMyItems(data.purchases);
      } catch (error) {
        console.log(error.message);
      }
    }
  }, []);
  console.log(myItems);
  if (!userId || myItems?.length === 0)
    return (
      <div>
        <LinearProgress></LinearProgress>
        <Box className={classes.box2}>
          <Typography variant="h3">
            {!userId ? "Please Login..." : "Your shopping cart is empty..."}
          </Typography>
        </Box>
        <Box className={classes.box3}>
          {userId ? (
            <AddShoppingCartIcon fontSize="large"></AddShoppingCartIcon>
          ) : (
            <LoginIcon fontSize="large"></LoginIcon>
          )}
        </Box>
      </div>
    );
  if (myItems === null)
    return (
      <Box className={classes.box2}>
        <Typography variant="h3">loading data...</Typography>
      </Box>
    );
  return (
    <Fragment>
      <Typography className={classes.title} variant="h3">
        My shopping cart
      </Typography>
      <Box className={classes.box}>
        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell align="center">Item Name</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Picture</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myItems &&
                myItems
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row?.name}>
                      <TableCell align="center" component="th" scope="row">
                        {row?.name}
                      </TableCell>
                      <TableCell align="center">{3}</TableCell>
                      <TableCell align="center">{1}</TableCell>
                      <TableCell align="center">
                        <img src={row?.pictureAddress} width="100px" />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          {myItems && (
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={myItems.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            ></TablePagination>
          )}
        </TableContainer>
      </Box>
    </Fragment>
  );
};

export default MyItems;
