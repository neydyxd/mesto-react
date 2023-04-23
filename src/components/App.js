import { useState } from 'react';
import { useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup.jsx'
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup";





function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [cards, setCards] = useState([])
  const [isLoadingUpdateUser, setIsLoadingUpdateUser] = useState(false)

  useEffect(() => {
    api.getCards()
        .then((res) => {
            setCards(res)
        })
        .catch((err) => {
            console.log(err)
        })
}, [])



  const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '' })

    useEffect(() => {
        api.getCurrentUser()
            .then((user) => {
                setCurrentUser(user)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    function handleCardLike(card) {
      const isLiked = card.likes.some(i => i._id === currentUser._id)
      api.changeLikeCardStatus(card._id, isLiked)
          .then((newCard) => {
              setCards((cards) => cards.map(c => c._id === card._id ? newCard : c))
          })
          .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleUpdateUser(data) {
    console.log('dssd');
    setIsLoadingUpdateUser(true)
    api.createNewProfile(data.name, data.about)
        .then((newUser) => {
            setCurrentUser(newUser)
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
           
        })
}

function handleUpdateAvatar(data) {
  api
    .createNewAvatar(data.avatar)
    .then((newAvatar) => {
      setCurrentUser(newAvatar);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    });
}

function handleAddCard(card) {
  console.log('dssd');
  console.log(card);
  api
    .createNewCard({item: card})
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    });
}
  
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
      <CurrentUserContext.Provider value={currentUser}>
      <div className="container">
        <Header />
        <Main onCardDelete={handleCardDelete} onCardLike={handleCardLike} setCards={setCards}  onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} cards={cards}  onCardClick={handleCardClick} />
        <Footer />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddCard} />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} isOpen={isImagePopupOpen}/>
      </div>
      </CurrentUserContext.Provider>
    </div>
  );
  
}
export default App;


