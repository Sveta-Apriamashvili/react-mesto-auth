import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
    }

    const currentUser = React.useContext(CurrentUserContext);

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    const isOwn = props.card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `element__bin ${isOwn ? 'element__bin_active' : ''}`
    );

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (`element__like ${isLiked ? 'element__like_active' : ''}`);

    return (

        <li className="element">
            <button className={cardDeleteButtonClassName} type="button" aria-label="удалить" onClick={handleDeleteClick}></button>
            <img className="element__image" src={props.card.link} alt="" onClick={handleClick} />
            <div className="element__text-container">
                <h3 className="element__title">{props.card.name}</h3>
                <button className={cardLikeButtonClassName} type="button" aria-label="нравится" onClick={handleLikeClick} >{props.card.likes.length}</button>
            </div>
        </li>
    )
}

export default Card