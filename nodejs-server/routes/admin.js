const express = require('express');
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const { sequelize } = require('../utils/database');

const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await sequelize.query(
        "select * from users", {
            type: QueryTypes.SELECT
        }
    );
    res.json(users);
});

router.post('/users', async (req, res) => {
    const encryptedUsers = req.body.users.map(async (user) => {
        encryptedPassword = await bcrypt.hash(user.password, 10);
        return {...user, password:encryptedPassword};
    });
    const hashedUsers = await Promise.all(encryptedUsers);
    const values = hashedUsers.map(huser => {
        return `('${huser.username}','${huser.password}','${huser.userRole}','${huser.userType}','${huser.refId}')`;
    })
    try{
        const dbInsertResult = await sequelize.query(
            "insert into users (user_name, passcode, user_role, user_type, ref_id) values "+values.join(','),
            {
                type: QueryTypes.INSERT
            }
        );
        res.json(dbInsertResult);
    } catch(err){
        res.json(err);
    }
    
    
})

module.exports = router;