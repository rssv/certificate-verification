const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

const { sequelize } = require('../utils/database');

const Employee = sequelize.define('employee',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    emp_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    e_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    e_role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Employee;