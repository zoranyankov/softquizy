const config = {
    development: {
        PORT: process.env.PORT || 5050,
        DB_PATH: process.env.DB_PATH.trim() || 'mongodb://localhost:27017/defaultDBname',
        SALT_ROUNDS: 10,
        TOKEN_SECRET: 'verySecretToken',
        TOKEN_COOKIE_NAME: 'sid',
        ENGLISH_ALFANUMERIC_PATT: /^[a-zA-Z0-9]+$/,
        ENGLISH_ALFANUMSPACE_PATT: /^[a-zA-Z0-9 ]+$/,
        EMAIL_PATT: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        DB_NAME: process.env.DB_PATH.split('/').pop(),
    },
    production: {
        PORT: process.env.PORT || 80,
        //         DB_PATH: 'mongodb+srv://<user>:<pass>@softuni.vko2t.mongodb.net/<db-name>?retryWrites=true&w=majority' || 'mongodb://localhost:27017/DBname'
        DB_PATH: 'write your own Mongo connection-path here!!!',
        SALT_ROUNDS: 10,
        TOKEN_SECRET: 'verySecretToken',
        TOKEN_COOKIE_NAME: 'sid',
        ENGLISH_ALFANUMERIC_PATT: /^[a-zA-Z0-9]+$/,
        ENGLISH_ALFANUMSPACE_PATT: /^[a-zA-Z0-9 ]+$/,
        EMAIL_PATT: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        DB_NAME: process.env.DB_PATH.split('/').pop(),
    }
}
module.exports = config[process.env.NODE_ENV.trim() || 'development'];