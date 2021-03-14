const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    // name: {
    //     type: String,
    //     required: [true, 'Name is required!'],
    //     maxlength: 15,
    // },
    // description: {
    //     type: String,
    //     required: [true, 'Description is required!'],
    //     maxlength: 100,
    // },
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
    // difficultyLevel: {
    //     type: Number,
    //     required: [true, 'DificultyLevel is required!'],
    //     min: 1,
    //     max: 6,
    // },
    // createdAt: {
    //     type: Date,
    //     required: [true, 'need to specify Date'],
    //     default: new Date(),
    // },
    // creatorId: {
    //     type: String,
    //     required: [true, 'CreatorId is required!'],
    // },
    // creatorName: {
    //     type: String,
    //     required: [true, 'creatorName is required!'],
    // },
    // accessories: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Accessory',
    // }]
})

module.exports = mongoose.model('Quiz', quizSchema);