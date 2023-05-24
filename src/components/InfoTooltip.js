import React from "react";
import success from "../images/success.svg";
import smtWrong from "../images/smtWrong.svg";

function InfoTooltip(props) {
  return (
    <div className={`popup popup_darked ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_info">
        <button
          className="popup__button-close link-beauty"
          type="button"
          onClick={props.onClose}
        />
        {props.success ? (
          <>
            <img src={success} className="popup__msg-img" />
            <p className="popup__title popup__title_type_auth">{props.successText}</p>
          </>
        ) : (
          <>
            <img src={smtWrong} className="popup__msg-img" />
            <p className="popup__title popup__title_type_auth">{props.errorText}</p>
          </>
        )}
        
      </div>
    </div>
  );
}

export default InfoTooltip;