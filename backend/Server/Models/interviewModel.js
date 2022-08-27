const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        interviewerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        request: {
            type: String
        },
        date: {
            type: Date,
            default: new Date(),
            required: true
        },
        time: {
            type: Date,
            default: new Date(),
            required: true
        },
        link: {
            type: String,
            default: 'Nill',
            required: true
        },
        cancelled: {
            type: Boolean,
            default: false
        },
        confirmed: {
            type: Boolean,
            default: false
        },
        userConfirmed: {
            type: Boolean,
            default: false
        },
        userCancelled: {
            type: Boolean,
            default: false
        },
        status: {
            type: String
        },
        feedback: {
            type: String
        }
    }, { timestamps: true }
);

module.exports = mongoose.model('Interview', interviewSchema);