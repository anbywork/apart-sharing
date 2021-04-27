import {reviewTemplate} from "./review";
const COUNT_REVIEW = 3;

const reviewList = document.querySelector('.reviews__list');
export const showReviews = (data) => {
  if (!reviewList) {
    return;
  }
  for (let i = 0; i < Math.min(COUNT_REVIEW, data.length); i++) {
    reviewList.appendChild(reviewTemplate(data[i]));
  }

};