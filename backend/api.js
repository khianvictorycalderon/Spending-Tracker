const express = require("express");
const router = express.Router();
const Admin = require("./models/admin");
const bcrypt = require("bcryptjs");

const DEFAULT_PASSWORD = "admin123";
const DEFAULT_OTP = "123456";

router.get("/", (_req, res) => {
    res.send("API is working!");
});

router.post("/admin", async (_req, res) => {
    try {

        const admins = await Admin.find();

        if (admins.length >= 1) {
            return res.status(400).json({
                message: "Admin already exists",
                type: "warning"
            });
        }

        const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);
        const hashedOTP = await bcrypt.hash(DEFAULT_OTP, 10);

        const newAdmin = new Admin({
            password: hashedPassword,
            otp: hashedOTP
        });

        await newAdmin.save();

        return res.status(201).json({
            message: "Admin created successfully",
            type: "success"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
            type: "error"
        });
    }
});

module.exports = router;