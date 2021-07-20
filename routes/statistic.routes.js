const { Router } = require('express');

const { 
    getStatistics,
    getfilteredStatistics,
    saveStatistic,
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
 *  schemas:
 *      Statistic:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  description: The auto-generated id
 * 
 *              continent:
 *                  type: string
 *              country:
 *                  type: string
 *              population:
 *                  type: string
 *              cases: 
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                      new:
 *                          type: string
 *                      active:
 *                          type: string
 *                      critical:
 *                          type: string
 *                      recovered:
 *                          type: string
 *                      1M_pop:
 *                          type: string
 *                      total:
 *                          type: string
 *              deaths:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                      new:
 *                        type: string
 *                      1M_pop:
 *                          type: string
 *                      total:
 *                          type: string
 *              tests:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                      1M_pop:
 *                          type: string
 *                      total:
 *                          type: string
 *              day:
 *                  type: string
 *              time:
 *                  type: string
 * 
 */

/**
 * @swagger
 * tags:
 *  name: Statistic
 *  description: Statistic endpoint
 */

/**
 * @swagger
 * /statistic/{country_id}:
 *  get:
 *      summary: filter statistics by country
 *      security:
 *         - ApiKeyAuth: []
 *      tags: [Statistic]
 *      parameters:
 *        - in: path
 *          name: country_id
 *          required: true
 *      responses:
 *          200:
 *             description: Filter response
 *             content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Statistic'
 */
router.get('/:country_id', [
    validJWT,
], getfilteredStatistics);

/**
 * @swagger
 * /statistic:
 *  get:
 *      summary: return all statistics
 *      security:
 *         - ApiKeyAuth: []
 *      tags: [Statistic]
 *      responses:
 *          200:
 *             description: Statistics response
 *             content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Statistic'
 */
router.get('', [
    validJWT,
], getStatistics);

/**
 * @swagger
 * /statistic:
 *  post:
 *      summary: save statistic
 *      security:
 *         - ApiKeyAuth: []
 *      tags: [Statistic]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          continent:
 *                              type: string
 *                          country:
 *                              type: string
 *                          population:
 *                              type: string
 *                          cases: 
 *                              type: object
 *                              properties:
 *                                  new:
 *                                      type: string
 *                                  active:
 *                                      type: string
 *                                  critical:
 *                                      type: string
 *                                  recovered:
 *                                      type: string
 *                                  1M_pop:
 *                                      type: string
 *                                  total:
 *                                      type: string
 *                          deaths:
 *                              type: object
 *                              properties:
 *                                  new:
 *                                      type: string
 *                                  1M_pop:
 *                                      type: string
 *                                  total:
 *                                      type: string
 *                          tests:
 *                              type: object
 *                              properties:
 *                                  1M_pop:
 *                                      type: string
 *                                  total:
 *                                      type: string
 *                          day:
 *                              type: string
 *                          time:
 *                              type: string
 *      responses:
 *          200:
 *             description: Save statistic response
 *             content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                              Item:
 *                                 $ref: '#/components/schemas/Statistic'
 */
router.post('', [    
    validJWT,
] , saveStatistic);

module.exports = router;