function setItem (question, answer) {
  return `<li class="accordion__item">
          <button class="accordion__toggle">${question}</button>
          <div class="accordion__description">
            ${answer}
          </div>
        </li>`
}


export const showFAQ = (data) => {
  const listFAQ = document.querySelector('.faq__list');
  if (!listFAQ) {
    return;
  }
  for (let faqItem of data) {
    const item = document.createElement('div');
    item.innerHTML = setItem(faqItem.question, faqItem.answer);
    listFAQ.appendChild(item.querySelector('li'));
  }
};