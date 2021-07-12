import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

    const avatar = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatar.current.value,
        });
    }

    return (
        <PopupWithForm title="Обновить аватар" name="edit-avatar" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} >
            <div className="pop-up__input-container">
                <input type="url" className="pop-up__item" id="avatar-image" name="about" placeholder="Ссылка на картинку"
                    required ref={avatar} />
                <span className="pop-up__error" id="avatar-image-error"></span>
            </div> </PopupWithForm>
    )
}

export default EditAvatarPopup