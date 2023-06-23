const { DataTypes } = require('sequelize');

const { sequelize } = require('../utils/database');

const Subject = sequelize.define('subject', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sub_code:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    sub_name:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Subject;