const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Album = sequelize.define('Album', {
    album_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    release_date: {
        type: DataTypes.DATE
    },
    cover_image: {
        type: DataTypes.STRING(255)
    },
}, {
    tableName: 'albums',
    timestamps: false
});

module.exports = Album;