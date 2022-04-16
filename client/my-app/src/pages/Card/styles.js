import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    borderRadius: "15px",
    position: "relative",
  },
  cardAction: {
    display: "block",
    textAlign: "initial",
  },
  name1: {
    display: "grid",
    gridAutoRows: 50,
    wordBreak: "break-all",
  },
  overlay: {
    position: "absolute",
    paddingLeft: "3px",
    color: "white",
  },
  price: {
    display: "flex",
    position: "absolute",
    marginTop: -77,
    right: 10,
  },
  button: {
    display: "flex",
    flexDirection: "column",
  },
  overlay2: {
    position: "absolute",
    paddingTop: 4,
    right: 0,
    color: "white",
  },
  overlay3: {
    position: "absolute",
    paddingTop: 0,
    right: 5,
    color: "white",
  },
  sold: {
    position: "absolute",
    transform: "rotate(-45deg)",
    color: "red",
  },
  time: {
    transform: "scale(0.7)",
    marginLeft: -17,
    marginTop: -8,
    display: "flex",
  },
  like: {
    paddingLeft: 5,
  },
  media: {
    height: 30,
    paddingTop: "56.25%",
    backgroundBlendMode: "darken",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
}));
