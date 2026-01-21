const mongoose = require("mongoose");

const Admin = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: [/^[A-Za-z\s]+$/, "Name should contain only letters"]
    },
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: true
    }
});