const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    quizName: {
        type: String,
        required: [true, 'Quiz Name is required!'],
    },
    userResults: {
        type: Array,
        required: [true, 'Result data is required!'],
    },
    score: {
        type: String,
        required: [true, 'Score is required!'],
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Result', resultSchema);