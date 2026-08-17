const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const projectSchema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
      trim: true,
    },

    description: {
      type: String,
      maxlength: 500,
      trim: true,
    },

    owner: {
      type: ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "completed", "archived"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

const projectModel = mongoose.model("Projects", projectSchema);
module.exports = {
  projectModel,
};
