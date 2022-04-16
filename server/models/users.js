const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: [true, "A user must have a name"],
    minlength: [4, "A user name must have at lest 4 characters"],
    validate: {
      validator: (val) => validator.isAlpha(val, ["en-US"], { ignore: " " }),
      message: "The name must  only contain letters",
    },
  },
  email: {
    type: String,
    required: [true, "A user must have a email"],
    unique: true,
    validate: [
      validator.isEmail,
      "The username must has a valid address (e.g: username@mydomain.com)",
    ],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: [8, "A user password must have at lest 8 characters"],
  },
  purchases: { type: [Object], default: [] },
});

const users = mongoose.model("usersTable", userSchema);
module.exports = users;
