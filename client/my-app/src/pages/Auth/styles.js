import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(10),
    alignItems: "center",
    padding: theme.spacing(5),
  },

  avatar: {
    backgroundColor: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
  },
  avatar2: {
    backgroundColor: "green",
    marginBottom: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(5),
    backgroundColor: theme.palette.primary.main,
  },
  error: {
    color: "red",
  },
  layoutText: {
    display: "flex",
    marginTop: 350,
    justifyContent: "center",
  },
  Page: {
    display: "flex",
    justifyContent: "center",
  },
}));
