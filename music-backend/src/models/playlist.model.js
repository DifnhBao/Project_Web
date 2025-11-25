const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Playlist = sequelize.define('Playlist', {
    playlist_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    cover_image: {
        type: DataTypes.STRING(255)
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, {
    tableName: 'playlists',
    timestamps: false
});

module.exports = Playlist;