import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

import './Header.css';

function Header(props) {
  const location = useLocation();

  return (
    <header
      className={`header ${
        location.pathname !== '/' ? 'header_theme_light' : ''
      }`}
    >
      <Navigation lightTheme={location.pathname !== '/'} {...props} />
    </header>
  );
}

export default Header;
