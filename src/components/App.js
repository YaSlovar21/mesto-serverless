import React from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import { Route, Switch, useHistory, withRouter } from "react-router-dom";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import { login, register, checkToken, logout } from "../utils/auth";

import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [isCardPopupOpen, setIsCardPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({}); //стейт с информацией о текущем пользователе
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [userCards, setUserCards] = React.useState([]);

  const [isFetching, setIsFetching] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    Promise.all([
      api.getInfoUser(), 
      api.getInitialCards()
    ])
    .then(([userData, cards]) => {
      //До использования контекста: setUserName(response.name); setUserDescription(response.about); setUserAvatar(response.avatar)
      setCurrentUser(userData);
      setUserCards(cards);
      console.log(cards);
      console.log(userData);
    })
    .catch((err) => console.log(err));
  }, [loggedIn]); //[] - отсутствие зависимостей (эффект вызывается только при монтировании)


  function handleCardLike(card) {
    const isLiked = JSON.parse(card.likes).some((i) => i === currentUser.login);
    api
      .changeLikeCardStatus(card.id, !isLiked)
      .then((newCard) => {
        console.log(newCard)
        setUserCards((userCards) => {
          return userCards.map((c) => (c.id === card.id ? newCard : c));
        });
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    /*api
      .deleteCard(card.id)
      .then(() => {
        setUserCards((userCards) => {
          return userCards.filter((c) => c.id !== card.id);
        });
      })
      .catch((err) => console.log(err));*/
      
  }

  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsCardPopupOpen(true);
  }

  //пробрасывается в компонент Main: onCardClick={handleCardClick}
  //В Main пробрасывается в Card:
  //<Card key={card._id} card={card} onCardClick={props.onCardClick} />
  //На карточке висит onClick={handleClick}, handleClick() - запускает onCardClick c данными карточки
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  //на самом деле обработчик удаления карточки
  function handleUpdateUser(card) {
    //обрабочик <EditProfilePopup.. onUpdateUser=... />   (Новые данные поднимаются из дочернего popupwithForm, где происходит сабмит)
 //   setIsFetching(true);
 //   api.setInfoUser(name, desc).then((userData) => {
  //      setCurrentUser(userData);
  //      closeAllPopups();
 //     }).catch((err) => console.log(err))
 //     .finally(()=> {
  //      setIsFetching(false);
 //     });
 // }
   api
    .deleteCard(card.id)
    .then(() => {
      setUserCards((userCards) => {
        return userCards.filter((c) => c.id !== card.id);
      });
    })
    .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(link) {
    //обработчик компонента  <EditAvatarPopup ...  onUpdateAvatar= .... />
    setIsFetching(true);
    api
      .updateProfileImage(link)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(()=> {
        setIsFetching(false);
      })
  }

  function handleAddPlace(name, link) {
    //обработчик компонента <AddPlacePopup ... onAddCard= ... />
    setIsFetching(true);
    api
      .addCard(name, link)
      .then((newCard) => {
        console.log(newCard);
        setUserCards([newCard, ...userCards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(()=> {
        setIsFetching(false);
      });
  }

  function closeAllPopups() {
    setIsAvatarPopupOpen(false);
    setIsProfilePopupOpen(false);
    setIsCardPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);

    setSelectedCard({});
    setIsImagePopupOpen(false);
  }

  //handleLogin
  //handleRegister
  //спускаем через пропсы в компоненты Login и Register

  const [isSuccessRegistration, setIsSuccessRegistration] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
 
  React.useEffect(() => {
      checkToken()
        .then((res) => {
          console.log(res);
          setLoggedIn(true);
          setUserEmail(res.login);
          history.push("/");
        })
        .catch((err) => 
          console.log(err)
        );
  }, []); 

  function handleLogin(code) {
    login(code)
      .then((res) => {
        setLoggedIn(true);
        
        history.push("/");
        setUserEmail(res.login);
        console.log(res);
      })
      .catch((err) => {
        setIsSuccessRegistration(false);
        setIsInfoTooltipOpen(true);
        console.log(err);
      });
  }

  function handleSignOut() {
    logout()
      .then(() => {
        history.push("/sign-in-ya");
        setLoggedIn(false);
      })
      .catch(err => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        userEmail={userEmail}
        handleSignOutClick={handleSignOut}
      />
      <Switch>
        <Route exact path="/">
          <ProtectedRoute
            path="/"
            component={Main}
            loggedIn={loggedIn}
            cards={userCards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
          />
          <Footer />
        </Route>

        <Route path="/sign-in">
          <Login handleLogin={handleLogin} />
        </Route>
        <Route path="/sign-in-ya">
          <Register />
        </Route>
      </Switch>

      <EditProfilePopup
        isOpen={isProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser /*на самом деле удаление карточки*/}
        buttonText={isFetching ? "Удаление..." : "Да"}
      />

      <AddPlacePopup
        isOpen={isCardPopupOpen}
        onClose={closeAllPopups}
        onAddCard={handleAddPlace}
        buttonText={isFetching ? "Добавление..." : "Добавить"}
      />
      
      <EditAvatarPopup
        isOpen={isAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        buttonText={isFetching ? "Сохранение..." : "Lf"}
      />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />

      <PopupWithForm
        name="confirmation"
        title="Вы уверены?"
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
      />


    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
