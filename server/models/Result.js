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
    // difficulty: {
    //     type: String,
    //     required: [true, 'DificultyLevel is required!'],
    // },
    // question: {
    //     type: String,
    //     required: [true, 'Question is required!'],
    //     maxlength: 100,
    // },
    // creatorId: {
    //     type: String,
    //     required: [true, 'CreatorId is required!'],
    // },
    // creatorName: {
    //     type: String,
    //     required: [true, 'creatorName is required!'],
    // },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

module.exports = mongoose.model('Result', resultSchema);