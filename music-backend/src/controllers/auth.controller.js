const authService = require('../services/auth.service');

const register = async (req, res, next) => {
    try {
        const {
            email, password, username, full_name, birthday, gender, address
        } = req.body;

        const result = await authService.registerUser({
            email,
            password,
            username,
            full_name,
            birthday,
            gender,
            address,
        });

        res.status(201).json({
            message: 'Register successfully!',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const result = await authService.loginUser({ email, password });

        res.status(201).json({
            message: 'Login successfully!',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

module.exports = {
    register,
    login,
}