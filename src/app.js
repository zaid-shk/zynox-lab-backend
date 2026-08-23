const express = require("express");
const { userRouter } = require("./routes/user.route");
const { projectRouter } = require("./routes/project.route");
const { taskRouter } = require("./routes/task.route");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is healthy",
  });
});

//Router for Users
app.use("/api/v1/user", userRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/task", taskRouter);

module.exports = app;
