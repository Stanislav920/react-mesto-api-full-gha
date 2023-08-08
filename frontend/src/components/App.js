import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';

import LogIn from './LogIn.js';
import Register from './Register';
import InfoToolTip from './InfoTooltip';

import api from '../utils/Api.js';
import * as auth from '../utils/Auth.js';

import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import ImagePopup from './ImagePopup.js';
import ConfirmDeletePopup from './ConfirmDeletePopup.js';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [selectCardDelete, setSelectCardDelete] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState('');
  const [isRegisered, setIsRegitered] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [err, setErr] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      api
        .getUserInfo()
        .then(res => {
          setCurrentUser(res);
        })
        .catch(err => console.error(err));

      api
        .getInitialCards()
        .then(res => {
          setCards(res.map(card => card));
        })
        .catch(err => console.error(err));
    }
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditAvatar({ avatar }) {
    api
      .editAvatar(avatar)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.error(err));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleUpdateUser({ name, about }) {
    api
      .editUserInfo(name, about)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.error(err));
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard({ name, link })
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.error(err));
  }

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true);
    setSelectCardDelete(card);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(state => state.filter(c => c._id !== card._id));
        closeAllPopups();
      })
      .catch(err => console.error(err));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
    setIsDeleteCardPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .checkToken(token)
        .then(res => {
          setIsAuth(true);
          setEmail(res.data.email);
          navigate('/');
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setErr(false);
        setIsInfoTooltipOpen(true);
        handleInfoTooltipOpen();
        navigate('/sign-in');
      })
      .catch(() => {
        setErr(true);
        handleInfoTooltipOpen();
      });
  }

  function handleAuthorize(email, password) {
    auth
      .authorize(email, password)
      .then(data => {
        if (data.token) {
          setErr(false);
          localStorage.setItem('token', data.token);
          setIsAuth(true);
          navigate('/');
          setEmail(email);
        }
      })
      .catch(() => {
        setErr(true);
        handleInfoTooltipOpen();
      });
  }

  function handleSingOut() {
    setEmail('');
    localStorage.removeItem('token');
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} onSingOut={handleSingOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Main
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardDelete={handleDeleteCardClick}
                  onCardLike={handleCardLike}
                />
              </ProtectedRoute>
            }
          />

          <Route path="/sign-in" element={<LogIn onAuthorize={handleAuthorize} />} />

          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="*" element={<Navigate to={'/'} />} />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleEditAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <ConfirmDeletePopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          card={selectCardDelete}
          onCardDelete={handleCardDelete}
        />
        <InfoToolTip
          isOpen={isInfoTooltipOpen}
          isRegisered={isRegisered}
          onClose={closeAllPopups}
          status={!err}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
