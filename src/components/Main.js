import addCardSvg from "../images/profile-plus.svg";

import React, { useContext } from "react";
import Card from "./Card";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  //..
  //Хук useEffect для получения данных о пользователе используем в App.js, там же записываем их в стейт и его передаем в провайдер созданного контекста
  //const [userName, setUserName] = React.useState('');   const [userDescription, setUserDescription ] = React.useState('');   const [userAvatar, setUserAvatar] = React.useState('');

  //Эффект по получению карточек тоже подняли в App

  return (
    <main>
      <section className="profile">
        <img
          className="profile__avatar"
          src={`https://avatars.yandex.net/get-yapic/${currentUser.default_avatar_id}/islands-200`}
          alt="Аватар пользователя"
        />
        <div
          className="profile__avatar-change-button"
          onClick={props.onEditAvatar}
        ></div>

        <div className="profile__info">
          <h1 className="profile__name">
            {"Имя пользователя" && currentUser.real_name}
          </h1>
          <button
            type="button"
            className="profile__edit-button link-beauty"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__about">
            {"Описание профиля" && currentUser.about}
          </p>
        </div>
        <button
          type="button"
          onClick={props.onAddPlace}
          className="profile__add-button link-beauty"
        >
          <img src={addCardSvg} alt="Добавить" />
        </button>
      </section>

      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
