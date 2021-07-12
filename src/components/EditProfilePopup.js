import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    React.useEffect(() => {
        setName(currentUser ? currentUser.name : '');
        setDescription(currentUser ? currentUser.about : '');
    }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm title="Редактировать профиль" name="edit" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <div className="pop-up__input-container">
                <input type="text" className="pop-up__item" id="name" name="name" placeholder="Имя" minLength="2"
                    maxLength="40" required onChange={handleChangeName} value={name || ''} />
                <span className="pop-up__error" id="name-error"></span>
                <input type="text" className="pop-up__item" id="about" name="about" placeholder="О себе"
                    minLength="2" maxLength="200" required onChange={handleChangeDescription}  value={description || ''}
                    />
                <span className="pop-up__error" id="about-error"></span>
            </div>
        </PopupWithForm>
    )

}

export default EditProfilePopup