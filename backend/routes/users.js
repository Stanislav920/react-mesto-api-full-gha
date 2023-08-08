const userRouter = require('express').Router();
const {
  getUsers, getUserById, updateProfile, updateAvatar, getUserProfile
} = require('../controllers/users');

const {
  validateUserId,
  validateUserUpdate,
  validateUserAvatar
} = require('../utils/validation');

userRouter.get('/', getUsers);

userRouter.get('/me', getUserProfile);
userRouter.get('/:userId', validateUserId, getUserById);

userRouter.patch('/me', validateUserUpdate, updateProfile);
userRouter.patch('/me/avatar', validateUserAvatar, updateAvatar);

module.exports = userRouter;
