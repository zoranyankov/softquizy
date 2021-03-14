const { Router } = require('express');
const quizService = require('../services/quizServices');
const { isLogged, isCreator } = require('../middlewares/guards');
const checkQuizInput = require('./helpers/checkQuizInput');

const router = Router();

router.get('/', (req, res, next) => {
    const _id = req.user ? req.user._id : null;
    // console.log(_id);
    quizService.getAll(req.query)
        .then(quizes => {
            quizes.forEach(c => c.isCreator = c.creatorId == _id);
            res.render('home/home', quizes);
            return;
        })
        .catch(next);
});
router.get('/create', isLogged, (req, res, next) => {
    res.render('quizes/createQuiz');
    return;
});
router.post('/create', isLogged, checkQuizInput, (req, res, next) => {
    const errors = req.errors;

    if (errors && errors.errors.length > 0) {
        res.status(422).render('quizes/createQuiz', {...errors, ...req.body });
        // next(errors);
        return;
    }
    quizService.create({...req.body, creatorId: req.user._id, creatorName: req.user.name })
        .then(data => {
            // console.log(data);
            res.redirect('/quizes');
            return;
        })
        .catch(next);
});
router.get('/details/:prod_id', isLogged, (req, res, next) => {
    const _id = req.user ? req.user._id : null;
    quizService.getOnePopulated(req.params.prod_id)
        .then((currentQuiz) => {
            currentQuiz.isCreator = currentQuiz.creatorId == _id;
            res.render('quizes/details', {...currentQuiz });
            return;
        })
        .catch(next);
});
router.get('/edit/:prod_id', isLogged, isCreator, (req, res, next) => {
    quizService.getOnePopulated(req.params.prod_id)
        .then((data) => {
            res.render('quizes/editQuiz', {...data });
            return;
        })
        .catch(next);
});
router.post('/edit/:prod_id', isLogged, isCreator, checkQuizInput, (req, res, next) => {
    const errors = req.errors;

    if (errors && errors.errors.length > 0) {
        res.status(422).render('quizes/editQuiz', {...errors, _id: req.params.prod_id, ...req.body });
        // next(errors);
        return;
    }
    quizService.update(req.params.prod_id, {...req.body })
        .then(data => {
            // console.log(data);
            res.redirect(`/quizes/details/${data._id}`);
            return;
        })
        .catch(next);
});
router.get('/delete/:prod_id', isLogged, isCreator, (req, res, next) => {
    quizService.getOnePopulated(req.params.prod_id)
        .then((data) => {
            res.render('quizes/deleteQuiz', {...data });
            return;
        })
        .catch(next);
});
router.post('/delete/:prod_id', isLogged, isCreator, (req, res, next) => {
    quizService.removeOne(req.params.prod_id)
        .then((data) => res.redirect('/quizes'))
        .catch(next);
});
router.get('/clearDB', isLogged, (req, res, next) => {
    quizService.clear()
        .then((data) => res.redirect('/quizes'))
        .catch(next);
});


module.exports = router;