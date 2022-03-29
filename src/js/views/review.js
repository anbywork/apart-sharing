import dayjs from "dayjs";
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const reviewTemplate = (data) => {
  const {message, fio, review_score} = data;
  const date = dayjs(data.created_at).locale('ru').format('D MMM YYYY');
  const rate = (Math.round(review_score) - review_score) > 0 ? review_score : `${review_score}.0`;

  const reviewCode = `<li class="review">
                        <div class="review__info">
                            <div class="review__rating-and-name">
                              <span class="review__rating">${rate}</span>
                              <span class="review__name">${fio}</span>
                            </div>
                            <div class="review__date">${date}</div>
                            
                        </div>
                        <p>${message}</p>
                        
                    </li>`;
  const element = document.createElement('div');
  element.innerHTML = reviewCode;
  return element.querySelector('.review');
};
