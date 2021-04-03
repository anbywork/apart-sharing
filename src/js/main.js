import {setBtnsList} from "./components/btns-list";
import {setBurger} from "./components/burger";
import {setPageHeader} from "./components/page-header";
import {createFlatTemplate} from "./views/flat";
import {generateTaskData} from "./mocks/flat";
import {setFlatListPosition} from "./components/flat-list";
import {setSlider} from "./components/slider";
import {setAccordions} from "./components/accordion";

const FLAT_COUNT = 3;
function render(parentElement, place, template,) {
    parentElement.insertAdjacentHTML(place, template);
}

setBtnsList();
setBurger();
setPageHeader();
setAccordions();



const flatsList = document.querySelector('.flats__list');
for (let i = 0; i < FLAT_COUNT; i++) {
    render (flatsList, 'beforeend', createFlatTemplate(generateTaskData(), i));
}
setFlatListPosition();

const sliders = document.querySelectorAll('.slider');
for(let slider of Array.from(sliders)) {
    setSlider(slider);
}