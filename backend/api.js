const express = require("express");
const router = express.Router();
const Admin = require("./models/admin");

const DEFAULT_PASSWORD = "admin123";
const DEFAULT_OTP = 10002000;

router.get("/", (_req, res) => {
    res.send("API is working!");
});

router.post("/login", (req, res) => {
    
    const { password, otp } = req.body;

    // Default password: admin123
    // Default otp: 10002000
    // On first login, change the password immediately

    // Auto create first user:
    

    res.status(200).json({
        message: "Data received successfully",
        type: "success"
    });

});

module.exports = router;