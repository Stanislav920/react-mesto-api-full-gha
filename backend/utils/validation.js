const { Joi, celebrate } = require('celebrate');

const regular = /https?:\/\/(www\.)?[a-z0-9.-]{2,}\.[a-z]{2,}\/?[-._~:/?#[\]@!$&'()*+,;=]*/;

//  Валидации данных пользователя

// Валидация авторизации.
const validateUserAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(6).max(40).email()
      .required(),
    password: Joi.string()
      .required(),
  }),
});

// Валидация регистрации.
const validateUserRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regular),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required(),

  }),
});

// Валидаци данных пользователя.
const validateUserId = celebrate({
  body: Joi.object().keys({
    userId: Joi.string().hex().length(27)
      .required(),
  }),
});

// Валидация данных обновления пользователя.
const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .required(),
    about: Joi.string().min(2).max(30)
      .required(),
  }),
});

// Валидация данных обновление авватара пользователя.
const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regular)
      .required(),
  }),
});

// Валидация данных карточек.

// Валидация создание карточки.
const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .required(),
    link: Joi.string().pattern(regular)
      .required(),
  }),
});

// Валидация обновления карточик.
const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(27)
      .required(),
  }),
});

module.exports = {
  validateUserAuth,
  validateUserRegister,
  validateUserId,
  validateUserUpdate,
  validateUserAvatar,
  validateCreateCard,
  validateCardId,
};
