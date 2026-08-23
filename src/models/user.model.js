const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  avatar: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: 5,
    maxLength: 150,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("Users", userSchema);
module.exports = {
  userModel,
};
