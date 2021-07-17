import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {

  return (
    <header className="header">
      <img className="logo" src={logo} alt="лого" />
      <div className="header__menu">
        <Switch>
          <Route path="/sign-up">
            <Link className="header__menu-item" to="/sign-in">Войти</Link>
          </Route>
          <Route path="/sign-in">
            <Link className="header__menu-item" to="/sign-up">Регистрация</Link>
          </Route>
          <Route exact path="/">
            <p className="header__menu-email">{props.userEmail}</p>
            <button className="header__menu-item" onClick={props.onSignOut}>Выйти</button>
          </Route>
        </Switch>
      </div>
    </header>
  )
}

export default Header