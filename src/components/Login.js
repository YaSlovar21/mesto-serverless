
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Login(props) {
  //props.handleRegister - обработчик с APP
  //управляемые поля
  
  const [respCode, setRespCode] = React.useState('');

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search) // id=123
    setRespCode(params.get('code'));
  }, [])


  React.useEffect(() => {
    props.handleLogin(respCode);
  }, [respCode])

  console.log('Код от яндекса', respCode)
  



  function handleCodeChange(evt) {
    setRespCode(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleLogin(respCode);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__heading">Заходим...</h2>      
    </form>
  );
}