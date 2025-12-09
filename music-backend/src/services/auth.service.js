const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// Hàm tạo TOKEN
const generateTokens = (payLoad) => {
    // Access token hiệu lực 30p
    const accessToken = jwt.sign(payLoad, JWT_SECRET, { expiresIn: '30m' });

    // Refresh token 7 ngày
    const refreshToken = jwt.sign(payLoad, JWT_REFRESH_SECRET, { expiresIn: '7d' });

    return {
        accessToken,
        refreshToken
    };
};


const registerUser = async (userData) => {
    const { email, password, username } = userData;

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
    });

    const tokens = generateTokens({
        userId: newUser.user_id,
        email: newUser.email
    });

    newUser.refreshToken = tokens.refreshToken;
    await newUser.save();

    newUser.password = undefined;
    return { user: newUser, ...tokens };
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

    // tạo 2 token mới
    const tokens = generateTokens({
        userId: user.user_id,
        email: user.email
    });

    user.refresh_token = tokens.refreshToken;
    await user.save();

    user.password = undefined;
    return { user: user, ...tokens };
};


// Xin token mới (Refresh Token)
const refreshToken = async (refreshTokenFromClient) => {
    if (!refreshTokenFromClient) throw new Error('Chưa gửi Refresh Token');

    // check token có hợp lệ không
    let decoded;
    try {
        decoded = jwt.verify(refreshTokenFromClient, JWT_REFRESH_SECRET);
    } catch (error) {
        throw new Error('Refresh Token hết hạn hoặc không hợp lệ.');
    }

    // check token trùng với của user trong DB không
    const user = await User.findByPk(decoded.userId);
    if (!user || user.refresh_token !== refreshTokenFromClient) {
        throw new Error('Refresh Token không khớp (Có thể đã đăng xuất).');
    }

    // Check xong, cấp lại Access token
    const newAccessToken = jwt.sign(
        { userId: user.user_id, email: user.email },
        JWT_SECRET,
        { expiresIn: '30m' }
    );

    return { accessToken: newAccessToken };
};


// Log out
const logoutUser = async (userId) => {
    const user = await User.findByPk(userId);
    if (user) {
        user.refresh_token = null;
        await user.save();
    }
    return { message: 'Log out successfully.' };
};

module.exports = {
    registerUser,
    loginUser,
    refreshToken,
    logoutUser,
}