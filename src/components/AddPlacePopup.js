import React from 'react';
import PopupWithForm from './PopupWithForm';


function AddPlacePopup(props) {

    const name = React.useRef(0);
    const image = React.useRef(1);

    function handleSubmit(e) {
        e.preventDefault();

       props.onAddPlace({
        name: name.current.value,
        link: image.current.value

    })
    }
    
    return (
        <PopupWithForm title="Новое место" name="add-element" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <div className="pop-up__input-container">
                <input type="text" className="pop-up__item" id="cardname" name="name" placeholder="Название"
                    minLength="2" maxLength="200" required ref={name} />
                <span className="pop-up__error" id="cardname-error"></span>
                <input type="url" className="pop-up__item" id="image" name="about" placeholder="Ссылка на картинку"
                    required ref={image} />
                <span className="pop-up__error" id="image-error"></span>
            </div></PopupWithForm>
    )
}

export default AddPlacePopup