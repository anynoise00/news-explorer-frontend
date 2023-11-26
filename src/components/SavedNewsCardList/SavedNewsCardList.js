import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsCard from '../SavedNewsCard/SavedNewsCard';

import './SavedNewsCardList.css';

function SavedNewsCardList(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className='section section_bg_grey saved-news-card-list'>
      <NewsCardList>
        {currentUser.savedArticles.map((article, i) => {
          return (
            <SavedNewsCard
              key={`article-${i}`}
              data={article}
              onRemoveSavedArticle={() =>
                props.onRemoveSavedArticle(article._id)
              }
            />
          );
        })}
      </NewsCardList>
    </div>
  );
}

export default SavedNewsCardList;
