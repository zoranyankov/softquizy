const router = require('express').Router();
const User = require('../models/User');
const authSevice = require('../services/authService');
const { TOKEN_NAME, ENGLISH_ALFANUMERIC_PATT } = require('../config/config');
const checkAuthInput = require('./helpers/checkAuthInput');


router.post('/login', checkAuthInput, (req, res) => {
    const { username, password } = req.body;
    const errors = req.errors;
    if (errors && errors.errors.length > 0) {
        res.status(422).json({ ...errors, title: 'Login Page' });
        return;
    }
    authSevice.login(username, password)
        .then(({ user, token }) => {
            res.json({ user, token });
            return;
        })
        .catch(err => {
            console.log('inLoginError');
            let errors;
            if (err.errors) {
                errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
            } else {
                errors = { errors: [{ message: err.message }] };
            }
            console.log(errors);
            res.status(422).json({ ...errors, title: 'Login Page' });
            return;
        });
});

router.post('/verify', (req, res) => {
    const { username, token } = req.body;
    authSevice.verify(username, token)
        .then((result) => {
            res.json({ result });
            return;
        })
        .catch(err => {
            console.log('inVerifyError');
            let errors;
            if (err.errors) {
                errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
            } else {
                errors = { errors: [{ message: err.message }] };
            }
            res.status(422).json({ ...errors, title: 'Verify Page' });
            return;
        });
});

// router.post('/updateResults', checkAuthInput, (req, res) => {
//     const {data, userId} = req.body;
// console.log('inUpdate');
// console.log(req.body);
// res.json();

//     // const errors = req.errors;
//     // if (errors && errors.errors.length > 0) {
//     //     res.status(422).render('auth/login', { ...errors, title: 'Login page', username });
//     //     // next(errors);
//     //     return;
//     // }

//     // authSevice.updateResults(userId, data)
//     //     .then((result) => {
//     //         res.status(201).json({result});
//     //         return ;
//     //     })
//     //     .catch(err => {
//     //         let errors;
//     //         if (err.errors) {
//     //             errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
//     //         } else {
//     //             errors = { errors: { message: err.message } };
//     //         }
//     //         res.status(422).json({ errors, title: 'Update Page' });
//     //         // res.status(422).render('auth/login', { errors, title: 'Login Page' });
//     //         // next(err);
//     //         return;
//     //     });
// });

router.post('/register', checkAuthInput, (req, res, next) => {
    const { username, password, picture } = req.body;
    let newUser = username.toLowerCase();
    let newPicture = picture ? picture : 'https://res.cloudinary.com/softquizy/image/upload/v1617431642/placeholder-profile.jpg';
    const errors = req.errors;
    if (errors && errors.errors.length > 0) {
        res.status(422).json({ ...errors, title: 'Register Page' });
        return;
    }
    User.findOne({ username: newUser })
        .then(userFound => {
            if (userFound) {
                res.json({ errors: [{ message: 'Username exists' }], title: 'Register page' });
                return;
            }
            if (!password.match(ENGLISH_ALFANUMERIC_PATT)) {
                res.json({ errors: [{ message: `Password ${'*'.repeat(password.length)} is invalid!` }], title: 'Register page', username });
                return;
            }
            return authSevice.register(newUser, password, newPicture)
                .then((user) => {
                    console.log('User created');
                    return res.status(201).json(user);
                })
                .catch(err => {
                    console.log('inRegisterError');
                    let errors;
                    if (err.errors) {
                        errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
                    } else {
                        errors = { errors: [{ message: err.message }] };
                    }
                    res.status(422).json({ ...errors, title: 'Register Page' });
                    return;
                })
        })
        .catch(next);
});

module.exports = router;