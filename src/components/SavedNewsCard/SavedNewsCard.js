import NewsCardActionButton from '../NewsCardActionButton/NewsCardActionButton';
import NewsCardData from '../NewsCardData/NewsCardData';

import './SavedNewsCard.css';

function SavedNewsCard(props) {
  return (
    <li className='news-card'>
      <div className='news-card__category'>{props.data.category}</div>
      <NewsCardActionButton
        type='remove'
        message='Remove from saved'
        onActionConfirm={props.onRemoveSavedArticle}
      />

      <NewsCardData data={props.data} />
    </li>
  );
}

export default SavedNewsCard;
