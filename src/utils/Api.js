class Api {
    constructor(basePath, token) {
      this._basePath = basePath;
      this._token = token;
    }
    _getHeaders() {
      return {
        "Content-type": "application/json",
        authorization: this._token,
      };
    }
    _getJson(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getCards() {
      return fetch(`${this._basePath}/cards`, {
        headers: this._getHeaders(),
      }).then(this._getJson);
    }
  
    createNewCard(item) {
      return fetch(`${this._basePath}/cards`, {
        method: "POST",
        headers: this._getHeaders(),
        body: JSON.stringify(item),
      }).then(this._getJson);
    }
  
    getCurrentUser() {
      return fetch(`${this._basePath}/users/me `, {
        headers: this._getHeaders(),
      }).then(this._getJson);
    }
    deleteCard(id) {
      return fetch(`${this._basePath}/cards/${id} `, {
        method: "DELETE",
        headers: this._getHeaders(),
      }).then(this._getJson);
    }
    createNewAvatar(data) {
      return fetch(`${this._basePath}/users/me/avatar`, {
        method: "PATCH",
        headers: this._getHeaders(),
        body: JSON.stringify({
          avatar: data.link,
        }),
      }).then(this._getJson);
    }

    getAllCardWhithUser() {
        return Promise.all([this.getCards(), this.getCurrentUser()]);
    }

    createNewProfile(data) {
      return fetch(`${this._basePath}/users/me`, {
        method: "PATCH",
        headers: this._getHeaders(),
        body: JSON.stringify({
          name: data.name,
          about: data.job,
        }),
      }).then(this._getJson);
    }
    putLike(id) {
      return fetch(`${this._basePath}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._getHeaders(),
      }).then(this._getJson);
    }
    deleteLike(id) {
      return fetch(`${this._basePath}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._getHeaders(),
      }).then(this._getJson);
    }
  }

  const api = new Api('https://mesto.nomoreparties.co/v1/cohort-61',
    '29be019e-c08f-4e81-b274-91fdbf94fa96');
  
    export default api;