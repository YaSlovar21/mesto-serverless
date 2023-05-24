import React from "react";

import PopupWithForm from "./PopupWithForm";

import { useContext } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  //стейты для управляемых элементов!
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  //подписываемся на контекст, после загрузки текущего пользователя из API, его данные будут использоваться в управляемых компонентах
  const currentUser = useContext(CurrentUserContext);

  //загружаем в локальные стейты данные из контекста (глобального стейта)
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);
  //привязывем эффект к глобальному контексту

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    //после отправки на сервер, мы получаем в ответ ОК и должны обновить currentUser из App, поэтому поднимаем данные
    props.onUpdateUser(name, description);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      submitText={props.buttonText}
    >
      <input
        value={name || ''}
        onChange={handleNameChange}
        className="popup__input popup__input_type_name"
        id="name-input"
        name="name"
        placeholder="Имя пользователя"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        value={description || ''}
        onChange={handleDescriptionChange}
        className="popup__input popup__input_type_about"
        id="about-input"
        name="about"
        placeholder="Описание профиля"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__input-error about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
