const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { SALT_ROUNDS, TOKEN_SECRET } = require('../config/config');

async function login(user, pass) {
    user = user.toLowerCase(); // first option
    // console.log(user);
    // user = new RegExp(user, 'ig'); // second option
    return User.findOne({ username: user })
        .then((userFound) => {
            if (!userFound) {
                throw { errors: [{ message: 'Wrong User or Password!' }] };
            }
            return bcrypt.compare(pass, userFound.password)
                .then((isIdentical) => {
                    if (!isIdentical) {
                        throw { errors: [{ message: 'Wrong User or Password!' }] }
                        // throw new Error('Wrong User ot PASSword!');
                    }
                    let token = jwt.sign({ _id: userFound._id, name: userFound.username }, TOKEN_SECRET);
                    return { user: userFound, token };
                })
        })
}

async function register(username, password, picture) {
    console.log(picture);
    const newUser = new User({ username, password, picture });
    return newUser.save();
}

async function verify(user, token) {
    user = user.toLowerCase(); // first option
    return User.findOne({ username: user })
        .then((userFound) => {
            if (!userFound) {
                // return { errors: [{ message: 'Wrong User or Password!' }] };
                return false;
            }
            let decoded = jwt.verify(token, TOKEN_SECRET);
            if (!decoded) {
                return false;
            }
            let name = decoded.name;
            return Boolean(name == userFound.username);
        })
}

// async function getOne(user, token) {
//     user = user.toLowerCase(); // first option
//     return User.findOne({ username: user })
//         .then((userFound) => {
//             if (!userFound) {
//                 // return { errors: [{ message: 'Wrong User or Password!' }] };
//                 return false;
//             }
//             let decoded = jwt.verify(token, TOKEN_SECRET);
//             if (!decoded) {
//                 return false;
//             }
//             let name = decoded.name;
//             return Boolean(name == userFound.username);
//         })
// }

async function updateResults(userId, newResults) {
    User.findById(userId)
    .then (user => {
        console.log('execute');
        user.results.push(newResults);
        console.log(user);
        // User.findByIdAndUpdate(userId, user)
        // .then(response => console.log('response : ' + response))
        // .catch(err => console.log('updatebyID Error: ' + err))
    })
    .catch(err => console.log('Update User Error : ' + err))
}

module.exports = {
    login,
    register,
    verify,
    updateResults,
    // getOne,
}