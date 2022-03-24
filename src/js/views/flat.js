export const createFlatTemplate = (flat, flatIndex) => {
  if (!flat) {
    return;
  }
  const {rating, city, street, title} = flat;
  const home = flat.building;
  const reviewsCount = flat.reviews_amount;



  const imagesTemplates = getImagesTemplates(flat.apartments_images, flatIndex);
  return `<li class="flats__object flat">
            <div class="flat__slider slider">
              <div class="slider__list-container">
                 <ul class="flat-img-slider__list slider__list">
                    ${imagesTemplates.imagesHTML}
                </ul> 
              </div>
                <ul class="flat-img-slider__controls slider__controls">
                    ${imagesTemplates.imagesControlHTML}
                </ul>
            </div>
            <div class="flat__description">
                <div class="flat__rating-and-reviews">
                    <span class="flat__rating">${rating}</span> 
                    <span class="flat__reviews">(${reviewsCount} отзывов)</span>
                </div>
                <p class="flat__city">${title}</p>
                <p class="flat__address">${city} ${street}, ${home}</p>
            </div>
        </li>`;
}

function getImagesTemplates (images, flatIndex) {
  let imagesHTML = '';
  let imagesControlHTML = '';
  for (let i = 0; i < images.length; i++) {
    imagesHTML += `<li class="flat__img-container">
                      <img 
                        class="flat__img preloader" 
                        src="https://apartshering.ru/${images[i]['image_png']}" 
                        alt=""  
                        width='300'
                        height='250'
                        loading='lazy'>
                      </li>`;

    imagesControlHTML += `<li>
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
  return {
    imagesHTML,
    imagesControlHTML
  };
}