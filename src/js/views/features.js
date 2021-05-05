import {setSlider} from "../components/slider";
const slider = document.querySelector('.features.slider');
export const setFeaturesSlider = () => {
  if (!slider) {
    return;
  }
  setFeaturesSliderSwipe();
  setSlider(slider);
  window.addEventListener('resize', function() {
    if(screenWidth !== document.documentElement.offsetWidth) {
      setFeaturesSliderSwipe();
      setSlider(slider);
    }
  });


}

function setFeaturesSliderSwipe () {
  if (document.documentElement.offsetWidth < 768) {
    // для мобильной версии включаем свайп
    slider.classList.add('slider--swiper');
  } else {
    slider.classList.remove('slider--swiper');
  }
}
