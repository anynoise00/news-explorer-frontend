import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsCard from '../SavedNewsCard/SavedNewsCard';

import './SavedNewsCardList.css';

function SavedNewsCardList(props) {
  return (
    <div className='section section_bg_grey saved-news-card-list'>
      <NewsCardList>
        {props.savedArticles.map((article, i) => {
          return (
            <SavedNewsCard
              key={`article-${i}`}
              data={article}
              onRemoveSavedArticle={() => props.onRemoveSavedArticle(article)}
            />
          );
        })}
      </NewsCardList>
    </div>
  );
}

export default SavedNewsCardList;
