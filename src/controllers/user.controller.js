const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");
const { jwtConfig } = require("../config/jwt");
const bcrypt = require("bcrypt");
// console.log(jwtConfig);
const JWT_SECRET = jwtConfig.secret;

async function signup(req, res) {
  const { username, name, gender, email, password } = req.body;

  const hashpassword = await bcrypt.hash(password, 5);

  try {
    const users = await userModel.create({
      username: username,
      name: name,
      gender: gender,
      email: email,
      password: hashpassword,
    });

    res.json({
      message: "You are SignUp",
      username,
    });
  } catch (error) {
    res.status(403).json({
      message: "User already exist",
      error: error,
    });
  }
}
async function signin(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email: email,
  });

  if (!user) {
    res.json({
      message: "User is not exist ",
    });
  }

  const comparedPassword = await bcrypt.compare(password, user.password);
  if (user) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_SECRET,
    );
    res.json({
      message: "You are SignIn",
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect creadentials",
    });
  }
}
function updateprofile(req, res) {}

module.exports = {
  signin,
  signup,
};
