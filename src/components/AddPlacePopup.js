import React, { useEffect } from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  //стейты полей!!!
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  useEffect(() => {
    if (props.isOpen) {
      setName('');
      setLink('');
    }
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddCard(name, link);
  }

  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      submitText={props.buttonText}
    >
      <input
        value={name}
        onChange={handleNameChange}
        className="popup__input popup__input_type_place"
        id="place-name-input"
        type="text"
        placeholder="Название"
        name="name"
        minLength="1"
        maxLength="30"
        required
      />
      <span className="popup__input-error place-name-input-error"></span>
      <input
        value={link}
        onChange={handleLinkChange}
        className="popup__input popup__input_type_link"
        id="place-link-input"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
      />
      <span className="popup__input-error place-link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
