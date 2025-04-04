const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connectDB');

const CheckLoi = sequelize.define('CheckLoi', {
    failed: {
        type: DataTypes.INTEGER,
    },
    number_processed: {
        type: DataTypes.INTEGER,
    },
    failed1: {
        type: DataTypes.INTEGER,
    },
    number_processed1: {
        type: DataTypes.INTEGER,
    },
    failed2: {
        type: DataTypes.INTEGER,
    },
    number_processed2: {
        type: DataTypes.INTEGER,
    },
    failed3: {
        type: DataTypes.INTEGER,
    },
    number_processed3: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'checkloi',
    timestamps: false,
    underscored: true,
});

module.exports = CheckLoi;
