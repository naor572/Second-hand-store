import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAllItems } from "../../api/index";
import ItemCard from "../Card/ItemCard";
import Pagination from "../../component/Pagination";
import { useLocation } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Grid, Paper } from "@material-ui/core";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get("page") || 1;
  const [items, setItems] = useState(null);

  useEffect(async () => {
    const { data } = await getAllItems(page);
    setItems(data);
  }, [page]);
  if (!items) return <LinearProgress></LinearProgress>;
  return (
    <Box p={5}>
      <Grid container spacing={3}>
        {items &&
          items.data.map((itemDetails, index) => {
            return (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <ItemCard itemDetails={itemDetails} />
              </Grid>
            );
          })}
      </Grid>
      {items && (
        <Paper className={classes.pagination} elevation={6}>
          <Pagination page={page} numberOfPages={items.numberOfPages} />
        </Paper>
      )}
    </Box>
  );
};

export default Home;
