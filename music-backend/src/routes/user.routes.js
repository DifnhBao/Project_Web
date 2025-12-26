const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

const { protect, isAdmin, protectAdmin } = require('../midlewares/auth.midleware');

/* --- ROUTES FOR USER --- */

router.get(
    '/me',
    protect,
    userController.getUserProfile
);

router.put(
    '/me',
    protect,
    userController.updateUserProfile
);


router.post(
    '/change-password',
    protect,
    userController.changeUserPassword
);


/* --- ROUTES FOR ADMIN --- */


router.get(
    '/admin/me',
    protectAdmin,
    userController.getCurrentAdmin
);

router.post(
    '/:id/promote',
    protect,
    isAdmin,
    userController.promoteUser
);

router.post(
    '/:id/demote',
    protect,
    isAdmin,
    userController.demoteAdminToUser
)

router.get(
    '/',
    protect,
    isAdmin,
    userController.getAllUsers,
);

router.put(
    '/:id',
    protect,
    isAdmin,
    userController.updateUserById,
);

router.delete(
    '/:id',
    protect,
    isAdmin,
    userController.deleteUserById,
);

router.put(
    '/:id/reset-password',
    protect,
    isAdmin,
    userController.resetUserPassword,
)

module.exports = router;