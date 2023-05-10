const { DataTypes } = require('sequelize');

const { sequelize } = require('../utils/database');

const StudSubReg = sequelize.define('studsubreg',{
    adm_no: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sub_off_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stud_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marks: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: DataTypes.STRING
    }
});

module.exports = StudSubReg;