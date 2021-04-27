export const reviewTemplate = (data) => {
  const {message, fio, review_score} = data;
  const reviewCode = `<li class="review">
                        <p>${message}</p>
                        <footer class="review__footer review-footer">
                            <span class="review-footer__rating">${review_score}</span>
                            <span class="review-footer__name">${fio}</span>
                        </footer>
                    </li>`;
  const element = document.createElement('div');
  element.innerHTML = reviewCode;
  return element.querySelector('.review');
};