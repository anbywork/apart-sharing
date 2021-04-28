export const setBurger = () => {
    const header = document.querySelector('.page-header');
    const burgerBtn = header.querySelector('.page-header__burger');
    const navigationMenu = header.querySelector('.page-header__nav');
    let scrollValue = 0;
    let clientWidthStart = document.documentElement.clientWidth;

    burgerBtn.addEventListener('click', onClickBurgerBtn);

    function onClickBurgerBtn (evt) {
        if(this.classList.contains('page-header__burger--opened')) {
            closeNav();
        } else {
            openNav();
        }
    }

    function openNav() {
        stopScroll();
        navigationMenu.classList.remove('page-header__nav--closed');
        navigationMenu.classList.add('page-header__nav--opened');
        burgerBtn.classList.add('page-header__burger--opened');


        document.addEventListener('keydown', onDocumentKeyDown);
        document.addEventListener('click', onDocumentClick);

    }

    function closeNav() {
        navigationMenu.classList.remove('page-header__nav--opened');
        navigationMenu.classList.add('page-header__nav--closed');
        burgerBtn.classList.remove('page-header__burger--opened');
        startScroll();

    }

    function stopScroll () {
        window.addEventListener('scroll', onScroll);
        scrollValue = window.pageYOffset;
        document.body.style.maxHeight = document.documentElement.clientHeight + 'px';
        document.body.style.overflow = 'hidden';
        if (document.documentElement.clientWidth > clientWidthStart) {
            document.body.style.paddingRight = document.documentElement.clientWidth - clientWidthStart + 'px';
            clientWidthStart = document.documentElement.clientWidth;
        }

    }

    function startScroll () {
        window.removeEventListener('scroll', onScroll);
        window.scrollTo (0, scrollValue);
        document.body.style.maxHeight = '';
        document.body.style.overflow = '';
        if (document.documentElement.clientWidth < clientWidthStart) {
            document.body.style.paddingRight = '0px';
            clientWidthStart = document.documentElement.clientWidth;
        }

    }

    function onScroll (evt) {
        console.log(evt.type);
        evt.preventDefault();
    }

    function onDocumentKeyDown(evt) {
        if (evt.key === 'Escape') {
            closeNav();
        }
    }

    function onDocumentClick(evt) {
        if (!evt.target.closest('.page-header__nav') && evt.target !== burgerBtn) {
            closeNav();
        }
    }

    const navLinks = navigationMenu.querySelectorAll('.page-nav__link');

    for (let link of Array.from(navLinks)) {
        link.addEventListener('click', function() {
            closeNav();
        })
    }

};
