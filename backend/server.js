const express = require("express");
const cors = require("cors");
const connectDB = require("./db/config");

const PORT = 7500;

const app = express();

// Tries to connect to Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Adding sub routers
app.use("/api", require("./api"));

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});