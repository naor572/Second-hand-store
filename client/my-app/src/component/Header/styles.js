import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#063970",
    marginTop: theme.spacing(1),
  },
  name: {
    marginLeft: "10px",
  },
  start: {
    color: "black",
    marginLeft: "20px",
  },
  icon: {
    marginLeft: "20px",
  },
  end: {
    color: "black",
    marginLeft: "10px",
    flexGrow: "1",
  },
  link: {
    color: "white",
    marginLeft: "15px",
    textDecoration: "none",
    "&:hover": {
      background: "black",
    },
  },
  spaceLeft: {
    marginLeft: "15px",
  },

  button: {
    marginLeft: "15px",
    borderRadius: 8,
  },
  lastLink: {
    color: "white",
    marginLeft: "10px",
    textDecoration: "none",
    "&:hover": {
      background: "black",
    },
  },
}));
