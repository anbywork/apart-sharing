import {cityIn} from 'lvovich';
import {showFlatsForTheCity} from "./get-and-show-flats";

const flatsContainer = document.querySelector('.flats__cities-container');
export class Cities {
  constructor(cityListData, currentCityName) {
    this.cityList = cityListData;
    this.currentCityName = currentCityName;
    this.citiesElement = this.createElement(this.getCitiesTemplate());

    this.cityListElement = this.citiesElement.querySelector('.cities__list');
    this.cityElements = cityListData.map((city) => {
      return this.createElement(this.getCityTemplate(city));
    });
    this.cityInputs = this.cityElements.map((cityElement) => {
      return cityElement.querySelector('input');
    });
    // кнопка, открывающая список городов
    this.flatsCityBtn = document.querySelector('.flats__city-btn');
    if (this.flatsCityBtn) {
      this.flatsCityBtn.addEventListener('click', () => {
        flatsContainer.append(this.citiesElement);
        document.addEventListener('keydown', this.documentKeyDownHandler);
        setTimeout(()=> {
          document.addEventListener('click', this.documentClickHandler);
        }, 300);
      });
    }

    for (let cityElement of this.cityElements) {
      this.cityListElement.appendChild(cityElement);
    }

    for (let cityInput of this.cityInputs) {
      cityInput.addEventListener('change', () => {
        if (cityInput.checked) {
          this.changeCity(cityInput.value);
          showFlatsForTheCity(cityInput.dataset.id);
          this.closeCities();
        }
      });
    }

    this.getCityTemplate = this.getCityTemplate.bind(this);
    this.changeCity = this.changeCity.bind(this);
    this.closeCities = this.closeCities.bind(this);
    this.documentKeyDownHandler = this.documentKeyDownHandler.bind(this);
    this.documentClickHandler = this.documentClickHandler.bind(this);
  }

  createElement (template) {
    const div = document.createElement('div');
    div.insertAdjacentHTML('beforeend', template);
    return div.children[0];
  }

  getCityTemplate(cityData) {
    const checked = cityData.title === this.currentCityName ? 'checked' : '';
    return `<li class="cities__list-item city">
              <label class="city__label">
                <input class='visually-hidden' type="radio" name="city" value="${cityData.title}" ${checked} data-id='${cityData.id}'>
                <span class="city__radio-indicator">${cityData.title}</span>
              </label>
              
            </li>`;
  }

  getCitiesTemplate() {
    return `<div class="cities">
        <h3 class="cities__title">Также доступны квартиры <br>в&nbsp;следующих городах</h3>
        <ul class="cities__list">
        </ul>
      </div>
    </div>`
  }
  changeCity(name) {
    const cityBtn = document.querySelector('.flats__city-btn');
    const preposition = this.getPreposition(name);
    cityBtn.innerText = `${preposition} ${cityIn(name)}`;
  }
  closeCities() {
    this.citiesElement.remove();
    document.removeEventListener('keydown', this.documentKeyDownHandler);
    document.removeEventListener('click', this.documentClickHandler);
  }

  documentKeyDownHandler(evt) {
    if (evt.key === 'Escape') {
      this.closeCities();
    }
  }

  documentClickHandler (evt) {
    if (!evt.target.closest('.cities')) {
      this.closeCities();
    }
  }
  // определяет какой предлог должен использоваться
  getPreposition(name) {
    const nameLowerCase = name.toLowerCase();
    const firstLetters = ['в', 'ф'];
    const consonants = ['б', 'в', 'г', 'д', 'ж', 'з', 'к', 'л', 'м', 'н', 'п', 'р', 'с', 'т','ф', 'х', 'ц', 'ч', 'ш', 'щ'];
    if (firstLetters.indexOf(nameLowerCase[0]) >= 0 && consonants.indexOf(nameLowerCase[1]) >= 0) {
      return 'во';
    }
    return 'в';
  }
}

