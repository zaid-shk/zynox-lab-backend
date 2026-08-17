const { Router } = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validate");
const { taskSchema } = require("../validations/task.validation");
const {
  createTask,
  editTask,
  bulkTask,
  deleteTask,
  taskStatus,
} = require("../controllers/task.controller");
const taskRouter = Router();

taskRouter.post(
  "/:projectId",
  validate(taskSchema),
  authMiddleware,
  createTask,
);
taskRouter.get("/", authMiddleware, bulkTask);
taskRouter.post("/edit/:taskId", authMiddleware, editTask);
taskRouter.delete("/:taskId", authMiddleware, deleteTask);
taskRouter.patch("/:taskId/complete", authMiddleware, taskStatus);

module.exports = {
  taskRouter,
};
