import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add-photo"
      title="Новое место"
      btnText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-title"
        type="text"
        className="popup__input"
        name="name"
        value={name}
        placeholder="Название"
        autoComplete="off"
        minLength="2"
        maxLength="30"
        onChange={handleNameChange}
      />
      <span className="input-title-error popup__input-error"></span>

      <input
        id="link-picture"
        type="url"
        className="popup__input"
        name="link"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span className="link-picture-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
