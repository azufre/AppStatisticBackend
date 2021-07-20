const { response } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helper/jwt');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        
        const userFromDb = await User.findOne({email});
        
        if(!userFromDb){
            res.status(404).json({
                ok: false,
                msg: 'Email or password is invalid.'
            });
        }

        const validPassword = bcrypt.compareSync(password, userFromDb.password);

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'Email or password is invalid.'
            });
        }

        const token = await generateJWT(userFromDb.id);

        return res.json({
            ok:true,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Oops! Something went wrong.'
        });
    }
}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    var token = await generateJWT(uid);

    res.json({
        ok:true,
        token
    });

}

module.exports = {
    login,
    renewToken
}