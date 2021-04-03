const router = require('express').Router();
const User = require('../models/User');
const authSevice = require('../services/authService');
const { TOKEN_NAME, ENGLISH_ALFANUMERIC_PATT } = require('../config/config');
const { isAuthorized, isLogged } = require('../middlewares/guards');
const checkAuthInput = require('./helpers/checkAuthInput');


// router.get('/login', isAuthorized, (req, res) => {
//     res.render('auth/login', { title: 'Login Page' });
//     return;
// });

router.post('/login', isAuthorized, checkAuthInput, (req, res) => {
    const { username, password } = req.body;
    // const errors = req.errors;
    // if (errors && errors.errors.length > 0) {
    //     res.status(422).render('auth/login', { ...errors, title: 'Login page', username });
    //     // next(errors);
    //     return;
    // }

    authSevice.login(username, password)
        .then(({user, token}) => {
            // res.cookie(TOKEN_NAME, token, { httpOnly: true });
            res.json({user, token});
            // res.redirect('/questions');
            return;
        })
        .catch(err => {
            console.log('inLoginError');
            let errors;
            if (err.errors) {
                errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
            } else {
                errors = { errors: { message: err.message } };
            }
            res.status(422).json({ errors, title: 'Login Page' });
            // res.status(422).render('auth/login', { errors, title: 'Login Page' });
            // next(err);
            return;
        });
});

router.post('/verify', isAuthorized, checkAuthInput, (req, res) => {
    const { username, token } = req.body;
    // const errors = req.errors;
    // if (errors && errors.errors.length > 0) {
    //     res.status(422).render('auth/login', { ...errors, title: 'Login page', username });
    //     // next(errors);
    //     return;
    // }
    console.log(req.body);
    authSevice.verify(username, token)
        .then((result) => {
            console.log('verify result' + result);
            res.json({result});
            return ;
        })
        .catch(err => {
            let errors;
            if (err.errors) {
                errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
            } else {
                errors = { errors: { message: err.message } };
            }
            res.status(422).json({ errors, title: 'Verify Page' });
            // res.status(422).render('auth/login', { errors, title: 'Login Page' });
            // next(err);
            return;
        });
});

router.get('/get', (req, res) => {
    console.log('inGet');
    console.log(req.body);
    // const { username, token } = req.body;
    // // const errors = req.errors;
    // // if (errors && errors.errors.length > 0) {
    // //     res.status(422).render('auth/login', { ...errors, title: 'Login page', username });
    // //     // next(errors);
    // //     return;
    // // }
    // authSevice.verify(username, token)
    //     .then((result) => {
    //         console.log(result);
    //         res.json({result});
    //         return ;
    //     })
    //     .catch(err => {
    //         let errors;
    //         if (err.errors) {
    //             errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
    //         } else {
    //             errors = { errors: { message: err.message } };
    //         }
    //         res.status(422).json({ errors, title: 'Verify Page' });
    //         // res.status(422).render('auth/login', { errors, title: 'Login Page' });
    //         // next(err);
    //         return;
    //     });
    res.json({user: req.body})
});

// router.post('/updateResults', isAuthorized, checkAuthInput, (req, res) => {
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

// router.get('/register', isAuthorized, (req, res) => {
//     console.log('inServerRegister');
//     res.status(200).json({username: 'someName'});
//     // res.render('auth/register', { title: 'Register Page' });
//     return;
// });

router.post('/register', (req, res, next) => {
    console.log('in Register');
    const { username, password, picture } = req.body;
    let newUser = username.toLowerCase();
    console.log(picture);
    let newPicture = picture? picture : 'https://res.cloudinary.com/softquizy/image/upload/v1617431642/placeholder-profile.jpg';
    // const errors = req.errors;
    // console.log(username);
    // console.log(password);

    // if (errors && errors.errors.length > 0) {
    //     res.status(422).render('auth/register', {...errors, title: 'Register page', username });
    //     // next(errors);
    //     return;
    // }
    User.findOne({ username: newUser })
        .then(userFound => {
            if (userFound) {
                res.json({ errors: [{ message: 'Username exists' }], title: 'Register page' });
                // res.render('auth/register', { errors: [{ message: 'Username exists' }], title: 'Register page' });
                return;
            }
            if (!password.match(ENGLISH_ALFANUMERIC_PATT)) {
                res.json({ errors: [{ message: `Password ${'*'.repeat(password.length)} is invalid!` }], title: 'Register page', username });
                // res.render('auth/register', { errors: [{ message: `Password ${'*'.repeat(password.length)} is invalid!` }], title: 'Register page', username });
                // next( {message: `Password ${password} is invalid!` });
                return;
            }
            return authSevice.register(newUser, password, newPicture)
                .then((user) => {
                    console.log('User created');
                    return res.status(201).json(user);
                    // res.redirect('/auth/login');
                })
                .catch(err => {
                    let errors;
                    if (err.errors) {
                        errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
                    } else {
                        errors = { errors: { message: err.message } };
                    }
                    res.status(422).json({ errors, title: 'Register Page' });
                    // res.render('auth/register', { errors, title: 'Register Page' })
                    // next(err);
                    return;
                })
        })
        .catch(next);
});

router.get('/logout', isLogged, (req, res) => {
    res.clearCookie(TOKEN_NAME);
    res.redirect('/questions');
    return;
});

module.exports = router;