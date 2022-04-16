import React from "react";
import {
  Paper,
  Grid,
  Avatar,
  Container,
  Typography,
  Button,
} from "@material-ui/core";
import LockOutLinedIcon from "@material-ui/icons/LockOutlined";
import makeStyles from "./styles";
import Input from "./Input";
import { register, login } from "../../api/index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, logout } from "../../redux/user";

const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = makeStyles();
  const [inputData, setInputData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const handleTogglePassword = () => {
    setHidePassword((hidePassword) => !hidePassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register(inputData);
        setIsRegister((isRegister) => !isRegister);
        setErrorMessage(null);
      } else {
        dispatch(logout());
        const { data } = await login(inputData);
        dispatch(loginUser(data));
        console.log(localStorage.getItem("token"));
        console.log(data);
        setErrorMessage(null);
        navigate("/home");
      }
    } catch (error) {
      console.log(error?.response.data);
      setErrorMessage(
        error.response.data.message ||
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
  const switchForm = () => {
    setIsRegister((isRegister) => !isRegister);
  };

  return (
    <Container maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutLinedIcon></LockOutLinedIcon>
        </Avatar>
        <Typography variant="h4" gutterBottom>
          {isRegister ? "Register" : "Login"}
        </Typography>
        <Typography variant="h6" className={classes.error}>
          {errorMessage}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isRegister && (
              <Input
                name="fullName"
                label="Full Name"
                type="text"
                handleChange={handleChange}
              />
            )}
            <Input
              name="email"
              label="Email"
              type="email"
              handleChange={handleChange}
            />
            <Input
              name="password"
              label="Password"
              type={hidePassword ? "password" : "text"}
              handleChange={handleChange}
              handleTogglePassword={handleTogglePassword}
            />
            {isRegister && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                type={hidePassword ? "password" : "text"}
                handleChange={handleChange}
              />
            )}
            <Button
              className={classes.submit}
              type="submit"
              variant="contained"
              fullWidth
            >
              {isRegister ? "Register" : "Login"}
            </Button>
            <Button fullWidth onClick={switchForm}>
              {isRegister
                ? "Already have an account? login"
                : "Create a new Account"}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AuthForm;
