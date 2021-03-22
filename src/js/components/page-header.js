{
    'use strict';

    window.addEventListener('scroll', function() {
        const pageHeader = document.querySelector('.page-header');
        const pageOffset = document.documentElement.scrollTop;
        const pageWidth = document.documentElement.offsetWidth;
        if (pageOffset > 50) {
            pageHeader.classList.add('page-header--white');
        } else {
            pageHeader.classList.remove('page-header--white');
        }
    });
}