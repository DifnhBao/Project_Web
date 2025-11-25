const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (userData) => {
    const { email, password, username, full_name, birthday, gender, address } = userData;

    // Kiểm tra trùng email
    const existingUser = await User.findOne({
        where: {
            [require('sequelize').Op.or]: [{ email }, { username }]
        }
    });

    if (existingUser) {
        if (existingUser.email === email) {
            throw new Error('Email đã được sử dụng');
        }
        if (existingUser.username === username) {
            throw new Error('Username đã được sử dụng');
        }
    }

    const newUser = await User.create({
        email,
        password,
        username,
        full_name,
        birthday,
        gender,
        address,
    });

    const token = jwt.sign(
        { userId: newUser.user_id, email: newUser.email },
        JWT_SECRET,
        { expiresIn: '3d' },
    );

    newUser.password = undefined;
    return { user: newUser, token };
}


const loginUser = async (userData) => {
    const { email, password } = userData;

    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('Email hoặc mật khẩu không đúng');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Email hoặc mật khẩu không đúng');
    }

    const token = jwt.sign(
        { userId: user.user_id, email: user.email },
        JWT_SECRET,
        { expiresIn: '3d' },
    )
    user.password = undefined;
    return { user: user, token };
}

module.exports = {
    registerUser,
    loginUser,
}