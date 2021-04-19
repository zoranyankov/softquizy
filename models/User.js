const mongoose = require('mongoose');
const { ENGLISH_ALFANUMERIC_PATT, ENGLISH_ALFANUMSPACE_PATT, EMAIL_PATT } = require('../config/config');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/config');


const userSchema = new mongoose.Schema({
    // _id : {
    //     type: mongoose.Types.ObjectId
    // },
    // email: {
    //     type: String,
    //     requred: [true, { errors: { message: 'You need to specify Email' } }],
    //     unique: [true, { errors: { message: 'Email is used!' } }],
    //     min: [3, { errors: { message: 'Email is too short!' } }],
    //         // validate: {
    //         //     validator: function (v) {
    //         //         return EMAIL_PATT.test(v);
    //         //     },
    //         //     message: props => `${props.value} is not a valid username!`
    //         // },
    // },
    username: {
        type: String,
        minlength: [5, 'Username is to short'],
        requred: true,
        validate: [ENGLISH_ALFANUMSPACE_PATT, props => `${props.value} is not a valid username!`],
        unique: true,
        // validate: {
        //     validator: function (v) {
        //         return ENGLISH_ALFANUMERIC_PATT.test(v);
        //     },
        //     message: props => `${props.value} is not a valid username!`
        // },
    },
    password: {
        type: String,
        minlength: [7, 'Password is to short'],
        requred: true,
        // unique: true,
        // validate: {
        //     validator: function (v) {
        //         return /^[a-zA-Z0-9]+$/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid username!`
        // },
    },
    picture: {
        type: String, 
        // validate: /^https?/i,
        validate: {
            validator: function(v) {
                return v.match(/^https?/i);
            },
            message: props => `${props.value} is not a valid Url`,
        },
    },
    results: [{
        type: Object,
    }]
});

userSchema.pre('save', function(next) {
    bcrypt.genSalt(SALT_ROUNDS)
        .then(salt => bcrypt.hash(this.password, salt))
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(next)
})


module.exports = mongoose.model('User', userSchema);