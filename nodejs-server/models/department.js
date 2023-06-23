const { DataTypes } = require('sequelize');

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
    }
});

module.exports = Department;