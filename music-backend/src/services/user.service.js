const { User } = require('../models');
const bcrypt = require('bcryptjs');

/* --- CHỨC NĂNG DÀNH CHO USER --- */
const getUserProfile = async (userId) => {
    const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] }
    });

    if (!user) {
        throw new Error('Không tìm thấy người dùng.');
    }

    return user;
};


const updateUserProfile = async (userId, updateData) => {
    const { full_name, birthday, gender, address } = updateData;

    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error('Không tìm thấy người dùng.');
    }

    user.full_name = full_name || user.full_name;
    user.birthday = birthday || user.birthday;
    user.gender = gender || user.gender;
    user.address = address || user.address;

    await user.save();

    user.password = undefined;
    return user;
};


const changeUserPassword = async (userId, oldPassword, newPassword) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('Không tìm thấy người dùng.');

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new Error('Mật khẩu cũ không chính xác.');
    }

    if (oldPassword === newPassword) {
        throw new Error('Mật khẩu mới không được trùng với mật khẩu cũ.');
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    return {
        message: 'Đổi mật khẩu thành công'
    }
};


/* --- CHỨC NĂNG DÀNH CHO ADMIN --- */


const promoteUserToAdmin = async (userIdToPromote) => {
    const user = await User.findByPk(userIdToPromote);
    if (!user) throw new Error("Không tìm thấy ID này!!!");
    if (user.role === 'admin') throw new Error("ID đã có quyền admin!!!");

    user.role = 'admin';
    await user.save();

    user.password = undefined;
    return user;
};

const demoteAdminToUser = async (userIdToDemote, requesterId) => {
    if (userIdToDemote === requesterId) {
        throw new Error('Bạn không thể hạ quyền của chính mình!');
    }

    const user = await User.findByPk(userIdToDemote);
    if (!user) {
        throw new Error('Không tìm thấy user này.');
    }

    if (user.role === 'user') {
        throw new Error('Nguời dùng này đã là user thường rồi.');
    }

    user.role = 'user';
    await user.save();

    return user;
}


const getAllUsers = async () => {
    const users = await User.findAll({
        attributes: { exclude: ['password'] }
    });
    return users;
};

const updateUserById = async (userId, updateData) => {
    const { full_name, birthday, gender, address, role } = updateData;

    const user = await User.findByPk(userId);
    if (!user) throw new Error('Không tìm thấy người dùng.');

    user.full_name = full_name || user.full_name;
    user.birthday = birthday || user.birthday;
    user.gender = gender || user.gender;
    user.address = address || user.address;
    user.role = role || user.role;

    await user.save();

    user.password = undefined;
    return user;
};


const deleteUserById = async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('Không tìm thấy người dùng.');

    if (user.role === 'admin') {
        throw new Error('Không thể xóa tài khoản Admin bằng cách này.');
    }

    await user.destroy();

    return {
        message: `Đã xóa thành công tài khoản ${user.username}.`
    };
};


const resetUserPassword = async (userId, newPassword) => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error('Không tìm thấy user này.');
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    return {
        message: `Đã đặt lại mật khẩu cho user ${user.username} thành công.`
    };
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    changeUserPassword,
    promoteUserToAdmin,
    getAllUsers,
    updateUserById,
    deleteUserById,
    demoteAdminToUser,
    resetUserPassword,
};