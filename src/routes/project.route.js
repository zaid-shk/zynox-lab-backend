const { Router } = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validate");
const {
  projectCreate,
  deleteProject,
  projectBulk,
  editProject,
  projectColor,
  projectFavorite,
} = require("../controllers/project.controller");
const { projectSchema } = require("../validations/project.validation");
const projectRouter = Router();

projectRouter.post("/", validate(projectSchema), authMiddleware, projectCreate);
projectRouter.get("/", authMiddleware, projectBulk);
projectRouter.delete("/:projectId", authMiddleware, deleteProject);
projectRouter.put("/:projectId", authMiddleware, editProject);
projectRouter.patch("/:projectId/color", authMiddleware, projectColor);
projectRouter.patch("/:projectId/favorite", authMiddleware, projectFavorite);
module.exports = {
  projectRouter,
};
