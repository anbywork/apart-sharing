import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import {getSuccessPopup} from "../views/popup";
import {getErrorPopup} from "../views/popup";
import {setPopup} from "../views/popup";

const partnersForm = document.querySelector('.partners-form form');

const client = new ApolloClient({
  uri: 'https://apartshering.ru/graphql',
});


export const setPartnersForm = () => {
  if (!partnersForm) {
    return;
  }
  partnersForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const phoneElement = partnersForm.querySelector('input[name="phone"]');
    const phone = getPhoneValue(phoneElement.value);
    if (!checkPhone(phoneElement, phone)) {
      return;
    }
    const city = partnersForm.querySelector('input[name="city"]').value;
    const name = partnersForm.querySelector('input[name="username"]').value;
    const mutation = gql`
      mutation {
        partners_requests(
          phone: ${phone}, 
          city: "${city}", 
          name: "${name}", 
          type_code: "partner"
        ) {
          status
          status_message
        }
      }
    `;

    client.mutate({mutation})
        .then(data => {
          // показать сообщение об успешно отправленной заявке
          const popup = getSuccessPopup();
          document.querySelector('main').appendChild(popup);
          setPopup();
        })
        .catch(error => {
          // показать сообщение об ошибке
          const popup = getErrorPopup();
          document.querySelector('main').appendChild(popup);
          setPopup();
        });

  });

  const formData= new FormData(partnersForm);

};

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