window.scrollValue = 0;
window.widthScrollBar = 0;

const body = document.body;
const main = document.querySelector('main');
const header = document.querySelector('.page-header');
const mainContentWrapper = main.querySelector('.main-content-wrapper');
const footerElement = document.querySelector('.footer');
const footerHeight = footerElement? footerElement.offsetHeight : 0;

export const stopScroll = () => {
  window.addEventListener('scroll', onScroll);
  window.scrollValue = window.scrollY;
  setShift(window.scrollValue);
  setTimeout(()=> {
    body.style.maxWidth = main.clientWidth + 'px';
    header.style.maxWidth = main.clientWidth + 'px';
    body.style.maxHeight = document.documentElement.clientHeight + 'px';
    body.style.overflow = 'hidden';
    main.style.maxHeight = document.documentElement.clientHeight - footerHeight + 'px';
    main.style.overflow = 'hidden';
  }, 100);


}

export const startScroll = () => {
  window.removeEventListener('scroll', onScroll);
  setShift(0);
  body.style.maxWidth = '';
  body.style.maxHeight = '';
  body.style.overflow = '';
  main.style.maxHeight = '';
  main.style.overflow = '';
  window.scrollTo (0, window.scrollValue);
}

function onScroll (evt) {
  evt.preventDefault();
}

function setShift (shift) {
  if (mainContentWrapper) {
    mainContentWrapper.style.transform = `translateY(-${shift}px)`;
  }

}