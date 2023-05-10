const { DataTypes } = require('sequelize');

const { sequelize } = require('../utils/database');

const Semester = sequelize.define('semester',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sem_session:{
        type: DataTypes.STRING,
        allowNull: false
    },
    sem_type: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Semester;