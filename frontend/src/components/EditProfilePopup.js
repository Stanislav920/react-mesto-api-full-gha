import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useEffect } from 'react';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    console.log(currentUser);
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      btnText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="username-input"
        type="text"
        className="popup__input"
        name="username"
        placeholder="Ваше имя"
        value={name || ''}
        required
        minLength="2"
        maxLength="40"
        autoComplete="off"
        onChange={handleNameChange}
      />
      <span className="username-input-error popup__input-error"> </span>

      <input
        id="subtitle-input"
        type="text"
        className="popup__input"
        name="subtitle"
        placeholder="О себе"
        autoComplete="off"
        required
        value={description || ''}
        minLength="2"
        maxLength="200"
        onChange={handleDescriptionChange}
      />

      <span className="subtitle-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
