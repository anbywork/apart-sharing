export const setSlider = (slider) => {
  const sliderListContainer = slider.querySelector('.slider__list-container');
  const sliderList = slider.querySelector('.slider__list');
  const controlList = slider.querySelectorAll('.slider__controls label');

  for (let i = 0; i < controlList.length; i++) {
    const control = controlList[i];
    control.addEventListener('click', (evt) => {
      changeSlide(i);
    });
  }

  function changeSlide(slide) {
    const widthSlide = sliderListContainer.offsetWidth;
    const offset = - slide * widthSlide;
    sliderList.style.transform = `translateX(${offset}px)`;
    sliderList.setAttribute('data-offset', `${offset}`);
  }

  // todo: при свайпе слайдера меняется контрол
  // slider.addEventListener('touchstart', onTouchStartSlider);

  // function onTouchStartSlider(touchStartEvt) {
  //   let startCoords = {
  //     x: Math.floor(touchStartEvt.touches[0].clientX),
  //     y: Math.floor(touchStartEvt.touches[0].clientY)
  //   }
  //   let swipe = false;
  //   let direction = 'right';
  //   if (touchStartEvt.touches.length === 1) {
  //     if (!touchStartEvt.target.classList.contains('btn')) {
  //       document.addEventListener('touchmove', documentTouchMoveHandler);
  //       document.addEventListener('touchend', documentTouchEndHandler);
  //     }
  //   }
  //
  //   function documentTouchMoveHandler(moveEvt) {
  //     moveEvt.preventDefault();
  //     let shift = {
  //       x: Math.floor(moveEvt.touches[0].clientX - startCoords.x),
  //       y: Math.floor(moveEvt.touches[0].clientY - startCoords.y),
  //     };
  //     // если смещение по горизонтали больше
  //     // чем смещение по вертикали, то это свайп
  //     if ((Math.abs(shift.y) < (Math.abs(shift.x)+20))) {
  //       if (Math.abs(shift.x) > 50) {
  //         swipe = true;
  //       }
  //       let relativePosition = slider.getAttribute('offset') + shift.x;
  //       sliderList.style.transitionDuration = '0ms';
  //       sliderList.style.transform = `translateX(${relativePosition}px)`;
  //     }
  //     if (shift.x < 0) {
  //       direction = 'right';
  //     } else {
  //       direction = 'left';
  //     }
  //   }
  //
  //   function documentTouchEndHandler(touchEndEvt) {
  //     sliderList.style.transitionDuration = '300ms';
  //
  //     document.removeEventListener('touchmove', documentTouchMoveHandler);
  //     document.removeEventListener('touchend', documentTouchEndHandler);
  //
  //     if (swipe) {
  //       const offset = slider.getAttribute()
  //       let newOffset;
  //       if (direction === 'right') {
  //         newSlide = slider.activeSlide.nextElementSibling;
  //       } else {
  //         newSlide = slider.activeSlide.previousElementSibling;
  //       }
  //       if (newSlide) {
  //         newSlide.classList.add('slide--active');
  //         slider.activeSlide = newSlide;
  //         const newSlideIndex = newSlide.getAttribute('data-index');
  //         changeSlide(slider, newSlideIndex);
  //         slider.sliderElement.querySelector('.slider__control input:checked').checked = false;
  //         slider.sliderElement.querySelectorAll('.slider__control')[newSlideIndex].querySelector('input').checked = true;
  //       } else {
  //         slider.sliderList.style.left = -(slider.activeSlide.offsetWidth * slider.activeSlide.getAttribute('data-index')) + 'px';
  //       }
  //
  //     } else {
  //       slider.sliderList.style.left = slider.activeSlidePosition;
  //     }
  //
  //   }
  //
  // }


}
