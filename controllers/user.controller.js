const { response } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helper/jwt');

const createUser = async (req, resp = response) => {

    const {email, password } = req.body;

    try {
        
        const userExists = await User.findOne({email});

        if(userExists){
            return resp.status(400).json({
                ok: false,
                msg: "Oops! Email already taken."
            });
        }

        const user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();        
        const token = await generateJWT(user.id);
        
        resp.status(200).json({
            ok: true,
            user,
            token
        })

    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: "Oops! Something went wrong."
        });

    }

};

module.exports = {
    createUser
};