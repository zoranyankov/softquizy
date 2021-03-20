const { Router } = require('express');
const router = Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
// const questionController = require('./controllers/questionController');
// const { isLogged } = require('./middlewares/guards');

const auth = require('./middlewares/auth');

router.use(auth());

router.use('/', homeController);
router.use('/auth', authController);
// router.use('/questions', questionController);
router.get('*', (req, res, next) => {

    // res.render('404', {title: 'Page Not Found'});
    next({ status: 404, message: 'STILL DON\'T HAVE THIS PAGE' });
})

module.exports = router;