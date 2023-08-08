require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { ValidationError, CastError } = mongoose.Error;

const User = require('../models/user');

// Константы ошибок.
const DuplikateObjectError = 11000;
const createError = 201;

// Классы ошибок.
const BadRequestsError = require('../utils/repsone-errors/BadRequestError');
const UnauthorizedError = require('../utils/repsone-errors/UnauthorizedError');
const ConflictingRequestError = require('../utils/repsone-errors/ConflictingRequestError');
const NotFoundError = require('../utils/repsone-errors/NotFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;

// Создание пользователя.

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password
  } = req.body;
  const passwordHash = bcrypt.hash(password, 10);

  passwordHash.then((hash) => User.create({
    name, about, avatar, email, password: hash
  }))
    .then((user) => res.status(createError).send({
      name: user.name, about: user.about, avatar: user.avatar, email: user.email
    }))
    .catch((err) => {
      if (err.name instanceof ValidationError) {
        next(new BadRequestsError('Переданы некорректные данные пользователя'));
      } if (err.code === DuplikateObjectError) {
        next(new ConflictingRequestError('Пользователь с указанной почтой уже есть в системе'));
      } else { next(err); }
    });
};

// Получение пользователя.

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(next);
};

// Получение ID пользователя.

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name instanceof CastError) {
        next(new BadRequestsError('Переданы некорректные данные пользователя'));
      } else { next(err); }
    });
};

// Обновление профиля.

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name instanceof ValidationError) {
        next(new BadRequestsError('Переданы некорректные данные пользователя'));
      } else { next(err); }
    });
};

// Обновление аватара.

module.exports.updateAvatar = (req, res, next) => {
  const avatar = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, avatar, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name instanceof ValidationError) {
        next(new BadRequestsError('Переданы некорректные данные пользователя'));
      } else { next(err); }
    });
};

// Логин пользователя.

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError('Имя пользователя или (-и) пароль введены неверно'));
      }
      return bcrypt.compare(password, user.password).then((correct) => {
        if (!correct) {
          return next(new UnauthorizedError('Имя пользователя или (-и) пароль введены неверно'));
        }

        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-secret', { expiresIn: '7d' });

        return res.send({ token });
      });
    });
};

// Получение профиля пользователя.

module.exports.getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
      return res.send({ data: user });
    })
    .catch((error) => { next(error); });
};
