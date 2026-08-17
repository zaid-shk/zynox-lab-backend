const express = require("express");
const { userRouter } = require("./routes/user.route");
const { projectRouter } = require("./routes/project.route");
const { taskRouter } = require("./routes/task.route");
const app = express();

app.use(express.json());

//Router for Users
app.use("/api/v1/user", userRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/task", taskRouter);

module.exports = app;
