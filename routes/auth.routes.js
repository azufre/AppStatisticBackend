const { Router } = require('express');
const { check } = require('express-validator');
const { login, renewToken } = require('../controllers/auth.controller');
const { createUser } = require('../controllers/user.controller');
const { validFields } = require('../middlewares/valid-fields');
const { validJWT } = require('../middlewares/valid-jwt');

const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validFields
] , login);

router.post('/signup', [    
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    validFields,
] , createUser);

router.get('/renew', [
    validJWT,
], renewToken);

module.exports = router;