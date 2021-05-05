export const setSlider = (slider) => {
  const sliderListContainer = slider.querySelector('.slider__list-container');
  const sliderList = slider.querySelector('.slider__list');
  const controlList = slider.querySelectorAll('.slider__controls label');
  let currentSlide = 0;

  for (let i = 0; i < controlList.length; i++) {
    const control = controlList[i];
    control.addEventListener('click', (evt) => {
      changeSlide(i);
    });
  }

  if (slider.classList.contains('slider--swiper')) {
    const sliderLi = sliderList.querySelectorAll('li');
    for (let li of Array.from(sliderLi)) {
      li.addEventListener('touchstart', onStartSlider, {passive: false});
      li.addEventListener('mousedown', onStartSlider);
    }

    function onStartSlider(startEvt) {
      let startCoords = {};
      let shift = {};
      startEvt.preventDefault();
      if (startEvt.type === 'touchstart') {
        startCoords.x = Math.floor(startEvt.touches[0].clientX);
        startCoords.y = Math.floor(startEvt.touches[0].clientY);
        if (startEvt.touches.length === 1) {
          document.addEventListener('touchmove', documentSliderMoveHandler, {passive: false});
          document.addEventListener('touchend', documentSliderEndHandler, {passive: false});
          document.addEventListener('mousemove', documentSliderMoveHandler);
          document.addEventListener('mouseup', documentSliderEndHandler);
        }
      } else {
        startCoords.x = Math.floor(startEvt.clientX);
        startCoords.y = Math.floor(startEvt.clientY);
        document.addEventListener('touchmove', documentSliderMoveHandler, {passive: false});
        document.addEventListener('touchend', documentSliderEndHandler, {passive: false});
        document.addEventListener('mousemove', documentSliderMoveHandler);
        document.addEventListener('mouseup', documentSliderEndHandler);
      }
      startCoords.topPosition = window.scrollY;

      let swipe = false;
      let direction = 'right';
      sliderList.style.transitionDuration = '0ms';

      function documentSliderMoveHandler(moveEvt) {

        if (moveEvt.type === 'touchmove') {
          shift.x = Math.floor(moveEvt.touches[0].clientX - startCoords.x);
          shift.y = Math.floor(moveEvt.touches[0].clientY - startCoords.y);
        } else {
          shift.x = Math.floor(moveEvt.clientX - startCoords.x);
          shift.y = Math.floor(moveEvt.clientY - startCoords.y);
        }



        // если смещение по горизонтали больше
        // чем смещение по вертикали, то это свайп
        if (Math.abs(shift.x) - Math.abs(shift.y) > 30 && Math.abs(shift.x) > 30) {
          moveEvt.preventDefault();
          swipe = true;
        } else {
          swipe = false;
        }
        let currentPosition = +sliderList.getAttribute('data-offset');
        if (shift.x < 0) {
          direction = 'right';
        } else {
          direction = 'left';
        }
        currentPosition += shift.x;

        sliderList.style.left = `${currentPosition}px`;
      }

      function documentSliderEndHandler(endEvt) {
        sliderList.style.transitionDuration = '300ms';

        document.removeEventListener('touchmove', documentSliderMoveHandler);
        document.removeEventListener('touchend', documentSliderEndHandler);
        document.removeEventListener('mousemove', documentSliderMoveHandler);
        document.removeEventListener('mouseup', documentSliderEndHandler);

        if (swipe) {
          endEvt.preventDefault();
          window.scrollY = startCoords.topPosition;
          let newSlideNumber;
          if (direction === 'right') {
            newSlideNumber = (currentSlide + 1) < (controlList.length) ? (currentSlide + 1) : 0;
          } else {
            newSlideNumber = (currentSlide - 1) < 0 ? (controlList.length - 1) : (currentSlide - 1);

          }
          changeSlide(newSlideNumber);
        } else {
          changeSlide(currentSlide);
        }
      }
    }
  }

  function changeSlide(slide) {
    sliderList.style.transitionDuration = '300ms';
    const widthSlide = sliderListContainer.offsetWidth;
    const offset = - slide * widthSlide;
    sliderList.style.left = `${offset}px`;
    sliderList.setAttribute('data-offset', `${offset}`);
    currentSlide = slide;
    controlList[slide].querySelector('input').checked = true;
    setTimeout(function () {
      sliderList.style.transitionDuration = '0ms';
    }, 300);
  }
}
