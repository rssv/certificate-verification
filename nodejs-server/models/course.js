const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

const { sequelize } = require('../utils/database');

const Course = sequelize.define('course',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    c_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    c_duration: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Course;