const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

const { sequelize } = require('../utils/database');

const Department = sequelize.define('department',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    d_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    d_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    head: {
        type: DataTypes.INTEGER,
        get() {
            let value = this.getDataValue('head');
            if(value){
                const stringId = jwt.sign({id: value}, process.env.INT_TO_STRING_SECRET);
                const stringIdParts = stringId.split('.');
                return stringIdParts[1] + '.' + stringIdParts[2];
            }
            else return value;
        },
        set(value) {
            const intId = jwt.verify( process.env.JWT_ALGORITHM_CONST + '.' + value, process.env.INT_TO_STRING_SECRET);
            this.setDataValue('head', intId.id);
        }
    }
});

module.exports = Department;