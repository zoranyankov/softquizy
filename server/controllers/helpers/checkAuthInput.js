const { ENGLISH_ALFANUMERIC_PATT, EMAIL_PATT } = require('../../config/config');

module.exports = (req, res, next) => {
    // const { email, password, rePassword } = req.body;
    const { username, password, rePassword } = req.body;
    const errors = [];
    if (username.length < 5) {
        errors.push({ message: 'Username too short' });
    // } else if (!username.match(ENGLISH_ALFANUMERIC_PATT)) {
    //     errors.errors.push({ message: 'Username is invalid (must contain only english letters and digits)!' });
        // } else if (!email.match(EMAIL_PATT)) {
        //     errors.errors.push({ message: 'Email is invalid (must contain only english letters and digits)!' });
    }
    if (password.length < 7) {
        errors.push({ message: 'Password too short' });
    // } else if (!password.match(ENGLISH_ALFANUMERIC_PATT)) {
    //     errors.errors.push({ message: 'Password is invalid (must contain only english letters and digits)!' });
    } else if (rePassword && password !== rePassword) {
        errors.push({ message: 'Passwords missmatch' });
    }
    req.errors = errors;
    next();
}