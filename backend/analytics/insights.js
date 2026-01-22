const express = require("express");
const insightsRouter = express.Router();

insightsRouter.get("/", (req, res) => {
    return res.status(200).send("Insight API working!");
})

module.exports = insightsRouter;