import React from 'react';
import logo from '../images/logo-mesto.svg';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';

function Header({type, userEmail, handleSignOutClick}) {
    //const {url} = useRouteMatch();
    const {pathname} = useLocation();
    //console.log(a);
    return (
        <header className="header">
            <img src={logo} className="header__logo" alt="Место Россия" />
            <div>
            { pathname === "/" 
                ? (
                    <>
                        <span className="header__link">{userEmail}</span>
                        <Link to="/" className="header__link header__link_color_gray" onClick={handleSignOutClick}>Выйти</Link>
                    </>
                ) 
                : ''
            }
         
            </div>
        </header>
    );
}

export default Header;