import close from "../images/close.png"
function PopupWithForm(props){
    const popupClass = `popup  popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`;
    return(
        <>
        <div className={popupClass} >
            <div className="popup__container">
                <button onClick={props.onClose} className="popup__close" type="button"> <img className="popup__close-image" src={close} alt="кнопка закрытия формы" /></button>
                <form name="{props.name}" className={`popup__form popup__form_${props.name}`} noValidate>
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                    <button className="popup__save popup__save_edit" type="submit">{props.button}</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default PopupWithForm;