const express = require("express");
const router = express.Router();
const auth = require("../auth/auth");
const {
  login,
  register,
  addAPurchase,
  userDetails,
} = require("../controllers/user");
router.post("/login", login);
router.post("/register", register);
router.get("/", auth, userDetails);
router.patch("/", auth, addAPurchase);
module.exports = router;
