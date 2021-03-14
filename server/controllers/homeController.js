const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('home/home');
    // res.redirect('quizes');
    return;
});
router.get('/about', (req, res) => {
    res.render('home/about', { title: 'About Page' });
    return;
});

module.exports = router;