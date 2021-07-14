import React from 'react';
import logo from '../images/logo.svg';

function Header() {
    return (
        <header className="header">
            <img className="logo" src={logo} alt="лого" />
            {/* <nav className="menu"> */}
            <ul className="header__menu">
              <li className="header__menu-item">email@email.com</li>
              <li className="header__menu-item">Выйти</li>
            </ul>
          {/* </nav> */}
        </header>
    )
}

export default Header