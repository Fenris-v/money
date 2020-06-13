$(document).ready(() => {
    /**
     * ANCHOR
     */
    $('.anchor').on('click', (e) => {
        let document = $('body, html');
        let anchor;

        document.stop(true, false);
        e.preventDefault();

        if (!$(e.target).hasClass('.anchor')) {
            anchor = $(e.target).parents('.anchor');
        } else {
            anchor = $(e.target);
        }

        let id = anchor.attr('href');
        let top = $(id).offset().top - 80;
        document.animate({scrollTop: top}, 1500);
    });

    /**
     * SLIDERS
     */
    $('#rangeSlider_first').slider({
        range: "min",
        value: 2000,
        min: 2000,
        max: 2000000,
        slide: function (event, ui) {
            $("#creditSum").val(ui.value.toLocaleString(undefined, 'ru-RU'));
        },
    });
    $("#creditSum").val(($("#rangeSlider_first").slider("value")).toLocaleString(undefined, 'ru-RU'));

    $('#rangeSlider_second').slider({
        range: "min",
        value: 1,
        min: 1,
        max: 60,
        slide: function (event, ui) {
            $("#creditTerm").val(ui.value);
        },
    });
    $("#creditTerm").val($("#rangeSlider_second").slider("value"));

    $('#rangeSlider_third').slider({
        range: "min",
        value: 2000,
        min: 2000,
        max: 2000000,
        slide: function (event, ui) {
            $("#monthPay").val(ui.value.toLocaleString(undefined, 'ru-RU'));
        },
    });
    $("#monthPay").val(($("#rangeSlider_third").slider("value")).toLocaleString(undefined, 'ru-RU'));

    $('.rangeSlider .ui-slider-handle').on('mousedown', (e) => {
        $(e.target).css('background', '#d51c2a');
        $(e.target).siblings('.rangeSlider .ui-widget-header').css('background', '#d51c2a');
    });

    $(document).on('mouseup', (e) => {
        $('.rangeSlider .ui-slider-handle').css('background', '#82766d');
        $('.rangeSlider .ui-widget-header').css('background', '#82766d');
    });

    /**
     * RADIO
     */
    let radio = $('.calculator__radio input');
    let customRadioAll = $('.customRadio');
    radio.css({'opacity': 0, 'width': '25px', 'height': '25px', 'vertical-align': 'middle'});

    customRadioAll.css('display', 'block');

    let checkCustom = () => {
        let container = $('.calculator__radio input:checked').parents('.calculator__radio__container');
        let customRadio = container.find('.customRadio');
        customRadio.css('background', '#d51c2a');
    };

    checkCustom();

    radio.on('change', () => {
        customRadioAll.css('background', '#ffffff')
        checkCustom();
    });

    /**
     * SLICK
     */
    $('.feedback__slider').slick({
        infinite: true,
        arrows: true,
        dots: true,
        prevArrow: '<button type="button" class="slick-prev"><</button>',
        nextArrow: '<button type="button" class="slick-next">></button>',
        slidesToShow: 3,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    });

    /**
     * MASK
     */
    $('#phone').mask("+7 (999) 999-99-99");
});
