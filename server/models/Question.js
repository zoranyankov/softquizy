const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Name is required!'],
        maxlength: 15,
    },
    difficulty: {
        type: Number,
        required: [true, 'DificultyLevel is required!'],
        min: 1,
        max: 6,
    },
    question: {
        type: String,
        required: [true, 'Description is required!'],
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
        type: Date,
        required: [true, 'need to specify Date'],
        default: new Date(),
    },
    incorrect_answers: {
        type: Date,
        required: [true, 'need to specify Date'],
        default: new Date(),
    },
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