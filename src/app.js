const express = require("express");
const { userRouter } = require("./routes/user.route");
const app = express();

app.use(express.json());

//Router for Users
app.use("/api/v1/user", userRouter);

module.exports = app;
