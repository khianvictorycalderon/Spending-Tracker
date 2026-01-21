const mongoose = require("mongoose");

const Admin = new mongoose.Schema({
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Admin", Admin);