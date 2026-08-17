const { Router } = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validate");
const { userSchema } = require("../validations/user.validation");
const { signup, signin } = require("../controllers/user.controller");
const userRouter = Router();

userRouter.post("/signup", validate(userSchema), signup);
userRouter.post("/signin", validate(userSchema), signin);

module.exports = {
  userRouter,
};
