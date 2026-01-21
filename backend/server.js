const express = require("express");
const cors = require("cors");

const PORT = 7500;

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
    res.json({
        message: "API is working!",
        type: "success"
    });
});

// Adding sub routers
app.use("/api", require("./api"));

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});