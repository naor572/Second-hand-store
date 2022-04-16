import { Typography } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { AppBar, Container, Tabs, Tab } from "@material-ui/core";
import React from "react";
import { Fragment } from "react";
import StorefrontIcon from "@material-ui/icons/Storefront";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/user";
import { useDispatch } from "react-redux";
import makeStyles from "./styles";
export const AppBarHeader = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("token"))?.userDetails
  );
  const classes = makeStyles();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("token"))?.userDetails);
  }, [location]);
  const handleClick = () => {
    navigate("/");
    if (user?.name) dispatch(logout());
  };
  return (
    <Fragment>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <StorefrontIcon />
          <Typography variant="h5" className={classes.name}>
            Second hand store
          </Typography>
          <Typography className={classes.start} variant="h5">
            |
          </Typography>
          <Typography
            className={classes.link}
            variant="body2"
            component={Link}
            to="/home"
          >
            Home
          </Typography>
          <Typography
            className={classes.lastLink}
            variant="body2"
            component={Link}
            to="/CreatePost"
          >
            Create post
          </Typography>

          <Typography className={classes.end} variant="h5">
            |
          </Typography>
          <IconButton
            title="My shopping cart"
            className={classes.icon}
            component={Link}
            to="/MyItems"
            size="small"
          >
            <ShoppingCartIcon color="success" />
          </IconButton>
          {user?.name ? (
            <Fragment>
              <Typography className={classes.spaceLeft} variant="h6">
                {user.name}
              </Typography>
              <Button
                onClick={handleClick}
                className={classes.button}
                color="primary"
                variant="contained"
              >
                Logout
              </Button>
            </Fragment>
          ) : (
            <Button
              onClick={handleClick}
              className={classes.button}
              color="primary"
              variant="contained"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};
