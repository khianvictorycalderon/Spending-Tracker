const mongoose = require("mongoose");

const AtomicAdmin = new mongoose.Schema({
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true
    },
    sessionToken: {
        type: String
    }
}, {
    timestamps: true
});

// This ensures only ONE admin document can exist
AtomicAdmin.index({}, { unique: true });

module.exports = mongoose.model("AtomicAdmin", AtomicAdmin);