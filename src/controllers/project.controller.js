const { projectModel } = require("../models/project.model");

async function projectCreate(req, res) {
  const owner = req.userId;
  const { title, description, status, color, fav } = req.body;

  try {
    const project = await projectModel.create({
      owner: owner,
      projectName: title,
      description: description,
      status: status,
      is_color: color,
      is_favorite: fav,
    });
    return res.status(201).json({
      success: true,
      message: "Project created successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}
async function deleteProject(req, res) {
  const userId = req.userId;
  const { projectId } = req.params;

  try {
    const project = await projectModel.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }

    if (project.owner.toString() !== userId) {
      return res.status(403).json({
        message: "You are not allowed to delete this project",
      });
    } else {
      await projectModel.deleteOne({
        _id: projectId,
      });
      res.status(200).json({
        message: "Project Deleted Succefully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something wrong",
      error,
    });
  }
}
async function projectBulk(req, res) {
  const userId = req.userId;

  try {
    const projectBulk = await projectModel.find({});
    res.json({
      message: "Project Fetched",
      projectBulk,
    });
  } catch (error) {
    res.json({
      message: "Somthing Wrong",
    });
  }
}
async function editProject(req, res) {
  const userId = req.userId;
  const { projectId } = req.params;
  const { title, description, status } = req.body;

  try {
    const editProject = await projectModel.findByIdAndUpdate(projectId, {
      projectName: title,
      description: description,
      status: status,
    });
    res.json({
      message: "Successfuly edited",
      editProject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Somthing Wrong",
      error,
    });
  }
}
async function projectColor(req, res) {
  const userId = req.userId;
  const { projectId } = req.params;
  const { color } = req.body;

  try {
    const findProject = await projectModel.findById(projectId);
    if (!findProject) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }
    if (findProject.owner.toString() !== userId) {
      return res.status(403).json({
        message: "You are not eligible",
      });
    }

    await projectModel.findByIdAndUpdate(projectId, {
      is_color: color,
    });
    return res.status(200).json({
      message: "Project color updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Somthing went wrong",
    });
  }
}
async function projectStatus(req, res) {
  const userId = req.userId;
  const { projectId } = req.params;
  const { status } = req.body;

  try {
    const findProject = await projectModel.findById(projectId);
    if (!findProject) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }
    if (findProject.owner.toString() !== userId) {
      return res.status(403).json({
        message: "You are not eligible",
      });
    }

    await projectModel.findByIdAndUpdate(projectId, {
      status: status,
    });
    return res.status(200).json({
      message: "Project status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Somthing went wrong",
    });
  }
}
async function projectFavorite(req, res) {
  const userId = req.userId;
  const { projectId } = req.params;
  const { fav } = req.body;

  try {
    const findProject = await projectModel.findById(projectId);
    if (!findProject) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }
    if (findProject.owner.toString() !== userId) {
      return res.status(403).json({
        message: "You are not eligible",
      });
    }

    await projectModel.findByIdAndUpdate(projectId, {
      is_favorite: fav,
    });
    return res.status(200).json({
      message: "Project updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Somthing went wrong",
    });
  }
}
module.exports = {
  projectCreate: projectCreate,
  deleteProject: deleteProject,
  projectBulk: projectBulk,
  editProject: editProject,
  projectColor: projectColor,
  projectStatus: projectStatus,
  projectFavorite: projectFavorite,
};
