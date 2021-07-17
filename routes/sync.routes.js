const { Router } = require('express');

const { 
    setInitialStatistic,  
} = require('../controllers/statistic.controller');
const { validJWT } = require('../middlewares/valid-jwt');

const router = Router();

router.get('', [
    validJWT,
] , setInitialStatistic);

module.exports = router;