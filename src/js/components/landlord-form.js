import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import {getSuccessPopup} from "../views/popup";
import {getErrorPopup} from "../views/popup";
import {getLandlordPopup} from "../views/popup";
import {setPopup} from "../views/popup";

const client = new ApolloClient({
  uri: 'https://apartshering.ru/graphql',
});

const landlordElement = document.querySelector('.landlord');
let btnOpenPopup;
let landlordPopup;
let landlordForm;

export const setLandlordFormPopup = () => {
  if (!landlordElement) {
    return;
  }
  btnOpenPopup = landlordElement.querySelector('.btn')
  btnOpenPopup.addEventListener('click', function () {
    landlordPopup = getLandlordPopup();
    landlordElement.appendChild(landlordPopup);
    setPopup();
    setLandlordForm();
  });

}

function setLandlordForm () {
  landlordForm = landlordElement.querySelector('.landlord__form');

  if (!landlordForm) {
    return;
  }

  const elements = document.querySelectorAll('.imaskjs');
  for (let i = 0; i < elements.length; i++) {
    new IMask(elements[i], {
      mask: '+{7} 000 000 00 00',
    });
  }

  landlordForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const phoneElement = landlordForm.querySelector('input[name="phone"]');
    const phone = getPhoneValue(phoneElement.value);
    if (!checkPhone(phoneElement, phone)) {
      return;
    }
    const city = landlordForm.querySelector('input[name="city"]').value;
    const name = landlordForm.querySelector('input[name="username"]').value;
    const mutation = gql`
      mutation {
        partners_requests(
          phone: ${phone}, 
          city: "${city}", 
          name: "${name}", 
          type_code: "landlord"
        ) {
          status
          status_message
        }
      }
    `;

    client.mutate({mutation})
      .then(data => {

        // показать сообщение об успешно отправленной заявке
        landlordPopup.remove();
        const popup = getSuccessPopup();
        document.querySelector('main').appendChild(popup);
        setPopup();
      })
      .catch(error => {
        // показать сообщение об ошибке
        landlordPopup.remove();
        const popup = getErrorPopup();
        document.querySelector('main').appendChild(popup);
        setPopup();
      });

  });
}

function checkPhone(phoneElement, phone) {
  if (phone.length < 11) {
    phoneElement.invalid = true;
    phoneElement.setCustomValidity('Номер телефона должен содержать 11 цифр');
    phoneElement.addEventListener('input', onInputPhone);
    return false;
  } else {
    phoneElement.valid = true;
    phoneElement.setCustomValidity('');
    phoneElement.removeEventListener('input', onInputPhone);
    return true;
  }

  function onInputPhone () {
    checkPhone(phoneElement, getPhoneValue(phoneElement.value));
  }
}


function getPhoneValue (value) {
  return value.slice(1).replace(/\s/g, '');
}
