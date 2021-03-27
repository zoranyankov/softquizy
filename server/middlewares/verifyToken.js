const { TOKEN_SECRET, TOKEN_NAME } = require('../config/config');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log('inVerifyToken');
    console.log(req.body);
    let token = req.headers[TOKEN_NAME];
    console.log('token');
    console.log(token);
    if (token == 'undefined') {
        res.status(422).json({ errors: { errors: { message: 'Must provide Token' } }, title: 'Create Page' });
    }
    if (token) {
        try {
            let decoded = jwt.verify(token, TOKEN_SECRET);
            if (!decoded) {
                console.log('decoded' + decoded);
                res.status(422).json({ errors: { errors: { message: 'Invalid Token' } }, title: 'Create Page' });
                return;
            }
            req.user = decoded;
        } catch (error) {
            res.status(422).json({ error });
            // res.status(422).json({ errors: { errors: { message: 'Invalid Token' } }, title: 'Create Page' });
            return;
        }
        // res.locals.isAuth = true;
        // res.locals.loggedUser = decoded.name.toUpperCase();
    }
    next();
}

module.exports = verifyToken;