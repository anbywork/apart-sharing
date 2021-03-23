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
    }

    function closeNav() {
        navigationMenu.classList.remove('page-header__nav--opened');
        navigationMenu.classList.add('page-header__nav--closed');
        burgerBtn.classList.remove('page-header__burger--opened');
    }
};
