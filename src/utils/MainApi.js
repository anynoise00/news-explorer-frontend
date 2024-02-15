import { checkResponse, getAuthorization } from './helpers';

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  login({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(checkResponse);
  }

  register({ email, password, name }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    }).then(checkResponse);
  }

  getCurrentUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: getAuthorization(),
      },
    }).then(checkResponse);
  }

  getSavedArticles() {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: getAuthorization(),
      },
    }).then(checkResponse);
  }

  saveArticle(article) {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: getAuthorization(),
      },
      body: JSON.stringify(article),
    }).then(checkResponse);
  }

  deleteArticle(id) {
    return fetch(`${this._baseUrl}/articles/${id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: getAuthorization(),
      },
    }).then(checkResponse);
  }
}

const mainApi = new MainApi({
  baseUrl: `https://api-newsexplorer.anynoise.dev`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
