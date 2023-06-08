
import React, { useState } from "react";
import { Link } from "react-router-dom";
import yamafucka from "../images/RU.svg";
export default function Register(props) {
  //props.handleRegister - обработчик с APP
  //управляемые поля


  return (
    <div className="form">
      <a className="form__submit" href="https://oauth.yandex.ru/authorize?response_type=code&client_id=993f5bf56f544ddaaa7674d16497bca2&force_confirm=yes"><img src={yamafucka} alt="Войти с помощью Яндекс" /></a>
    </div>
  );
}
