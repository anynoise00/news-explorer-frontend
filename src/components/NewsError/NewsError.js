import './NewsError.css';

function NewsError(props) {
  return (
    <div className='section info-section'>
      <div className='info-section__icon info-section__icon_type_not-found' />
      <h2 className='info-section__header'>
        {' '}
        Desculpe, algo deu errado durante a solicitação
      </h2>
      <h3 className='info-section__subheader'>
        Pode haver um problema de conexão ou o servidor pode estar inativo. Por
        favor, tente novamente mais tarde.
      </h3>
    </div>
  );
}

export default NewsError;
