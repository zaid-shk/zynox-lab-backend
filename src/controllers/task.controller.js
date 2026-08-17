const { Router } = require("express");
const { taskModel } = require("../models/Task.model");
const { projectModel } = require("../models/project.model");

async function createTask(req, res) {
  const userId = req.userId;
  const { projectId } = req.params;
  const { title, description, priority, status, duedate } = req.body;

  try {
    const project = await projectModel.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }

    if (project.owner.toString() !== userId) {
      return res.status(403).json({
        message: "You are not eligeble",
      });
    }

    const task = await taskModel.create({
      title: title,
      description: description,
      status: status,
      dueDate: duedate,
      priority: priority,
      project: projectId,
    });
    res.status(201).json({
      message: "Task Created Successfuly",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
}
async function bulkTask(req, res) {
  const userId = req.userId;

  try {
    const taskBulk = await taskModel.find({});
    res.status(200).json({
      message: "Successfuly task fetch",
      taskBulk,
    });
  } catch (error) {
    res.status(500).json({
      message: "Task's Not Found",
    });
  }
}
async function editTask(req, res) {
  const userId = req.userId;
  const { taskId } = req.params;
  const { title, description, status, priority, dueDate } = req.body;

  try {
    const task = await taskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
      });
    }

    const project = await projectModel.findById(task.project);

    if (!project) {
      return res.status(404).json({
        message: "Project not Found",
      });
    }

    if (project.owner.toString() !== userId) {
      return res.status(403).json({
        message: "You are not eligble",
      });
    }
    await taskModel.findOneAndUpdate(
      { _id: taskId },
      {
        title,
        description,
        status,
        dueDate,
        priority,
      },
    );
    res.status(200).json({
      message: "Task Updated",
    });
  } catch (error) {
    res.status(500).json({
      message: "Somthing Went Wrong",
      error,
    });
  }
}
async function deleteTask(req, res) {
  const userId = req.userId;
  const { taskId } = req.params;

  try {
    const task = await taskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
      });
    }

    const project = await projectModel.findById(task.project);

    if (!project) {
      return res.status(404).json({
        message: "Project not Found",
      });
    }

    if (project.owner.toString() !== userId) {
      return res.status(403).json({
        message: "You are not eligble",
      });
    }
    await taskModel.findByIdAndDelete(taskId);
    res.status(200).json({
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went wrong",
    });
  }
}
async function taskStatus(req, res) {
  const userId = req.userId;
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    const task = await taskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
      });
    }

    const project = await projectModel.findById(task.project);

    if (!project) {
      return res.status(404).json({
        message: "Project not Found",
      });
    }

    if (project.owner.toString() !== userId) {
      return res.status(403).json({
        message: "You are not eligble",
      });
    }
    await taskModel.findByIdAndUpdate(taskId, {
      status: status,
    });
    res.status(200).json({
      message: "task is completed",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something Went wrong",
    });
  }
}

module.exports = {
  createTask: createTask,
  bulkTask: bulkTask,
  editTask: editTask,
  deleteTask: deleteTask,
  taskStatus: taskStatus,
};
