const { Router } = require('express');

const { 
    setInitialStatistic,  
} = require('../controllers/statistic.controller');
const { validJWT } = require('../middlewares/valid-jwt');

const router = Router();

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      ApiKeyAuth:
 *          type: apiKey
 *          in: header
 *          name: x-token
 */

/**
 * @swagger
 * tags:
 *  name: Sync
 *  description: Sync resource
 */

/**
 * @swagger
 * /sync:
 *  get:
 *      summary: Sync statistic
 *      security:
 *         - ApiKeyAuth: []
 *      tags: [Sync]
 *      responses:
 *          200:
 *             description: sync resource success
 *             content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                              ok:
 *                                  type: boolean
 *                                  description: porcess result
 */

router.get('', [
    validJWT,
] , setInitialStatistic);

module.exports = router;