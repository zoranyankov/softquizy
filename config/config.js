require('dotenv').config({path: `.env.${process.env.NODE_ENV}`});

const { PORT, DB_PATH, DB_NAME, TOKEN_SECRET, TOKEN_NAME, SALT_ROUNDS } = process.env;

const config = {
    PORT: Number(PORT),
    DB_PATH,
    DB_NAME,
    TOKEN_SECRET,
    TOKEN_NAME,
    SALT_ROUNDS: Number(SALT_ROUNDS),
    ENGLISH_ALFANUMERIC_PATT: /^[a-zA-Z0-9]+$/,
    ENGLISH_ALFANUMSPACE_PATT: /^[a-zA-Z0-9 ]+$/,
    EMAIL_PATT: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
}

module.exports = config;