const express = require("express");
const userRouter = express.Router();
const User = require("../models/users");
const AtomicAdmin = require("../models/admin");

// Middleware to check sessionToken
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

// --- USERS CRUD ---

// GET all users
userRouter.get("/", sessionMiddleware, async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
});

// POST new user
userRouter.post("/", sessionMiddleware, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required", type: "error" });

  const user = new User({ name });
  await user.save();
  res.status(201).json({ message: "User created", user });
});

// PUT /api/user/:id → update user name
userRouter.put("/:id", sessionMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Name is required", type: "error" });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found", type: "error" });

    user.name = name;
    await user.save();

    res.status(200).json({ user });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: "Internal server error", type: "error" });
  }
});

// DELETE user
userRouter.delete("/:id", sessionMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    const users = await User.find(); // return updated list
    res.status(200).json({ users, message: "User deleted", type: "success" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Internal server error", type: "error" });
  }
});

// --- SPENDINGS CRUD ---

// GET all spendings for a user
userRouter.get("/:id/spending", sessionMiddleware, async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found", type: "error" });

  res.status(200).json({ spendings: user.spendings });
});

// POST new spending for a user
userRouter.post("/:id/spending", sessionMiddleware, async (req, res) => {
  const { id } = req.params;
  const { amount, category, note } = req.body;

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found", type: "error" });

  const spending = { amount, category, note };
  user.spendings.push(spending);
  await user.save();

  res.status(201).json({ message: "Spending added", spending, spendings: user.spendings });
});

userRouter.put("/:id/spending/:spendingId", sessionMiddleware, async (req, res) => {
  const { id, spendingId } = req.params;
  const { amount, category, note } = req.body;

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found", type: "error" });

  const spending = user.spendings.id(spendingId);
  if (!spending) return res.status(404).json({ message: "Spending not found", type: "error" });

  spending.amount = amount;
  spending.category = category;
  spending.note = note;

  await user.save();
  res.status(200).json({ spendings: user.spendings });
});

// DELETE a spending
userRouter.delete("/:id/spending/:spendingId", sessionMiddleware, async (req, res) => {
  const { id, spendingId } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found", type: "error" });

  user.spendings = user.spendings.filter(s => s._id.toString() !== spendingId);
  await user.save();

  res.status(200).json({ message: "Spending deleted", spendings: user.spendings });
});

module.exports = userRouter;