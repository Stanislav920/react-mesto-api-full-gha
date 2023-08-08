import React from 'react';
import yesIcon from '../images/yesIcon.svg';
import notIcon from '../images/notIcon.svg';

function infoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_place-entrance">
        <div className="popup__wrapper">
          {props.status ? (
            <>
              <img className="popup__img" src={yesIcon} alt="" />
              <p className="popup__text">Вы успешно зарегистрировались!</p>
            </>
          ) : (
            <>
              <img className="popup__img" src={notIcon} alt="" />
              <p className="popup__text">Что-то пошло не так! Попробуйте ещё раз.</p>
            </>
          )}
        </div>
        <button className="popup__close" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default infoTooltip;
