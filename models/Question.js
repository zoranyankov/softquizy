const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Category is required!'],
    },
    difficulty: {
        type: String,
        required: [true, 'DificultyLevel is required!'],
    },
    question: {
        type: String,
        required: [true, 'Question is required!'],
        minlength: 3,
        maxlength: 100,
    },
    correct_answer: {
        type: String,
        required: [true, 'need to specify correct answer'],
        minlength: 3,
        maxlength: 100,
    },
    incorrect_answers: [{
        type: String,
        required: [true, 'need to specify at lease one wrong answer'],
        minlength: 3,
        maxlength: 100,
    }],
    creatorId: {
        type: String,
        required: [true, 'CreatorId is required!'],
    },
    creatorName: {
        type: String,
        required: [true, 'creatorName is required!'],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
})

module.exports = mongoose.model('Question', questionSchema);