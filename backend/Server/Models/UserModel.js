const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    pic :{
        type: String,
        required: true,
        default: 
            "https://www.w3schools.com/howto/img_avatar.png"
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
    experience: {
        type: Number,
        default: 0
    },
    domain: String,
    company: String
},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);