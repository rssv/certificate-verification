const { DataTypes } = require('sequelize');

const { sequelize } = require('../utils/database');

const Instructor = sequelize.define('instructor',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cv_link:{
        type: DataTypes.TEXT,
    }
});

module.exports = Instructor;