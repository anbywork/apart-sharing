import {setBtnsList} from "./components/btns-list";
import {setBurger} from "./components/burger";
import {setPageHeader} from "./components/page-header";
import {setFlatListPosition, showDefaultFlats} from "./components/flat-list";
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
import {setLandlordFormPopup} from "./components/landlord-form";
import {Cities} from "./utils/cities";


export let allApartmentsData;
window.screenWidth = document.documentElement.offsetWidth;

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
            city {
              data {
                title
              }
            }
          }
      `,
})
  .then((data) => {
    const cities = new Cities(data.data.city.data);
    allApartmentsData = data.data.apartments.data;
    showDefaultFlats();
    showFAQ(data.data.faq.data);
    showReviews(data.data.feedback.data);
    setAccordions();
    const slidersFlats = document.querySelectorAll('.flats .slider');
    for(let slider of Array.from(slidersFlats)) {
      setSlider(slider);
    }
  })
  .catch(error => console.error(error));


setCalc();


setBtnsList();
setBurger();
setPageHeader();
setFeaturesSlider();
setPartnersForm();
setLandlordFormPopup();


window.addEventListener('resize', function () {
  if(screenWidth !== document.documentElement.offsetWidth) {
    window.screenWidth = document.documentElement.offsetWidth;
    setCalc();
    setFlatListPosition();
    setFeaturesSlider();
  }
});

anchorAnimationScroll();




