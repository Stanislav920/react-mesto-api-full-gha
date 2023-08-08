import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HeaderLogo from '../images/logo.svg';

function Header({ email, onSingOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={HeaderLogo} alt="Лого" />
      <div className="header__area">
        {email && <p className="header__email">{email}</p>}
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link-text">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link-text">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <Link to="/sign-in" className="header__link-text" onClick={onSingOut} replace>
                Выйти
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
