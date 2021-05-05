window.scrollValue = 0;
window.widthScrollBar = 0;

const body = document.body;
export const stopScroll = () => {
  window.addEventListener('scroll', onScroll);
  window.scrollValue = window.pageYOffset;
  const main = document.querySelector('main');
  const header = document.querySelector('.page-header');
  body.style.maxWidth = main.clientWidth + 'px';
  header.style.maxWidth = main.clientWidth + 'px';
  body.style.maxHeight = document.documentElement.clientHeight + 'px';
  body.style.overflowY = 'hidden';

}

export const startScroll = () => {
  window.removeEventListener('scroll', onScroll);
  window.scrollTo (0, window.scrollValue);
  body.style.maxHeight = '';
  body.style.overflowY = '';
  body.style.maxWidth = 'none';
}

function onScroll (evt) {
  evt.preventDefault();
}

function setPadding (paddingValue) {
  const paddingRight = paddingValue + 'px';
  body.style.paddingRight = paddingRight;
}