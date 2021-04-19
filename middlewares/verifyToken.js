const { TOKEN_SECRET, TOKEN_NAME } = require('../config/config');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token = req.headers[TOKEN_NAME];
    if (token == undefined) {
        res.status(422).json({ error: { message: 'Must provide Token' } });
        // res.status(422).json({ errors: { errors: { message: 'Must provide Token' } }, title: 'Create Page' });
        return;
    }
    if (token) {
        try {
            let decoded = jwt.verify(token, TOKEN_SECRET);
            if (!decoded) {
                res.status(422).json({ error: { message: 'Invalid Token' } });
                // res.status(422).json({ errors: { errors: { message: 'Invalid Token' } }, title: 'Create Page' });
                return;
            }
            req.user = decoded;
        } catch (error) {
            res.status(422).json({ error });
            // res.status(422).json({ errors: { errors: { message: 'Invalid Token' } }, title: 'Create Page' });
            return;
        }
    }
    next();
}

module.exports = verifyToken;