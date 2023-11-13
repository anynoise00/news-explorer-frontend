import './NewsCardList.css';

function NewsCardList(props) {
  return <ul className='news-card-list'>{props.children}</ul>;
}

export default NewsCardList;
