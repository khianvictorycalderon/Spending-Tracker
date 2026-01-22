const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/config");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

// Tries to connect to Database
connectDB();

// Middlewares
app.use(cors({
  origin: process.env.CORS_ALLOW_ORIGIN || "*",
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// Adding sub routers
app.use("/api", require("./api"));

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});