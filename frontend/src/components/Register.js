import React from 'react';
import { Link } from 'react-router-dom';

export default function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleMailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleRegistrationSubmit(evt) {
    evt.preventDefault();
    props.onRegister(email, password);
    setPassword('');
    setEmail('');
  }

  return (
    <div className="entrance">
      <h2 className="entrance__heading">Регистрация</h2>
      <form className="form" onSubmit={handleRegistrationSubmit}>
        <input
          className="form__input"
          type="email"
          placeholder="Email"
          required
          onChange={handleMailChange}
          minLength="6"
          maxLength="30"
          value={email || ''}
        />
        <input
          className="form__input"
          type="password"
          placeholder="Пароль"
          required
          onChange={handlePasswordChange}
          minLength="6"
          maxLength="18"
          value={password || ''}
        />
        <button className="entrance__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="entrance__text">
        Уже зарегистрированы?
        <Link to="/sign-in" className="entrance__link">
          Войти
        </Link>
      </p>
    </div>
  );
}
