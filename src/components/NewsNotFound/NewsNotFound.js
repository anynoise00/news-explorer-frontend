import './NewsNotFound.css';

function NewsNotFound(props) {
  return (
    <div className='section info-section'>
      <div className='info-section__icon info-section__icon_type_not-found' />
      <h2 className='info-section__header'>Nada encontrado</h2>
      <h3 className='info-section__subheader'>
        Desculpe, mas não encontramos nada corresponde aos seus termos de
        pesquisa.
      </h3>
    </div>
  );
}

export default NewsNotFound;
