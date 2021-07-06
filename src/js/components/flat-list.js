import {createFlatTemplate} from "../views/flat";
import {render} from "../utils/render";
import {allApartmentsData} from "../main";

const FLAT_COUNT = 50;
export const DEFAULT_CITY = 'Москва';


export const setFlatListPosition = () => {
  const flatList = document.querySelector('.flats__list');
  if (!flatList) {
    return;
  }
  const flatListWidth = flatList.scrollWidth;

  const screenWidth = document.documentElement.offsetWidth;

  flatList.scrollLeft = flatListWidth / 2 - screenWidth / 2;
};

export const showFlats = (dataFlats) => {
  const flatsList = document.querySelector('.flats__list');
  if (!flatsList) {
    return;
  }
  flatsList.innerHTML = ``;
  for (let i = 0; i < Math.min(dataFlats.length, FLAT_COUNT); i++) {
    render (flatsList, 'beforeend', createFlatTemplate(dataFlats[i], i));
  }
  setFlatListPosition();
}

export const showDefaultFlats = () => {
  const data = filterApartment(DEFAULT_CITY);
  showFlats(data);
}

export const updateFlats = (city) => {
  showFlats(filterApartment(city));
}

const filterApartment = (city) => {
  return allApartmentsData.filter(apartmentData => {
    return apartmentData.city === city;
  });
}