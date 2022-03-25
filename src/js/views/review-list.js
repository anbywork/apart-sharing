import {reviewTemplate} from "./review";
const COUNT_REVIEW = 3;

const reviewList = document.querySelector('.reviews__list');
export const showReviews = (data) => {
  if (!reviewList) {
    return;
  }

  const filteredData = data.filter((review)=> {
    return review.review_score >= 4 && review.message !== '';
  });

  for (let i = 0; i < Math.min(COUNT_REVIEW, filteredData.length); i++) {
    reviewList.appendChild(reviewTemplate(filteredData[i]));
  }

};