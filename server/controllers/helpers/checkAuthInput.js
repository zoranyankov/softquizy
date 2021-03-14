const { ENGLISH_ALFANUMERIC_PATT, EMAIL_PATT } = require('../../config/config');

module.exports = (req, res, next) => {
    // // const { email, password, rePassword } = req.body;
    // const { username, password, repeatPassword } = req.body;
    // const errors = { errors: [] };
    // if (username.length < 3) {
    //     errors.errors.push({ message: 'Username too short (must contain only english letters and digits)!' });
    // } else if (!username.match(ENGLISH_ALFANUMERIC_PATT)) {
    //     errors.errors.push({ message: 'Username is invalid (must contain only english letters and digits)!' });
    //     // } else if (!email.match(EMAIL_PATT)) {
    //     //     errors.errors.push({ message: 'Email is invalid (must contain only english letters and digits)!' });
    // }
    // if (password.length < 3) {
    //     errors.errors.push({ message: 'Password too short (must contain only english letters and digits)!' });
    // } else if (!password.match(ENGLISH_ALFANUMERIC_PATT)) {
    //     errors.errors.push({ message: 'Password is invalid (must contain only english letters and digits)!' });
    // } else if (repeatPassword && password !== repeatPassword) {
    //     errors.errors.push({ message: 'Passwords missmatch' });
    // }
    // req.errors = errors;
    next();
}