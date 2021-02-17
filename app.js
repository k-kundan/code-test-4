const express = require('express');

const userRouter = require('./routes/index');

const {
    ValidationError,
    NotFoundError,
    AuthError
} = require('./libs/errors');

const app = express();

app.use(express.json({
    limit: '100kb'
}));
app.use(express.urlencoded({
    extended: false
}));

app.use('/user', userRouter);

app.use('/', (err, req, res, next) => {
    let code = 500;
    if (err instanceof ValidationError) {
        code = 400;
    }
    if (err instanceof NotFoundError) {
        code = 404;
    }
    if(err instanceof AuthError) {
        code = 401;
    }
    res.status(code).json({
        message: err.message,
    });
});

module.exports = app;