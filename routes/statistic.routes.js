const { Router } = require('express');

const { 
    getStatistics,
    getfilteredStatistics,
    saveStatistic,
} = require('../controllers/statistic.controller');
const { validJWT } = require('../middlewares/valid-jwt');

const router = Router();

router.get('/:country_id', [
    validJWT,
], getfilteredStatistics);

router.get('', [
    validJWT,
], getStatistics);

router.post('', [    
    validJWT,
] , saveStatistic);

module.exports = router;