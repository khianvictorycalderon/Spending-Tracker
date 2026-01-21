const express = require("express");
const router = express.Router();
const AtomicAdmin = require("./models/admin");
const bcrypt = require("bcryptjs");

const DEFAULT_PASSWORD = "admin123";
const DEFAULT_OTP = "123456";

// Test route
router.get("/", (_req, res) => {
    res.send("API is working!");
});

// Create first admin
router.post("/admin", async (_req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);
        const hashedOTP = await bcrypt.hash(DEFAULT_OTP, 10);

        const admins = await AtomicAdmin.find();

        if(admins.length < 1) {
            const admin = new AtomicAdmin({
                password: hashedPassword,
                otp: hashedOTP
            });

            await admin.save();
        }

        // Always respond the same
        return res.status(200).json({
            message: "Admin created or already exists",
            type: "success"
        });

    } catch (error) {
        console.error("Error creating admin:", error);
        return res.status(500).json({
            message: "Internal server error",
            type: "error"
        });
    }
});

module.exports = router;