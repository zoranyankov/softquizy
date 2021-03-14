const quizService = require('../services/quizServices');

const isLogged = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
        return;
    }
    next();
}

// const isQuizCreator = (req, res, next) => {
//         quizService.getOne(req.params._id)
//             .then(quiz => {
//                 if (quiz.creatorId !== req.user._id) {
//                     // res.redirect(`/quizes/details/${req.params._id}`); // another option
//                     res.redirect(`/quizes`);
//                     return;
//                 }
//                 next();
//             })
//         .catch(err => console.log('Error : ' + err));
//     }

const isCreator = (req, res, next) => {
    const quizId = req.params.prod_id;
    quizService.getOne(quizId)
        .then(quiz => {
            if (quiz.creatorId !== req.user._id) {
                if ((req.path).match('remove')) {
                    // let prod_id = req.path.split('/')[1]; // first try
                    res.redirect(`/quizes/details/${quizId}`);
                    return;
                }
                // res.redirect(`/quizes/details/${req.params._id}`); // another option
                res.redirect(`/quizes`);
                return;
            }
            next();
        })
        .catch(err => console.log('Error : ' + err));
}

const isAuthorized = (req, res, next) => {
    if (req.user) {
        res.redirect('/quizes');
        return;
    }
    next();
}

module.exports = {
    isLogged,
    isAuthorized,
    // isQuizCreator,
    isCreator,
}