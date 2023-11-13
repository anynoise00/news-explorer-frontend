import NewsCardList from '../NewsCardList/NewsCardList';
import NewsCard from '../NewsCard/NewsCard';

import './News.css';
import { useState } from 'react';

function News(props) {
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
              bookmarked={props.savedArticles.some(
                (a) => a.url === article.url
              )}
              loggedIn={props.loggedIn}
              onLoginClick={props.onLoginClick}
              onSaveArticle={props.onSaveArticle}
              onRemoveSavedArticle={props.onRemoveSavedArticle}
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
