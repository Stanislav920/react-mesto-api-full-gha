import React, { useEffect, useRef } from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = useRef('');

  useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить aватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      btnText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-input"
        className="popup__input"
        type="url"
        name="avatar"
        placeholder="Введите ссылку на аватар"
        required
        minLength="2"
        maxLength="200"
        ref={avatarRef}
      />
      <span className="avatar-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
