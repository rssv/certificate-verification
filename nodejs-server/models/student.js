const { DataTypes } = require('sequelize');

const { sequelize } = require('../utils/database');

const Student = sequelize.define('student',{
    adm_no: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    s_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    year_of_adm: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    course_id: {
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
    },
    dept_id:{
        type: DataTypes.STRING,
        allowNull:false
    }
});

module.exports = Student;