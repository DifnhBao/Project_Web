const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Artist = sequelize.define('Artist', {
    artist_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },
    bio: {
        type: DataTypes.TEXT,
    },
    image: {
        type: DataTypes.STRING(255)
    },
    country: {
        type: DataTypes.STRING(100)
    },
}, {
    tableName: 'artists',
    timestamps: false
});

module.exports = Artist;