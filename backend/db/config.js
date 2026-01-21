const mongoose = require("mongoose");
require("dotenv").config();

const mongoDB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(
      `MongoDB connection error: ${
        error instanceof Error ? error.message : String(error)
      }`
    );

    process.exit(1);
  }
};

module.exports = connectDB;