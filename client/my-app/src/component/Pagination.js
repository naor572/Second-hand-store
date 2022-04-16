import React from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import useStyles from "../pages/Auth/styles";
import { Box } from "@material-ui/core";
const PaginationApp = ({ page, numberOfPages }) => {
  const classes = useStyles();
  return (
    <Box className={classes.Page}>
      <Pagination
        count={numberOfPages}
        page={Number(page)}
        variant="outlined"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            component={Link}
            to={`/home?page=${item.page}`}
          />
        )}
      />
    </Box>
  );
};

export default PaginationApp;
