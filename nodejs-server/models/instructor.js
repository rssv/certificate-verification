const { DataTypes } = require('sequelize');

const { sequelize } = require('../utils/database');

const Instructor = sequelize.define('instructor',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    emp_id:{
        type: DataTypes.STRING,
        allowNull: false
    },
    dept_id: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Instructor;