import deleteIcon from "../images/delete.svg"

function Card(props){
    function handleClick() {
        props.onCardClick(props.card);
      } 
    return(
        <div className="poster__item">
                <img className="poster__delete-button" src={deleteIcon} alt="кнопка удаления " />
                <button type="button"  className="poster__photo-button" onClick={handleClick}><img className="poster__photo" src={props.card.link} alt={props.card.name} /></button>
                <div className="poster__info">
                    <h2 className="poster__title">{props.card.name}</h2>
                    <div className="poster__like-group">
                        <button type="button" className="poster__like-button"></button>
                        <p className="poster__like-number"></p>
                    </div>
                </div>
            </div>
    )
}

export default Card;