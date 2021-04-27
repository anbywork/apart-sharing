
const successMessage = 'Ваша заявка успешно отправлена. Мы&nbsp;свяжемся с&nbsp;вами в&nbsp;ближайшее время';
const errorMessage = 'Проверьте соединение с интернетом или попробуйте позже';

export const getSuccessPopup = (message= successMessage) => {
  const popupCode = `<div class="popup popup--success">
      <div class="popup__bg"></div>
      <div class="popup__content">
        <h2 class="popup__title">Заявка отправлена</h2>
        <p class="popup__message">${message}</p>
        <button class="popup__close-btn"><span class="visually-hidden">Закрыть</span></button>
      </div>
      
    </div>`;
  const element = document.createElement('div');
  element.innerHTML = popupCode;
  return element.querySelector('.popup');
}

export const getErrorPopup = (message = errorMessage) => {
  const popupCode = `<div class="popup popup--error">
    <div class="popup__bg"></div>
    <div class="popup__content">
      <h2 class="popup__title">Отправка не удалась</h2>
      <p class="popup__message">${message}</p>
      <button class="popup__button" type="button">Попробуйте еще раз</button>
      <button class="popup__close-btn"><span class="visually-hidden">Закрыть</span></button>
    </div>
  </div>`;
  const element = document.createElement('div');
  element.innerHTML = popupCode;
  return element.querySelector('.popup');
}

export const setPopup = () => {
  const popup = document.querySelector('.popup');
  const btnClose = popup.querySelector('.popup__close-btn');
  const popupBG = popup.querySelector('.popup__bg');

  btnClose.addEventListener('click', function() {
    popup.remove();
  });
  popupBG.addEventListener('click', function() {
    popup.remove();
  });
  document.addEventListener('keydown', onDocumentKeydown);
  function onDocumentKeydown (evt) {
    if (evt.key === 'Escape') {
      popup.remove();
    }
  }
  if (popup.classList.contains('popup--error')) {
    const popupBtn = popup.querySelector('.popup__button');
    popupBtn.addEventListener('click', function() {
      popup.remove();
    });
  }
}

