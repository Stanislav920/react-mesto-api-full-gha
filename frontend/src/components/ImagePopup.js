function ImagePopup({ card, onClose }) {
  return (
    <div id="image-popup" className={`popup popup_zoom_active ${card ? 'popup_opened' : ''}`}>
      <div className="popup__zoom-container">
        <button id="close-image" className="popup__close" type="button" onClick={onClose}></button>

        <img src={card?.link} alt={card?.name} className="popup__image" />
        <p className="popup__description">{card?.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
