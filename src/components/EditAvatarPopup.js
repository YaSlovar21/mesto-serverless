//Компонент находится в App.js

import React, { useEffect } from "react";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  //Контекстом вставить текущую ссылку?????????
  //const currentUser = useContext(CurrentUserContext);

  //в EditProfilePopup использовались управляемые компоненты, здесь используем реф
  const avatarLink = React.useRef();

  useEffect(() => {
    if (props.isOpen) {
      avatarLink.current.value = "";
    }
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar(avatarLink.current.value);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      submitText={props.buttonText}
    >
      <input
        ref={avatarLink}
        className="popup__input popup__input_type_avatar"
        id="avatar-link-input"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        required
      />
      <span className="popup__input-error avatar-link-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
