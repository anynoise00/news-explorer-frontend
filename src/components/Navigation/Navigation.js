import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import iconLogoutWhite from '../../images/icon_logout-white.svg';
import iconLogoutBlack from '../../images/icon_logout-black.svg';

import './Navigation.css';

function Navigation(props) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(true);

  function toggleNavbar(e) {
    setCollapsed(!collapsed);
  }

  return (
    <nav
      className={`navbar ${
        collapsed ? 'navbar_collapsed' : ''
      } navbar_theme_light`}
    >
      <Link className='navbar__logo' to='/'>
        <p>NewsExplorer</p>
      </Link>
      <div
        className={`navbar__line ${
          props.lightTheme ? 'navbar__line_theme_light' : ''
        }`}
      />
      <input
        type='button'
        className={`btn navbar__toggle ${
          !collapsed ? 'navbar__toggle_active' : ''
        } ${props.lightTheme ? 'navbar__toggle_theme_light' : ''}`}
        onClick={toggleNavbar}
      />

      <div
        className={`navbar__container ${
          collapsed ? 'navbar__container_collapsed' : ''
        }`}
      >
        <Link
          to='/'
          className={`navbar__link ${
            location.pathname === '/' ? 'navbar__link_selected' : ''
          }`}
        >
          Home
        </Link>
        {props.loggedIn ? (
          <>
            <Link
              to='/saved-news'
              className={`navbar__link navbar__link_type_secondary ${
                location.pathname === '/saved-news'
                  ? 'navbar__link_selected'
                  : ''
              }`}
            >
              Artigos Salvos
            </Link>
            <button
              className={`btn navbar__btn navbar__logout-btn ${
                props.lightTheme && collapsed ? 'navbar__btn_theme_light' : ''
              }`}
              onClick={props.onLogout}
            >
              {currentUser.name}
              <img
                alt='Ícone de logout'
                src={
                  location.pathname === '/' ? iconLogoutWhite : iconLogoutBlack
                }
              />
            </button>
          </>
        ) : (
          <>
            <button
              className='btn navbar__btn navbar__btn'
              onClick={props.onLogin}
            >
              Entrar
            </button>
          </>
        )}
      </div>
      {!collapsed && (
        <div
          className='overlay navbar__overlay'
          onClick={() => setCollapsed(true)}
        />
      )}
    </nav>
  );
}

export default Navigation;
