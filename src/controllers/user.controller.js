const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");
const { jwtConfig } = require("../config/jwt");
// console.log(jwtConfig);
const JWT_SECRET = jwtConfig.secret;

async function signup(req, res) {
  const { username, name, gender, email, password } = req.body;

  try {
    const users = await userModel.create({
      username: username,
      name: name,
      gender: gender,
      email: email,
      password: password,
    });

    res.json({
      message: "You are SignUp",
      username,
    });
  } catch {
    res.status(403).json({
      message: "User already exist",
    });
  }
}
async function signin(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email: email,
    password: password,
  });

  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
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
function changePassword(req, res) {}

module.exports = {
  signin,
  signup,
  changePassword,
};
