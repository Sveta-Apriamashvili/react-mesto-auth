import React from 'react';

function PopupWithForm(props) {

    return (

        <div className={`pop-up ${props.isOpen ? 'pop-up_opened' : ''} pop-up_type_${props.name}`} >
            <div className="pop-up__container">
                <button className="pop-up__close-button" type="button" aria-label="закрыть" onClick={props.onClose}></button>
                <h3 className="pop-up__title">{props.title}</h3>
                <form className="pop-up__admin" name={props.name} onSubmit={props.onSubmit} /*noValidate*/>
                    {props.children}
                    <button type="submit" className="pop-up__submit-button">Сохранить</button>
                </form>
            </div>
        </div>

    )
}


export default PopupWithForm