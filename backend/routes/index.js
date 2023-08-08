const express = require('express');
const userRouter = require('./users');
const cardRouter = require('./cards');

const UnauthorizedError = require('../utils/repsone-errors/UnauthorizedError');

const router = express.Router();

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use('*', (req, res, next) => {
  next(new UnauthorizedError('Страница не найдена'));
});

module.exports = router;
