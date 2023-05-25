import React from 'react';

function ImagePopup(props) {
    return (
        <div className={`popup popup_darked popup-viewport ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button className="popup__button-close link-beauty" type="button" onClick={props.onClose}></button>    
                <div className="popup__image-view">
                    <img className="popup__image" alt="картинка под загрузку" src={`${props.card.imageUrl}`} />
                    <p className="popup__image-description">{props.card.title}</p>
                </div>
            </div>
        </div>
    );
}

export default ImagePopup;