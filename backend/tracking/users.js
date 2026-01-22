const express = require("express");
const userRouter = express.Router();
require("dotenv").config();

// Test route
userRouter.get("/", (_req, res) => {
    res.send("User API is working!");
});

module.exports = userRouter;