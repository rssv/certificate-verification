const jwt = require('jsonwebtoken');

const auth = async(req, res, next) => {
    let accessToken = req.headers.authorization;
    ////console.log("token: ", accessToken)
    console.log(req.path);
    if(!accessToken)
        return res.status(403).send('token not found');
    
    accessToken = accessToken.split(' ')[1];
    
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            
            if (err) {
                //console.log("auth error", err);
                return res.send(err);
            }
            // const foundUser = users.find(user => user.username === decoded.username)
            // if(!foundUser)
            //     return res.status(403).send('user not found');
            req.authUser=decoded;
            //console.log("next")
            next();
        }
    );

}

const aDeanRoute = (req, res, next) => {
    if(req.authUser.role !== "aDean"){
        return res.status(403).send({message: "unauthorized"});
    }
    next();
}

const deanRoute = (req, res, next) => {
    if(req.authUser.role !== "Dean")
        return res.status(403).send({message: "unauthorized"});
    next();
}

const instructorRoute = (req, res, next) => {
    if(req.authUser.role !== "Instructor")
        return res.status(403).send({message: "unauthorized"});
    next();
}

const deanAdeanRoute = (req, res, next) => {
    if(req.authUser.role !== "Dean" && req.authUser.role !== "aDean")
        return res.status(403).send({message: "unauthorized"});
    next();
}

module.exports = {auth, aDeanRoute, deanRoute, instructorRoute, deanAdeanRoute}