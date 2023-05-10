const { DataTypes } = require('sequelize');

const { sequelize } = require('../utils/database');

const SubOfferring = sequelize.define('subOfferring', {
    sub_code:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sub_id:{
        type: DataTypes.STRING,
        allowNull: false
    },
    sem_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    inst_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = SubOfferring;