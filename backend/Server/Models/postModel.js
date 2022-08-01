const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        postImage: {
            type: String,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required"],
        },
        createdAt: {
            type: Date,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: [true, "User is required"],
            },
        ],
        comments: [
            {
                commentedBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: [true, "User is required"],
                },
                comment: {
                    type: String,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", postSchema);
