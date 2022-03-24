
import gql from "graphql-tag";
import {showReviews} from "../views/review-list";
import {client} from "../main";

const feedbackOptions = {
  query: gql`
      query {
          feedback {
              data {
                  message
                  fio
                  review_score
                  created_at
              }
          }
      }`,
};

// получаем и показываем отзывы
export function getAndShowReview() {
    client.query(feedbackOptions)
      .then((response) => {
          showReviews(response.data.feedback.data);
      })
      .catch(error => console.error(error));
}
