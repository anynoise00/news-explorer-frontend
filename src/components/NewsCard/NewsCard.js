import { useNavigate } from 'react-router-dom';
import NewsCardActionButton from '../NewsCardActionButton/NewsCardActionButton';
import NewsCardData from '../NewsCardData/NewsCardData';

import './NewsCard.css';

function NewsCard(props) {
  const navigate = useNavigate();

  function handleActionConfirm() {
    if (!props.loggedIn) {
      props.onLoginClick();
      return;
    }

    props.bookmarked
      ? navigate('/saved-news')
      : props.onSaveArticle(props.data);
  }

  return (
    <li className='news-card'>
      <NewsCardActionButton
        type={props.loggedIn && props.bookmarked ? 'marked' : 'bookmark'}
        message={
          props.loggedIn
            ? props.bookmarked
              ? 'Ver artigos salvos'
              : 'Salvar artigo'
            : 'Logue-se para salvar artigos'
        }
        onActionConfirm={handleActionConfirm}
      />

      <NewsCardData data={props.data} />
    </li>
  );
}

export default NewsCard;
