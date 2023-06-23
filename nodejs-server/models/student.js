const { DataTypes } = require('sequelize');

const { sequelize } = require('../utils/database');

const Student = sequelize.define('student',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    adm_no: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false
    },
    s_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    year_of_adm: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    major1: {
        type: DataTypes.STRING
    },
    major2: {
        type: DataTypes.STRING
    }
});

module.exports = Student;