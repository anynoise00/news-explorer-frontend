import NewsCardActionButton from '../NewsCardActionButton/NewsCardActionButton';
import NewsCardData from '../NewsCardData/NewsCardData';

import './SavedNewsCard.css';

function SavedNewsCard(props) {
  return (
    <li className='news-card'>
      <div className='news-card__category'>{props.data.keyword}</div>
      <NewsCardActionButton
        type='remove'
        message='Remover dos salvos'
        onActionConfirm={props.onRemoveSavedArticle}
      />

      <NewsCardData data={props.data} />
    </li>
  );
}

export default SavedNewsCard;
