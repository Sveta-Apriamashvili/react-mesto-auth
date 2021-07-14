import React from 'react';
import success from '../images/success.svg';
import error from '../images/error.svg';

function InfoTooltip(props) {
    return (
        <div className={`pop-up pop-up_type_image ${props.isOpen ? 'pop-up_opened' : ''}`}>
            <div className="pop-up__container  pop-up__container_type_result-image">
                <button className="pop-up__close-button" type="button" aria-label="закрыть" onClick={props.onClose} ></button>
                <div className="pop-up__result">
                    <img src={props.isSuccess ? success : error} alt="#" className="pop-up__image" />
                    <div className="pop-up__text">
                        <p>{props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так!\nПопробуйте ещё раз.'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip