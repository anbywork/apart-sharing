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
    // sliderList.addEventListener('touchstart', onStartSlider);
    // sliderList.addEventListener('mousedown', onStartSlider);
    const sliderLi = sliderList.querySelectorAll('li');
    for (let li of Array.from(sliderLi)) {
      li.addEventListener('touchstart', onStartSlider);
      li.addEventListener('mousedown', onStartSlider);
    }

    function onStartSlider(startEvt) {

      let startCoords = {};
      if (startEvt.type === 'touchstart') {
        startCoords.x = Math.floor(startEvt.touches[0].clientX);
        startCoords.y = Math.floor(startEvt.touches[0].clientY);
        if (startEvt.touches.length === 1) {
          document.addEventListener('touchmove', documentSliderMoveHandler);
          document.addEventListener('touchend', documentSliderEndHandler);
          document.addEventListener('mousemove', documentSliderMoveHandler);
          document.addEventListener('mouseup', documentSliderEndHandler);
        }
      } else {
        startEvt.preventDefault();
        startCoords.x = Math.floor(startEvt.clientX);
        startCoords.y = Math.floor(startEvt.clientY);
        document.addEventListener('touchmove', documentSliderMoveHandler);
        document.addEventListener('touchend', documentSliderEndHandler);
        document.addEventListener('mousemove', documentSliderMoveHandler);
        document.addEventListener('mouseup', documentSliderEndHandler);
      }
      let swipe = false;
      let direction = 'right';


      function documentSliderMoveHandler(moveEvt) {
        let shift = {};
        if (startEvt.type === 'touchstart') {
          shift.x = Math.floor(moveEvt.touches[0].clientX - startCoords.x);
          shift.y = Math.floor(moveEvt.touches[0].clientY - startCoords.y);
        } else {
          shift.x = Math.floor(moveEvt.clientX - startCoords.x);
          shift.y = Math.floor(moveEvt.clientY - startCoords.y);
        }
        // если смещение по горизонтали больше
        // чем смещение по вертикали, то это свайп
        if ((Math.abs(shift.y) < (Math.abs(shift.x)+20))) {
          if (Math.abs(shift.x) > 50) {
            swipe = true;
          }
          let currentPosition = +sliderList.getAttribute('data-offset');
          if (shift.x < 0) {
            direction = 'right';
          } else {
            direction = 'left';
          }
          currentPosition += shift.x;

          sliderList.style.transitionDuration = '0ms';
          sliderList.style.left = `${currentPosition}px`;
        }

      }

      function documentSliderEndHandler(endEvt) {
        sliderList.style.transitionDuration = '300ms';

        document.removeEventListener('touchmove', documentSliderMoveHandler);
        document.removeEventListener('touchend', documentSliderEndHandler);
        document.removeEventListener('mousemove', documentSliderMoveHandler);
        document.removeEventListener('mouseup', documentSliderEndHandler);

        if (swipe) {
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
