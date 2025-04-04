const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connectDB');

const ModelList = sequelize.define('ModelList', {
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    NameVNM: {
        type: DataTypes.STRING,
        field: "NameVNM"
    },
    IncludeProcTime: {
        type: DataTypes.INTEGER,
        field: "IncludeProcTime"
    },
    ProcTime: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: "ProcTime", // Xác định tên cột chính xác
    },
    IncludeNumberProcessed: {
        type: DataTypes.INTEGER,
    },
    NumberProcessed: {
        type: DataTypes.INTEGER,
    },
    IncludeFailed: {
        type: DataTypes.INTEGER,
    },
    Failed: {
        type: DataTypes.INTEGER,
    },Simtime: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'modellist',
    timestamps: false,
    // underscored: true,
});

module.exports = ModelList;
