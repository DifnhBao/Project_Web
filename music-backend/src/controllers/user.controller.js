const { User } = require('../models');
const userService = require('../services/user.service');


/* --- Controller for User */

const getUserProfile = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const user = await userService.getUserProfile(userId);

        res.status(200).json({
            data: user,
        });
    } catch (error) {
        next(error);
    }
};


const updateUserProfile = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const updateData = req.body;
        const updatedUser = await userService.updateUserProfile(userId, updateData);

        res.status(200).json({
            message: 'Cập nhật thông tin thành công',
            data: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};


const changeUserPassword = async (req, res, next) => {
    try {
        const userId = req.user.user_id;
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            throw new Error('Vui lòng cung cấp mật khẩu cũ và mật khẩu mới.');
        }

        const result = await userService.changeUserPassword(userId, oldPassword, newPassword);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}


/* Controller for Admin */


const promoteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateUser = await userService.promoteUserToAdmin(id);

        res.status(200).json({
            message: `Đã nâng quyền Admin cho user ${updateUser.username}!!!`,
            data: updateUser
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const demoteAdminToUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const requesterId = req.user.user_id;

        const result = await userService.demoteAdminToUser(id, requesterId);
        res.status(200).json({
            message: `Đã hạ quyền tài khoản ${result.username} thành user.`,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};


const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({
            data: users,
        });
    } catch (error) {
        next(error);
    }
};


const updateUserById = async (req, res, next) => {
    try {
        const { id } = req.params;  // Lay ID tu URL
        const updateData = req.body;

        const updatedUser = await userService.updateUserById(id, updateData);
        res.status(200).json({
            message: 'Admin cập nhật thông tin user thành công.',
            data: updatedUser
        });
    } catch (error) {
        next(error);
    }
};


const deleteUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await userService.deleteUserById(id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const resetUserPassword = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;

        if (!newPassword) {
            throw new Error('Vui lòng nhập mật khẩu mới.');
        }

        const result = await userService.resetUserPassword(id, newPassword);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};



module.exports = {
    getUserProfile,
    updateUserProfile,
    changeUserPassword,
    promoteUser,
    getAllUsers,
    updateUserById,
    deleteUserById,
    demoteAdminToUser,
    resetUserPassword,
};