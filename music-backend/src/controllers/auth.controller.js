const authService = require('../services/auth.service');

const register = async (req, res, next) => {
    try {
        const {
            email, password, username
        } = req.body;

        const result = await authService.registerUser({
            email,
            password,
            username,
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
};


const requestRefreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        const result = await authService.refreshToken(refreshToken);

        res.status(200).json(result) // tra ve access token moi
    } catch (error) {
        res.status(403).json({
            message: error.message
        });
    }
};

const logout = async (req, res, next) => {
    try {
        // Lay userId tu token cua user muon log out
        const userId = req.user.user_id;
        await authService.logoutUser(userId);
        res.status(200).json({
            message: 'Log out successfully.'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    requestRefreshToken,
    logout,
}