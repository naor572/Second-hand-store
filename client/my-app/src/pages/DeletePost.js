import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost } from "../api/index";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography } from "@material-ui/core";
import makeStyles from "./Auth/styles";
import { Fragment } from "react";

const DeletePost = () => {
  const classes = makeStyles();
  const { itemId } = useParams();
  const history = useNavigate();
  useEffect(async () => {
    try {
      await deletePost(itemId);
      setTimeout(() => {
        history(-1);
      }, 1500);
    } catch (error) {
      console.log(error?.response.data.message);
    }
  });
  return (
    <Fragment>
      <LinearProgress></LinearProgress>
      <Typography color="primary" className={classes.layoutText} variant="h3">
        Deleting the post...
      </Typography>
    </Fragment>
  );
};

export default DeletePost;
