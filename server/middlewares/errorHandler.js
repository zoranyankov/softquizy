const errorHandler = function() {
    return (err, req, res, next) => {
        let status = err.status || 500;
        let message = err.message || '';
        //    res.status(status).render('home/home', {errors: [{message}]})    }
        let errors = message ? { errors: [{ message }] } : '';
        console.log(err);
        if (err.errors) {
            errors = err;
            // errors = Object.keys(err.errors).map(x => ({ message: err.errors[x].message }));
        } else {
            errors = message ? { errors: [{ message }] } : '';
        }
        res.status(status).render('404', errors)
    }
}

module.exports = errorHandler;