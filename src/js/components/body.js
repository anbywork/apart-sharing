window.scrollValue = 0;
window.widthScrollBar = 0;

const body = document.body;
const main = document.querySelector('main');
const header = document.querySelector('.page-header');

export const stopScroll = () => {
  window.addEventListener('scroll', onScroll);
  window.scrollValue = window.pageYOffset;
  body.style.maxWidth = main.clientWidth + 'px';
  header.style.maxWidth = main.clientWidth + 'px';
  body.style.maxHeight = document.documentElement.clientHeight + 'px';
  body.style.overflow = 'hidden';
  main.style.maxHeight = document.documentElement.clientHeight + 'px';
  main.style.overflow = 'hidden';

}

export const startScroll = () => {
  window.removeEventListener('scroll', onScroll);
  body.style.maxWidth = '';
  body.style.maxHeight = '';
  body.style.overflow = '';
  main.style.maxHeight = '';
  main.style.overflow = '';
  window.scrollTo (0, window.scrollValue);
}

function onScroll (evt) {
  console.log(evt.type);
  evt.preventDefault();
}

function setPadding (paddingValue) {
  const paddingRight = paddingValue + 'px';
  body.style.paddingRight = paddingRight;
}