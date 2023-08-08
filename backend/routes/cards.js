const cardRouter = require('express').Router();
const {
  getCards, deleteCardById, createCard, likeCard, dislikeCard
} = require('../controllers/cards');

const { validateCreateCard, validateCardId } = require('../utils/validation');

cardRouter.get('/', getCards);

cardRouter.delete('/:cardId', validateCardId, deleteCardById);

cardRouter.post('/', validateCreateCard, createCard);

cardRouter.put('/:cardId/likes', validateCardId, likeCard);

cardRouter.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardRouter;
