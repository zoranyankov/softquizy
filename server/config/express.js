const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');

function expressConfig(app) {
    app.engine('hbs', handlebars({
        extname: 'hbs',
    }));
    app.set('view engine', 'hbs');

    app.use(express.static('public'));

    app.use(express.urlencoded({
        extended: true
    }));
    
    app.use(express.json());

    app.use(cookieParser());

    // app.use()
}

module.exports = expressConfig;