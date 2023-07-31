const aDeanRoute = (req, res, next) => {
    if(req.authUser.user_role !== "aDean"){
        return res.status(403).send({msg: "unauthorized"});
    }
    next();
}

const deanRoute = (req, res, next) => {
    if(req.authUser.user_role !== "Dean")
        return res.status(403).send({msg: "unauthorized"});
    next();
}

const instructorRoute = (req, res, next) => {
    if(req.authUser.user_role !== "Instructor")
        return res.status(403).send({msg: "unauthorized"});
    next();
}

const adminRoute = (req, res, next) => {
    if(req.authUser.user_role !== 'Admin')
        return res.status(403).send({msg: 'unauthorized'});
    next();
}

module.exports = { aDeanRoute, deanRoute, instructorRoute, adminRoute }