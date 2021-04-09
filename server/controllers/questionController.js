const { Router } = require('express');


const questionService = require('../services/questionServices');
const checkQuestionInput = require('./helpers/checkQuestionInput');
const verifyToken = require('../middlewares/verifyToken');

const router = Router();

router.get('/', verifyToken, (req, res, next) => {
    const _id = req.user ? req.user._id : null;
    questionService.getAll(req.query)
        .then(questions => {
            questions.forEach(c => c.isCreator = c.creatorId == _id);
            res.status(200).json(questions);
        })
        .catch(err => {
            console.log('ingGetAllQuestionError');
            let errors;
            if (err.errors) {
                errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
            } else {
                errors = { errors: [{ message: err.message }] };
            }
            console.log(errors);
            res.status(422).json({ errors, title: 'Get Question Page' });
            return;
        });
});

router.get('/categories', verifyToken, (req, res, next) => {
    const _id = req.user ? req.user._id : null;
    questionService.getCategories(req.query)
        .then(questions => {
            questions.forEach(c => c.isCreator = c.creatorId == _id);
            res.status(200).json(questions);
        })
        .catch(err => {
            console.log('ingGetAllCategoriesError');
            let errors;
            if (err.errors) {
                errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
            } else {
                errors = { errors: [{ message: err.message }] };
            }
            console.log(errors);
            res.status(422).json({ ...errors, title: 'Get Categories Page' });
            return;
        });
});

router.get('/category/:cat', verifyToken, (req, res, next) => {
    const _id = req.user ? req.user._id : null;
    questionService.getCategory(req.params.cat)
        .then(questions => {
            questions.forEach(c => c.isCreator = c.creatorId == _id);
            res.status(200).json(questions);
        })
        .catch(err => {
            console.log('ingGetOneCategoryError');
            let errors;
            if (err.errors) {
                errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
            } else {
                errors = { errors: [{ message: err.message }] };
            }
            console.log(errors);
            res.status(422).json({ errors, title: 'Get One Category Page' });
            return;
        });
});

router.get('/byUser/:userId', verifyToken, (req, res) => {
    const userId = req.params.userId;
    // const errors = req.errors;
    // if (errors && errors.errors.length > 0) {
    //     res.status(422).render('auth/login', { ...errors, title: 'Login page', username });
    //     // next(errors);
    //     return;
    // }
    console.log('inQuestion getOne by userId api route');
    questionService.getOneByUserId(userId)
        .then((questions) => {
            if (questions.length === 0) {
                res.status(204).end();
                // res.status(204).json({errors : {message: "You haven't created any questions yet"}});
                return;
            }
            res.status(302).json(questions);
            return;
        })
        .catch(err => {
            let errors;
            console.log("inGetOneByUseIdError");
            if (err.errors) {
                errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
            } else {
                errors = { errors: [{ message: err.message }] };
            }
            console.log(errors);
            res.status(422).json({ errors, title: 'Get One Question By User Id Page' });
            return err;
        });
});

router.post('/create', verifyToken, (req, res, next) => { //TODO: checkQuestionInput,

    const errors = req.errors;
    const newQuestion = req.body;

    // newQuestion.incorrect_answers = newQuestion.incorrect_answers.split(' / ')

    // if (errors && errors.errors.length > 0) {
    //     res.status(422).render('questions/createQuestion', {...errors, ...req.body });
    //     // next(errors);
    //     return;
    // }
    questionService.create({ ...newQuestion, creatorId: req.user._id, creatorName: req.user.name })
        .then(data => {
            console.log('Question created');
            res.status(201).json(data);
            return;
        })
        .catch(err => {
            let errors;
            console.log("inCreateQuestionError");
            if (err.errors) {
                errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
            } else {
                errors = { errors: [{ message: err.message }] };
            }
            console.log(errors);
            res.status(422).json({ errors, title: 'Create Question Page' });
            return err;
        });
});

router.get('/:questionId', verifyToken, (req, res) => {
    console.log(req.url);
    const questionId = req.params.questionId;
    // const errors = req.errors;
    // if (errors && errors.errors.length > 0) {
    //     res.status(422).render('auth/login', { ...errors, title: 'Login page', username });
    //     // next(errors);
    //     return;
    // }
    console.log('inQuestion getOne by questionId api route');
    questionService.getOne(questionId)
        .then((question) => {
            res.status(302).json(question);
            return;
        })
        .catch(err => {
            let errors;
            console.log("inGetOneByQuestionIdError");
            if (err.errors) {
                errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
            } else {
                errors = { errors: [{ message: err.message }] };
            }
            console.log(errors);
            res.status(422).json({ errors, title: 'Get One Question By Question Id Page' });
            return err;
        });
});


// router.get('/details/:prod_id', (req, res, next) => {
//     const _id = req.user ? req.user._id : null;
//     questionService.getOnePopulated(req.params.prod_id)
//         .then((currentQuestion) => {
//             currentQuestion.isCreator = currentQuestion.creatorId == _id;
//             res.render('questions/details', { ...currentQuestion });
//             return;
//         })
//         .catch(next);
// });

router.patch('/edit/:questionId', verifyToken, (req, res, next) => {
    const errors = req.errors;
    const questionId = req.params.questionId;
    const newQuestion = req.body;
    console.log('inEdit');
    console.log(questionId, newQuestion);

    // if (errors && errors.errors.length > 0) {
    //     res.status(422).render('questions/editQuestion', { ...errors, _id: req.params.prod_id, ...req.body });
    //     // next(errors);
    //     return;
    // }
    questionService.update(questionId, { ...newQuestion })
        .then(question => {
            res.status(302).json(question);
            // console.log(data);
            // res.redirect(`/questions/details/${data._id}`);
            return;
        })
        .catch(err => {
            let errors;
            console.log("inEditQuestionIdError");
            if (err.errors) {
                errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
            } else {
                errors = { errors: [{ message: err.message }] };
            }
            console.log(errors);
            res.status(422).json({ errors, title: 'Edit Question By Question Id Page' });
            return err;
        });
});

router.delete('/delete/:questionId', verifyToken, (req, res, next) => {
    console.log('inDelete');
    questionService.removeOne(req.params.questionId)
        .then((data) => {
            res.status(202).json(data);
            // res.render('questions/deleteQuestion', { ...data });
            return;
        })
        .catch(err => {
            let errors;
            console.log("inDeleteQuestionIdError");
            if (err.errors) {
                errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
            } else {
                errors = { errors: [{ message: err.message }] };
            }
            console.log(errors);
            res.status(422).json({ errors, title: 'Delete Question By Question Id Page' });
            return err;
        });
});

// router.get('/clearDB', (req, res, next) => {
//     questionService.clear()
//         .then((data) => res.redirect('/questions'))
//         .catch(next);
// });


module.exports = router;