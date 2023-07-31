const { DataTypes } = require('sequelize');

const { sequelize } = require('../utils/database');

const Subject = sequelize.define('subject', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sub_code:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    sub_name:{
        type: DataTypes.STRING,
        allowNull: false
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
    }
});

module.exports = Subject;