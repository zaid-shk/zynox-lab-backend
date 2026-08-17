const { Router } = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validate");
const projectRouter = Router();

projectRouter.post("/api/v1/project", validate(), authMiddleware);

module.exports = {
  projectRouter,
};
