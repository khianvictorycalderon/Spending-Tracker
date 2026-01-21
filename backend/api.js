const express = require("express");
const router = express.Router();
const AtomicAdmin = require("./models/admin");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

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
        const sessionToken = crypto.randomUUID();

        const admins = await AtomicAdmin.find();

        if(admins.length < 1) {
            const admin = new AtomicAdmin({
                password: hashedPassword,
                otp: hashedOTP,
                sessionToken
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

// Tries to login
router.post("/login", async (req, res) => {
    try {
        const { password, otp } = req.body;

        const admin = await AtomicAdmin.findOne();
        if (!admin) {
            return res.status(404).json({
                message: "Admin not found",
                type: "error"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        const isOTPValid = await bcrypt.compare(String(otp), admin.otp);

        if (isPasswordValid && isOTPValid) {
            res.cookie("sessionToken", admin.sessionToken, {
                httpOnly: true,
                sameSite: "lax",
                secure: false,
                path: "/",
                maxAge: 1000 * 60 * 60 * 24
            });

            return res.status(200).json({
                message: "Successfully logged in!",
                type: "success"
            });
        } else {
            return res.status(401).json({
                message: "Invalid password or OTP",
                type: "error"
            });
        }

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Internal server error",
            type: "error"
        });
    }
});

// After each logout, it generates new OTP for the next login
router.delete("/logout", async (req, res) => {
  try {
    const admin = await AtomicAdmin.findOne();
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();

    admin.otp = await bcrypt.hash(newOTP, 10);
    admin.sessionToken = crypto.randomUUID();
    await admin.save();

    res.clearCookie("sessionToken", {
      path: "/"
    });

    return res.status(200).json({
      message: "Logged out",
      otp: newOTP
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Logout failed" });
  }
});

router.get("/check-session", async (req, res) => {

  try {
    if (!req.cookies) {
      return res.status(401).json({ loggedIn: false });
    }

    const token = req.cookies.sessionToken;
    if (!token) {
      return res.status(401).json({ loggedIn: false });
    }

    const admin = await AtomicAdmin.findOne();
    if (!admin) {
      return res.status(401).json({ loggedIn: false });
    }

    if (admin.sessionToken !== token) {
      return res.status(401).json({ loggedIn: false });
    }

    return res.status(200).json({ loggedIn: true });

  } catch (err) {
    console.error("CHECK SESSION CRASH:", err);
    return res.status(500).json({ loggedIn: false });
  }
});

module.exports = router;