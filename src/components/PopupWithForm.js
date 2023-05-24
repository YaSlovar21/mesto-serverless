import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup-${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__button-close link-beauty"
          type="button"
          onClick={props.onClose}
        ></button>

        <form
          className="popup__form"
          /*name="Card"*/ onSubmit={props.onSubmit}
          name={props.name}
        >
          <h2 className="popup__title">{props.title}</h2>

          {props.children}

          <button
            className="popup__button-save popup__button-save_type_card"
            type="submit"
          >
            {props.submitText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
