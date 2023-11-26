import './NewsCardData.css';

function NewsCardData(props) {
  return (
    <>
      <a
        className='news-card__link'
        href={props.data.link}
        target='_blank'
        rel='noreferrer'
      >
        Ir para a notícia
      </a>
      <img
        className='news-card__image'
        src={props.data.image}
        alt={`Uma imagem representativa do artigo: ${props.data.title}`}
      />
      <div className='news-card__info-container'>
        <h4 className='news-card__date'>{props.data.date}</h4>
        <h2 className='news-card__header'>{props.data.title}</h2>
        <p className='news-card__description'>{props.data.text}</p>
        <h3 className='news-card__source'>{props.data.source}</h3>
      </div>
    </>
  );
}

export default NewsCardData;
