const { Router } = require('express');


const resultService = require('../services/resultServices');
// const { isLogged, isCreator, isAuthorized } = require('../middlewares/guards');
// const checkQuestionInput = require('./helpers/checkQuestionInput');
const verifyToken = require('../middlewares/verifyToken');

const router = Router();

// router.get('/', verifyToken, (req, res, next) => {
//     const _id = req.user ? req.user._id : null;
//     // console.log(_id);
//     questionService.getAll(req.query)
//         .then(questions => {
//             questions.forEach(c => c.isCreator = c.creatorId == _id);
//             // console.log(questions);
//             res.status(200).json(questions);
//             // res.render('home/home', questions);
//             // return;
//         })
//         .catch(next);
// });

// router.get('/categories', verifyToken, (req, res, next) => {
//     const _id = req.user ? req.user._id : null;
//     // console.log(_id);
//     questionService.getCategories(req.query)
//         .then(questions => {
//             // console.log(_id);
//             // console.log(questions);
//             // console.log(questions[0].creatorId);
//             questions.forEach(c => c.isCreator = c.creatorId == _id);
//             // console.log(questions);
//             res.status(200).json(questions);
//             // res.render('home/home', questions);
//             // return;
//         })
//         .catch(next);
// });

// router.get('/category/:cat', verifyToken, (req, res, next) => {
//     const _id = req.user ? req.user._id : null;
//     // console.log(_id);
//     questionService.getCategory(req.params.cat)
//         .then(questions => {
//             // console.log(_id);
//             // console.log(questions);
//             // console.log(questions[0].creatorId);
//             questions.forEach(c => c.isCreator = c.creatorId == _id);
//             // console.log(questions);
//             res.status(200).json(questions);
//             // res.render('home/home', questions);
//             // return;
//         })
//         .catch(next);
// });

router.post('/add', verifyToken, (req, res, next) => { //TODO: isLogged, checkQuestionInput,

    const {userToUpdate, quizName, userAnswers} = req.body;
    console.log('idAddResult');
    console.log(req.body);
    let newResult = { quizName, resultData: userAnswers, creatorId: userToUpdate};
    console.log(newResult);

    // const errors = req.errors;
    // const newQuestion = req.body;

    // newQuestion.incorrect_answers = newQuestion.incorrect_answers.split(' / ')

    // // if (errors && errors.errors.length > 0) {
    // //     res.status(422).render('questions/createQuestion', {...errors, ...req.body });
    // //     // next(errors);
    // //     return;
    // // }
    resultService.createResult(newResult)
        .then(data => {
            console.log('Question created');
            console.log(data);
            res.status(201).json(data);
            // res.redirect('/questions');
            return;
        })
        .catch(err => {
            console.log("CreateError" + err);
            return err;
        });
});

// router.get('/details/:prod_id', isLogged, (req, res, next) => {
//     const _id = req.user ? req.user._id : null;
//     questionService.getOnePopulated(req.params.prod_id)
//         .then((currentQuestion) => {
//             currentQuestion.isCreator = currentQuestion.creatorId == _id;
//             res.render('questions/details', { ...currentQuestion });
//             return;
//         })
//         .catch(next);
// });

// router.get('/edit/:prod_id', isLogged, isCreator, (req, res, next) => {
//     questionService.getOnePopulated(req.params.prod_id)
//         .then((data) => {
//             res.render('questions/editQuestion', { ...data });
//             return;
//         })
//         .catch(next);
// });

// router.post('/edit/:prod_id', isLogged, isCreator, checkQuestionInput, (req, res, next) => {
//     const errors = req.errors;

//     if (errors && errors.errors.length > 0) {
//         res.status(422).render('questions/editQuestion', { ...errors, _id: req.params.prod_id, ...req.body });
//         // next(errors);
//         return;
//     }
//     questionService.update(req.params.prod_id, { ...req.body })
//         .then(data => {
//             // console.log(data);
//             res.redirect(`/questions/details/${data._id}`);
//             return;
//         })
//         .catch(next);
// });
// router.get('/delete/:prod_id', isLogged, isCreator, (req, res, next) => {
//     questionService.getOnePopulated(req.params.prod_id)
//         .then((data) => {
//             res.render('questions/deleteQuestion', { ...data });
//             return;
//         })
//         .catch(next);
// });
// router.post('/delete/:prod_id', isLogged, isCreator, (req, res, next) => {
//     questionService.removeOne(req.params.prod_id)
//         .then((data) => res.redirect('/questions'))
//         .catch(next);
// });
// router.get('/clearDB', isLogged, (req, res, next) => {
//     questionService.clear()
//         .then((data) => res.redirect('/questions'))
//         .catch(next);
// });


module.exports = router;