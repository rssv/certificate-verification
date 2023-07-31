const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { sequelize } = require('../utils/database');

const User = sequelize.define('user',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_name:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    passcode: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refresh_token: DataTypes.TEXT,
    employeeId: {
        type: DataTypes.INTEGER,
        get() {
            let value = this.getDataValue('employeeId');
            if(value){
                const stringId = jwt.sign({id: value}, process.env.INT_TO_STRING_SECRET);
                const stringIdParts = stringId.split('.');
                return stringIdParts[1] + '.' + stringIdParts[2];
            }
            else return value;
        },

        set(value) {
            const intId = jwt.verify( process.env.JWT_ALGORITHM_CONST + '.' + value, process.env.INT_TO_STRING_SECRET);
            this.setDataValue('employeeId', intId.id);
        }
    },
    studentId: {
        type: DataTypes.INTEGER,
        get() {
            let value = this.getDataValue('studentId');
            if(value){
                const stringId = jwt.sign({id: value}, process.env.INT_TO_STRING_SECRET);
                const stringIdParts = stringId.split('.');
                return stringIdParts[1] + '.' + stringIdParts[2];
            }
            else return value;
        },

        set(value) {
            const intId = jwt.verify( process.env.JWT_ALGORITHM_CONST + '.' + value, process.env.INT_TO_STRING_SECRET);
            this.setDataValue('studentId', intId.id);
        }
    }
});

module.exports = User;