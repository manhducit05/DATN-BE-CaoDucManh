const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connectDB');

const Training = sequelize.define('Training', {
    Efficiency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ProcTime: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'training',
    timestamps: false,
});

module.exports = Training;
