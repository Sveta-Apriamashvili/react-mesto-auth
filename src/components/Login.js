import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as auth from '../auth.js';

function Login(props) {

  const [userAuthorisation, setUserAuthorisation] = useState({
    email: "",
    password: ""
  });

  const history = useHistory();

  function handleChange(e) {
    const { name, value } = e.target
    setUserAuthorisation({ ...userAuthorisation, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault();

    const {email, password} = userAuthorisation

    if (!email || !password) {
      return;
    }
    auth.login(email, password)
    .then(() => {
      props.handleLogin(true);
      history.push('/');
    })
    // .catch(() => props.onRegistrationResult(false))
    // .then(() => props.onTooltipToggle(true));
  }

  return (
    <div className="pop-up__container pop-up__container_type_auth">
      <p className="pop-up__title pop-up__title_type_auth">
        Вход
      </p>
      <form className="pop-up__admin" onSubmit={handleSubmit}>
        <div className="pop-up__input-container">
          <input className="pop-up__item pop-up__item_type_auth" id="email" name="email" type="email" placeholder="Email" onChange={handleChange} value={userAuthorisation.email} />
          <input className="pop-up__item pop-up__item_type_auth" id="password" name="password" type="password" placeholder="Пароль" onChange={handleChange} value={userAuthorisation.password}/>
          <button type="submit" className="pop-up__submit-button pop-up__submit-button_type_auth">Войти</button>
        </div>
      </form>

    </div>
  )
}

export default Login