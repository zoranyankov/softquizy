const errorHandler = function() {
    return (err, req, res, next) => {
        let status = err.status || 500;
        let message = err.message || '';
        let errors = message ? { errors: [{ message }] } : '';
        console.log(err);
        if (err.errors) {
            errors = err;
            // errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
        }
        res.status(status).json({"Global Error Handler":errors});
    }
}

module.exports = errorHandler;