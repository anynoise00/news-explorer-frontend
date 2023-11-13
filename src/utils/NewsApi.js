import { checkResponse } from './helpers';

const REACT_APP_NEWS_KEY = process.env.REACT_APP_NEWS_KEY;

class NewsApi {
  getNews(query) {
    const currentDate = new Date();
    const lastWeekDate = new Date(
      currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
    );

    return fetch(
      `https://nomoreparties.co/news/v2/everything?q=${query}&apiKey=${REACT_APP_NEWS_KEY}&from=${lastWeekDate}&to=${currentDate}&pageSize=${100}`,
      {
        method: 'GET',
      }
    ).then(checkResponse);
  }
}

const newsApi = new NewsApi();

export default newsApi;
