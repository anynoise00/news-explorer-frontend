import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './SavedNewsHeader.css';

function SavedNewsHeader(props) {
  const currentUser = useContext(CurrentUserContext);

  function getKeywords() {
    const keywords = currentUser.savedArticles.map((a) => {
      return a.keyword;
    });

    if (keywords.length <= 0) return 'Nenhuma';

    const uniqueKeywords = [...new Set(keywords)];

    const keywordMessage =
      uniqueKeywords.length <= 3
        ? uniqueKeywords.join(', ')
        : uniqueKeywords.slice(0, 2).join(', ') +
          ` e ${uniqueKeywords.length - 2} outra(s)`;

    return keywordMessage;
  }

  return (
    <div className='section saved-news-header'>
      <h3 className='saved-news-header__subheader'>Artigos salvos</h3>
      <h2 className='saved-news-header__header'>
        {currentUser.name}, você tem {currentUser.savedArticles.length} artigos
        salvos
      </h2>
      <p className='saved-news-header__keywords'>
        Por palavras-chave: {getKeywords()}
      </p>
    </div>
  );
}

export default SavedNewsHeader;
