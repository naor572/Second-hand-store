import React from "react";
import {
  Paper,
  Grid,
  Avatar,
  Container,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import { createPostItem, getItemDetails, updateItem } from "../../api/index";
import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import EditIcon from "@mui/icons-material/Edit";
import makeStyles from "../Auth/styles";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  name: "",
  category: "",
  description: "",
  pictureAddress: "",
  price: 0,
};
const CreatePost = () => {
  const history = useNavigate();
  const classes = makeStyles();
  const { itemId } = useParams();
  const category = [
    "Electricy",
    "Pets",
    "Cars",
    "Furniture",
    "Clothing",
    "Other",
  ];
  const [errorMessage, setErrorMessage] = useState(null);
  const [inputData, setInputData] = useState(initialState);
  useEffect(async () => {
    setInputData(initialState);
    if (itemId) {
      try {
        const { data } = await getItemDetails(itemId);
        const { name, category, description, pictureAddress, price } = data;
        setInputData({ name, category, description, pictureAddress, price });
      } catch (error) {
        setErrorMessage(error?.response.data.message);
      }
    }
  }, [itemId]);
  const handleUpdate = async () => {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(inputData);
      const userDetails = JSON.parse(
        localStorage.getItem("token")
      )?.userDetails;
      console.log(inputData);
      itemId
        ? await updateItem(itemId, {
            ...inputData,
            sellerId: userDetails?.id,
            seller: userDetails?.name,
          })
        : await createPostItem({
            ...inputData,
            sellerId: userDetails?.id,
            seller: userDetails?.name,
          });
      setInputData(initialState);
      history("/home");
    } catch (error) {
      setErrorMessage(
        error?.response.data.message ||
          error?.response.data[Object.keys(error.response.data)[0]].message
      );
    }
  };
  const handleChange = ({ target }) => {
    setInputData((inputData) => ({
      ...inputData,
      [target.name]: target.value,
    }));
  };
  return (
    <Container maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar2}>
          {itemId ? <EditIcon /> : <AddIcon />}
        </Avatar>
        <Typography variant="h4" gutterBottom>
          {itemId ? `Edit` : `Create Post Sell`}
        </Typography>
        <Typography variant="h6" className={classes.error}>
          {errorMessage}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid autoComplete="off" container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                value={inputData.name}
                name="name"
                label="Name"
                onChange={handleChange}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={inputData.category}
                  label="Category"
                  name="category"
                  onChange={handleChange}
                >
                  {category.map((type, index) => (
                    <MenuItem key={index} value={`${type}`}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                value={inputData.description}
                fullWidth
                multiline
                variant="outlined"
                rows={4}
                name="description"
                label="Description"
                onChange={handleChange}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                value={inputData.pictureAddress}
                type="url"
                name="pictureAddress"
                label="Picture addresss"
                onChange={handleChange}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                value={inputData.price}
                InputProps={{ inputProps: { min: 0, max: 99999 } }}
                type="number"
                autoComplete="off"
                name="price"
                label="Price"
                onChange={handleChange}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                color="primary"
                type="submit"
                variant="contained"
                fullWidth
              >
                {itemId ? "Edit" : "Post"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreatePost;
