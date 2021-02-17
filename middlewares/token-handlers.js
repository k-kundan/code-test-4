const jwt = require('jsonwebtoken');
const config = require('../config/config');
const {
    AuthError
} = require('../libs/errors')

module.exports = {
    validateToken: async (req, res, next) => {
        try {
            const token = req.headers.token;

            if (!token) next(new AuthError("Unauthorized access"));

            req.token = token;

            next();
        } catch (err) {
            next(new AuthError("Unauthorized access"));
        }
    },

    validateJwtToken: async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) next(new AuthError("Unauthorized access"));

            let decoded = jwt.verify(token, config.secret);

            req.token = decoded;

            next();
        } catch (err) {
            next(new AuthError("Unauthorized access"));
        }
    },

    generateToken: (payload) => {
        let token = jwt.sign(payload, config.secret);
        return token
    }
}