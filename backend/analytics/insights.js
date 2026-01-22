const express = require("express");
const insightsRouter = express.Router();
const User = require("../models/users");
const AtomicAdmin = require("../models/admin");

async function sessionMiddleware(req, res, next) {
  try {
    const token = req.cookies?.sessionToken;
    const admin = await AtomicAdmin.findOne();
    if (!token || !admin || admin.sessionToken !== token) {
      return res.status(401).json({ message: "Unauthorized", type: "error" });
    }
    next();
  } catch (err) {
    console.error("Session middleware error:", err);
    return res.status(500).json({ message: "Internal server error", type: "error" });
  }
}

// Get aggregated spendings
insightsRouter.get("/", sessionMiddleware, async (req, res) => {
  try {
    const { userId } = req.query;

    let users;
    if (userId && userId !== "all") {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found", type: "error" });
      users = [user];
    } else {
      users = await User.find();
    }

    // Aggregate
    const aggregated = {};
    users.forEach((user) => {
      user.spendings.forEach((s) => {
        if (aggregated[s.category]) aggregated[s.category] += s.amount;
        else aggregated[s.category] = s.amount;
      });
    });

    res.status(200).json({ aggregated });
  } catch (err) {
    console.error("Insights error:", err);
    res.status(500).json({ message: "Internal server error", type: "error" });
  }
});

module.exports = insightsRouter;