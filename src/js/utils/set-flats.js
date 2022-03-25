import {getPosition} from "./get-position";
import gql from "graphql-tag";
import {showFlats} from "../components/flat-list";
import {setSlider} from "../components/slider";
import {client} from "../main";
import {Cities} from "./cities";
import {getAndShowReview} from "./get-and-show-reviews";
export function setFlats() {
  getPosition(getFlatsData);
}
const DEFAULT_CITY = {
  id: 1,
  title: 'Москва'
};

function getFlatsData(userLocation) {
  const flatOptions = {
    query: gql`
        query {
            citybypoint(lat: ${userLocation.lat}, lon: ${userLocation.lon}) {
                apartments {
                    id
                    title
                    apartments_images {
                        image_png
                    }

                    rating
                    reviews_amount
                    city
                    street
                    building
                },
                city {
                    id,
                    title
                }
            }
            apartments(city_id: ${DEFAULT_CITY.id}) {
                data {
                    id
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
            city {
                data {
                    title,
                    id
                }
            }
        }`,
  };

  client.query(flatOptions)
    .then((response) => {
      let apartments;
      let currentCity;
      let apartmentsIDs = [];
      const apartmentsCityByPoint = response.data.citybypoint.apartments;
      // выводим в найденном городе или в городе по умолчанию
      if (apartmentsCityByPoint.length) {
        apartments = apartmentsCityByPoint;
        currentCity =  response.data.citybypoint.city;
      } else {
        apartments = response.data.apartments.data;
        currentCity =  {
          id: 1,
          title: 'Москва'
        };
      }

      for (let i = 0; i <= 3; i++) {
        apartmentsIDs.push(apartments[i].id);
      }
      getAndShowReview(apartmentsIDs);
      showFlats(apartments);
      setSlidersInFlats();

      // настраиваем список городов
      const btnCity = document.querySelector('.flats__city-btn');
      btnCity.dataset.id = currentCity.id.toString();
      btnCity.dataset.title = currentCity.title;

      // настраиваем список городов
      const cities = new Cities(response.data.city.data, currentCity);
      if (currentCity.id !== 1) {
        cities.changeCity(currentCity.title);
      }

    })
    .catch(error => console.error(error));
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