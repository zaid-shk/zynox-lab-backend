const { Router } = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validate");
const { userSchema } = require("../validations/user.validation");
const { signup, signin } = require("../controllers/user.controller");
const taskRouter = Router();

taskRouter.post("/api/v1/task", validate(), authMiddleware);

module.exports = {
  taskRouter,
};
