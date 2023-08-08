import React from 'react';

export default function LogIn(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleAuthorize(evt) {
    evt.preventDefault();
    props.onAuthorize(email, password);
  }

  return (
    <div className="entrance">
      <h2 className="entrance__heading">Вход</h2>
      <form className="form" onSubmit={handleAuthorize}>
        <input
          className="form__input"
          type="email"
          placeholder="Email"
          required
          onChange={handleEmailChange}
          minLength="6"
          maxLength="30"
          value={email}
        />
        <input
          className="form__input"
          type="password"
          placeholder="Пароль"
          required
          onChange={handlePasswordChange}
          minLength="6"
          maxLength="18"
          value={password}
        />
        <button className="entrance__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
