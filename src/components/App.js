import { useState } from 'react';
import { useEffect } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';





function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})

  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [cards, setCards] = useState([])

  useEffect(()=>{
    api.getAllCardWhithUser()
    .then(([cards, user])=>{
        setUserName(user.name)
        setUserDescription(user.about)
        setUserAvatar(user.avatar)
        setCards(cards)
    })
    .catch((err) => {
      console.log(err)
  })
},[])
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
} 

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true)
    setSelectedCard(card)
}

function closeAllPopups() {
  if (isEditProfilePopupOpen) setIsEditProfilePopupOpen(false)
  if (isAddPlacePopupOpen) setIsAddPlacePopupOpen(false)
  if (isEditAvatarPopupOpen) setIsEditAvatarPopupOpen(false)
  if (isImagePopupOpen) setIsImagePopupOpen(false)
}


useEffect(() => {
  function handleEscClose(evt) {
    if (evt.key === "Escape") closeAllPopups();
  }
  document.addEventListener("keydown", handleEscClose);
  if (
    !isAddPlacePopupOpen &&
    !isEditProfilePopupOpen &&
    !isImagePopupOpen &&
    !isEditAvatarPopupOpen
  ) {
    console.log('dsasd');
    document.removeEventListener("keydown", handleEscClose);
  }
}, [
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  isEditAvatarPopupOpen,
  isImagePopupOpen,
]);
  
  return (
    
    <div className="App">
      <div className="container">
        <Header />
        <Main  onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} cards={cards} name={userName} description={userDescription} avatar={userAvatar} onCardClick={handleCardClick} />
        <Footer />
        <PopupWithForm onClose={closeAllPopups}  isOpen={isEditProfilePopupOpen}  name='edit' title='Редактировать профиль' button="Сохранить" >
          <input id="popup__name" className="popup__input popup__input_name" name="name" placeholder="Имя" type="text"  minLength="2" maxLength="40" required />
          <span className="popup__input-error popup__name-error"></span>
          <input id="popup__about" className="popup__input popup__input_about" name="job" placeholder="О себе" type="text"  minLength="2" maxLength="400" required />
          <span className="popup__input-error popup__about-error"></span>
          </PopupWithForm>
        <PopupWithForm onClose={closeAllPopups}  isOpen={isAddPlacePopupOpen}  name='add' title='Новое место' button="Создать">
          <input id="popup__poster" className="popup__input popup__input_title" name="name" placeholder="Название" type="text"  minLength="2" maxLength="30" required />
          <span className="popup__input-error popup__poster-error"></span>
          <input id="popup__url" className="popup__input popup__input_link" type="url" name="link" placeholder="Ссылка на картинку" required />
          <span className="popup__input-error popup__url-error"></span>
          </PopupWithForm>
        <PopupWithForm onClose={closeAllPopups}  isOpen={isEditAvatarPopupOpen}  name='avatar' title='Обновить аватар' button="Сохранить">
          <input id="popup__link" className="popup__input popup__input_link" name="link" placeholder="Ссылка на изображение" type="url" required />
          <span className="popup__input-error popup__link-error"></span>
          </PopupWithForm>
        <PopupWithForm onClose={closeAllPopups}   name='delete' title='Вы уверены?' button="Да" />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} isOpen={isImagePopupOpen}/>
      </div>
    </div>
  );
  
}
export default App;


