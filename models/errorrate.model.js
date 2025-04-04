const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connectDB');

const ErrorRate = sequelize.define('ErrorRate', {
    name: {
        type: DataTypes.TEXT,
    },
    rate: {
        type: DataTypes.INTEGER,
    },
    num_get: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'errorrate',
    timestamps: false,
    underscored: true,
});

module.exports = ErrorRate;
