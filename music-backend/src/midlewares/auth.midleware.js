const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();


const JWT_SECRET = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);

            req.user = await User.findByPk(
                decoded.userId,
                { attributes: { exclude: ['password'] } },
            );

            if (!req.user) {
                return res.status(401).json({ message: 'Người dùng không tồn tại!' });
            }
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token không hợp lệ!' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Không tìm thấy token!' });
    }
};


const isAdmin = async (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: "Can't access!" });
    }
};


module.exports = { protect, isAdmin };