const { DataTypes, DATE } = require('sequelize');
const sequelize = require('../config/db');

const Song = sequelize.define('Song', {
    song_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
    },
    audio_url: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    view_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    upload_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    is_visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    tableName: 'songs',
    timestamps: false,
});

module.exports = Song;