const { DataTypes } = require('sequelize');

const { sequelize } = require('../utils/database');

const Department = sequelize.define('department',{
    d_code: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    d_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    head: {
        type: DataTypes.STRING,
    }
});

module.exports = Department;