// models/user.js
const mongoose = require('mongoose');
const validator = require('validator');
const { regular } = require('../utils/validation');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (correct) => regular.test(correct),
      message: 'Почта пользователя введена неверно',
    }
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (correct) => validator.isEmail(correct),
      message: 'Почта пользователя введена неверно',
    }
  },
  password: {
    type: String,
    required: true,
    select: false,
  }
});

module.exports = mongoose.model('user', userSchema);
