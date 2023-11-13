import NewsCardActionButton from '../NewsCardActionButton/NewsCardActionButton';
import NewsCardData from '../NewsCardData/NewsCardData';

import './NewsCard.css';

function NewsCard(props) {
  function handleActionConfirm() {
    if (!props.loggedIn) {
      props.onLoginClick();
      return;
    }

    props.bookmarked
      ? props.onRemoveSavedArticle(props.data)
      : props.onSaveArticle(props.data);
  }

  return (
    <li className='news-card'>
      <NewsCardActionButton
        type={props.loggedIn && props.bookmarked ? 'marked' : 'bookmark'}
        message={
          props.loggedIn
            ? props.bookmarked
              ? 'Remove from saved'
              : 'Save article'
            : 'Sign in to save articles'
        }
        onActionConfirm={handleActionConfirm}
      />

      <NewsCardData data={props.data} />
    </li>
  );
}

export default NewsCard;
