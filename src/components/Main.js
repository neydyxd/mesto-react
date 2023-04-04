import Card from "./Card";

function Main(props){
    return(
        <main>
            <section className="profile">
                <img className="profile__avatar"  src={props.avatar} alt="аватар профиля" />
                <button className="profile__avatar-button" onClick={props.onEditAvatar}></button>
                <div className="profile__info">
                    <div className="profile__flex">
                        <h1 className="profile__name">{props.name}</h1>
                        <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__about">{props.description}</p>   
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}>
                </button>
            </section>
            <section className="poster">
                {props.cards.map((card) => (
                        <Card  key={card.createdAt}
                               card={card}
                               onCardClick={props.onCardClick}/>
                    ))}
            </section>
        </main>
    )
};


export default Main;