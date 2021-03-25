const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    quizName: {
        type: String,
        required: [true, 'quizName is required!'],
    },
    quizName: {
        type: Object,
        required: [true, 'Result object is required!'],
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
    creatorId: {
        type: String,
        required: [true, 'CreatorId is required!'],
    },
    creatorName: {
        type: String,
        required: [true, 'creatorName is required!'],
    },
    userAnswers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accessory',
    }]
})

module.exports = mongoose.model('Result', resultSchema);