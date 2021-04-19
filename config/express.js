const express = require('express');

function expressConfig(app) {

    app.use(express.static('public'));

    app.use(express.urlencoded({
        extended: true
    }));
    
    app.use(express.json());

}

module.exports = expressConfig;