import './About.css';

import authorPhoto from '../../images/author-photo.jpg';

function About(props) {
  return (
    <div className='section about'>
      <img
        className='about__image'
        src={authorPhoto}
        alt='Uma fotografia do autor do site'
      />
      <div className='about__info'>
        <h3 className='about__header'>Sobre o autor</h3>
        <p className='about__text'>
          Olá! Me chamo Vinícius, e acabo de me tornar um desenvolvedor web
          full-stack com ajuda do bootcamp de desenvolvimento web da TripleTen.
        </p>
        <p className='about__text'>
          Desde o ano passado venho desenvolvendo minhas habilidades como um
          desenvolvedor front end estudando tecnologias como React, JavaScript,
          HTML e CSS, e também venho aprimoorando meu conhecimento de back end
          estudando banco de dados, Express.js e APIs REST.
        </p>
        <p className='about__text'>
          Esse website foi feito como o projeto final do bootcamp da TripleTen,
          onde apliquei tudo que aprendi ao longo do ano de 2023.
        </p>
      </div>
    </div>
  );
}

export default About;
