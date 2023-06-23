const { DataTypes } = require('sequelize');

const { sequelize } = require('../utils/database');

const SubOffering = sequelize.define('subOffering',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

module.exports = SubOffering; 