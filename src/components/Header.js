import React from 'react';
import logo from '../images/logo.svg';

function Header() {
    return (
        <header className="header">
            <img className="logo" src={logo} alt="лого" />
        </header>
    )
}

export default Header