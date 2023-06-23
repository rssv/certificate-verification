const { DataTypes } = require('sequelize');

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
    }
});

module.exports = User;