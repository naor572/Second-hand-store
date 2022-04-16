import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  paper: {
    marginTop: 20,
    padding: 20,
    borderRadius: 15,
  },
  card: {
    display: "flex",
  },
  section: {
    borderRadius: "20px",
    margin: "10px",
    flex: 1,
  },
  section2: {
    borderRadius: "20px",
    marginLeft: "10px",
    marginTop: "100px",
    flex: 1,
  },
  imageSection: {
    marginLeft: "20px",
  },
  media: {
    display: "flex",
    borderRadius: "30px",
    width: "100%",
    maxHeight: "500px",
  },
  itemsInteresting: {
    display: "flex",
    flexDirection: "row",
  },
  sameCategoryCard: {
    margin: "20px",
    cursor: "pointer",
    color: "black",
    "&:hover": {
      background: "#f1f1f1",
    },
  },
  button: {
    marginTop: "100px",
  },
}));
