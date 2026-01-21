const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    const { password, otp } = req.body;

    console.log(`Password: ${password}\nOTP: ${otp}`);

    // Add sample request
    res.status(200).json({
        message: "Data received successfully",
        type: "success"
    });

});

module.exports = router;