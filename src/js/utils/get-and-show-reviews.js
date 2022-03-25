
import gql from "graphql-tag";
import {showReviews} from "../views/review-list";
import {client} from "../main";



// получаем и показываем отзывы
export function getAndShowReview(apartmentsIDs) {
  for (let id of apartmentsIDs) {
    const feedbackOptions = {
      query: gql`
          query {
              feedback(apartment_id: ${id}) {
                  data {
                      message
                      fio
                      review_score
                      created_at
                  }
              }
          }`,
    };
    client.query(feedbackOptions)
      .then((response) => {
        showReviews(response.data.feedback.data);
      })
      .catch(error => console.error(error));
  }


}
