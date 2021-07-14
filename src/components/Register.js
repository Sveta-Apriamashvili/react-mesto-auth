import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as auth from '../auth.js';


function Register(props) {

  const [userRegistration, setUserRegistration] = useState({
    email: "",
    password: ""
  });

  

  const history = useHistory();

  function handleChange(e) {
    const { name, value } = e.target
    setUserRegistration({ ...userRegistration, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const {email, password} = userRegistration
    auth.register(email, password)
    .then(() => {
      props.onRegistrationResult(true);
      history.push('/sign-in');
    })
    .catch(() => props.onRegistrationResult(false))
    .then(() => props.onTooltipToggle(true));
  }

  return (
    <div className="pop-up__container pop-up__container_type_auth">
      <p className="pop-up__title pop-up__title_type_auth">
        Регистрация
      </p>
      <form className="pop-up__admin" onSubmit={handleSubmit}>
        <div className="pop-up__input-container">
          <input className="pop-up__item pop-up__item_type_auth" id="email" name="email" type="email" placeholder="Email" value={userRegistration.email} onChange={handleChange} />
          <input className="pop-up__item pop-up__item_type_auth" id="password" name="password" type="password" placeholder="Пароль" value={userRegistration.password} onChange={handleChange} />
          <button type="submit" className="pop-up__submit-button pop-up__submit-button_type_auth">Зарегистрироваться</button>
        </div>
      </form>
      <div className="pop-up__sign-in">
        <p>Уже зарегистрированы?</p>
        <Link to="sign-in" className="pop-up__sign-in_type_link">Войти</Link>
      </div>
    </div>
  )
}

export default Register