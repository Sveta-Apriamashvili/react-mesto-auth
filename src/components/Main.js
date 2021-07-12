import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main(props) {

    const [isMouseOverAvatar, setIsMouseOverAvatar] = React.useState(false)
    const currentUser = React.useContext(CurrentUserContext);


    function handleMouseEnter() {
        setIsMouseOverAvatar(true);
    }

    function handleMouseLeave() {
        setIsMouseOverAvatar(false);
    }

    return (
        <main className="content">
            <section className="profile">
                <div className="profile-info">
                    <img className="profile-info__avatar" src={currentUser.avatar} alt="аватарка" onMouseEnter={handleMouseEnter} />
                    <button className={`profile-info__edit-avatar ${isMouseOverAvatar ? 'profile-info__edit-avatar_active' : ''}`} type="button" aria-label="редактировать" onClick={props.onEditAvatar} onMouseLeave={handleMouseLeave}></button>
                    <div className="profile-info__info">
                        <h1 className="profile-info__name">{currentUser.name}</h1>
                        <p className="profile-info__about">{currentUser.about}</p>
                    </div>
                    <button className="profile-info__edit-button" type="button" aria-label="редактировать" onClick={props.onEditProfile}></button>
                </div>
                <button className="profile__add-button" type="button" aria-label="добавить" onClick={props.onAddPlace}></button>
            </section>
            <section className="photo-grid">
                <ul className="photo-grid__list">
                    {
                        props.cards.map((item) => {
                            return (

                                <Card key={item._id} card={item} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
                            )

                        })
                    }
                </ul>
            </section>
        </main>
    )

}

export default Main