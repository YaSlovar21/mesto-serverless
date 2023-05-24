class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    checkResponseIsOk(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(`Ошибка: ${response.status}`);
        }
    }
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            credentials: 'include',
        })
        .then((response) => {
            return this.checkResponseIsOk(response);
        })
    }

    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                title: name,
            }),
        })
        .then((response) => {
            return this.checkResponseIsOk(response);
        })
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                a: '12',    //ФИКТИВНОЕ ТЕЛО, ловится строчкой const req = context.getPayload();
            }),
          })
          .then((response) => {
            return this.checkResponseIsOk(response);
          });
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                a: '12',    //ФИКТИВНОЕ ТЕЛО, ловится строчкой const req = context.getPayload();
            }),
          }).then((response) => {
            return this.checkResponseIsOk(response);
          });
    }

    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                a: '12',    //ФИКТИВНОЕ ТЕЛО, ловится строчкой const req = context.getPayload();
            }),
          }).then((result) => {
            return this.checkResponseIsOk(result);
          });
    }

    changeLikeCardStatus(cardId, toState) {
        if (toState) {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: "PUT",
                headers: this._headers,
                credentials: 'include',
                body: JSON.stringify({
                    a: '12',    //ФИКТИВНОЕ ТЕЛО, ловится строчкой const req = context.getPayload();
                }),
              }).then((response) => {
                return this.checkResponseIsOk(response);
              });
        } else {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: "DELETE",
                headers: this._headers,
                credentials: 'include',
                body: JSON.stringify({
                    a: '12',    //ФИКТИВНОЕ ТЕЛО, ловится строчкой const req = context.getPayload();
                }),
              }).then((result) => {
                return this.checkResponseIsOk(result);
              });
        }
    }

    //аватар приходит данным методом
    getInfoUser(){
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            credentials: 'include',
        })
        .then((response) => {
            return this.checkResponseIsOk(response);
        });
    }

    setInfoUser(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about,
            }),
            credentials: 'include',
        })
        .then((response)=> {
            return this.checkResponseIsOk(response);
        });
    }

    //обновляем аватар данным методом
    updateProfileImage(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                avatar: link,
            }),
        })
        .then((response)=> {
            return this.checkResponseIsOk(response);
        });
    }

}

export default new Api({
    baseUrl: 'https://d5d11c4rja6fao88re26.apigw.yandexcloud.net',
    headers: {
      // authorization: '7ca5b34f-d430-4580-a7ad-8a26fa855204',
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer 2023haha'
    }
});

