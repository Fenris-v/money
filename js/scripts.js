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
     * SLIDERS (CALCULATOR)
     */
    let firstSlider = $('#rangeSlider_first');
    let creditSum = $('#creditSum');
    firstSlider.slider({
        range: "min",
        value: 2000,
        min: 2000,
        max: 2000000,
        slide: function (event, ui) {
            creditSum.val(ui.value.toLocaleString(undefined, 'ru-RU'));
            calculate();
        },
    });
    $("#creditSum").val(($("#rangeSlider_first").slider("value")).toLocaleString(undefined, 'ru-RU'));

    let secondSlider = $('#rangeSlider_second');
    let creditTerm = $('#creditTerm');
    secondSlider.slider({
        range: "min",
        value: 1,
        min: 1,
        max: 60,
        slide: function (event, ui) {
            creditTerm.val(ui.value);
            let percent = $('#percentForPay');
            percent.attr('data-all-percent', percent.attr('data-percent') * ui.value);
            calculate();
        },
    });
    creditTerm.val($("#rangeSlider_second").slider("value"));

    $('.rangeSlider .ui-slider-handle').on('mousedown', (e) => {
        $(e.target).css('background', '#d51c2a');
        $(e.target).siblings('.rangeSlider .ui-widget-header').css('background', '#d51c2a');
    });

    $(document).on('mouseup', () => {
        $('.rangeSlider .ui-slider-handle').css('background', '#82766d');
        $('.rangeSlider .ui-widget-header').css('background', '#82766d');
    });

    creditSum.on('blur', () => {
        firstSlider.slider("value", parseInt(creditSum.val().replace(/\s/g, '')));
        calculate();
    });

    creditTerm.on('blur', () => {
        secondSlider.slider("value", parseInt(creditTerm.val().replace(/\s/g, '')));
        let percent = $('#percentForPay');
        percent.attr('data-all-percent', percent.attr('data-percent') * creditTerm.val().replace(/\s/g, ''));
        calculate();
    });

    /**
     * CALCULATE
     */
    let percentForPay = $('#percentForPay');
    let carChecked = $('.whereCar:checked');
    percentForPay.text(carChecked.data('percent'));
    percentForPay.attr('data-percent', carChecked.data('percent'));
    percentForPay.attr('data-all-percent', carChecked.data('percent'));

    $('.whereCar').on('change', () => {
        let carChecked = $('.whereCar:checked');
        let creditTerm = $('#creditTerm').val().replace(/\s/g, '');
        percentForPay.text(carChecked.data('percent'));
        percentForPay.attr('data-percent', carChecked.data('percent'));
        percentForPay.attr('data-all-percent', carChecked.data('percent') * creditTerm);
        calculate();
    });

    let calculate = () => {
        let monthPay = $('#monthPay');
        let sumForPay = $('#sumForPay');

        let percent = parseFloat(percentForPay.attr('data-all-percent')) / 100 + 1;
        let sum = parseInt(creditSum.val().replace(/\s/g, ''));
        let month = parseInt(creditTerm.val());

        let allSum = sum * percent;
        let monthSum = allSum/month;

        sumForPay.text(parseInt(allSum).toLocaleString(undefined, 'ru-RU'));
        sumForPay.attr('data-full-sum', parseInt(allSum));

        monthPay.text(parseInt(monthSum).toLocaleString(undefined, 'ru-RU'));
        monthPay.attr('data-month-pay', parseInt(monthSum));
    }

    calculate();

    $('#calculatorSubmit').on('click', () => {
        $('#modalPercent').val($('#percentForPay').attr('data-all-percent'));
        $('#modalFullSum').val($('#sumForPay').attr('data-full-sum'));
        $('#modalMonth').val($('#creditTerm').val());
        $('#modalMonthPay').val($('#monthPay').attr('data-month-pay'));
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
     * CHECKBOX
     */
    let checkRules = $('#checkRules');
    let customCheck = $('#customCheckCalculate');
    checkRules.css('opacity', 0);
    customCheck.css('display', 'block');

    if (checkRules.prop('checked')) {
        customCheck.css('background', '#d51c2a');
    }

    checkRules.on('change', () => {
        if (checkRules.prop('checked')) {
            customCheck.css('background', '#d51c2a');
        } else {
            customCheck.css('background', '#ffffff');
        }
    });

    let checkRulesRe = $('#checkRulesRe');
    let customCheckRe = $('#customCheckRe');
    checkRulesRe.css('opacity', 0);
    customCheckRe.css('display', 'block');

    if (checkRulesRe.prop('checked')) {
        customCheckRe.css('background', '#d51c2a');
    }

    checkRulesRe.on('change', () => {
        if (checkRulesRe.prop('checked')) {
            customCheckRe.css('background', '#d51c2a');
        } else {
            customCheckRe.css('background', '#ffffff');
        }
    });

    let checkRulesTask = $('#checkRulesTask');
    let customCheckTask = $('#customCheckTask');
    checkRulesTask.css('opacity', 0);
    customCheckTask.css('display', 'block');

    if (checkRulesTask.prop('checked')) {
        customCheckTask.css('background', '#d51c2a');
    }

    checkRulesTask.on('change', () => {
        if (checkRulesTask.prop('checked')) {
            customCheckTask.css('background', '#d51c2a');
        } else {
            customCheckTask.css('background', '#ffffff');
        }
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
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    /**
     * MASK
     */
    $('#phone').mask("+7 (999) 999-99-99");
    $('#modalPhone').mask("+7 (999) 999-99-99");

    /**
     * MODAL
     */
    $('[data-fancybox-modal]').fancybox({
        trapFocus: true,
        autoFocus: false,
        touch: false,
        beforeShow: function() {
            $('html').addClass('scroll-disable');
        },
        afterClose: function() {
            $('html').removeClass('scroll-disable');
        }
    });

    /**
     * HAMBURGER
     */
    $('.menu-toggle-inner').on('click', function (e) {
        $('.adaptive-menu-toggle').toggleClass('adaptive-menu-toggle--open');
        $('.headerNav_adaptive').toggleClass('header_opened');
    });

    /**
     * ANCHOR
     */
    let headerNav = $('.header__nav');
    let headerNavAdaptive = $('.headerNav_adaptive');
    let sDocument = $('body, html');

    let onClickNav = (e) => {
        sDocument.stop(true, false);
        e.preventDefault();
        let id = $(e.target).attr('href'),
            top = $(id).offset().top - 80;
        sDocument.animate({scrollTop: top}, 1500);
        console.log(123);
    };

    headerNavAdaptive.on('click', 'a', (e) => {
        onClickNav(e)
    });

    headerNav.on('click', 'a', (e) => {
        onClickNav(e)
    });
});
