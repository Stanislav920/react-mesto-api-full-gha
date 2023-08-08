import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onCardDelete(props.card);
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      btnText="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default ConfirmDeletePopup;
