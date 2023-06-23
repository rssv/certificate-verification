const { DataTypes } = require('sequelize');

const { sequelize } = require('../utils/database');

const StudentSubjectRegistration = sequelize.define('studentSubjectRegistration',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    marks: DataTypes.INTEGER,
    status: DataTypes.STRING

});

module.exports = StudentSubjectRegistration; 