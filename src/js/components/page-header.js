export const setPageHeader = () => {
    window.addEventListener('scroll', function() {
        const pageHeader = document.querySelector('.page-header');
        const pageOffset = document.documentElement.scrollTop;
        if (pageOffset > 50) {
            pageHeader.classList.add('page-header--white');
        } else {
            pageHeader.classList.remove('page-header--white');
        }
    });
}