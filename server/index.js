const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const { connectToDB } = require("./config/index");
app.use(express.json());
app.use(cors());
const items = require("./routes/items");
const users = require("./routes/users");
app.use("/items", items);
app.use("/users", users);

mongoose.connect(connectToDB, {
  useNewUrlParser: true,
});

app.listen(3001, () => {
  console.log("connect to port 3001");
});
