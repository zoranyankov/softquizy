const { Router } = require('express');
const router = Router();

const authController = require('./controllers/authController');
const questionController = require('./controllers/questionController');
const resultController = require('./controllers/resultController');

router.use('/auth', authController);
router.use('/api/questions', questionController);
router.use('/api/results', resultController);

router.get('*', (req, res, next) => {
    next({ status: 404, message: 'STILL DON\'T HAVE THIS PAGE' });
})

module.exports = router;