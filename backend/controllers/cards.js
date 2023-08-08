const mongoose = require('mongoose');

const { ValidationError, CastError } = mongoose.Error;

const Card = require('../models/card');

const createError = 201;

// Классы ошибок.
const NotFoundError = require('../utils/repsone-errors/NotFoundError');
const BadRequestsError = require('../utils/repsone-errors/BadRequestError');
const ForbiddenError = require('../utils/repsone-errors/ForbiddenError');

// Создание карточки.

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => res.status(createError).send(card))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestsError('Переданы некорректные данные карточки'));
      } else { next(err); }
    });
};

// Добавление карточки.

module.exports.getCards = (req, res, next) => {
  Card.find({}).populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch((err) => next(err));
};

// Удаление карточки.

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка по указанному _id не найдена'));
      }
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Вы не являетесь автором карточки, удаление невозможно'));
      }

      return Card.deleteOne(req.params.cardId)
        .orrFail(() => new NotFoundError('Карточка по указанному _id не найдена'))
        .then(() => res.send({ message: 'Карточка удалена' }));
    })

    .catch((err) => {
      if (err.name instanceof CastError) {
        next(new BadRequestsError('Переданы некорректные данные карточки'));
      } else { next(err); }
    });
};

// Поставить лайк карточки.

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name instanceof CastError) {
        next(new BadRequestsError('Переданы некорректные данные карточки'));
      } else { next(err); }
    });
};

// Удалить лайк карточки.

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name instanceof CastError) {
        next(new BadRequestsError('Переданы некорректные данные карточки'));
      } else { next(err); }
    });
};
