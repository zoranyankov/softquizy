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
        maxlength: 100,
    },
    // imageUrl: {
    //     type: String,
    //     // validate: /^https?/i,
    //     validate: {
    //         validator: function(v) {
    //             return v.match(/^https?/i);
    //         },
    //         message: props => `${props.value} is not a valid Url`,
    //     },
    // },
    correct_answer: {
        type: String,
        required: [true, 'need to specify correct answer'],
    },
    incorrect_answers: [{
        type: String,
        required: [true, 'need to specify at lease one wrong answer'],
    }],
    creatorId: {
        type: String,
        required: [true, 'CreatorId is required!'],
    },
    creatorName: {
        type: String,
        required: [true, 'creatorName is required!'],
    },
    // accessories: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Accessory',
    // }]
})

module.exports = mongoose.model('Question', questionSchema);