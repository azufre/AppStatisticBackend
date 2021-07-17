const jwt = require('jsonwebtoken');

const generateJWT = (uid) => new Promise((resolve, reject) => {

    const payload = {
        uid
    }

    jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '12h'
    }, (err, token) => {
        
        if(err){            
            reject('we could not get the token');
        }else{
            resolve(token);
        }
        
    });

});

module.exports = {
    generateJWT
}