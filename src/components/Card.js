import React from "react";

import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

//вместо props можно исп. деструктуризацию (попробовать)
//function Card({ card, onCardClick, ... })
function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const { card } = props;
  
  function handleClick() {
    props.onCardClick(props.card); //<Card card={id:123, name:'rwer',....} onCardClick={функция обработчик, в которую мы передаем карточку} />
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  const isOwn = card.owner === currentUser.login;  /// _id заменено на login
  const cardDeleteButtonClassName = `elements__delete-button link-beauty link-beauty_type_like ${
    isOwn ? "elements__delete-button_visible" : "elements__delete-button_hidden"
  }`;

  
  const isLiked = JSON.parse(card.likes).some((i) => i === currentUser.login);  /// _id заменено на login
  const cardLikeButtonClassName = `elements__like link-beauty link-beauty_type_like ${
    isLiked ? "elements__like_liked" : ""
  }`;

  return (
    <div className="elements__item">
      <img
        className="elements__image"
        src={`${props.card.imageUrl}`}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="elements__footer">
        <h2 className="elements__heading">{props.card.title}</h2>
        <div className="elements__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="elements__likes">{JSON.parse(props.card.likes).length}</p>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
    </div>
  );
}

export default Card;
