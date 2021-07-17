const { response } = require('express');
const jwt = require('jsonwebtoken');

const validJWT = (req, res = response, next) => {
    
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No token in the request.'
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token not valid'
        });
    }

}

module.exports  = {
    validJWT
}