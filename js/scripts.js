$(document).ready(() => {
    /**
     * HAMBURGER
     */
    $('.menu-toggle-inner').on('click', function () {
        $('.adaptive-menu-toggle').toggleClass('adaptive-menu-toggle--open');
        $('.headerNav_adaptive').toggleClass('header_opened');
    });
});
