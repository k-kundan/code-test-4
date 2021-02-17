
class ValidationError extends Error {
    constructor(message) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = message;
    }
}

class AuthError extends Error {
    constructor(message) {
        super();
        Error.captureStackTrace(this, this.construct);
        this.name = this.constructor.name;
        this.message = message;
    }
}

module.exports = {
    ValidationError,
    NotFoundError,
    AuthError
};