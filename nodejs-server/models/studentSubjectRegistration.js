const { DataTypes } = require('sequelize');

const { sequelize } = require('../utils/database');

const StudentSubjectRegistration = sequelize.define('studentSubjectRegistration',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    marks: DataTypes.INTEGER,
    status: DataTypes.STRING,
    studentId: {
        type: DataTypes.INTEGER,
        get() {
            let value = this.getDataValue('studentId');
            if(value){
                const stringId = jwt.sign({id: value}, process.env.INT_TO_STRING_SECRET);
                const stringIdParts = stringId.split('.');
                return stringIdParts[1] + '.' + stringIdParts[2];
            }
            else return value;
        },
        set(value) {
            const intId = jwt.verify( process.env.JWT_ALGORITHM_CONST + '.' + value, process.env.INT_TO_STRING_SECRET);
            this.setDataValue('studentId', intId.id);
        }
    },
    subOfferingId: {
        type: DataTypes.INTEGER,
        get() {
            let value = this.getDataValue('subOfferingId');
            if(value){
                const stringId = jwt.sign({id: value}, process.env.INT_TO_STRING_SECRET);
                const stringIdParts = stringId.split('.');
                return stringIdParts[1] + '.' + stringIdParts[2];
            }
            else return value;
        },
        set(value) {
            const intId = jwt.verify( process.env.JWT_ALGORITHM_CONST + '.' + value, process.env.INT_TO_STRING_SECRET);
            this.setDataValue('subOfferingId', intId.id);
        }
    }
});

module.exports = StudentSubjectRegistration; 