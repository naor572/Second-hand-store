const { mongoose } = require("mongoose");
const users = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { secretKey } = require("../config/index");
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "The email is not match" });
    const comparePassword = bcrypt.compareSync(password, existingUser.password);
    if (!comparePassword)
      return res.status(404).json({ message: "The password is incorrect" });
    const jwtToken = jwt.sign({ email, id: existingUser._id }, secretKey, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      userDetails: { id: existingUser._id, name: existingUser.fullName },
      token: jwtToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const register = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser)
      return res.status(404).json({
        message: "The email is exist, please enter with different one",
      });
    if (password !== confirmPassword)
      return res.status(404).json({
        message: "The password dont match",
      });

    const hashedPassword = await bcrypt.hashSync(password, 10);
    const newUser = new users({ fullName, email, password: hashedPassword });
    await newUser.save();
    res.status(200).json({ message: "User successfully  register" });
  } catch (error) {
    console.log(error.errors);
    res.status(500).send(error.errors);
  }
};

const addAPurchase = async (req, res) => {
  const { name, category, price, pictureAddress } = req.body;
  const a = { name, category, price, pictureAddress };
  console.log(a);
  try {
    const user = await users.findById(req.userId);
    user.purchases.push({ name, category, price, pictureAddress });
    await users.findByIdAndUpdate(req.userId, user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
};
const userDetails = async (req, res) => {
  try {
    const user = await users.findById(req.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
module.exports = {
  login,
  register,
  addAPurchase,
  userDetails,
};
