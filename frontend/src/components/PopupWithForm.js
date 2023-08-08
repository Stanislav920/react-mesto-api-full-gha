import React from 'react';

function PopupWithForm(props) {
  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      props.onClose();
    }
  }
  return (
    <div
      className={`popup popup_style_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <h3 className="popup__title">{props.title}</h3>

        <form id={props.name} className="popup__form" name={props.name} onSubmit={props.onSubmit}>
          {props.children}
          <button type="submit" className="popup__submit">
            {props.btnText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
