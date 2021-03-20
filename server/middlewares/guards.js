const questionService = require('../services/questionServices');

const isLogged = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
        return;
    }
    next();
}

// const isQuestionCreator = (req, res, next) => {
//         questionService.getOne(req.params._id)
//             .then(question => {
//                 if (question.creatorId !== req.user._id) {
//                     // res.redirect(`/questions/details/${req.params._id}`); // another option
//                     res.redirect(`/questions`);
//                     return;
//                 }
//                 next();
//             })
//         .catch(err => console.log('Error : ' + err));
//     }

const isCreator = (req, res, next) => {
    const questionId = req.params.prod_id;
    questionService.getOne(questionId)
        .then(question => {
            if (question.creatorId !== req.user._id) {
                if ((req.path).match('remove')) {
                    // let prod_id = req.path.split('/')[1]; // first try
                    res.redirect(`/questions/details/${questionId}`);
                    return;
                }
                // res.redirect(`/questions/details/${req.params._id}`); // another option
                res.redirect(`/questions`);
                return;
            }
            next();
        })
        .catch(err => console.log('Error : ' + err));
}

const isAuthorized = (req, res, next) => {
    if (req.user) {
        res.redirect('/questions');
        return;
    }
    next();
}

module.exports = {
    isLogged,
    isAuthorized,
    // isQuestionCreator,
    isCreator,
}