const mongoose = require("mongoose");
require("dotenv").config();

const mongoDB_URI = process.env.MONGODB_URI;

const connectDB = async() => {
    try {
        await mongoose.connect(mongoDB_URI, {
            useNewUrlParse: true,
            useUnifiedTopology: true
        });
    } catch (e) {
        console.error(`MongoDB connection error: ${e instanceof Error ? e.mesasage : String(e)}`);
        process.exit(1);
    }
}

module.exports = connectDB;