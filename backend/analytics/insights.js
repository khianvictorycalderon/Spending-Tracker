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

insightsRouter.get("/stats", sessionMiddleware, async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(200).json({
        totalUsers: 0,
        totalSpendings: 0,
        averageSpending: 0,
        highestSpender: null,
        lowestSpender: null,
      });
    }

    let totalSpendings = 0;
    let allSpendings = [];
    const userTotals = [];

    for (const user of users) {
      const sum = user.spendings.reduce((acc, s) => acc + s.amount, 0);
      totalSpendings += sum;
      allSpendings.push(...user.spendings.map(s => s.amount));
      userTotals.push({ userId: user._id.toString(), name: user.name, total: sum });
    }

    const averageSpending = totalSpendings / allSpendings.length || 0;

    userTotals.sort((a, b) => b.total - a.total);
    const highestSpender = userTotals[0] || null;
    const lowestSpender = userTotals[userTotals.length - 1] || null;

    // Mode calculation
    const freq = {};
    allSpendings.forEach(val => (freq[val] = (freq[val] || 0) + 1));
    let mode = null;
    let maxFreq = 0;
    for (const [key, value] of Object.entries(freq)) {
      if (value > maxFreq) {
        maxFreq = value;
        mode = Number(key);
      }
    }

    res.status(200).json({
      totalUsers: users.length,
      totalSpendings,
      averageSpending,
      modeSpending: mode,
      highestSpender,
      lowestSpender,
    });

  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ message: "Internal server error", type: "error" });
  }
});

module.exports = insightsRouter;

module.exports = insightsRouter;