const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('home/home');
    // res.redirect('questions');
    return;
});
router.get('/about', (req, res) => {
    res.render('home/about', { title: 'About Page' });
    return;
});

module.exports = router;