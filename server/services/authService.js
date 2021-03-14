const User = require('../models/User');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, TOKEN_SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');

async function login(user, pass) {
    user = user.toLowerCase(); // first option
    // user = new RegExp(user, 'ig'); // second option
    return User.findOne({ username: user })
        .then((userFound) => {
            if (!userFound) throw { message: 'Wrong User or Password!' };
            return bcrypt.compare(pass, userFound.password)
                .then((isIdentical) => {
                    if (!isIdentical) {
                        throw new Error('Wrong User ot PASSword!');
                    }
                    return token = jwt.sign({ _id: userFound._id, name: userFound.username }, TOKEN_SECRET)
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