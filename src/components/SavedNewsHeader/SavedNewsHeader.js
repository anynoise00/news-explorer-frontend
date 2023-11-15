import './SavedNewsHeader.css';

function SavedNewsHeader(props) {
  function getKeywords() {
    const keywords = props.savedArticles.map((a) => {
      return a.category;
    });

    if (keywords.length <= 0) return 'Nenhuma';

    let uniqueKeywords = [...new Set(keywords)];
    uniqueKeywords =
      uniqueKeywords.slice(0, 2).join(', ') +
      (uniqueKeywords.length - 2 > 0
        ? ` e ${uniqueKeywords.length - 2} outras`
        : '');

    return uniqueKeywords;
  }

  return (
    <div className='section saved-news-header'>
      <h3 className='saved-news-header__subheader'>Artigos salvos</h3>
      <h2 className='saved-news-header__header'>
        Usuário, você tem {props.savedArticles.length} artigos salvos
      </h2>
      <p className='saved-news-header__keywords'>
        Por palavras-chave: {getKeywords()}
      </p>
    </div>
  );
}

export default SavedNewsHeader;
