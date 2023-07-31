const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

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
    },
    departmentId: {
        type: DataTypes.INTEGER,
        get() {
            let value = this.getDataValue('departmentId');
            if(value){
                const stringId = jwt.sign({id: value}, process.env.INT_TO_STRING_SECRET);
                const stringIdParts = stringId.split('.');
                return stringIdParts[1] + '.' + stringIdParts[2];
            }
            else return value;
        },

        set(value) {
            const intId = jwt.verify( process.env.JWT_ALGORITHM_CONST + '.' + value, process.env.INT_TO_STRING_SECRET);
            this.setDataValue('departmentId', intId.id);
        }
    },
    courseId: {
        type: DataTypes.INTEGER,
        get() {
            let value = this.getDataValue('courseId');
            if(value){
                const stringId = jwt.sign({id: value}, process.env.INT_TO_STRING_SECRET);
                const stringIdParts = stringId.split('.');
                return stringIdParts[1] + '.' + stringIdParts[2];
            }
            else return value;
        },

        set(value) {
            const intId = jwt.verify( process.env.JWT_ALGORITHM_CONST + '.' + value, process.env.INT_TO_STRING_SECRET);
            this.setDataValue('courseId', intId.id);
        }
    }

});

module.exports = Student;