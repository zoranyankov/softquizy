const { TOKEN_SECRET, TOKEN_NAME } = require('../config/config');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
        let token = req.headers[TOKEN_NAME];
        // console.log('token');
        // console.log(token);
        if (token == 'undefined') {
            res.status(422).json({ errors: { errors: { message: 'Must provide Token' } }, title: 'Create Page' });
        }
        if (token) {
            let decoded = jwt.verify(token, TOKEN_SECRET);
            if (!decoded) {
                res.status(422).json({ errors: { errors: { message: 'Invalid Token' } }, title: 'Create Page' });
            }
            req.user = decoded;
            // res.locals.isAuth = true;
            // res.locals.loggedUser = decoded.name.toUpperCase();
        }
        next();
}

module.exports = verifyToken;