const express = require('express');
const Joi = require('@hapi/joi');
const User = require('../controllers/user');
const {
    validateBody,
    validateParams
} = require('../middlewares/route');
const tokenHandler = require('../middlewares/token-handlers')
const router = express.Router();

router.post('/create-user', tokenHandler.validateToken, validateBody(Joi.object().keys({
    email: Joi.string().required().description('email is required'),
    password: Joi.string().required().description('password is required')
})), User.createUser);


router.delete('/delete-user/:id', tokenHandler.validateToken, validateParams(Joi.object().keys({
    id: Joi.string().required().description('user id is required')
})), User.deleteUser);

router.get('/get-user/:id', tokenHandler.validateJwtToken, validateParams(Joi.object().keys({
    id: Joi.string().required().description('user id is required')
})), User.getUser);

router.get('/get-all-user', tokenHandler.validateJwtToken, User.getUsers);


module.exports = router;