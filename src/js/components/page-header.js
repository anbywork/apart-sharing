export const setPageHeader = () => {
    window.addEventListener('scroll', onScrollWindowColorHeader);
}

function onScrollWindowColorHeader() {
    const pageHeader = document.querySelector('.page-header');
    const pageOffset = document.documentElement.scrollTop;
    if (pageOffset > 50) {
        pageHeader.classList.add('page-header--white');
    } else if (!document.body.classList.contains('darken')) {
        pageHeader.classList.remove('page-header--white');
    }
}