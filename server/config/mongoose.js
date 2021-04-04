const config = require('./config');
const mongoose = require('mongoose');

function mongooseConfig() {

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }

    mongoose.connect(config.DB_PATH, options);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Error: '));
    db.once('open', console.log.bind(console, `Mongo is connected on ${config.DB_PATH}...`))
}

module.exports = mongooseConfig;