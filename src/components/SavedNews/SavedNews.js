import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import SavedNewsCardList from '../SavedNewsCardList/SavedNewsCardList';

function SavedNews(props) {
  return (
    <>
      <SavedNewsHeader {...props} />
      <SavedNewsCardList {...props} />
    </>
  );
}

export default SavedNews;
