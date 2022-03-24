import {setPosition} from "./get-position";
import gql from "graphql-tag";
import {showFlats} from "../components/flat-list";
import {setSlider} from "../components/slider";
import {client} from "../main";


let currentCity = 'Москва';
// функция вызывается после получения или неполучения геопозиции
export function getAndShowFlats(cityPosition) {
  const cityByPointOptions = {
    query: gql`
        query {
            citybypoint(lat: ${cityPosition.lat}, lon: ${cityPosition.lon}) {
                apartments {
                    title
                    apartments_images {
                        image_png
                    }

                    rating
                    reviews_amount
                    city
                    street
                    building
                }
            }
        }`,
  };
  let isCityByPoint = true;

  client.query(cityByPointOptions)
    .then((response) => {
      const apartments = response.data.citybypoint.apartments;
      if (!apartments.length) {
        isCityByPoint = false;
        return;
      }

      currentCity = apartments[0].city; // запоминаем текущий город
      showFlats(apartments);
      setSlidersInFlats();
    })
    .catch(error => console.error(error));

  //выходим из функции если квартиры получены по геопозиции
  if (isCityByPoint) {
    return;
  }
  // если нет, получаем квартиры в Москве
  showFlatsForTheCity(1);
}

function setSlidersInFlats() {
  const slidersFlats = document.querySelectorAll('.flats .slider');
  for(let slider of Array.from(slidersFlats)) {
    setSlider(slider);
  }
}

export function showFlatsForTheCity(cityID) {
  const defaultCityOptions = {
    query: gql`
        query {
            apartments(city_id: ${cityID}) {
                data {
                    title
                    apartments_images {
                        image_png
                    }
                    rating
                    reviews_amount
                    city
                    street
                    building
                }
            }
        }`,
  };
  client.query(defaultCityOptions)
    .then((response) => {
      const apartments = response.data.apartments.data;
      showFlats(apartments);
      setSlidersInFlats();
    })
    .catch(error => console.error(error));
}