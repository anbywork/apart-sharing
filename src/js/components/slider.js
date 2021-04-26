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
    sliderList.addEventListener('touchstart', onTouchStartSlider);
    function onTouchStartSlider(touchStartEvt) {
      let startCoords = {
        x: Math.floor(touchStartEvt.touches[0].clientX),
        y: Math.floor(touchStartEvt.touches[0].clientY)
      }
      let swipe = false;
      let direction = 'right';
      if (touchStartEvt.touches.length === 1) {
        document.addEventListener('touchmove', documentTouchMoveHandler);
        document.addEventListener('touchend', documentTouchEndHandler);
      }

      function documentTouchMoveHandler(moveEvt) {
        let shift = {
          x: Math.floor(moveEvt.touches[0].clientX - startCoords.x),
          y: Math.floor(moveEvt.touches[0].clientY - startCoords.y),
        };
        // если смещение по горизонтали больше
        // чем смещение по вертикали, то это свайп
        if ((Math.abs(shift.y) < (Math.abs(shift.x)+20))) {
          if (Math.abs(shift.x) > 50) {
            swipe = true;
          }
          let currentPosition = +sliderList.getAttribute('data-offset');
          if (shift.x < 0) {
            direction = 'right';
            currentPosition += shift.x;
          } else {
            direction = 'left';

            currentPosition += shift.x;
          }

          sliderList.style.transitionDuration = '0ms';
          sliderList.style.left = `${currentPosition}px`;
          console.log(sliderList.style.transitionDuration);
        }

      }

      function documentTouchEndHandler() {
        sliderList.style.transitionDuration = '300ms';

        document.removeEventListener('touchmove', documentTouchMoveHandler);
        document.removeEventListener('touchend', documentTouchEndHandler);

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
