import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardDeleteButtonClassName = isOwn
    ? "elements__delete"
    : "elements__delete_hidden";

  const cardLikeButtonClassName = `elements__like ${
    isLiked ? "elements__like_active" : null
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <div id="elements-template">
      <div className="elements__item">
        <button
          className={cardDeleteButtonClassName}
          type="button"
          onClick={handleCardDelete}
        ></button>
        <img
          className="elements__image"
          src={card.link}
          alt={card.name}
          onClick={handleCardClick}
        />
        <div className="elements__info">
          <h2 className="elements__title">{card.name}</h2>
          <div className="elements__like-container">
            <button
              className={cardLikeButtonClassName}
              type="button"
              onClick={handleLikeClick}
            ></button>
            <p className="elements__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
