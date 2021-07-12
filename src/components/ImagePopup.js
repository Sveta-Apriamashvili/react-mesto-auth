import React from 'react';

function ImagePopup(props) {


    return (
        <div className={`pop-up pop-up_type_image ${props.card ? 'pop-up_opened' : ''}`}>
            <div className="pop-up__container pop-up__container_type_image">
                <button className="pop-up__close-button" type="button" aria-label="закрыть" onClick={props.onClose}></button>
                <figure className="pop-up__figure">
                    <img src={props.card ? props.card.link : '#'} alt={props.card ? props.card.name : '#'} className="pop-up__image" />
                    <figcaption className="pop-up__image-caption">{props.card ? props.card.name : '#'}</figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup