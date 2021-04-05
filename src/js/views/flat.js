export const createFlatTemplate = (flat, flatIndex) => {
  if (!flat) {
    return;
  }
  const {images, rating, reviewsCount, city, street, home} = flat;

  const getImages = () => {
    let imagesHTML = '';
    for (let i = 0; i < images.length; i++) {
      imagesHTML += `<li><img class="flat__img" src="img/content/${images[i]['1x']}" srcset="/img/content/${images[i]['2x']} 2x" alt=""></li>`
    }
    return imagesHTML;
  }

  const generateImagesControl = () => {
    let imagesControlHTML = '';
    for (let i = 0; i < images.length; i++) {
      imagesControlHTML +=`<li>
                    <label>
                        <input
                        class="visually-hidden" 
                        type="radio" 
                        name="flat-img-slider__control-${flatIndex}" 
                        value="${i}"
                        ${i == 0 ? "checked" : ''}>
                        <span class="slider__radio-indicator"></span>
                    </label>
                </li>`;
    }
    return imagesControlHTML;
  }
  return `<li class="flats__object flat">
            <div class="flat__slider slider">
              <div class="slider__list-container">
                 <ul class="flat-img-slider__list slider__list">
                    ${getImages()}
                </ul> 
              </div>
                <ul class="flat-img-slider__controls slider__controls">
                    ${generateImagesControl()}
                </ul>
            </div>
            <div class="flat__description">
                <div>
                    <span class="flat__rating">${rating}</span> 
                    <span class="flat__reviews">(${reviewsCount} отзывов)</span>
                </div>
                <p class="flat__city">${city}</p>
                <p class="flat__address">${street}, ${home}</p>
            </div>
        </li>`;
}