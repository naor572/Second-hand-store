import { Paper, Button, LinearProgress } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { Divider } from "@material-ui/core";
import {
  getItemDetails,
  getItemsByCategory,
  soldItem,
  Purchase,
} from "../../api/index";
import useStyles from "./styles";
import { Fragment } from "react";

const PostDetails = () => {
  const { itemId } = useParams();
  const history = useNavigate();
  const classes = useStyles();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("token"))?.userDetails
  );
  const [itemData, setItemData] = useState(null);
  const [itemsByCategory, setItemsByCategory] = useState(null);
  useEffect(async () => {
    try {
      const { data } = await getItemDetails(itemId);
      const findItemsByCategory = await getItemsByCategory(data.category);
      console.log(findItemsByCategory);
      setItemData(data);
      setItemsByCategory(
        findItemsByCategory.data.filter(({ _id }) => _id !== data._id)
      );
    } catch (err) {
      console.log(err);
    }
  }, [itemId]);

  const moveToItem = (_id) => history(`/PostDetails/${_id}`, { replace: true });
  const purchaseItem = async (_id) => {
    const a = await Purchase(itemData);
    setItemData((await soldItem(_id)).data);
    console.log(a);
  };
  if (!itemData) return <LinearProgress></LinearProgress>;

  return (
    <Fragment>
      <Paper className={classes.paper} elevation={6}>
        <div className={classes.card}>
          <div className={classes.section}>
            <Typography gutterBottom variant="h3" component="h2">
              {itemData.name}
            </Typography>

            <Typography gutterBottom variant="h6" component="h2">
              {"Category:  " + itemData.category}
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
            <Typography gutterBottom variant="body1" component="p">
              {itemData.description}
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
            <Typography gutterBottom variant="h6" component="h2">
              {"Seller:  " + itemData.seller}
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              {"Created at:  " + moment(itemData.create_at).fromNow()}
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              {"Price:  " + itemData.price + "₪"}
            </Typography>
            {user?.id === itemData.sellerId || !user?.id || itemData.sold ? (
              <Button
                disabled
                className={classes.button}
                color="primary"
                variant="contained"
              >
                {itemData.sold ? "sold" : "purchase"}
              </Button>
            ) : (
              <Button
                onClick={() => purchaseItem(itemData._id)}
                className={classes.button}
                color="primary"
                variant="contained"
              >
                {itemData.sold ? "sold" : "purchase"}
              </Button>
            )}
          </div>
          <div className={classes.imageSection}>
            <img className={classes.media} src={itemData.pictureAddress} />
          </div>
        </div>
        {!!itemsByCategory?.length && (
          <div className={classes.section2}>
            <Typography gutterBottom variant="h5">
              You may also be interested in:
            </Typography>
            <Divider />
            <div className={classes.itemsInteresting}>
              {itemsByCategory.map(
                ({ name, description, price, likes, pictureAddress, _id }) => (
                  <div
                    className={classes.sameCategoryCard}
                    onClick={() => moveToItem(_id)}
                    key={_id}
                  >
                    <Typography gutterBottom variant="h6">
                      {name}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                      {description}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1">
                      Likes: {likes.length}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1">
                      {`${price}` + "₪"}
                    </Typography>
                    <img src={pictureAddress} width="200px" />
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </Paper>
    </Fragment>
  );
};
export default PostDetails;
