const User = require('../models/User');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, TOKEN_SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');

async function login(user, pass) {
    user = user.toLowerCase(); // first option
    console.log(user);
    // user = new RegExp(user, 'ig'); // second option
    return User.findOne({ username: user })
        .then((userFound) => {
            if (!userFound) {
                return { errors: [{ message: 'Wrong User or Password!' }] };
            }
            return bcrypt.compare(pass, userFound.password)
            .then((isIdentical) => {
                    if (!isIdentical) {
                        throw new Error('Wrong User ot PASSword!');
                    }
                    let token = jwt.sign({ _id: userFound._id, name: userFound.username }, TOKEN_SECRET);
                    return { user: userFound, token };
                })
        })
}

async function register(username, password) {
    const newUser = new User({ username, password });
    return newUser.save();
}

module.exports = {
    login,
    register,
}