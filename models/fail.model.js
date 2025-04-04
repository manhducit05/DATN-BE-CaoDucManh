const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connectDB');

const Fails = sequelize.define('Fails', {
    tram: {
        type: DataTypes.TEXT,
    },
    loai_loi: {
        type: DataTypes.TEXT,
    },
    modified_time: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: 'fails',
    timestamps: false,
    underscored: true,
});

module.exports = Fails;
