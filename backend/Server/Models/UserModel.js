const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    blocked:{
        type: Boolean,
        default: false
    },
    interviewer:{
        type: Boolean,
        default: false
    },
    mobile: {
        type: String,
        required: [true, "Mobile is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    domain: String,
    experience: {
        type: Number,
        default: 0
    },
    Company: String
});

module.exports = mongoose.model("User", userSchema);