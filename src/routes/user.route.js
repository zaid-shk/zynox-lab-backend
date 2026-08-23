const { Router } = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validate");
const { userSchema, signinSchema } = require("../validations/user.validation");
const {
  signup,
  signin,
  getProfile,
  updateprofile,
} = require("../controllers/user.controller");
const { upload } = require("../config/multer");
const userRouter = Router();

userRouter.post("/signup", validate(userSchema), signup);
userRouter.post("/signin", validate(signinSchema), signin);
userRouter.get("/me", authMiddleware, getProfile);
userRouter.patch(
  "/updateprofile",
  authMiddleware,
  upload.single("image"),
  updateprofile,
);

module.exports = {
  userRouter,
};
