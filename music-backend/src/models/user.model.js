const { DataTypes, DATE } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    full_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: true,
        }
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING(10),
        allowNull: true,
        validate: {
            isIn: [['male', 'female', 'other']],
        }
    },
    role: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'user',
    },
    avatar: {
        type: DataTypes.STRING(255)
    },
    refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, {
    tableName: 'users',
    timestamps: false,
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});

module.exports = User;

