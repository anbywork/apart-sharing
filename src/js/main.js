import {setBtnsList} from "./components/btns-list";
import {setBurger} from "./components/burger";
import {setPageHeader} from "./components/page-header";
import {createFlatTemplate} from "./views/flat";
// import {generateTaskData} from "./mocks/flat";
import {setFlatListPosition} from "./components/flat-list";
import {setSlider} from "./components/slider";
import {setAccordions} from "./components/accordion";
import {anchorAnimationScroll} from "./components/anchor-animation-scroll";
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import {showFAQ} from "./views/faq";
import {setCalc} from "./components/calc";
import {setFeaturesSlider} from "./views/features";
import {showReviews} from "./views/review-list";
import {setPartnersForm} from "./components/partners-form";

const FLAT_COUNT = 3;
function render(parentElement, place, template,) {
    parentElement.insertAdjacentHTML(place, template);
}

const client = new ApolloClient({
  uri: 'https://apartshering.ru/graphql',
});



client.query({
  query: gql`
          query {
            faq(code: "customer") {
              data {
                answer
                question
              }
            }
            feedback{
              data {
                message
                fio
                review_score
                
              }
            }
            apartments {
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
          
              status
            }
          }
      `,
})
  .then((data) => {

    showFlats(data.data.apartments.data);
    showFAQ(data.data.faq.data);
    showReviews(data.data.feedback.data);
    setAccordions();
    const slidersFlats = document.querySelectorAll('.flats .slider');
    for(let slider of Array.from(slidersFlats)) {
      setSlider(slider);
    }
  })
  .catch(error => console.error(error));


function showFlats(dataFlats) {
  const flatsList = document.querySelector('.flats__list');
  if (!flatsList) {
    return;
  }
  for (let i = 0; i < Math.min(FLAT_COUNT, dataFlats.length); i++) {
    render (flatsList, 'beforeend', createFlatTemplate(dataFlats[i], i));
  }
  setFlatListPosition();
}

setCalc();


setBtnsList();
setBurger();
setPageHeader();
setFeaturesSlider();
setPartnersForm();


window.addEventListener('resize', function () {
  setCalc();
  setFlatListPosition();
  setFeaturesSlider();
});

anchorAnimationScroll();




