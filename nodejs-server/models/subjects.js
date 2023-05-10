const { DataTypes } = require('sequelize');

const { sequelize } = require('../utils/database');

const Subject = sequelize.define('subject', {
    sub_code:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    sub_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    dept_id: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Subject;