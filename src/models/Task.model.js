const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      minlength: 3,
      maxlength: 100,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      maxlength: 1000,
      trim: true,
    },
    project: {
      type: ObjectId,
      ref: "Project",
      required: true,
    },
    assignTo: {
      type: ObjectId,
      ref: "Users",
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "completed"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);
