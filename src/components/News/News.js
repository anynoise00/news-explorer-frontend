import NewsCardList from '../NewsCardList/NewsCardList';
import NewsCard from '../NewsCard/NewsCard';

import './News.css';
import { useContext, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function News(props) {
  const currentUser = useContext(CurrentUserContext);

  const initialArticlesQnt = 3;
  const [maxArticles, setMaxArticles] = useState(initialArticlesQnt);

  function showMoreArticles() {
    setMaxArticles(maxArticles + initialArticlesQnt);
  }

  return (
    <div className='section section_bg_grey news'>
      <h2 className='news__header'>Procurar resultados</h2>
      <NewsCardList>
        {props.articles.slice(0, maxArticles).map((article, i) => {
          return (
            <NewsCard
              key={`article-${i}`}
              data={article}
              bookmarked={currentUser.savedArticles.some(
                (a) => a.link === article.link
              )}
              loggedIn={props.loggedIn}
              onLoginClick={props.onLoginClick}
              onSaveArticle={props.onSaveArticle}
            />
          );
        })}
      </NewsCardList>
      {props.articles.length > maxArticles && (
        <input
          type='button'
          className='btn news__btn'
          value='Mostrar mais'
          onClick={showMoreArticles}
        />
      )}
    </div>
  );
}

export default News;
