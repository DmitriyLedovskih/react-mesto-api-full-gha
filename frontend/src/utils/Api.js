// Класс Api для подключения к серверу
class Api {
  constructor(options) {
    this._options = options;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  // Метод для получения карточек
  getInitialCards() {
    return this._request(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
      credentials: 'include',
    });
  }

  // Метод для получения данных пользователя
  getProfileInfo() {
    return this._request(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
      credentials: 'include',
    });
  }

  // Метод для изменея данных пользователя
  profileEdit(inputData) {
    return this._request(`${this._options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._options.headers,
      credentials: 'include',
      body: JSON.stringify({
        name: inputData.name,
        about: inputData.about,
      }),
    });
  }

  // Метод для добавления карточек
  addCard(cardData) {
    return this._request(`${this._options.baseUrl}/cards`, {
      method: "POST",
      headers: this._options.headers,
      credentials: 'include',
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    });
  }

  // Метод для удаление карточек
  deleteCard(id) {
    return this._request(`${this._options.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._options.headers,
      credentials: 'include',
    });
  }

  // Метод для измения аватара
  editAvatar(avatarData) {
    return this._request(`${this._options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._options.headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: avatarData.avatar,
      }),
    });
  }

  // Метод для добавления лайков
  handleLikeCard(id) {
    return this._request(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._options.headers,
      credentials: 'include',
    });
  }

  // Метод для удаления лайков
  deleteLikeCard(id) {
    return this._request(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._options.headers,
      credentials: 'include',
    });
  }
}

const api = new Api({
  baseUrl: "https://api.mesto.dmitryledovskih.nomoredomains.monster",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
