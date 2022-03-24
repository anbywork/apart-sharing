import {getAndShowFlats} from "./get-and-show-flats";

// координаты москвы
const coordsDefault = {
  lat: 55.7,
  lon: 44.5
}

let resultPosition = {
  lat: coordsDefault.lat,
  lon: coordsDefault.lon
}
// определяем локацию
export function setPosition() {
  /* если местоположение доступно в браузере*/
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(currentPositionSuccess, currentPositionError);
  }
}

function currentPositionSuccess(position) {
  resultPosition = {
    lat: Math.round(position.coords.latitude * 1000) / 1000 || coordsDefault.lat,
    lon: Math.round(position.coords.longitude * 1000) / 1000 || coordsDefault.lon
  }
  getAndShowFlats(resultPosition);
}

function currentPositionError() {
  getAndShowFlats(resultPosition);
}