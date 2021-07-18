import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
// import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Api from '../utils/api';
import * as auth from '../utils/auth.js';

import '../index.css'
import ImagePopup from './ImagePopup';

import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import ProtectedRoute from './ProtectedRoute';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState();
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isRegistrationSuccessful, setIsRegistrationSuccessful] = React.useState(true);
    const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('')
    const history = useHistory();



    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard();
        setIsTooltipOpen(false);
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function handleUpdateUser(name, about) {
        Api.editUserInfo(name, about)
            .then(res => {
                setCurrentUser(res)
            })
            .then(closeAllPopups)
            .catch(() => console.log('error'))
    }

    function handleUpdateAvatar(link) {
        Api.updateAvatar(link)
            .then(res => {
                setCurrentUser(res)
            })
            .then(closeAllPopups)
            .catch(() => console.log('error'))
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        Api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(() => console.log('error'))
    }

    function handleCardDelete(card) {
        Api.deleteCard(card._id)
            .then((newCard) => setCards((cards) => cards.filter((c) => {
                if (c._id !== card._id) return newCard
            })))
            .catch(() => console.log('error'))
    }

    function handleAddPlaceSubmit(name, link) {
        Api.addNewCard(name, link)
            .then(newCard => {
                setCards([newCard, ...cards])
            })
            .then(closeAllPopups)
            .catch(() => console.log('error'))
    }

    function onLogin(email, password) {
        auth.login(email, password)
            .then(() => {
                setIsLoggedIn(true);
                history.push('/');

            })
            .catch(() => console.log('error'))
        updateUserEmail()
    }

    function onRegister(email, password) {
        auth.register(email, password)
            .then(() => {
                setIsRegistrationSuccessful(true);
                history.push('/sign-in');
            })
            .catch(() => setIsRegistrationSuccessful(false))
            .then(() => setIsTooltipOpen(true));
    }

    function updateUserEmail() {
        let token = localStorage.getItem('jwt')
        auth.checkToken(token)
            .then((res) => setUserEmail(res.data.email))
            .catch((err) => console.log(err))
    }

    function handleSignOut() {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false)
    }

    React.useEffect(() => {
        Api.getUserInfo()
            .then(res => {
                setCurrentUser(res)
            })
            .catch(() => console.log('error'))
    }, [])

    React.useEffect(() => {
        Api.getInitialCards()
            .then(res => {
                setCards(res)
            })
            .catch(() => console.log('error'))
    }, []

    )

    function onTokenCheck(token) {

        auth.checkToken(token)
            .then(res => {
                console.log(res.data)
                setIsLoggedIn(res.data != null)
                setUserEmail(res.data.email)
                history.push('/')
            })
            .catch(() => console.log('error'))

    }

    return (
        <div className="page__container">
            <CurrentUserContext.Provider value={currentUser}>
                <Header userEmail={userEmail} onSignOut={handleSignOut} />
                <Switch>

                    <Route path="/sign-up">
                        <Register
                            onRegister={onRegister}
                        />
                    </Route>
                    <Route path="/sign-in">
                        <Login
                            onLogin={onLogin}
                            onTokenCheck={onTokenCheck}
                        />
                    </Route>
                    <ProtectedRoute
                        exact path="/"
                        isLoggedIn={isLoggedIn}
                        component={Main}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    >
                    </ProtectedRoute>
                </Switch>
                <Footer />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                {/* <PopupWithForm title="Вы уверены?" name="remove-card">
                    <div className="pop-up__container">
                        <button className="pop-up__close-button" type="button" aria-label="закрыть"></button>
                        <h3 className=" pop-up__title">Вы уверены?</h3>
                        <button type="button" className="pop-up__submit-button">Да</button>
                    </div></PopupWithForm> */}
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                <InfoTooltip
                    isOpen={isTooltipOpen}
                    isSuccess={isRegistrationSuccessful}
                    onClose={closeAllPopups}
                />

            </CurrentUserContext.Provider>
        </div>

    );
}



export default App;
