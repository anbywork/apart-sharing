import {setBtnsList} from "./components/btns-list";
import {setBurger} from "./components/burger";
import {setPageHeader} from "./components/page-header";
import {setFlatListPosition} from "./components/flat-list";
import {anchorAnimationScroll} from "./components/anchor-animation-scroll";
import ApolloClient from 'apollo-boost';
import {setCalc} from "./components/calc";
import {setFeaturesSlider} from "./views/features";
import {setPartnersForm} from "./components/partners-form";
import {setLandlordFormPopup} from "./components/landlord-form";
import {setFlats} from "./utils/set-flats";
import {getAndShowFAQ} from "./utils/get-and-show-faqs";
import {getAndShowReview} from "./utils/get-and-show-reviews";

window.screenWidth = document.documentElement.offsetWidth;

export const client = new ApolloClient({
  uri: 'https://apartshering.ru/graphql',
});

setPageHeader();
setBtnsList();
setBurger();

getAndShowFAQ();

setFlats();

setCalc();




setFeaturesSlider();
setPartnersForm();
setLandlordFormPopup();


window.addEventListener('resize', function () {
  if (screenWidth !== document.documentElement.offsetWidth) {
    window.screenWidth = document.documentElement.offsetWidth;
    setCalc();
    setFlatListPosition();
    setFeaturesSlider();
  }
});

anchorAnimationScroll();




