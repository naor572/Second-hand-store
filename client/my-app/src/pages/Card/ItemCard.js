import React from "react";
import Card from "@mui/material/Card";
import makeStyles from "./styles";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ButtonBase, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { AccessTime } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { setLike } from "../../api";
import { useState } from "react";
const ItemCard = ({ itemDetails }) => {
  const history = useNavigate();
  const classes = makeStyles();
  const [currentLike, setCurrentLike] = useState(itemDetails.likes);
  const userId = JSON.parse(localStorage.getItem("token"))?.userDetails.id;
  const handlerLike = async () => {
    try {
      const { data } = await setLike(itemDetails._id);
      setCurrentLike(data.likes);
    } catch (error) {
      console.log(error.message);
    }
  };

  const actionOnItem = (sellerId) => sellerId === userId;
  return (
    <Card className={classes.card}>
      <ButtonBase
        onClick={() => history(`/PostDetails/${itemDetails._id}`)}
        component="span"
        className={classes.cardAction}
      >
        <CardMedia
          className={classes.media}
          image={itemDetails.pictureAddress}
          title={itemDetails.category}
        ></CardMedia>
      </ButtonBase>
      <div className={classes.overlay}>
        <Typography title="Seller" fontWeight="bold" variant="h6">
          {itemDetails.seller}
        </Typography>
        {itemDetails.sold && (
          <Typography className={classes.sold} fontWeight="bold" variant="h1">
            sold
          </Typography>
        )}
        <div className={classes.time}>
          <AccessTime></AccessTime>
          <Typography variant="body1" marginLeft={0.9}>
            {moment(itemDetails.create_at).fromNow()}
          </Typography>
        </div>
      </div>
      {actionOnItem(itemDetails.sellerId) && !itemDetails.sold && (
        <div className={classes.overlay2}>
          <IconButton
            component={Link}
            to={`/EditPost/${itemDetails._id}`}
            title="Edit"
            size="small"
          >
            <ModeEditIcon color="primary"></ModeEditIcon>
          </IconButton>
        </div>
      )}
      <CardContent>
        <Typography className={classes.name} variant="h5" component="p">
          {itemDetails.name}
        </Typography>
        <Typography
          className={classes.name1}
          color="text.secondary"
          variant="body2"
          component="p"
        >
          {itemDetails.description}
        </Typography>

        <div title="Price" className={classes.price}>
          <CreditCardIcon></CreditCardIcon>
          <Typography variant="body1" marginLeft={0.9}>
            {`${itemDetails.price}` + ` ₪`}
          </Typography>
        </div>
      </CardContent>

      <CardActions>
        <IconButton
          disabled={!userId}
          size="small"
          color="primary"
          onClick={handlerLike}
        >
          {!currentLike.find((userLike) => userLike === userId) ? (
            <ThumbUpAltOutlinedIcon
              className={classes.like}
              variant="outlined"
              fontSize="small"
            />
          ) : (
            <ThumbUpIcon fontSize="small" />
          )}
          <Typography variant="body1" marginLeft={0.5}>
            {currentLike.length > 1
              ? `${currentLike.length} Likes`
              : `${currentLike.length} Like`}
          </Typography>
        </IconButton>
        {actionOnItem(itemDetails.sellerId) && (
          <div className={classes.overlay3}>
            <IconButton
              color="primary"
              size="small"
              component={Link}
              to={`/DeleteMyItem/${itemDetails._id}`}
            >
              <DeleteIcon color="primary"></DeleteIcon>
              <Typography variant="body1" marginLeft={0.5}>
                Delete
              </Typography>
            </IconButton>
          </div>
        )}
      </CardActions>
    </Card>
  );
};

export default ItemCard;
