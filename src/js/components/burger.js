export const setBurger = () => {
    const header = document.querySelector('.page-header');
    const burgerBtn = header.querySelector('.page-header__burger');
    const navigationMenu = header.querySelector('.page-header__nav');

    burgerBtn.addEventListener('click', onClickBurgerBtn);

    function onClickBurgerBtn (evt) {
        if(this.classList.contains('page-header__burger--opened')) {
            closeNav();
        } else {
            openNav();
        }
    }

    function openNav() {
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
        document.removeEventListener('keydown', onDocumentKeyDown);
        document.removeEventListener('click', onDocumentClick);
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
