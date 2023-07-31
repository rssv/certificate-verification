const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { intToStringId, stringToIntId, } = require('../utils/transformers');

const auth = async(req, res, next) => {
    let accessToken = req.headers.authorization;
    ////console.log("token: ", accessToken)
    console.log(req.path);
    if(!accessToken)
        return res.status(403).send({'msg': 'token not found'});
    
    accessToken = accessToken.split(' ')[1];
    
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {
            
            if (err) {
                //console.log("auth error", err);
                return res.send(err);
            }
            // const foundUser = users.find(user => user.username === decoded.username)
            // if(!foundUser)
            //     return res.status(403).send('user not found');
            const intId = stringToIntId(decoded.id);
            const aUser = await User.findOne({
                where: {
                    id: intId
                }
            });
            req.authUser = aUser;
            //console.log("next")
            next();
        }
    );

}

module.exports = {
    auth
}