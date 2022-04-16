import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "30px 30px",
    maxWidth: 650,
  },
  title: {
    margin: "auto",
    display: "block",
    marginTop: "10px",
    width: "24%",
    textDecoration: "underline",
    color: "black",
  },
  tableHead: {
    fontWeight: "bold",
    color: "white",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  box2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "300px",
  },
  box3: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50px",
  },
  tableBody: {
    color: "white",
  },
  progress: {},
}));
