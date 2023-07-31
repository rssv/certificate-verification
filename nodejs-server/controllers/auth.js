const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//require('dotenv').config()
const { User } = require('../models');
const { intToStringId, stringToIntId, } = require('../utils/transformers');

module.exports = {
    loginHandler: async (req, res, next) => {
        const { user_name, passcode } = req.body;
        //console.log(username, passcode);
        const foundUser = await User.findOne({
            where: {
                user_name: user_name
            }
        });
        //console.log("foundUser", foundUser);
        if (!foundUser) return res.sendStatus(401); //Unauthorized 
        // evaluate passcode 
        const match = await bcrypt.compare(passcode, foundUser.passcode);
        if (match) {
            // create JWTs
            const stringId = intToStringId(foundUser.id);
            const accessToken = jwt.sign(
                { 
                    id: stringId,
                    user_name: foundUser.user_name,
                    user_role: foundUser.user_role,
                    user_type: foundUser.user_type
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: `${process.env.ACCESS_TOKEN_EXPIRY}`}
            );
            const refreshToken = jwt.sign(
                { 
                    id: stringId,
                    user_name: foundUser.user_name 
                },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            // Saving refreshToken with current user
            try{
                await User.update({
                    refresh_token: refreshToken
                }, { 
                    where: {
                        user_name: user_name
                    }
                });
            }catch(err){
                return next(err);
            }

            //console.log(refreshToken, "refresh")
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            return res.json(
                { 
                    id: stringId,
                    user_name: foundUser.user_name,
                    user_role: foundUser.user_role,
                    user_type: foundUser.user_type,
                    accessToken
                }
            );
        } else {
            return res.sendStatus(401);
        }
    },

    logoutHandler: async (req, res, next) => {
        // On client, also delete the accessToken
        const cookies = req.cookies;
        if (!cookies.jwt) return res.sendStatus(204); //No content
        const refreshToken = cookies.jwt;

        // Is refreshToken in db?
        let refresh_token_user;
        try{
            refresh_token_user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        }catch(err){
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(204);
        }

        const rfUserId = stringToIntId(refresh_token_user.id);

        let foundUser = await User.findOne({
            where: {
                id: rfUserId
            }
        });

        if ((!foundUser) || (foundUser.refresh_token !== refreshToken)) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(204);
        }

        // Delete refreshToken in db
        try{
            User.update({
                refresh_token: null
            }, {
                where: {
                    id: rfUserId
                }
            });
        }catch(err){
            return next(err);
        }

        res.clearCookie('jwt', { httpOnly: true });
        res.sendStatus(204);
    },

    refreshTokenHandler: async (req, res, next) => {
        const cookies = req.cookies;
        //console.log("cookies:", cookies.jwt)
        if (!cookies.jwt) return res.status(403).send({ message: 'unauthorized' });
        const refreshToken = cookies.jwt;

        let refresh_token_user;
        try{
            refresh_token_user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        }catch(err){
            return res.status(403).send({message: 'unauthorized'});
        }
        
        const rfUserId = stringToIntId(refresh_token_user.id);

        let foundUser = await User.findOne({
            where: {
                id: rfUserId
            }
        });

        if ((!foundUser) || (foundUser.refresh_token !== refreshToken)) return res.status(403).send({ message: "forbidden" }); //Forbidden 
        
        const stringId = intToStringId(foundUser.id);
        const accessToken = jwt.sign(
            { 
                id: stringId,
                user_name: foundUser.user_name,
                user_role: foundUser.user_role,
                user_type: foundUser.user_type
            },
            process.env. process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: `${process.env.ACCESS_TOKEN_EXPIRY}`}
        );
        return res.json({ accessToken })
    }
}

