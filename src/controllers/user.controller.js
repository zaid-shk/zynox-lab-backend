const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");
const { jwtConfig } = require("../config/jwt");
const bcrypt = require("bcrypt");
const { uploadImage } = require("../config/imageKit");
// console.log(jwtConfig);
const JWT_SECRET = jwtConfig.secret;

async function signup(req, res) {
  const { username, name, gender, email, password } = req.body;

  const hashpassword = await bcrypt.hash(password, 5);

  const isAlreadyRegister = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isAlreadyRegister) {
    return res.status(409).json({
      success: false,
      message: "Username or email already exists",
    });
  }

  try {
    const users = await userModel.create({
      username: username,
      name: name,
      gender: gender,
      email: email,
      password: hashpassword,
    });

    return res.status(201).json({
      success: true,
      message: "You are SignUp",
      username,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}
async function signin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({
      email: email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_SECRET,
    );

    return res.status(200).json({
      success: true,
      message: "You are SignIn",
      token: token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}
async function updateprofile(req, res) {
  const userId = req.userId;
  const { email, username, name } = req.body;

  try {
    let avatar;

    if (req.file) {
      const result = await uploadImage(req.file.buffer, req.file.originalname);

      console.log(result);
      avatar = result.url;
      console.log("RESULT:", result);
      console.log("URL:", result?.url);
    }
    console.log(avatar);

    const updateData = {
      email,
      username,
      name,
    };

    if (avatar) {
      updateData.avatar = avatar;
    }

    const updateProfile = await userModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: "Profile Successfully Updated",
      user: updateProfile,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}

async function getProfile(req, res) {
  const user = await userModel.findById(req.userId).select("-password");

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json({
    username: user.username,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
  });
}

module.exports = {
  signin,
  signup,
  getProfile,
  updateprofile,
};
