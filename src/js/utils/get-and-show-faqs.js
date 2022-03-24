// получаем и показываем часто задаваемые вопросы
import gql from "graphql-tag";
import {showFAQ} from "../views/faq";
import {setAccordions} from "../components/accordion";
import {client} from "../main";

const faqOptions = {
  query: gql`
      query {
          faq(code: "customer") {
              data {
                  answer
                  question
              }
          }
      }`,
};

export function getAndShowFAQ () {
  client.query(faqOptions)
    .then((response) => {
      showFAQ(response.data.faq.data);
      setAccordions();
    })
    .catch(error => console.error(error));
}