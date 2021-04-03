export const setAccordions = () => {
  const accordionToggleElement = document.querySelectorAll('.accordion__toggle');
  for (let i = 0; i < accordionToggleElement.length; i++) {
    accordionToggleElement[i].addEventListener('click', accordionToggleElementOnClick);
  }
}



function accordionToggleElementOnClick(evt) {
  const btn = evt.currentTarget;
  const description = btn.nextElementSibling;
  const activeElement = document.querySelector('.accordion__toggle--active');

  if (activeElement && activeElement !== btn) {
    activeElement.classList.remove('accordion__toggle--active');
    activeElement.nextElementSibling.style = '';
  }
  btn.classList.toggle('accordion__toggle--active');


  if (description.style.maxHeight) {
    description.style.maxHeight = null;
  } else {
    description.style.maxHeight = description.scrollHeight + "px";
  }
}
