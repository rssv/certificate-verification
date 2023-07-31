const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

const { sequelize } = require('../utils/database');

const SubOffering = sequelize.define('subOffering',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subjectId: {
        type: DataTypes.INTEGER,
        get() {
            let value = this.getDataValue('subjectId');
            if(value){
                const stringId = jwt.sign({id: value}, process.env.INT_TO_STRING_SECRET);
                const stringIdParts = stringId.split('.');
                return stringIdParts[1] + '.' + stringIdParts[2];
            }
            else return value;
        },

        set(value) {
            const intId = jwt.verify( process.env.JWT_ALGORITHM_CONST + '.' + value, process.env.INT_TO_STRING_SECRET);
            this.setDataValue('subjectId', intId.id);
        }
    },
    semesterId: {
        type: DataTypes.INTEGER,
        get() {
            let value = this.getDataValue('semesterId');
            if(value){
                const stringId = jwt.sign({id: value}, process.env.INT_TO_STRING_SECRET);
                const stringIdParts = stringId.split('.');
                return stringIdParts[1] + '.' + stringIdParts[2];
            }
            else return value;
        },

        set(value) {
            const intId = jwt.verify( process.env.JWT_ALGORITHM_CONST + '.' + value, process.env.INT_TO_STRING_SECRET);
            this.setDataValue('semesterId', intId.id);
        }
    },
    instructorId: {
        type: DataTypes.INTEGER,
        get() {
            let value = this.getDataValue('instructorId');
            if(value){
                const stringId = jwt.sign({id: value}, process.env.INT_TO_STRING_SECRET);
                const stringIdParts = stringId.split('.');
                return stringIdParts[1] + '.' + stringIdParts[2];
            }
            else return value;
        },

        set(value) {
            const intId = jwt.verify( process.env.JWT_ALGORITHM_CONST + '.' + value, process.env.INT_TO_STRING_SECRET);
            this.setDataValue('instructorId', intId.id);
        }
    }
});

module.exports = SubOffering; 