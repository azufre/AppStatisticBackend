const { Router } = require('express');
const { check } = require('express-validator');
const { login, renewToken } = require('../controllers/auth.controller');
const { createUser } = require('../controllers/user.controller');
const { validFields } = require('../middlewares/valid-fields');
const { validJWT } = require('../middlewares/valid-jwt');

const router = Router();


/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of User
 *              email:
 *                  type: string
 *                  description: The user email
 *              password:
 *                  type: string
 *                  description: the user password
 *          example:
 *              id: 616651658165
 *              email: test@gmail.com
 *              password: skjdfs35456
 * 
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth endpoint
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: login and return token
 *      tags: [Auth]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email: 
 *                              type: string
 *                          password:
 *                              type: string 
 *      responses:
 *          200:
 *             description: Login response
 *             content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          ok:
 *                            type: boolean
 *                            description: status response
 *                          token:
 *                            type: string
 *                            description: token from login
 */

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validFields
] , login);


/**
 * @swagger
 * /auth/signup:
 *  post:
 *      summary: signup and return data user
 *      tags: [Auth]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email: 
 *                              type: string
 *                          password:
 *                              type: string 
 *      responses:
 *          200:
 *             description: Login response
 *             content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          ok:
 *                            type: boolean
 *                            description: status response
 *                          user:
 *                              type: object
 *                              properties:
 *                                  email:
 *                                      type: string
 *                                  uid: 
 *                                      type: string
 *                          token:
 *                            type: string
 *                            description: token from login
 */
router.post('/signup', [    
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    validFields,
] , createUser);

/**
 * @swagger         
 * /auth/renew:
 *  post:
 *      summary: renew token
 *      security:
 *         - ApiKeyAuth: []
 *      tags: [Auth]
 *      responses:
 *          200:
 *             description: renew token response
 *             content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          ok:
 *                            type: boolean
 *                            description: status response
 *                          token:
 *                            type: string
 *                            description: token from login
 */

router.post('/renew', [
    validJWT,
], renewToken);

module.exports = router;