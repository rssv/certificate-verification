
const jwt = require('jsonwebtoken');

const intToStringId = (intId) => {
    const stringId = jwt.sign({id: intId}, process.env.INT_TO_STRING_SECRET);
    const stringIdParts = stringId.split('.');
    return stringIdParts[1] + '.' + stringIdParts[2];
}

const stringToIntId = (stringId) => {
    const intId = jwt.verify( process.env.JWT_ALGORITHM_CONST + '.' + stringId, process.env.INT_TO_STRING_SECRET);
    return intId.id;
}

module.exports = {

    intToStringId,
    stringToIntId,

}

