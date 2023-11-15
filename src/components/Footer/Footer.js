import { Link } from 'react-router-dom';
import './Footer.css';

import iconGithub from '../../images/icon_github.svg';
import iconLinkedin from '../../images/icon_linkedin.svg';

function Footer(props) {
  return (
    <footer className='footer'>
      <p className='footer__copyright'>
        &copy; 2023 Vinícius Eduardo, desenvolvido pela News API
      </p>

      <div className='footer__container'>
        <div className='footer__link-container'>
          <Link className='link footer__link' to='/'>
            Home
          </Link>
          <a
            className='link footer__link'
            href='https://tripleten.com/'
            target='_blank'
            rel='noreferrer'
          >
            TripleTen
          </a>
        </div>

        <div className='footer__icon-container'>
          <a
            href='https://github.com/anynoise00'
            target='_blank'
            rel='noreferrer'
            className='link footer__icon'
          >
            <img
              className='footer__icon-img'
              src={iconGithub}
              alt='Ícone do GitHub'
            />
          </a>
          <a
            href='https://www.linkedin.com/in/vinip-dev/'
            target='_blank'
            rel='noreferrer'
            className='link footer__icon'
          >
            <img
              className='footer__icon-img'
              src={iconLinkedin}
              alt='Ícone do LinkedIn'
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
